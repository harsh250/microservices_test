#!/bin/bash

YLW='\033[1;33m'
NC='\033[0m'

declare -a students=("jb" "ap" "student0617" "student0618" "student0619" "student0620" "student0621" "student0622" "student0623" "student0624" "student0625" "student0626" "student0627" "student0628" "student0629" "student0630" "student0631" "student0632" "student0633" "student0634" "student0635" "student0636" "student0637" "student0638" "student0639" "student0640" "student0641" "student0642" "student0643" "student0644" "student0645" "student0646" "student0647" "student0648" "student0649")

for student in "${students[@]}"
do
    echo -e "${YLW}$student ${NC}"
    sed -i "s#backend.*#backend-$student.apps.pcfeu.dev.dynatracelabs.com/rest\"#" httpd.conf
    echo ""
    cat httpd.conf | grep ProxyPass
    echo ""
    docker build -t alipatton10/tm-ui:$student .
    docker push alipatton10/tm-ui:$student
    echo ""
done
