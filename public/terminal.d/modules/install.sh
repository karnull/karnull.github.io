#!/bin/sh
# terminal.d/modules/install.sh -- everything that puts files on this machine.
#
# Three catalogs, all data-driven:
#   tools    packages, via whatever package manager the host has
#   configs  dotfiles, backed up before they are overwritten
#   scripts  standalone scripts into ~/.local/bin

INSTALL_BIN="${TERMINAL_BIN_DIR:-$HOME/.local/bin}"

install_main() {
    while :; do
        ui_banner
        ui_head "install"
        ui_kv "host" "$(sys_os) / $(sys_pm)"
        ui_kv "bin dir" "$INSTALL_BIN"
        sys_dry && ui_warn "TERMINAL_DRY_RUN=1 -- nothing will be written"
        printf '\n'

        ui_menu "enter select . q back" \
            "tools|tools|packages the dotfiles expect" \
            "configs|configs|per-tool configuration files" \
            "scripts|scripts|standalone scripts into ~/.local/bin" \
            "back|back|return to the main menu" || return 0

        case "$MENU_CHOICE" in
            tools)   install_tools_menu ;;
            configs) install_configs_menu ;;
            scripts) install_scripts_menu ;;
            *)       return 0 ;;
        esac
    done
}

#- tools --------------------------------------------------------------------

install_tools_menu() {
    _f=$(net_data tools) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    while :; do
        ui_banner
        ui_head "install / tools"
        _pm=$(sys_pm)
        if [ "$_pm" = none ]; then
            ui_warn "no supported package manager found -- showing status only"
        else
            ui_kv "manager" "$_pm"
        fi
        printf '\n'

        set --
        _missing=0
        while IFS='|' read -r _n _bin _brew _apt _pac _desc; do
            case "$_n" in '' | \#*) continue ;; esac
            sys_trim "$_n";    _n=$TRIMMED
            sys_trim "$_bin";  _bin=$TRIMMED
            sys_trim "$_desc"; _desc=$TRIMMED
            if sys_has "$_bin"; then
                _st="${C_GREEN}[ok]${C_RESET}"
            else
                _st="${C_RED}[--]${C_RESET}"
                _missing=$((_missing + 1))
            fi
            set -- "$@" "$_n|$_n|$_st $_desc"
        done < "$_f"

        set -- "$@" "__all|install all|$_missing missing on this host"
        set -- "$@" "__back|back|"

        ui_menu "enter install . q back" "$@" || return 0
        case "$MENU_CHOICE" in
            __back) return 0 ;;
            __all)  install_tools_all "$_f" ;;
            *)      install_tool_one "$_f" "$MENU_CHOICE" ;;
        esac
    done
}

# install_pkg_for <line> -- package name for this host's manager
install_pkg_for() {
    _line=$1
    _pm=$(sys_pm)
    IFS='|' read -r _n _bin _brew _apt _pac _d <<PKG
$_line
PKG
    sys_trim "$_n";    _n=$TRIMMED
    sys_trim "$_brew"; _brew=$TRIMMED
    sys_trim "$_apt";  _apt=$TRIMMED
    sys_trim "$_pac";  _pac=$TRIMMED
    case "$_pm" in
        brew)   printf '%s\n' "${_brew:-$_n}" ;;
        apt)    printf '%s\n' "${_apt:-$_n}" ;;
        pacman) printf '%s\n' "${_pac:-$_n}" ;;
        *)      printf '%s\n' "$_n" ;;
    esac
}

install_tool_one() {
    _line=$(sys_row "$1" "$2")
    [ -z "$_line" ] && return 1
    _bin=$(sys_field "$_line" 2)

    ui_head "install / tools / $2"
    if sys_has "$_bin"; then
        ui_ok "$2 is already installed ($(command -v "$_bin"))"
        ui_pause
        return 0
    fi

    _pkg=$(install_pkg_for "$_line")
    _cmd=$(sys_install_cmd "$_pkg") || {
        ui_err "no package manager available for $2"
        ui_note "package name would be: $_pkg"
        ui_pause
        return 1
    }

    ui_kv "package" "$_pkg"
    ui_kv "command" "$_cmd"
    if ui_confirm "run it?"; then
        sys_exec "$_cmd"
    else
        ui_note "skipped"
    fi
    ui_pause
}

install_tools_all() {
    ui_head "install / tools / all missing"
    _list=''
    while IFS= read -r _line; do
        case "$_line" in '' | \#*) continue ;; esac
        _bin=$(sys_field "$_line" 2)
        sys_has "$_bin" && continue
        _list="$_list $(install_pkg_for "$_line")"
    done < "$1"

    sys_trim "$_list"
    _list=$TRIMMED
    if [ -z "$_list" ]; then
        ui_ok "nothing missing"
        ui_pause
        return 0
    fi

    _cmd=$(sys_install_cmd "$_list") || {
        ui_err "no package manager available"
        ui_pause
        return 1
    }
    ui_kv "packages" "$_list"
    printf '\n'
    ui_note "$_cmd"
    if ui_confirm "install all of these?"; then
        sys_exec "$_cmd"
    else
        ui_note "skipped"
    fi
    ui_pause
}

#- configs ------------------------------------------------------------------

install_configs_menu() {
    _f=$(net_data configs) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    while :; do
        ui_banner
        ui_head "install / configs"
        ui_note "existing files are backed up before anything is written"
        printf '\n'

        set --
        while IFS='|' read -r _n _url _dest _desc; do
            case "$_n" in '' | \#*) continue ;; esac
            sys_trim "$_n";    _n=$TRIMMED
            sys_trim "$_dest"; _dest=$TRIMMED
            sys_trim "$_desc"; _desc=$TRIMMED
            _dest=$(sys_expand_home "$_dest")
            if [ -e "$_dest" ]; then
                _st="${C_YELLOW}[present]${C_RESET}"
            else
                _st="${C_DIM}[absent]${C_RESET}"
            fi
            set -- "$@" "$_n|$_n|$_st $_desc"
        done < "$_f"

        set -- "$@" "__all|install all|write every available config"
        set -- "$@" "__back|back|"

        ui_menu "enter install . q back" "$@" || return 0
        case "$MENU_CHOICE" in
            __back) return 0 ;;
            __all)  install_configs_all "$_f" ;;
            *)      install_config_one "$_f" "$MENU_CHOICE" ;;
        esac
    done
}

install_config_one() {
    _line=$(sys_row "$1" "$2")
    [ -z "$_line" ] && return 1
    _url=$(sys_field "$_line" 2)
    _dest=$(sys_expand_home "$(sys_field "$_line" 3)")

    ui_head "install / configs / $2"
    ui_kv "source" "$_url"
    ui_kv "target" "$_dest"
    [ -e "$_dest" ] && ui_warn "target exists -- it will be backed up first"

    if ui_confirm "install $2 config?"; then
        sys_place "$_url" "$_dest"
    else
        ui_note "skipped"
    fi
    ui_pause
}

install_configs_all() {
    ui_head "install / configs / all"
    ui_confirm "write every available config?" || { ui_note "skipped"; ui_pause; return 0; }
    printf '\n'
    while IFS= read -r _line; do
        case "$_line" in '' | \#*) continue ;; esac
        _n=$(sys_field "$_line" 1)
        _url=$(sys_field "$_line" 2)
        _dest=$(sys_expand_home "$(sys_field "$_line" 3)")
        sys_place "$_url" "$_dest" || ui_note "  ($_n skipped)"
    done < "$1"
    ui_pause
}

#- scripts ------------------------------------------------------------------

install_scripts_menu() {
    _f=$(net_data scripts) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    while :; do
        ui_banner
        ui_head "install / scripts"
        ui_kv "target" "$INSTALL_BIN"
        case ":$PATH:" in
            *":$INSTALL_BIN:"*) : ;;
            *) ui_warn "$INSTALL_BIN is not on \$PATH" ;;
        esac
        printf '\n'

        set --
        while IFS='|' read -r _n _url _as _desc; do
            case "$_n" in '' | \#*) continue ;; esac
            sys_trim "$_n";    _n=$TRIMMED
            sys_trim "$_as";   _as=$TRIMMED
            sys_trim "$_desc"; _desc=$TRIMMED
            if [ -x "$INSTALL_BIN/$_as" ]; then
                _st="${C_GREEN}[ok]${C_RESET}"
            else
                _st="${C_RED}[--]${C_RESET}"
            fi
            set -- "$@" "$_n|$_n|$_st $_desc"
        done < "$_f"

        set -- "$@" "__all|install all|fetch every script"
        set -- "$@" "__back|back|"

        ui_menu "enter install . q back" "$@" || return 0
        case "$MENU_CHOICE" in
            __back) return 0 ;;
            __all)  install_scripts_all "$_f" ;;
            *)      install_script_one "$_f" "$MENU_CHOICE" ;;
        esac
    done
}

install_script_one() {
    _line=$(sys_row "$1" "$2")
    [ -z "$_line" ] && return 1
    _url=$(sys_field "$_line" 2)
    _as=$(sys_field "$_line" 3)
    _dest="$INSTALL_BIN/$_as"

    ui_head "install / scripts / $2"
    ui_kv "source" "$_url"
    ui_kv "target" "$_dest"

    if ui_confirm "install $2?"; then
        mkdir -p "$INSTALL_BIN" 2>/dev/null
        if sys_place "$_url" "$_dest"; then
            sys_dry || chmod +x "$_dest" 2>/dev/null
        fi
    else
        ui_note "skipped"
    fi
    ui_pause
}

install_scripts_all() {
    ui_head "install / scripts / all"
    ui_confirm "fetch every script into $INSTALL_BIN?" || { ui_note "skipped"; ui_pause; return 0; }
    printf '\n'
    mkdir -p "$INSTALL_BIN" 2>/dev/null
    while IFS= read -r _line; do
        case "$_line" in '' | \#*) continue ;; esac
        _url=$(sys_field "$_line" 2)
        _as=$(sys_field "$_line" 3)
        if sys_place "$_url" "$INSTALL_BIN/$_as"; then
            sys_dry || chmod +x "$INSTALL_BIN/$_as" 2>/dev/null
        fi
    done < "$1"
    ui_pause
}

#- non-interactive entrypoint (used by the shell mode) -----------------------
# install_cmd <tools|configs|scripts> [name ...]

install_cmd() {
    _kind=${1:-}
    shift 2>/dev/null || :
    case "$_kind" in
        tool | tools)     _f=$(net_data tools); _dfield=6 ;;
        config | configs) _f=$(net_data configs); _dfield=4 ;;
        script | scripts) _f=$(net_data scripts); _dfield=4 ;;
        *)
            ui_err "usage: install <tools|configs|scripts> [name ...]"
            return 1
            ;;
    esac
    [ -n "$_f" ] || { ui_err "catalog unavailable"; return 1; }

    if [ $# -eq 0 ]; then
        install_list "$_f" "$_kind" "$_dfield"
        return 0
    fi

    for _name in "$@"; do
        if [ -z "$(sys_row "$_f" "$_name")" ]; then
            ui_err "unknown entry: $_name"
            continue
        fi
        case "$_kind" in
            tool | tools)     install_tool_one "$_f" "$_name" ;;
            config | configs) install_config_one "$_f" "$_name" ;;
            script | scripts) install_script_one "$_f" "$_name" ;;
        esac
    done
}

install_list() {
    # install_list <file> <title> <description-field>
    ui_head "$2"
    while IFS= read -r _line; do
        case "$_line" in '' | \#*) continue ;; esac
        _n=$(sys_field "$_line" 1)
        _d=$(sys_field "$_line" "$3")
        ui_kv "$_n" "$_d"
    done < "$1"
}
