# terminal.d

The shell project behind `karsh.page/terminal`.

```sh
curl -sL karsh.page/terminal | sh
```

`public/terminal` is the only file anyone pipes into `sh`. It is deliberately
small: it works out where it is being served from, pulls three libraries, and
hands off to the modules in here. Adding a screen never grows the file people
curl.

## Layout

```
public/
  terminal              entrypoint -- bootstrap, argument handling, main menu
  terminal.d/
    lib/
      ui.sh             colours, banner, key reading, the menu widget
      net.sh            fetching, caching, module loading
      sys.sh            host detection, catalog parsing, safe file placement
    modules/
      install.sh        tools, configs and scripts
      doctor.sh         what this host has and is missing
      codebase.sh       browse the work, open or clone it
      whoami.sh         session, host and network
      card.sh           contact card and PGP fingerprint
      colours.sh        terminal colour and font check
      shell.sh          the command REPL
    data/
      tools.list        packages, per package manager
      configs.list      dotfiles and where they go
      scripts.list      standalone scripts for ~/.local/bin
      codebase.list     mirrors karsh.page/codebase
      links.list        the contact card
```

Everything is POSIX `sh`. No bashisms, no arrays, no `local`. It has to run
under dash, bash-as-sh, busybox ash and zsh-as-sh.

## Running it

| what | how |
| --- | --- |
| the real thing | `curl -sL karsh.page/terminal \| sh` |
| one shot | `curl -sL karsh.page/terminal \| sh -s -- doctor` |
| from a checkout | `sh public/terminal` |
| against `npm run dev` | `TERMINAL_BASE=http://localhost:8080 sh public/terminal` |
| change nothing | `TERMINAL_DRY_RUN=1 sh public/terminal` |
| no nerd font | `TERMINAL_ASCII=1 sh public/terminal` |

Run from a checkout and the files next to `public/terminal` are used directly,
so edits show up without a deploy. `TERMINAL_LOCAL=/path/to/terminal.d` forces
that behaviour from anywhere.

## Adding a screen

1. Write `modules/thing.sh` with a `thing_main` (full screen, ends in
   `ui_pause`) and, if it prints a report, a `thing_report` the REPL can call
   without clearing the screen.
2. Add a line to the menu in `public/terminal` and a case to dispatch it.
3. Add a command to `shell_help` and the `case` in `modules/shell.sh`.

Modules are sourced, not executed, so they share `ui_*`, `net_*` and `sys_*`.

## Catalogs

Pipe-separated, `#` for comments, whitespace around fields is trimmed. The
first field is the name, and it is what `sys_row` looks up. Add a row and it
appears in the menus, the REPL listings and the one-shot commands at once --
no code change.

`configs.list` points at `github.com/karnull/dotfiles`, which is where those
files are headed rather than where they all live today. Every row is checked
with a HEAD request before anything is written, so rows whose source is not
there yet show as unavailable instead of installing an error page. Fix the
URLs in that file as the repo fills out.

## Rules the code follows

- Nothing is written without asking first, and anything overwritten is copied
  to `<file>.bak.<timestamp>` beside itself.
- Installs run through `sys_exec`, which hands the command `/dev/tty` -- our
  own stdin is the piped script, and `sudo` would otherwise fail instantly.
- The tty stays in character mode for as long as a menu is open. Flipping per
  keypress parks anything typed during a redraw in the line buffer, which
  looks like dropped input.
- `TERMINAL_DRY_RUN=1` has to be honoured by anything that touches the disk.
