### NPM SCRIPTS

Available commands:

```
// helper cmds
npm test // test client code with karm-sinon-chai and report with karma-istambul
npm run test:server // test application with karma mocha sinon chai and report coverage via nyc istambul
npm run lint // run eslint throught all code
npm run lint:fix // run eslint and try to automatically fix warnings

// developer cmds
npm run dev // start app with nodemon & webpack watch
npm run prod // build everything and start a production like server

// helper cmds
npm run build:client // generate client files in dist folder ready for production
npm run build:server // generate server files in dist folder ready for production
npm run clean // removes files generated by build and tests

// external cmd
npm run build // generate all files for production in dist folder
npm start // start production server

```


### WARNINGS

## Be mindfull of the path when referecing *images and the like*

Assets (images|gif|svg) are either
  - copied from /assets/ to dist/public in order to be served by express.
  - extracted from .scss files by webpack at build time (client code only).

This means that in .scss files the path relies on your local file tree.
In html files it depends on where the file will be served by the server which in our case is */public/*.(png|jpg|jpeg|svg|gif)*


## Testing

Use `npm test` instead of npm run test if you want a clean output.

In order for the test to pass you need a global coverage of at least 50%.
Expect, sinon and logger variables are available in the global scope if NODE_ENV === 'test'.

Check ./chai.js for more info.

### Linting

Eslint can automatically fix quit a few warnings and errors by itself if you run `npm run eslint:fix`.

## Babel (syntax improvement)

- arrow function
```
const func = () => {};
```

- Transforms class properties

```
class myClass {
    myProp = 1;
    myFunction () {
      this.myProp++;
    }
    static props = [];
}
```

- Rest properties
```
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }
```

- Spread properties
```
let n = { x, y, ...z };
console.log(n); // { x: 1, y: 2, a: 3, b: 4 }
```

### QUESTIONS

- Should we include babel-polyfill ?
https://babeljs.io/docs/usage/polyfill/

- Should we use OptimalBits/node_acl for authorization ?
http://www.bardev.com/2013/07/28/setting-up-angularjs-angular-seed-node-js-and-karma/