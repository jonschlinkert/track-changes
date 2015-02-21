/*!
 * track-changes <https://github.com/jonschlinkert/track-changes>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var Changes = require('./');

describe('track changes', function () {
  it('should track changes:', function () {
    var app = new Changes();
    var a = 'a';
    app.track('a', 'change #1', a);
    app.getHistory('a').should.have.properties(['first', 'last']);
    app.getHistory('a').should.eql({ first: 'a', last: 'a', 'change #1': 'a' });

    a = 'b';
    app.track('a', 'change #2', a);
    app.getHistory('a').should.have.properties(['first', 'last']);
    app.getHistory('a').should.eql({ first: 'a', last: 'b', 'change #1': 'a', 'change #2': 'b' });

    a = 'c';
    app.track('a', 'change #3', a);
    app.getHistory('a').should.have.properties(['first', 'last']);
    app.getHistory('a').should.eql({ first: 'a', last: 'c', 'change #1': 'a', 'change #2': 'b' , 'change #3': 'c' });
  });
});
