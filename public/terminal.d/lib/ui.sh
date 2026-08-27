#!/bin/sh
# terminal.d/lib/ui.sh -- drawing, colours, input, menus.
# POSIX sh only. No bashisms, no arrays.

ESC=$(printf '\033')

C_RESET="${ESC}[0m"
C_BOLD="${ESC}[1m"
C_DIM="${ESC}[2m"
C_RED="${ESC}[31m"
C_GREEN="${ESC}[32m"
C_YELLOW="${ESC}[33m"
C_BLUE="${ESC}[34m"
C_MAGENTA="${ESC}[35m"
C_CYAN="${ESC}[36m"
C_WHITE="${ESC}[37m"

# Nerd-font block glyph, overridable for plain terminals: TERMINAL_ASCII=1
if [ "${TERMINAL_ASCII:-0}" = "1" ]; then
    UI_BLOCK='###'
else
    UI_BLOCK='󰝤󰝤󰝤'
fi

ui_cols() {
    _c=$( { stty size < /dev/tty; } 2>/dev/null | awk '{print $2}')
    [ -z "$_c" ] && _c=$(tput cols 2>/dev/null)
    [ -z "$_c" ] && _c=80
    printf '%s\n' "$_c"
}

ui_clear()        { printf '%s[2J%s[H' "$ESC" "$ESC"; }
ui_hide_cursor()  { printf '%s[?25l' "$ESC"; }
ui_show_cursor()  { printf '%s[?25h' "$ESC"; }

#- rule ---------------------------------------------------------------------

# Two-tone: red against 39m, the terminal's own default foreground. That
# lands white on a dark theme and black on a light one without us having to
# ask which theme is in use -- the terminal already knows.
ui_rule() {
    _i=0
    while [ "$_i" -lt 3 ]; do
        printf '%s%s %s%s %s%s %s%s %s%s %s%s %s%s %s%s ' \
            "${ESC}[31m" "$UI_BLOCK" "${ESC}[39m" "$UI_BLOCK" \
            "${ESC}[31m" "$UI_BLOCK" "${ESC}[39m" "$UI_BLOCK" \
            "${ESC}[31m" "$UI_BLOCK" "${ESC}[39m" "$UI_BLOCK" \
            "${ESC}[31m" "$UI_BLOCK" "${ESC}[39m" "$UI_BLOCK"
        _i=$((_i + 1))
    done
    printf '%s\n' "$C_RESET"
}

ui_art() {
    cat <<'ART'
    _                         _
   | | ____ _ _ __ _ __   ___| |_
   | |/ / _` | '__| '_ \ / _ \ __|
   |   < (_| | |  | | | |  __/ |_
   |_|\_\__,_|_|  |_| |_|\___|\__|

ART
}

UI_TAGLINE='// wake the machine . www.karsh.page'

ui_banner() {
    ui_clear
    ui_rule
    printf '%s' "$C_GREEN"
    ui_art
    printf '%s' "$C_RESET"
    printf '   %s%s%s\n' "$C_DIM" "$UI_TAGLINE" "$C_RESET"
    ui_rule
}

#- text helpers -------------------------------------------------------------

ui_head() { printf '\n%s%s:: %s%s\n\n' "$C_BOLD" "$C_GREEN" "$1" "$C_RESET"; }
ui_kv()   { printf '   %s%-16s%s %s\n' "$C_DIM" "$1" "$C_RESET" "$2"; }
ui_ok()   { printf '   %s[ok]%s   %s\n' "$C_GREEN" "$C_RESET" "$1"; }
ui_warn() { printf '   %s[!!]%s   %s\n' "$C_YELLOW" "$C_RESET" "$1"; }
ui_err()  { printf '   %s[xx]%s   %s\n' "$C_RED" "$C_RESET" "$1"; }
ui_info() { printf '   %s[..]%s   %s\n' "$C_BLUE" "$C_RESET" "$1"; }
ui_note() { printf '   %s%s%s\n' "$C_DIM" "$1" "$C_RESET"; }

# Set UI_NOPAUSE=1 where there is no screen to hold -- the REPL, for one,
# where a stray keypress would be eaten from the next command line.
UI_NOPAUSE=0

ui_pause() {
    [ "${UI_NOPAUSE:-0}" = "1" ] && { printf '\n'; return 0; }
    printf '\n   %spress any key to return%s' "$C_DIM" "$C_RESET"
    ui_key >/dev/null
    printf '\n'
}

ui_confirm() {
    ui_raw_off
    printf '\n   %s%s [y/N]%s ' "$C_YELLOW" "$1" "$C_RESET"
    { IFS= read -r _a < /dev/tty; } 2>/dev/null || return 1
    case "$_a" in
        y | Y | yes | YES) return 0 ;;
        *) return 1 ;;
    esac
}

ui_prompt() {
    # ui_prompt "label" -> answer on stdout
    ui_raw_off
    { printf '   %s%s%s ' "$C_YELLOW" "$1" "$C_RESET" > /dev/tty; } 2>/dev/null
    { IFS= read -r _r < /dev/tty; } 2>/dev/null || return 1
    printf '%s\n' "$_r"
}

#- input --------------------------------------------------------------------
#
# The tty is put into character-at-a-time mode for as long as a menu is open,
# not just for the duration of one read. Flipping back to canonical mode
# between keypresses would park anything typed during a redraw in the line
# buffer, where it sits until the user hits return -- keys look dropped.
#
# -icanon -echo rather than raw: output post-processing stays on (so \n still
# returns the carriage) and ^C still raises SIGINT.

UI_RAW=0
UI_STTY_SAVED=''

ui_raw_on() {
    [ "$UI_RAW" -eq 1 ] && return 0
    UI_STTY_SAVED=$( { stty -g < /dev/tty; } 2>/dev/null )
    [ -z "$UI_STTY_SAVED" ] && return 1
    { stty -icanon -echo min 1 time 0 < /dev/tty; } 2>/dev/null || return 1
    UI_RAW=1
    return 0
}

ui_raw_off() {
    [ "$UI_RAW" -eq 0 ] && return 0
    { stty "$UI_STTY_SAVED" < /dev/tty; } 2>/dev/null
    UI_RAW=0
    return 0
}

ui_getbyte() {
    { dd bs=1 count=1 < /dev/tty; } 2>/dev/null | od -An -tx1 | tr -dc '0-9a-fA-F'
}

# ui_key -> up|down|left|right|enter|space|quit|back|hex:<xx>
ui_key() {
    _own=0
    if [ "$UI_RAW" -eq 0 ]; then
        if ui_raw_on; then
            _own=1
        else
            # No usable tty controls: fall back to reading whole lines.
            { IFS= read -r _line < /dev/tty; } 2>/dev/null || { printf 'quit\n'; return 0; }
            case "$_line" in
                '')     printf 'enter\n' ;;
                j | J)  printf 'down\n' ;;
                k | K)  printf 'up\n' ;;
                q | Q)  printf 'quit\n' ;;
                *)      printf 'hex:00\n' ;;
            esac
            return 0
        fi
    fi

    _b=$(ui_getbyte)
    _out=''

    if [ "$_b" = "1b" ]; then
        # Escape sequence. Read it one byte at a time and stop at the final
        # byte: gulping a fixed-size chunk would eat the sequences behind it,
        # so holding an arrow key down would only ever move one row.
        # min 0 time 1 keeps a lone ESC from blocking.
        { stty -icanon -echo min 0 time 1 < /dev/tty; } 2>/dev/null
        case "$(ui_getbyte)" in
            5b | 4f)
                _f=$(ui_getbyte)
                # 0x30-0x3f are parameter bytes (digits, ';'); skip past them.
                while :; do
                    case "$_f" in
                        3[0-9a-fA-F]) _f=$(ui_getbyte) ;;
                        *) break ;;
                    esac
                done
                case "$_f" in
                    41) _out=up ;;
                    42) _out=down ;;
                    43) _out=right ;;
                    44) _out=left ;;
                    *)  _out=other ;;
                esac
                ;;
            '') _out=back ;;
            *)  _out=other ;;
        esac
        { stty -icanon -echo min 1 time 0 < /dev/tty; } 2>/dev/null
    else
        case "$_b" in
            0d | 0a) _out=enter ;;
            20)      _out=space ;;
            6a | 4a) _out=down ;;
            6b | 4b) _out=up ;;
            71 | 51) _out=quit ;;
            03 | 04) _out=quit ;;
            7f | 08) _out=back ;;
            '')      _out=quit ;;
            *)       _out="hex:$_b" ;;
        esac
    fi

    [ "$_own" -eq 1 ] && ui_raw_off
    printf '%s\n' "$_out"
}

#- menu ---------------------------------------------------------------------
# ui_menu "hint" "key|label|description" ...
# Sets MENU_CHOICE. Returns 1 if the user quit.
#
# A row whose key begins with "--" is a heading rather than a choice: drawn
# dim, given a blank line above it, and stepped over by the cursor. Number
# shortcuts count only the rows you can land on, so adding a heading never
# renumbers the entries underneath it.

ui_menu() {
    _hint=$1
    shift
    MENU_CHOICE=''
    _n=$#
    [ "$_n" -eq 0 ] && return 1

    # Open on the first real entry -- a menu that starts with a heading would
    # otherwise come up with the cursor parked on something inert.
    _sel=1
    while [ "$_sel" -le "$_n" ] && _ui_menu_sep "$_sel" "$@"; do
        _sel=$((_sel + 1))
    done
    [ "$_sel" -gt "$_n" ] && return 1

    # Character mode first: drawing with echo still on lets a stray keypress
    # scribble across the menu.
    ui_raw_on
    ui_hide_cursor
    _ui_menu_draw "$_sel" "$@"
    printf '\n   %s%s%s\n' "$C_DIM" "$_hint" "$C_RESET"

    while :; do
        _k=$(ui_key)
        case "$_k" in
            up)
                _guard=0
                while [ "$_guard" -lt "$_n" ]; do
                    _sel=$((_sel - 1)); [ "$_sel" -lt 1 ] && _sel=$_n
                    _ui_menu_sep "$_sel" "$@" || break
                    _guard=$((_guard + 1))
                done
                ;;
            down)
                _guard=0
                while [ "$_guard" -lt "$_n" ]; do
                    _sel=$((_sel + 1)); [ "$_sel" -gt "$_n" ] && _sel=1
                    _ui_menu_sep "$_sel" "$@" || break
                    _guard=$((_guard + 1))
                done
                ;;
            enter | right | space)
                ui_raw_off
                ui_show_cursor
                MENU_CHOICE=$(_ui_menu_key "$_sel" "$@")
                return 0
                ;;
            quit | back | left)
                ui_raw_off
                ui_show_cursor
                MENU_CHOICE='quit'
                return 1
                ;;
            hex:*)
                # Number keys jump straight to an entry.
                case "$_k" in
                    hex:31) _j=1 ;; hex:32) _j=2 ;; hex:33) _j=3 ;;
                    hex:34) _j=4 ;; hex:35) _j=5 ;; hex:36) _j=6 ;;
                    hex:37) _j=7 ;; hex:38) _j=8 ;; hex:39) _j=9 ;;
                    *) _j=0 ;;
                esac
                # Count past the headings: "3" means the third thing you could
                # pick, not the third row drawn.
                if [ "$_j" -ge 1 ]; then
                    _c=0
                    _t=0
                    while [ "$_t" -lt "$_n" ]; do
                        _t=$((_t + 1))
                        _ui_menu_sep "$_t" "$@" && continue
                        _c=$((_c + 1))
                        [ "$_c" -eq "$_j" ] && break
                    done
                    if [ "$_c" -eq "$_j" ]; then
                        ui_raw_off
                        ui_show_cursor
                        MENU_CHOICE=$(_ui_menu_key "$_t" "$@")
                        return 0
                    fi
                fi
                continue
                ;;
            *) continue ;;
        esac
        # Redraw in place. Headings cost two rows apiece, so the height is
        # whatever _ui_menu_draw actually printed (MENU_LINES) plus the blank
        # and the hint below it. Move up by anything less and each redraw
        # lands a row low, walking the menu down the screen and leaving a copy
        # of the top line behind.
        printf '%s[%dA' "$ESC" "$((MENU_LINES + 2))"
        _ui_menu_draw "$_sel" "$@"
        printf '%s[2K\n%s[2K   %s%s%s\n' "$ESC" "$ESC" "$C_DIM" "$_hint" "$C_RESET"
    done
}

# Sets MENU_LINES to the number of rows printed, which is not the number of
# items once headings are in play.
_ui_menu_draw() {
    _s=$1
    shift
    _i=1
    MENU_LINES=0
    for _item in "$@"; do
        _k=${_item%%|*}
        _rest=${_item#*|}
        _label=${_rest%%|*}
        _desc=${_rest#*|}
        [ "$_desc" = "$_rest" ] && _desc=''
        case "$_k" in
            --*)
                # Blank line above every heading but the first, so the groups
                # read as groups without the caller padding the list.
                if [ "$_i" -gt 1 ]; then
                    printf '%s[2K\n' "$ESC"
                    MENU_LINES=$((MENU_LINES + 1))
                fi
                printf '%s[2K   %s%s%s\n' "$ESC" "$C_DIM" "$_label" "$C_RESET"
                ;;
            *)
                printf '%s[2K' "$ESC"
                if [ "$_i" -eq "$_s" ]; then
                    printf '   %s%s> %-16s%s %s%s%s\n' \
                        "$C_GREEN" "$C_BOLD" "$_label" "$C_RESET" "$C_WHITE" "$_desc" "$C_RESET"
                else
                    printf '     %s%-16s%s %s%s%s\n' \
                        "$C_RESET" "$_label" "$C_RESET" "$C_DIM" "$_desc" "$C_RESET"
                fi
                ;;
        esac
        MENU_LINES=$((MENU_LINES + 1))
        _i=$((_i + 1))
    done
    printf '%s[2K\n' "$ESC"
    MENU_LINES=$((MENU_LINES + 1))
}

# _ui_menu_sep <index> item... -- true when that row is a heading
_ui_menu_sep() {
    _si=$1
    shift
    _i=1
    for _item in "$@"; do
        if [ "$_i" -eq "$_si" ]; then
            case "$_item" in
                --*) return 0 ;;
                *)   return 1 ;;
            esac
        fi
        _i=$((_i + 1))
    done
    return 1
}

_ui_menu_key() {
    _s=$1
    shift
    _i=1
    for _item in "$@"; do
        if [ "$_i" -eq "$_s" ]; then
            printf '%s\n' "${_item%%|*}"
            return 0
        fi
        _i=$((_i + 1))
    done
}
