﻿var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Backbone, Example;
  Backbone = require('backbone');
  return Example = (function(_super) {

    __extends(Example, _super);

    function Example() {
      return Example.__super__.constructor.apply(this, arguments);
    }

    Example.prototype.defaults = function() {
      return {
        display: null,
        snippet: null
      };
    };

    return Example;

  })(Backbone.Model);
});
