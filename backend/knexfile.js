module.exports = {
	client: 'postgresql',
	connection: {
		host: '127.0.0.1',
		port: 5432,
		database: 'knowledge',
		user: 'postgres',
		password: ' ',
	},
	pool: { min: 2, max: 10 },
	migrations: { tableName: 'knex_migrations' }
};