mdns-native
=========

A node MDNS module that uses system installed programs to publish services.

## Installation

```shell
  npm install mdns-native
```

## Usage

```js
  var mdns = require('mdns-native')
      publish = mdns.publish;


<!--- publish(type, domain, port) -->
	publish('_coqs-server', 'local', '9000');
```

## Tests

```shell
   npm test
```

## Release History

* 0.1.0 Initial release
