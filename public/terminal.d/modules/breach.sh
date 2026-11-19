#!/bin/sh
# terminal.d/modules/breach.sh -- breach protocol, a netrunning puzzle.
#
# Pick codes from the matrix into the buffer, alternating between the lit row
# and the lit column, starting on the top row. A daemon uploads once its
# sequence sits unbroken in the buffer. Every puzzle is cut from a real path
# through the matrix, so all three daemons can always go up together.
#
# No arrays in POSIX sh, so cells live in B_C_<row>_<col> and B_U_<row>_<col>.

BREACH_SIZE=5
BREACH_BUFFER=6
BREACH_NAMES='datamine icepick black_ice'

# breach_generate -- shell assignments for a fresh, solvable puzzle.
breach_generate() {
    _seed=$(od -An -N4 -tu4 /dev/urandom 2>/dev/null | tr -dc '0-9')
    awk -v seed="${_seed:-$$}" -v n="$BREACH_SIZE" -v len="$BREACH_BUFFER" '
        function pick(k) { return int(rand() * k) }
        BEGIN {
            srand(seed)
            split("1C 55 BD E9 7A", codes, " ")
            for (r = 0; r < n; r++)
                for (c = 0; c < n; c++) {
                    cell[r, c] = codes[pick(5) + 1]
                    printf "B_C_%d_%d=%s\n", r, c, cell[r, c]
                }

            # Walk a legal path: row 0, then column, row, column...
            do {
                delete used
                r = 0; c = pick(n); ok = 1
                used[r, c] = 1; path[1] = cell[r, c]
                for (i = 2; i <= len && ok; i++) {
                    for (try = 0; try < 50; try++) {
                        if (i % 2 == 0) { nr = pick(n); nc = c } else { nr = r; nc = pick(n) }
                        if (!((nr, nc) in used)) break
                    }
                    if ((nr, nc) in used) { ok = 0; break }
                    r = nr; c = nc; used[r, c] = 1; path[i] = cell[r, c]
                }
            } while (!ok)

            # Daemons of length 2, 3 and 4, each a slice of that path.
            for (d = 1; d <= 3; d++) {
                size = d + 1
                start = pick(len - size + 1) + 1
                seq = path[start]
                for (i = start + 1; i < start + size; i++) seq = seq " " path[i]
                printf "B_D_%d=\"%s\"\n", d, seq
            }
        }
    '
}

breach_reset() {
    eval "$(breach_generate)"
    _r=0
    while [ "$_r" -lt "$BREACH_SIZE" ]; do
        _c=0
        while [ "$_c" -lt "$BREACH_SIZE" ]; do
            eval "B_U_${_r}_${_c}=0"
            _c=$((_c + 1))
        done
        _r=$((_r + 1))
    done
    B_BUF=''
    B_COUNT=0
    B_MODE=row
    B_LINE=0
    B_CUR=0
}

breach_cell() { eval "printf '%s' \"\$B_C_${1}_${2}\""; }
breach_used() { eval "[ \"\$B_U_${1}_${2}\" = 1 ]"; }

# The cell under the cursor, as "row col".
breach_at() {
    if [ "$B_MODE" = row ]; then printf '%s %s' "$B_LINE" "$B_CUR"
    else printf '%s %s' "$B_CUR" "$B_LINE"; fi
}

breach_uploaded() {
    eval "_seq=\$B_D_$1"
    case " $B_BUF " in *" $_seq "*) return 0 ;; esac
    return 1
}

breach_all_uploaded() {
    breach_uploaded 1 && breach_uploaded 2 && breach_uploaded 3
}

breach_line_open() {
    _i=0
    while [ "$_i" -lt "$BREACH_SIZE" ]; do
        if [ "$B_MODE" = row ]; then breach_used "$B_LINE" "$_i" || return 0
        else breach_used "$_i" "$B_LINE" || return 0; fi
        _i=$((_i + 1))
    done
    return 1
}

# Redraws in place over the last frame rather than clearing: within a round
# no line ever gets shorter, so nothing stale is left behind.
breach_draw() {
    _frame=$(breach_frame)
    printf '%s[H%s\n%s[J' "$ESC" "$_frame" "$ESC"
}

breach_frame() {
    ui_rule
    ui_head "breach protocol"

    printf '   %sbuffer%s  ' "$C_DIM" "$C_RESET"
    set -- $B_BUF
    _i=0
    while [ "$_i" -lt "$BREACH_BUFFER" ]; do
        if [ $# -gt 0 ]; then
            printf '%s[%s]%s ' "$C_YELLOW" "$1" "$C_RESET"
            shift
        else
            printf '%s[  ]%s ' "$C_DIM" "$C_RESET"
        fi
        _i=$((_i + 1))
    done
    printf '\n\n'

    _at=$(breach_at)
    _r=0
    while [ "$_r" -lt "$BREACH_SIZE" ]; do
        printf '   '
        _c=0
        while [ "$_c" -lt "$BREACH_SIZE" ]; do
            _lit=0
            [ "$B_MODE" = row ] && [ "$_r" -eq "$B_LINE" ] && _lit=1
            [ "$B_MODE" = col ] && [ "$_c" -eq "$B_LINE" ] && _lit=1
            if breach_used "$_r" "$_c"; then
                _txt='--'
            else
                _txt=$(breach_cell "$_r" "$_c")
            fi
            if [ "$_at" = "$_r $_c" ] && [ "$B_DONE" -eq 0 ]; then
                printf '%s%s[7m %s %s ' "$C_GREEN" "$ESC" "$_txt" "$C_RESET"
            elif [ "$_lit" -eq 1 ] && [ "$B_DONE" -eq 0 ]; then
                printf '%s%s %s %s ' "$C_BOLD" "$C_WHITE" "$_txt" "$C_RESET"
            else
                printf '%s %s %s ' "$C_DIM" "$_txt" "$C_RESET"
            fi
            _c=$((_c + 1))
        done
        printf '\n\n'
        _r=$((_r + 1))
    done

    printf '   %sdaemons%s\n' "$C_DIM" "$C_RESET"
    _d=1
    for _name in $BREACH_NAMES; do
        eval "_seq=\$B_D_$_d"
        if breach_uploaded "$_d"; then
            _state="${C_GREEN}uploaded${C_RESET}"
        elif [ "$B_DONE" -eq 1 ]; then
            _state="${C_RED}failed${C_RESET}"
        else
            _state=''
        fi
        printf '     %-10s %s%-12s%s %s\n' "$_name" "$C_CYAN" "$_seq" "$C_RESET" "$_state"
        _d=$((_d + 1))
    done
}

breach_verdict() {
    _n=0
    for _d in 1 2 3; do breach_uploaded "$_d" && _n=$((_n + 1)); done
    printf '\n'
    case "$_n" in
        3) ui_ok "full breach. the access point is yours." ;;
        2) ui_ok "two daemons up. quietly impressive." ;;
        1) ui_warn "one daemon up. the ICE noticed you." ;;
        *) ui_err "breach failed. nothing went up, and they know your name." ;;
    esac
    printf '\n'
}

breach_pick() {
    set -- $(breach_at)
    breach_used "$1" "$2" && return 1
    eval "B_U_${1}_${2}=1"
    B_BUF="${B_BUF:+$B_BUF }$(breach_cell "$1" "$2")"
    B_COUNT=$((B_COUNT + 1))
    if [ "$B_MODE" = row ]; then
        B_MODE=col; B_LINE=$2; B_CUR=$1
    else
        B_MODE=row; B_LINE=$1; B_CUR=$2
    fi
}

breach_move() {
    B_CUR=$((B_CUR + $1))
    [ "$B_CUR" -lt 0 ] && B_CUR=$((BREACH_SIZE - 1))
    [ "$B_CUR" -ge "$BREACH_SIZE" ] && B_CUR=0
}

breach_round() {
    breach_reset
    B_DONE=0
    ui_clear
    ui_hide_cursor
    ui_raw_on
    while :; do
        breach_draw
        printf '\n   %sarrows or hjkl move along the lit line . enter pick . q jack out%s\n' \
            "$C_DIM" "$C_RESET"
        _k=$(ui_key)
        case "$B_MODE:$_k" in
            row:left | row:hex:68 | col:up)     breach_move -1 ;;
            row:right | row:hex:6c | col:down)  breach_move 1 ;;
            *:enter | *:space)                  breach_pick || continue ;;
            *:quit | *:back)                    ui_raw_off; ui_show_cursor; return 1 ;;
            *)                                  continue ;;
        esac
        if breach_all_uploaded || [ "$B_COUNT" -ge "$BREACH_BUFFER" ] || ! breach_line_open; then
            B_DONE=1
            breach_draw
            breach_verdict
            ui_raw_off
            ui_show_cursor
            return 0
        fi
    done
}

breach_main() {
    while :; do
        breach_round || return 0
        ui_menu "enter select . q back" \
            "again|again|a fresh access point" \
            "back|back|" || return 0
        [ "$MENU_CHOICE" = "again" ] || return 0
    done
}
