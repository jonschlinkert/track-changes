'use strict';

var clone = require('clone-deep');

/**
 * Expose `Changes`
 */

module.exports = Changes;

/**
 * Create a new instance of `Changes`.
 *
 * ```js
 * var app = new Changes();
 * ```
 * @api public
 */

function Changes() {
  this.history = {};
}

/**
 * Track the `value` of `key` with a `comment`.
 *
 * ```js
 * var foo = 'foo';
 * app.track('foo', 'one', foo);
 *
 * foo = 'bar';
 * app.track('foo', 'two', foo);
 *
 * foo = 'baz';
 * app.track('foo', 'three', foo);
 *
 * // get history of tracked changes for `foo`
 * app.getHistory('foo');
 * ```
 *
 * @param  {String} `key`
 * @param  {String} `comment` Brief comment about where `key` is being tracked.
 * @param  {*} `value`
 * @return {Object} `Changes` for chaining.
 * @api public
 */

Changes.prototype.track = function(key, comment, value) {
  var val = clone(value);

  this.history[key] = this.history[key] || {};
  if (typeof this.history[key].first === 'undefined') {
    this.history[key].first = val;
  }

  if (comment) {
    this.history[key].last = val;
    this.history[key][comment] = val;
    return this;
  }

  return function (n, v) {
    return this.track(key, n, clone(v));
  }.bind(this);
};


/**
 * Get the history for a tracked `key`.
 *
 * ```js
 * var ext = app.getHistory('ext');
 * ```
 *
 * @param  {String} `key`
 * @return {Object}
 */

Changes.prototype.getHistory = function(key) {
  return this.history[key];
};