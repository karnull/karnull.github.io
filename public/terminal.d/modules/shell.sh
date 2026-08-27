#!/bin/sh
# terminal.d/modules/shell.sh -- the command REPL, for people who would rather type.
#
# Everything the menus do is reachable from here. Returns to the menu on
# "menu"; sets TUI_EXIT=1 on "quit" so the caller tears the session down.

shell_help() {
    cat <<'HELP'
   general
     help                        this list
     menu                        back to the menu interface
     clear                       redraw the banner
     quit                        leave

   inspect
     whoami                      session, host and network
     doctor                      toolchain report for this host
     card                        contact card and PGP fingerprint
     colours                     terminal colour and font check

   list
     list tools                  packages the dotfiles expect
     list configs                per-tool configuration files
     list scripts                standalone scripts
     list projects               the codebase

   install
     install tools <name ...>    install packages
     install configs <name ...>  write configuration files
     install scripts <name ...>  fetch scripts into ~/.local/bin
     install                     open the install menu

   flags
     TERMINAL_DRY_RUN=1          print actions instead of running them
     TERMINAL_ASCII=1            plain ASCII, no nerd-font glyphs
HELP
}

shell_list() {
    case "${1:-}" in
        tool | tools)
            net_module install && install_cmd tools
            ;;
        config | configs)
            net_module install && install_cmd configs
            ;;
        script | scripts)
            net_module install && install_cmd scripts
            ;;
        project | projects | code | codebase)
            _f=$(net_data codebase) || { ui_err "catalog unavailable"; return 1; }
            ui_head "codebase"
            _seen=''
            while IFS='|' read -r _n _kind _year _url _desc; do
                case "$_n" in '' | \#*) continue ;; esac
                sys_trim "$_n";    _n=$TRIMMED
                sys_trim "$_kind"; _kind=$TRIMMED
                sys_trim "$_year"; _year=$TRIMMED
                sys_trim "$_url";  _url=$TRIMMED
                if [ "$_kind" != "$_seen" ]; then
                    printf '\n   %s%s%s\n' "$C_DIM" "$_kind" "$C_RESET"
                    _seen=$_kind
                fi
                printf '     %s%-17s%s %s%s%s  %s\n' \
                    "$C_GREEN" "$_n" "$C_RESET" "$C_DIM" "$_year" "$C_RESET" "$_url"
            done < "$_f"
            ;;
        '')
            ui_err "usage: list <tools|configs|scripts|projects>"
            ;;
        *)
            ui_err "unknown catalog: $1"
            ui_note "try: tools, configs, scripts, projects"
            ;;
    esac
}

shell_main() {
    ui_banner
    ui_head "shell"
    ui_note "help for commands . menu for the menu . quit to leave"

    # Inline output here, not full screens waiting on a keypress.
    UI_NOPAUSE=1

    while :; do
        printf '\n%s> %s' "$C_YELLOW" "$C_GREEN"
        { IFS= read -r _input < /dev/tty; } 2>/dev/null || { UI_NOPAUSE=0; TUI_EXIT=1; return 0; }
        printf '%s' "$C_RESET"

        # Word splitting is what we want here.
        # shellcheck disable=SC2086
        set -- $_input
        _cmd=${1:-}
        [ $# -gt 0 ] && shift

        case "$_cmd" in
            '') ;;

            hi | hello | hey)
                printf '   hello there :)\n'
                ;;

            help | \? | h)
                printf '\n'
                shell_help
                ;;

            menu | tui)
                UI_NOPAUSE=0
                return 0
                ;;

            clear | cls)
                ui_banner
                ;;

            whoami | me)
                net_module whoami && whoami_report
                ;;

            doctor | check | probe)
                net_module doctor && doctor_report
                ;;

            card | contact | about)
                net_module card && card_report
                ;;

            colours | colors)
                net_module colours && colours_report
                ;;

            list | ls)
                shell_list "$@"
                ;;

            install | add | get)
                if [ $# -eq 0 ]; then
                    UI_NOPAUSE=0
                    net_module install && install_main
                    UI_NOPAUSE=1
                    ui_banner
                    ui_head "shell"
                else
                    net_module install && install_cmd "$@"
                fi
                ;;

            open)
                net_module codebase || continue
                if [ $# -eq 0 ]; then
                    UI_NOPAUSE=0
                    codebase_main
                    UI_NOPAUSE=1
                    ui_banner
                    ui_head "shell"
                else
                    _f=$(net_data codebase) && codebase_detail "$_f" "$1"
                fi
                ;;

            x | q | quit | exit)
                UI_NOPAUSE=0
                TUI_EXIT=1
                return 0
                ;;

            *)
                ui_err "unknown command: $_cmd"
                ui_note "type help"
                ;;
        esac
    done
}
