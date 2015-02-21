'use strict';

/**
 * Expose `Changes`
 */

module.exports = Changes;

/**
 * Create a new instance of `Changes`.
 *
 * ```js
 * var changes = new Changes();
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
 * changes.track('ext', 'before merge', value);
 * ```
 *
 * @param  {String} `key`
 * @param  {String} `comment` Brief comment about where `key` is being tracked.
 * @param  {*} `value`
 * @return {Object} `Changes` for chaining.
 * @api public
 */

Changes.prototype.track = function(key, comment, value) {
  this.history[key] = this.history[key] || {};
  if (!this.history[key].first) {
    this.history[key].first = value;
  }
  if (comment) {
    this.history[key].last = value;
    this.history[key][comment] = value;
    return this;
  }
  return function (n, v) {
    return this.track(key, n, v);
  }.bind(this);
};
