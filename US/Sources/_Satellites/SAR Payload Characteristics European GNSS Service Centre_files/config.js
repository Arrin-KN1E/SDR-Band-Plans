/**
 * @file
 * Javascript behaviors for MathJax.
 */

/* global window, drupalSettings */

(function (window, settings) {

  'use strict';
  window.MathJax = settings.mathjax.config;

}(window, drupalSettings));
