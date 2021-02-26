# Synology Moments Photo Slider for Smart Phone

Under development

LICENSE: MIT

## v0.1 : 1st MVP release

### description

- simple photo slider that shows few sample photos from unsplash
- you can modify photo-gateway.js to display any list of photo
- no support for Synology Moments yet

### how to use

- put following files under "static" on web server and access the file using browser
  - index.html
  - index.js
  - photo-list.js
  - photo-timer.js
  - style.css
  - simple-photo/gateway.js
  - simple-photo/view.js

### unit test

```
$ npm test
<snip>
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |     100 |      100 |     100 |     100 |                   
 static              |     100 |      100 |     100 |     100 |                   
  photo-list.js      |     100 |      100 |     100 |     100 |                   
  photo-timer.js     |     100 |      100 |     100 |     100 |                   
  slider.js          |     100 |      100 |     100 |     100 |                   
 static/simple-photo |     100 |      100 |     100 |     100 |                   
  gateway.js         |     100 |      100 |     100 |     100 |                   
  view.js            |     100 |      100 |     100 |     100 |                   
---------------------|---------|----------|---------|---------|-------------------
Test Suites: 5 passed, 5 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        3.631 s
Ran all test suites.
```


---

## v0.2 : 2nd MVP release

### description

- simple photo slider that shows few sample photos from Moments
- photos are pre-defined in static/moments/gateway.js

### how to use

- put following files under "static" on web server and access the file using browser
  - index.html
  - index.js
  - photo-list.js
  - photo-timer.js
  - slider.js
  - style.css
  - moments/gateway.js
  - moments/view.js

- create env.json.js under static

```
const ENV = {
    SYNO_ADDRESS: '192.168.1.1',
    SYNO_PORT: 15000,
    SYNO_USER: 'momentsuser',
    SYNO_PASSWORD: 'momentspass'
};

export default ENV;
```

### unit test

##### moments/gateway.js
- line 77, 105
  - error handling scenario that is hard to create
- line 84
  - code that is only executed in browser, but not in Node.js

```
---------------------|---------|----------|---------|---------|-------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------|---------|----------|---------|---------|-------------------
All files            |    97.2 |    90.48 |   97.44 |    97.2 |                   
 static              |     100 |      100 |     100 |     100 |                   
  env.json.js        |     100 |      100 |     100 |     100 |                   
  photo-list.js      |     100 |      100 |     100 |     100 |                   
  photo-timer.js     |     100 |      100 |     100 |     100 |                   
  slider.js          |     100 |      100 |     100 |     100 |                   
 static/moments      |      94 |    81.82 |      95 |      94 |                   
  gateway.js         |   93.18 |    81.82 |   93.33 |   93.18 | 77,84,105         
  view.js            |     100 |      100 |     100 |     100 |                   
 static/simple-photo |     100 |      100 |     100 |     100 |                   
  gateway.js         |     100 |      100 |     100 |     100 |                   
  view.js            |     100 |      100 |     100 |     100 |                   
---------------------|---------|----------|---------|---------|-------------------
Test Suites: 7 passed, 7 total
Tests:       37 passed, 37 total
Snapshots:   0 total
Time:        10.364 s, estimated 13 s
Ran all test suites.
```

---

## v0.3 : 3rd MVP release

### description

- simple photo slider that shows photos from Moments
- specify date range of the photos at home view
- yet to be refactored

### how to use

- put following files under "static" on web server and access the file using browser
  - home-view.js
  - index.html
  - index.js
  - photo-list.js
  - slider.js
  - timer.js
  - style/style.css
  - moments/gateway.js
  - moments/photo-list-getter.js
  - moments/slider-view.js

- create env.json.js under static/env

```
const ENV = {
    SYNO_ADDRESS: '192.168.1.1',
    SYNO_PORT: 15000,
    SYNO_USER: 'momentsuser',
    SYNO_PASSWORD: 'momentspass'
};

export default ENV;
```

### unit test

##### moments/gateway.js
- line 77, 139
  - error handling scenario that is hard to create
- line 118
  - code that is only executed in browser, but not in Node.js

```
-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |   98.11 |       92 |   98.44 |   98.11 |                   
 static                |     100 |      100 |     100 |     100 |                   
  home-view.js         |     100 |      100 |     100 |     100 |                   
  photo-list.js        |     100 |      100 |     100 |     100 |                   
  slider.js            |     100 |      100 |     100 |     100 |                   
  timer.js             |     100 |      100 |     100 |     100 |                   
 static/env            |     100 |      100 |     100 |     100 |                   
  env.json.js          |     100 |      100 |     100 |     100 |                   
 static/moments        |   96.91 |    86.67 |    97.5 |   96.91 |                   
  gateway.js           |   95.52 |    81.82 |      96 |   95.52 | 111,118,139       
  photo-list-getter.js |     100 |      100 |     100 |     100 |                   
  slider-view.js       |     100 |      100 |     100 |     100 |                   
 static/simple-photo   |     100 |      100 |     100 |     100 |                   
  gateway.js           |     100 |      100 |     100 |     100 |                   
  slider-view.js       |     100 |      100 |     100 |     100 |                   
-----------------------|---------|----------|---------|---------|-------------------
Test Suites: 9 passed, 9 total
Tests:       53 passed, 53 total
Snapshots:   0 total
Time:        14.042 s
Ran all test suites.

```
