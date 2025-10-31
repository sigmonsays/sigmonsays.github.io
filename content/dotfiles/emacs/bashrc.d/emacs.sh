alias doom='~/.emacs.d/bin/doom'

# This is needed on macOS since /run is not writable
if [ "$(uname -s)" == "Darwin" ] ; then
    export XDG_RUNTIME_DIR="$HOME/.run"
fi

export EDITOR="e"

if [ -z "$XDG_RUNTIME_DIR" ] ; then
    export XDG_RUNTIME_DIR=/run/user/$(id -u)
fi
