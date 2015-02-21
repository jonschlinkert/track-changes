var util = require('util');
var Changes = require('./');

function MyApp() {
  Changes.call(this);
  this.options = {};
  this.init();
}

util.inherits(MyApp, Changes);

MyApp.prototype.init = function() {
  this.option('admin', 'a');
  this.track('admin', 'default setting', 'a');
};

MyApp.prototype.option = function(key, value) {
  this.options[key] = value;
};

MyApp.prototype.one = function(key, value) {
  this.track(key, 'user-defined:one', value);
  this.option(key, value);
};

MyApp.prototype.two = function(key, value) {
  this.track(key, 'user-defined:two', value);
  this.option(key, value);
};


MyApp.prototype.three = function(key, value) {
  this.track(key, 'user-defined:three', value);
  this.option(key, value);
};


var app = new MyApp();

app.one('admin', 'b');
app.two('admin', 'c');
app.three('admin', 'd');

console.log(app)

// { history:
//    { admin:
//       { first: 'a',
//         last: 'd',
//         'default setting': 'a',
//         'user-defined:one': 'b',
//         'user-defined:two': 'c',
//         'user-defined:three': 'd' } },
//   options: { admin: 'd' } }