

pathmunge () 
{ 
    if ! echo $PATH | egrep -q "(^|:)$1($|:)"; then
        if [ "$2" = "after" ]; then
            PATH=$PATH:$1;
        else
            PATH=$1:$PATH;
        fi;
    fi
}


go env > .go-env.sh
source .go-env.sh
pathmunge "$GOPATH/bin"

if ! which hugo ; then
   echo "WARNING: No hugo installed"
fi
