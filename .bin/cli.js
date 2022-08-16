bold=$(tput bold)
normal=$(tput sgr0)
workDir=$(pwd)

if [ -e u1as.config.json ]
    then
config=$(uasconf "$(cat $(pwd)/uas.config.json)")

if [[ -z $config ]]
    then
echo "Invalid uas.config.json"
exit 0
fi

srcDest=""

for i in $(echo $config | tr " " "\n")
do
    srcDest="$srcDest $workDir/$i"
    done

node $workDir/node_modules/uascript/lib true $srcDest

else
if [ $# -eq 0 ]
then
echo "Please provide source and distribute folders
${bold} uas <src> <dist> ${normal}
or use ${bold} uas.config.json ${normal} for that"
exit 0
fi

node $workDir/node_modules/uascript/lib true $workDir/$1 $workDir/$2

fi