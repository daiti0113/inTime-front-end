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
- Follow [Angular.js developers guide](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
> ### Must be one of the following:
>**feat**: A new feature  
**fix**: A bug fix  
**docs**: Documentation only changes  
**style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)  
**refactor**: A code change that neither fixes a bug nor adds a feature  
**perf**: A code change that improves performance  
**test**: Adding missing or correcting existing tests  
**chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation  