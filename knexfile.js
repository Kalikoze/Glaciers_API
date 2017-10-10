// Update with your config settings.

module.exports = {
	development: {
		client: 'pg',
		connection: 'postgres://localhost/tsunami_data',
		migrations: {
			directory: './db/migrations'
		},
    seeds: {
      directory: './db/seeds/development'
    },
		useNullAsDefault: true
	},

	test: {
		client: 'pg',
		connection: process.env.DATABASE_URL || 'postgres://localhost/tsunami_data_test',
		migrations: {
			directory: './db/migrations'
		},
		useNullAsDefault: true
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}
}
