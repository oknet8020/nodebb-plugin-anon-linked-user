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

plugin.createAnonIdentity = async function (uid) {
  const existing = await db.getObjectField(`user:${uid}`, 'anon:uid');
  if (existing) {
    return existing; // כבר יש זהות אנונימית
  }

  const mainUser = await User.getUserFields(uid, ['username', 'email']);
  const anonUsername = `anon_${uid}_${Date.now()}`;

  // ניצור את המשתמש האנונימי
  const anonUid = await User.create({
    username: anonUsername,
    email: `anon-${uid}@example.com`, // צריך לוודא שאין התנגשות
    password: require('crypto').randomBytes(16).toString('hex'),
  });

  // נרשום את הקשר בין המשתמשים
  await db.setObjectField(`user:${uid}`, 'anon:uid', anonUid);
  await db.setObjectField(`user:${anonUid}`, 'anon:mainUid', uid);

  return anonUid;
};

module.exports = plugin;
