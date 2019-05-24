<p align="center">
  # florentcm 
  <br>
  <br>
  Personal website of florent cima.
</p>

[![Netlify Status](https://api.netlify.com/api/v1/badges/a8464bf1-baf4-42cf-bb63-98558f85caa7/deploy-status)](https://app.netlify.com/sites/florent/deploys)

[![Website florent.site](https://img.shields.io/website-up-down-green-red/https/florent.site.svg)](https://florent.site/)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Setup of the git worktree

$ rm -rf dist
$ echo "dist/" >> .gitignore
$ git worktree add dist gh-pages

### Deploying changes

$ make # or what ever you run to populate dist
$ cd dist
$ git add --all
$ git commit -m "Deploy to gh-pages"
$ git push origin gh-pages
$ cd ..
