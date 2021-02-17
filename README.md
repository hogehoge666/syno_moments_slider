# Synology Moments Photo Slider for smart phone

Under development

LICENSE: MIT

## v0.1 : 1st MVP release

### description

- simple photo slider that shows few sample photos from unsplash
- you can modify photo-gateway.js to display any list of photo
- no support for Synology DSM yet

### how to use

- put following files under "static" on web server and access the file using browser
  - index.html
  - index.js
  - photo-gateway.js
  - photo-list.js
  - photo-timer.js
  - style.css

### unit test

```
$ npm test
<snip>
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 photo-gateway.js |     100 |      100 |     100 |     100 |                   
 photo-list.js    |     100 |      100 |     100 |     100 |                   
 photo-timer.js   |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
Test Suites: 3 passed, 3 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        2.754 s
Ran all test suites.
```