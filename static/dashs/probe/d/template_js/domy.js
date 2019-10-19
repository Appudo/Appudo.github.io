!(function(win) {

/**
 * domy
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? console.log.bind(console, '[domy]') : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `domy`.
 *
 * @constructor
 */
function domy() {
  var self = this;
  self.writes = [];
  self.deferred_reads = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

domy.prototype = {
  constructor: domy,

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  defer: function(fn, ctx) {
    debug('measure');
    var task = { fn: fn, ctx: ctx };
    this.deferred_reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = { fn: fn, ctx: ctx };
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.deferred_reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this domy with some
   * custom functionality.
   *
   * Because domy must *always* be a
   * singleton, we're actually extending
   * the domy instance. This means tasks
   * scheduled by an extension still enter
   * domy's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.domy`.
   *
   * @example
   *
   * var mydomy = domy.extend({
   *   // called on creation
   *   initialize: function() {
   *
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.domy.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {domy}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    Object.assign(child, props);
    child.domy = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */

function scheduleFlush(domy) {
  if (!domy.scheduled) {
    domy.scheduled = true;
    domy.raf(flush.bind(null, domy));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(domy) {
  debug('flush');

  var writes = domy.writes;
  var deferred_reads = domy.deferred_reads;
  var error;

  try {
    debug('flushing writes', writes.length);
    runTasks(writes);
    debug('flushing deferred_reads', writes.length);
    runTasks(deferred_reads);
  } catch (e) { error = e; }

  domy.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (writes.length || deferred_reads.length) scheduleFlush(domy);

  if (error) {
    debug('task errored', error.message);
    if (domy.catch) domy.catch(error);
    else throw error;
  }
}

/**
 * We run this inside a try catch
 * so that if any jobs error, we
 * are able to recover and continue
 * to flush the batch until it's empty.
 *
 * @private
 */

function runTasks(tasks) {
  debug('run tasks');
  var task; while ((task = tasks.shift())) task.fn.call(task.ctx);
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

// There should never be more than
// one instance of `domy` in an app
var exports = win.domy = (win.domy || new domy()); // jshint ignore:line
module.exports = exports;

})(window);