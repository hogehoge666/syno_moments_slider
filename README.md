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