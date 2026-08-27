#!/bin/sh
# terminal.d/modules/card.sh -- the contact card.

card_main() {
    ui_banner
    card_report
    ui_pause
}

card_report() {
    ui_head "karsh"

    _f=$(net_data links) || { ui_err "links unavailable"; ui_pause; return 1; }
    while IFS='|' read -r _k _v; do
        case "$_k" in '' | \#*) continue ;; esac
        sys_trim "$_k"; _k=$TRIMMED
        sys_trim "$_v"; _v=$TRIMMED
        ui_kv "$_k" "$_v"
    done < "$_f"

    ui_head "pgp"
    ui_kv "fingerprint" "E10B E76A 3961 D9C3 726F  26FB A627 B726 1F80 13EE"
    ui_note "full key: $TUI_BASE/pgp"

    printf '\n'
    ui_note "copy this card any time with: curl -sL $TUI_BASE/terminal | sh"
}
