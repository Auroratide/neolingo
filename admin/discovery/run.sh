#!/bin/bash

# Invoke this from the top level directory

python3 ./admin/discovery/generate.py "$1" "$2" | tee -a ./admin/discovery/out.txt
