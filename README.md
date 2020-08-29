# inTime-front-end
Create a free handwritten Gantt chart application.  
Task bar can be dragged, dropped and resize.

## This project uses:
- **react** Front-end library
- **percel** Run development server
- **json-server** Run mock server
- **eslint** Find and fix problems in JavaScript code
- **axios** Request helper(TODO: Do not use axios)
- **PaperCSS** CSS framework

## File Structure & Naming Rule
```
.
├── README.md
├── index.html
├── index.js
├── mock
│   ├── db.json
│   └── server.js
├── package-lock.json
├── package.json
└── src
    ├── components
    │   ├── HogePiyo.js
    │   └── FugaPiyo.js
    ├── helper
    │   ├── hogePiyo.js
    │   └── fugaPiyo.js
    └── styles
        ├── hogePiyo.js
        └── fugaPiyo.js
```

## Commit Guidelines(20200801):
-Follow [the Angular.js developers guide](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines) with your own changes.
> ### Must be one of the following:
>**feat**: A new feature  
**fix**: A bug fix  
**docs**: Documentation only changes  
**style**: ~~Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)~~
Add or change CSS styles  
**refactor**: A code change that neither fixes a bug nor adds a feature  
*Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)*  
**perf**: A code change that improves performance  
**test**: Adding missing or correcting existing tests  
**chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation  

## Start Development
1. Install packages
    ```
    npm install
    ```

1. Write .env file
    ```
    cp .env.example .env.dev
    ```
    Add **FIREBASE_XXX_XXX** in *.env.dev* 

1. Run mock server
    ```
    npm run mock
    ```

1. Run dev server
    ```
    npm run dev
    ```