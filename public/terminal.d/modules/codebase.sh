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

codebase_main() {
    _f=$(net_data codebase) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    while :; do
        ui_banner
        ui_head "codebase"
        ui_note "mirrors $TUI_BASE/codebase"
        printf '\n'

        # One heading per kind, emitted when the kind changes. The catalog
        # keeps each group's rows together, so a single pass is enough.
        set --
        _seen=''
        while IFS='|' read -r _n _kind _year _url _desc; do
            case "$_n" in '' | \#*) continue ;; esac
            sys_trim "$_n";    _n=$TRIMMED
            sys_trim "$_kind"; _kind=$TRIMMED
            sys_trim "$_year"; _year=$TRIMMED
            sys_trim "$_desc"; _desc=$TRIMMED
            if [ "$_kind" != "$_seen" ]; then
                set -- "$@" "--|$_kind|"
                _seen=$_kind
            fi
            set -- "$@" "$_n|$_n|$_year  $_desc"
        done < "$_f"

        set -- "$@" "__back|back|"

        ui_menu "enter open . q back" "$@" || return 0
        [ "$MENU_CHOICE" = "__back" ] && return 0
        codebase_detail "$_f" "$MENU_CHOICE"
    done
}

codebase_detail() {
    _line=$(sys_row "$1" "$2")
    [ -z "$_line" ] && return 1
    _kind=$(sys_field "$_line" 2)
    _year=$(sys_field "$_line" 3)
    _url=$(sys_field "$_line" 4)
    _desc=$(sys_field "$_line" 5)

    while :; do
        ui_banner
        ui_head "codebase / $2"
        ui_kv "kind" "$_kind"
        ui_kv "year" "$_year"
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
