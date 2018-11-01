#!/bin/sh

cd dist
git add --all
git commit -m "Deploy to gh-pages"
git push origin gh-pages
cd ..