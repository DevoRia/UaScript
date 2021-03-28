isFileCompiler=$1
pathOrSource=$2
outputDir=$3

npm run compile $isFileCompiler $pathOrSource $outputDir
npm run start $outputDir