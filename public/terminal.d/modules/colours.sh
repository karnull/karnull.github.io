#!/bin/sh
# terminal.d/modules/colours.sh -- does this terminal render the setup properly?

colours_main() {
    ui_banner
    colours_report
    ui_pause
}

colours_report() {
    ui_head "terminal check"

    ui_kv "TERM"      "${TERM:-unset}"
    ui_kv "COLORTERM" "${COLORTERM:-unset}"
    ui_kv "width"     "$(ui_cols) columns"

    ui_head "16 colours"
    printf '   '
    _i=0
    while [ "$_i" -lt 8 ]; do
        printf '%s[4%dm  %s' "$ESC" "$_i" "$C_RESET"
        _i=$((_i + 1))
    done
    printf '\n   '
    _i=0
    while [ "$_i" -lt 8 ]; do
        printf '%s[10%dm  %s' "$ESC" "$_i" "$C_RESET"
        _i=$((_i + 1))
    done
    printf '\n'

    ui_head "256 colours"
    printf '   '
    _i=16
    while [ "$_i" -lt 232 ]; do
        [ "$_i" -gt 16 ] && [ $(( (_i - 16) % 36 )) -eq 0 ] && printf '\n   '
        printf '%s[48;5;%dm %s' "$ESC" "$_i" "$C_RESET"
        _i=$((_i + 1))
    done
    printf '\n'

    ui_head "truecolor"
    printf '   '
    _i=0
    while [ "$_i" -lt 72 ]; do
        _r=$(( 255 - _i * 255 / 72 ))
        _g=$(( _i * 510 / 72 ))
        [ "$_g" -gt 255 ] && _g=$(( 510 - _g ))
        _b=$(( _i * 255 / 72 ))
        printf '%s[48;2;%d;%d;%dm %s' "$ESC" "$_r" "$_g" "$_b" "$C_RESET"
        _i=$((_i + 1))
    done
    printf '\n'
    ui_note "one smooth gradient above means truecolor works"

    ui_head "attributes"
    printf '   %sbold%s  %sdim%s  %sitalic%s  %sunderline%s  %sreverse%s  %sstrike%s\n' \
        "${ESC}[1m" "$C_RESET" "${ESC}[2m" "$C_RESET" "${ESC}[3m" "$C_RESET" \
        "${ESC}[4m" "$C_RESET" "${ESC}[7m" "$C_RESET" "${ESC}[9m" "$C_RESET"

    ui_head "nerd font"
    printf '            \n'
    ui_note "boxes or blanks above mean the font has no nerd-font glyphs"
    ui_note "re-run with TERMINAL_ASCII=1 for a plain-ASCII interface"

}
