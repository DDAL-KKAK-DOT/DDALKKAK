#!/bin/sh

rm -rf output
mkdir output

rsync -av --progress ./ ./output --exclude output --exclude .git --exclude node_modules