#!/bin/sh
# terminal.d/modules/whoami.sh -- who and where you are, from this shell's view.

whoami_local_ip() {
    _ip=$(hostname -I 2>/dev/null | awk '{print $1}')
    case "$_ip" in '' | *[!0-9.]*) _ip='' ;; esac
    [ -z "$_ip" ] && _ip=$(ip -4 addr show scope global 2>/dev/null |
        awk '/inet /{print $2; exit}' | cut -d/ -f1)
    [ -z "$_ip" ] && _ip=$(ifconfig 2>/dev/null |
        awk '/inet / && $2 != "127.0.0.1" {print $2; exit}')
    printf '%s\n' "$_ip"
}

whoami_public_ip() {
    net_url https://ifconfig.me 2>/dev/null ||
        net_url https://api.ipify.org 2>/dev/null
}

whoami_main() {
    ui_banner
    whoami_report
    ui_pause
}

whoami_report() {
    ui_head "session"

    _u=$(whoami 2>/dev/null || printf '%s' "${USER:-unknown}")
    _h=${HOSTNAME:-$(hostname 2>/dev/null || printf 'unknown')}

    ui_kv "user"   "$_u"
    ui_kv "host"   "$_h"
    ui_kv "home"   "${HOME:-unknown}"
    ui_kv "shell"  "${SHELL:-unknown}"
    ui_kv "tty"    "$( { tty < /dev/tty; } 2>/dev/null || printf 'none')"
    ui_kv "pwd"    "$(pwd 2>/dev/null)"
    ui_kv "uptime" "$(uptime 2>/dev/null | sed 's/^ *//' || printf 'unknown')"

    ui_head "network"
    ui_info "resolving addresses..."

    _lan=$(whoami_local_ip)
    _wan=$(whoami_public_ip)
    [ -n "$_lan" ] || _lan='unknown'
    [ -n "$_wan" ] || _wan='unknown'

    printf '%s[1A%s[2K' "$ESC" "$ESC"
    ui_kv "local"  "$_lan"
    ui_kv "public" "$_wan"

    printf '\n'
    ui_note "none of this leaves your machine -- it is printed, not sent"
}
