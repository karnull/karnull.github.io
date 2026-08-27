#!/bin/sh
# terminal.d/modules/doctor.sh -- what this host has, and what it is missing.

doctor_main() {
    ui_banner
    doctor_report
    ui_pause
}

doctor_report() {
    ui_head "doctor"

    ui_kv "os"      "$(uname -sr 2>/dev/null || printf 'unknown')"
    ui_kv "arch"    "$(uname -m 2>/dev/null || printf 'unknown')"
    ui_kv "distro"  "$(sys_os)"
    ui_kv "shell"   "${SHELL:-unknown}"
    ui_kv "term"    "${TERM:-unset} ${COLORTERM:+($COLORTERM)}"
    ui_kv "manager" "$(sys_pm)"
    ui_kv "fetcher" "$(net_client 2>/dev/null || printf 'none')"

    _f=$(net_data tools) || { ui_err "catalog unavailable"; ui_pause; return 1; }

    ui_head "toolchain"
    _have=0
    _miss=0
    while IFS='|' read -r _n _bin _brew _apt _pac _desc; do
        case "$_n" in '' | \#*) continue ;; esac
        sys_trim "$_n";    _n=$TRIMMED
        sys_trim "$_bin";  _bin=$TRIMMED
        sys_trim "$_desc"; _desc=$TRIMMED
        if _path=$(command -v "$_bin" 2>/dev/null); then
            printf '   %s[ok]%s   %-11s %s%s%s\n' \
                "$C_GREEN" "$C_RESET" "$_n" "$C_DIM" "$_path" "$C_RESET"
            _have=$((_have + 1))
        else
            printf '   %s[--]%s   %-11s %s%s%s\n' \
                "$C_RED" "$C_RESET" "$_n" "$C_DIM" "$_desc" "$C_RESET"
            _miss=$((_miss + 1))
        fi
    done < "$_f"

    printf '\n'
    ui_kv "present" "$_have"
    ui_kv "missing" "$_miss"

    if [ "$_miss" -gt 0 ]; then
        printf '\n'
        ui_note "install them from the install menu, or: install tools <name>"
    fi
}
