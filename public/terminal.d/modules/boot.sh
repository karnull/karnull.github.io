#!/bin/sh
# terminal.d/modules/boot.sh -- the jack-in sequence before the first menu.
# Any key skips it. TERMINAL_QUICK=1 leaves it out altogether.

BOOT_SKIPPED=0

# boot_tick <tenths> -- wait, watching for a key. Returns 1 once one is pressed.
# min 0 with a timeout makes dd the clock: it returns on a byte or on time.
boot_tick() {
    [ "$BOOT_SKIPPED" -eq 1 ] && return 1
    { stty -icanon -echo min 0 time "$1" < /dev/tty; } 2>/dev/null
    _b=$(ui_getbyte)
    [ -z "$_b" ] && return 0
    BOOT_SKIPPED=1
    return 1
}

# An arrow key is three bytes; leave none of them for the menu to act on.
boot_drain() {
    { stty -icanon -echo min 0 time 0 < /dev/tty; } 2>/dev/null
    while [ -n "$(ui_getbyte)" ]; do :; done
}

boot_type() {
    _s=$1
    while [ -n "$_s" ]; do
        _c=${_s%"${_s#?}"}
        _s=${_s#?}
        printf '%s' "$_c"
        boot_tick 1 || return 1
    done
}

boot_erase() {
    _n=$1
    while [ "$_n" -gt 0 ]; do
        printf '\b \b'
        boot_tick 1 || return 1
        _n=$((_n - 1))
    done
}

# boot_step <label> <status> -- dots fill in while the "work" happens.
boot_step() {
    printf '   %s>>%s %-34s' "$C_DIM" "$C_RESET" "$1"
    for _d in 1 2 3 4; do
        printf '%s..%s' "$C_DIM" "$C_RESET"
        boot_tick 1 || return 1
    done
    printf ' %s%s%s\n' "$C_GREEN" "$2" "$C_RESET"
}

# The one step that fights back: flags ICE, holds, then gets through.
boot_step_ice() {
    printf '   %s>>%s %-34s' "$C_DIM" "$C_RESET" "$1"
    for _d in 1 2 3; do
        printf '%s..%s' "$C_DIM" "$C_RESET"
        boot_tick 1 || return 1
    done
    printf ' %s%sICE DETECTED%s' "$C_RED" "$C_BOLD" "$C_RESET"
    boot_tick 6 || return 1
    printf '\r%s[2K   %s>>%s %-34s%s........%s %s%s%s\n' \
        "$ESC" "$C_DIM" "$C_RESET" "$1" "$C_DIM" "$C_RESET" "$C_GREEN" "$2" "$C_RESET"
}

boot_sequence() {
    ui_clear
    ui_rule
    printf '\n   %s[ jack-in ]%s %skarsh.page/terminal %s%s\n\n' \
        "$C_GREEN" "$C_RESET" "$C_DIM" "$TUI_VERSION" "$C_RESET"
    boot_tick 3 || return 1

    boot_step "opening uplink" "ok" || return 1
    boot_step "routing $(uname -s 2>/dev/null) -> karsh.page" "ok" || return 1
    boot_step_ice "slipping past the black wall" "bypassed" || return 1
    boot_step "syncing neural link" "synced" || return 1

    printf '\n   %s$ whoami%s\n   %s%s' "$C_DIM" "$C_RESET" "$C_GREEN" "$C_BOLD"
    boot_tick 4 || return 1
    boot_type "Karnull" || return 1
    boot_tick 8 || return 1
    boot_erase 4 || return 1
    boot_type "sh" || return 1
    printf '%s\n' "$C_RESET"
    boot_tick 10 || return 1
}

boot_main() {
    ui_raw_on || return 0
    ui_hide_cursor
    boot_sequence || boot_drain
    printf '%s' "$C_RESET"
    ui_raw_off
}
