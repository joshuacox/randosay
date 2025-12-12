#!/bin/sh
THIS_NAME=randosay
THIS_GH=joshuacox
THIS_BRANCH=main
TMP_DIR=$(mktemp -d --suffix="${THIS_NAME}")
cleanup_func () {
  echo rm -Rf ${TMP}
}
trap cleanup_func EXIT

cd $TMP_DIR
curl -L -o ${THIS_NAME}-${THIS_BRANCH}.zip https://github.com/${THIS_GH}/${THIS_NAME}/archive/refs/heads/${THIS_BRANCH}.zip
unzip ${THIS_NAME}-${THIS_BRANCH}.zip
cd ${THIS_NAME}-${THIS_BRANCH}
cmake .
make
sudo make install
cd
