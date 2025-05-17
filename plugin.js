'use strict';

const User = require.main.require('./src/user');
const db = require.main.require('./src/database');

const plugin = {};

plugin.init = async function (params) {
  const { router, middleware } = params;

  // בעתיד נרשום כאן ניתובים להגדרות
};

plugin.filterPostGet = async function (hookData) {
  // כאן בעתיד נחליף את שם המשתמש האנונימי במידת הצורך
  return hookData;
};

module.exports = plugin;
