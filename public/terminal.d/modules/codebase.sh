#!/bin/sh
# terminal.d/modules/codebase.sh -- browse the work, open it, clone it.

codebase_open() {
    if sys_has open; then
        open "$1" >/dev/null 2>&1 && return 0
    elif sys_has xdg-open; then
        xdg-open "$1" >/dev/null 2>&1 && return 0
    fi
    return 1
}

# codebase_rows <file> <columns> -- one menu row per project, each description
# clipped to a single screen line: a wrapped row throws off the menu's redraw.
codebase_rows() {
    awk -F'|' -v cols="$2" '
        /^[[:space:]]*#/ || /^[[:space:]]*$/ { next }
        { for (i = 1; i <= NF; i++) gsub(/^[ \t]+|[ \t]+$/, "", $i) }
        $2 != "projects" { next }
        { label = length($1) > 16 ? length($1) : 16
          room = cols - 7 - label
          desc = $3 "  " $6
          if (room < 8) desc = $3
          else if (length(desc) > room) desc = substr(desc, 1, room - 3) "..."
          print $1 "|" $1 "|" desc }
    ' "$1"
}

codebase_main() {
    _f=$(net_data codebase) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    while :; do
        ui_banner
        ui_head "codebase"
        ui_note "mirrors $TUI_BASE/codebase"
        printf '\n'

        set -- "--|projects|"
        while IFS= read -r _row; do
            set -- "$@" "$_row"
        done <<ROWS
$(codebase_rows "$_f" "$(ui_cols)")
ROWS

        set -- "$@" "__back|back|"

        ui_menu "enter open . q back" "$@" || return 0
        [ "$MENU_CHOICE" = "__back" ] && return 0
        codebase_detail "$_f" "$MENU_CHOICE"
    done
}

codebase_detail() {
    _line=$(sys_row "$1" "$2")
    [ -z "$_line" ] && return 1
    _year=$(sys_field "$_line" 3)
    _url=$(sys_field "$_line" 4)
    _tags=$(sys_field "$_line" 5)
    _desc=$(sys_field "$_line" 6)

    while :; do
        ui_banner
        ui_head "codebase / $2"
        ui_kv "year" "$_year"
        ui_kv "tags" "$_tags"
        ui_kv "url"  "$_url"
        printf '\n   %s%s%s\n\n' "$C_WHITE" "$_desc" "$C_RESET"

        ui_menu "enter select . q back" \
            "open|open|open in your browser" \
            "clone|clone|git clone into $(pwd)" \
            "back|back|" || return 0

        case "$MENU_CHOICE" in
            open)
                if codebase_open "$_url"; then
                    ui_ok "opened"
                else
                    ui_warn "no browser opener here -- the url is above"
                fi
                ui_pause
                ;;
            clone)
                if ! sys_has git; then
                    ui_err "git is not installed"
                    ui_pause
                    continue
                fi
                if ui_confirm "git clone $_url into $(pwd)?"; then
                    sys_exec "git clone $_url"
                fi
                ui_pause
                ;;
            *) return 0 ;;
        esac
    done
}
