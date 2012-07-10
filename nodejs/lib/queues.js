/**
 * @file
 * Code for managing chat queues.
 */
"use strict";

var _ = require('underscore'),
    nowjs = require("now"),
    uuid = require('node-uuid'),
    util = require("util"),
    opeka = {
      user: require("./user"),
    },
    queueList = {};


// The main queue object.
var Queue = function (options) {
  var self = this;

  self.construct = function () {
    // Core attributes of a room.
    self.id = options.id || uuid();
    self.name = options.name;
    self.active = options.active;

    // A list of users who is in the queue.
    self.queue = [];

    // Add our new room to the room list.
    queueList[self.id] = self;

    util.log('Queue created: ' + self.name);

    return self;
  };

  // Return the current group metadata in an object that is safe to send
  // to the client side.
  self.clientData = function () {
    return {
      id: self.id,
      name: self.name,
      active: self.active
    };
  };

  return self.construct();
};

// Provide a list of rooms for the client.
var clientData = function () {
  var queues = _.map(queueList, function (queue) {
    return queue.clientData();
  });

  queues = _.sortBy(queues, function (queue) {
    return queue.name;
  });

  return queues;
};


module.exports = {
  Queue: Queue,
  clientData: clientData,
  list: queueList
};
