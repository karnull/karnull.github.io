#!/bin/sh
# terminal.d/lib/sys.sh -- host detection and safe file placement.

SYS_OS=''
SYS_PM=''

sys_os() {
    [ -n "$SYS_OS" ] && { printf '%s\n' "$SYS_OS"; return 0; }
    case "$(uname -s 2>/dev/null)" in
        Darwin) SYS_OS=macos ;;
        Linux)
            SYS_OS=linux
            if [ -r /etc/os-release ]; then
                SYS_OS=$(. /etc/os-release 2>/dev/null && printf '%s' "${ID:-linux}")
            fi
            ;;
        FreeBSD) SYS_OS=freebsd ;;
        *) SYS_OS=unknown ;;
    esac
    printf '%s\n' "$SYS_OS"
}

# sys_pm -- the package manager this host actually has
sys_pm() {
    [ -n "$SYS_PM" ] && { printf '%s\n' "$SYS_PM"; return 0; }
    for _c in brew apt-get pacman dnf zypper apk pkg; do
        if command -v "$_c" >/dev/null 2>&1; then
            case "$_c" in
                apt-get) SYS_PM=apt ;;
                *) SYS_PM=$_c ;;
            esac
            break
        fi
    done
    [ -z "$SYS_PM" ] && SYS_PM=none
    printf '%s\n' "$SYS_PM"
}

# sys_install_cmd <package> -- the command line that would install it
sys_install_cmd() {
    case "$(sys_pm)" in
        brew)   printf 'brew install %s\n' "$1" ;;
        apt)    printf 'sudo apt-get install -y %s\n' "$1" ;;
        pacman) printf 'sudo pacman -S --needed --noconfirm %s\n' "$1" ;;
        dnf)    printf 'sudo dnf install -y %s\n' "$1" ;;
        zypper) printf 'sudo zypper install -y %s\n' "$1" ;;
        apk)    printf 'sudo apk add %s\n' "$1" ;;
        pkg)    printf 'sudo pkg install -y %s\n' "$1" ;;
        *)      return 1 ;;
    esac
}

sys_has() { command -v "$1" >/dev/null 2>&1; }

# sys_field <line> <n> -- nth pipe-separated field
sys_field() {
    printf '%s\n' "$1" | awk -F'|' -v n="$2" '{gsub(/^[ \t]+|[ \t]+$/, "", $n); print $n}'
}

sys_dry() { [ "${TERMINAL_DRY_RUN:-0}" = "1" ]; }

# sys_run <description> <command...> -- echo, confirm-free execution honouring dry-run
sys_run() {
    _desc=$1
    shift
    if sys_dry; then
        ui_note "dry-run: $*"
        return 0
    fi
    ui_info "$_desc"
    if "$@" >/dev/null 2>&1; then
        ui_ok "$_desc"
        return 0
    fi
    ui_err "failed: $_desc"
    return 1
}

# sys_place <url> <dest> -- download a file to dest, backing up anything already there
sys_place() {
    _url=$1
    _dest=$2
    _dir=$(dirname "$_dest")

    if ! net_exists "$_url"; then
        ui_err "source unavailable: $_url"
        return 1
    fi

    if sys_dry; then
        ui_note "dry-run: $_url -> $_dest"
        return 0
    fi

    [ -d "$_dir" ] || mkdir -p "$_dir" 2>/dev/null || {
        ui_err "cannot create $_dir"
        return 1
    }

    if [ -e "$_dest" ]; then
        _bak="$_dest.bak.$(date +%Y%m%d%H%M%S)"
        cp -R "$_dest" "$_bak" 2>/dev/null && ui_note "backed up -> $_bak"
    fi

    _tmp="$_dest.tui.$$"
    if net_download "$_url" "$_tmp" && [ -s "$_tmp" ]; then
        mv "$_tmp" "$_dest" && ui_ok "$_dest"
        return 0
    fi
    rm -f "$_tmp"
    ui_err "download failed: $_url"
    return 1
}

# sys_trim <string> -- trimmed result in $TRIMMED (no subshell, called per field)
sys_trim() {
    TRIMMED=$1
    TRIMMED=${TRIMMED#"${TRIMMED%%[![:space:]]*}"}
    TRIMMED=${TRIMMED%"${TRIMMED##*[![:space:]]}"}
}

# sys_expand_home <path> -- expand a leading ~ or $HOME without eval
sys_expand_home() {
    case "$1" in
        '$HOME'*) printf '%s%s\n' "$HOME" "${1#\$HOME}" ;;
        '~'*)     printf '%s%s\n' "$HOME" "${1#\~}" ;;
        *)        printf '%s\n' "$1" ;;
    esac
}

# sys_exec <command-string> -- run visibly with a real tty (sudo prompts work)
sys_exec() {
    if sys_dry; then
        ui_note "dry-run: $1"
        return 0
    fi
    printf '\n   %s$ %s%s\n\n' "$C_DIM" "$1" "$C_RESET"
    # Feed the command a real terminal so sudo can prompt -- our own stdin is
    # the piped script, which would make sudo fail instantly.
    if [ -c /dev/tty ] && (: < /dev/tty) 2>/dev/null; then
        _tty=/dev/tty
    else
        _tty=/dev/null
    fi
    if sh -c "$1" < "$_tty"; then
        printf '\n'
        ui_ok "completed"
        return 0
    fi
    printf '\n'
    ui_err "command failed"
    return 1
}

# sys_row <file> <name> -- the catalog line whose first field is <name>
sys_row() {
    awk -F'|' -v want="$2" '
        /^[[:space:]]*#/ { next }
        /^[[:space:]]*$/ { next }
        { name = $1; gsub(/^[ \t]+|[ \t]+$/, "", name)
          if (name == want) { print; exit } }
    ' "$1"
}
