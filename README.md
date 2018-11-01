# florentcima

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