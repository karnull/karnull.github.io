#!/bin/sh
# terminal.d/lib/net.sh -- fetching, caching and module loading.
#
# Everything under terminal.d is pulled at runtime from $TUI_ROOT, so the
# entrypoint stays small enough to pipe into sh. Fetched files are cached for
# the life of the session in $TUI_CACHE.

NET_CLIENT=''

net_client() {
    [ -n "$NET_CLIENT" ] && { printf '%s\n' "$NET_CLIENT"; return 0; }
    if command -v curl >/dev/null 2>&1; then
        NET_CLIENT=curl
    elif command -v wget >/dev/null 2>&1; then
        NET_CLIENT=wget
    elif command -v fetch >/dev/null 2>&1; then
        NET_CLIENT=fetch
    else
        return 1
    fi
    printf '%s\n' "$NET_CLIENT"
}

# net_url <url> -- body on stdout
net_url() {
    case "$(net_client)" in
        curl)  curl -fsSL --max-time "${TUI_TIMEOUT:-20}" "$1" 2>/dev/null ;;
        wget)  wget -qO- --timeout="${TUI_TIMEOUT:-20}" "$1" 2>/dev/null ;;
        fetch) fetch -qo- "$1" 2>/dev/null ;;
        *)     return 1 ;;
    esac
}

# net_download <url> <dest>
net_download() {
    case "$(net_client)" in
        curl)  curl -fsSL --max-time "${TUI_TIMEOUT:-20}" -o "$2" "$1" 2>/dev/null ;;
        wget)  wget -qO "$2" --timeout="${TUI_TIMEOUT:-20}" "$1" 2>/dev/null ;;
        fetch) fetch -qo "$2" "$1" 2>/dev/null ;;
        *)     return 1 ;;
    esac
}

# net_exists <url> -- true if the URL resolves (used before installing anything)
net_exists() {
    case "$(net_client)" in
        curl)  curl -fsSLI --max-time 10 -o /dev/null "$1" 2>/dev/null ;;
        wget)  wget -q --spider --timeout=10 "$1" 2>/dev/null ;;
        *)     net_url "$1" >/dev/null 2>&1 ;;
    esac
}

# net_asset <relative/path> -- local path to the cached asset on stdout
net_asset() {
    _rel=$1
    _dst="$TUI_CACHE/$(printf '%s' "$_rel" | tr '/' '_')"
    if [ -f "$_dst" ]; then
        printf '%s\n' "$_dst"
        return 0
    fi
    if [ -n "$TUI_LOCAL" ] && [ -f "$TUI_LOCAL/$_rel" ]; then
        cp "$TUI_LOCAL/$_rel" "$_dst" 2>/dev/null || return 1
    else
        net_download "$TUI_ROOT/$_rel" "$_dst" || { rm -f "$_dst"; return 1; }
    fi
    [ -s "$_dst" ] || { rm -f "$_dst"; return 1; }
    printf '%s\n' "$_dst"
}

# net_module <name> -- source modules/<name>.sh once
TUI_LOADED=' '

net_module() {
    case "$TUI_LOADED" in
        *" $1 "*) return 0 ;;
    esac
    _p=$(net_asset "modules/$1.sh") || {
        ui_err "could not load module: $1"
        return 1
    }
    # shellcheck disable=SC1090
    . "$_p" || return 1
    TUI_LOADED="$TUI_LOADED$1 "
    return 0
}

# net_data <name> -- local path to data/<name>.list
net_data() { net_asset "data/$1.list"; }
