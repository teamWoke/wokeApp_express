const pgp = require('pg-promise')({}),
config = process.env.DATABASE_URL || 'postgres://jonathanellsaesser@localhost:5432/woke_db',
db = pgp(config);

module.exports = db;
