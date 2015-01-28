mdns-native
=========

A node MDNS module that uses system installed programs to publish services.

## Installation

```shell
  npm install mdns-native
```

## Usage

```js
  var scapegoat = require('scapegoat')
      escape = scapegoat.escape,
      unescape = scapegoat.unescape;

  var html = '<h1>Hello World</h1>',
      escaped = escape(html),
      unescaped = unescape(escaped);

  console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);
```

## Tests

```shell
   npm test
```

## Release History

* 0.1.0 Initial release
