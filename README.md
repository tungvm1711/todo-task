# Project The Unreliable TODO

* This app support all CRUD operations on TODO items.
* There is also a session control component - a component where you can manage your session, create new, delete the current one, change the current session't failure rate.
* The TODOs are filterable.

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).



---

## Client
### Install

    $ git clone https://github.com/ORG/PROJECT.git
    $ cd PROJECT
    $ npm install

### Start & watch

    $ npm start

### Simple build for production

    $ npm run build

### Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

**Note:** Unix user can just link the `git-hooks/post-merge`:

---
## Server
This repository contains a server to use with your task. The backend is unreliable, so you need to prepare for your requests to not be accepted!
### Install

    $ cd server
    $ npm install
    
   Your server will start at localhost:9000. You can change the port in ./src/constants.js


---

## Languages & tools

### JavaScript

- [Redux](https://redux.js.org/)
- [React](http://facebook.github.io/react)
- [create-react-app](https://github.com/facebook/create-react-app) 
- [Redux-form](https://github.com/erikras/redux-form)
### CSS

- [SASS](https://sass-lang.com/)

