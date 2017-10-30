const pgp = require('pg-promise')({}),
config = process.env.DATABASE_URL || 'postgres://rebekahsunmibae@localhost:5432/woke_db',
db = pgp(config);

module.exports = db;
