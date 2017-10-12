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
    seeds: {
      directory: './db/seeds/test'
    },
		useNullAsDefault: true
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL + `?ssl=true`,
		migrations: {
			directory: './db/migrations'
		},
    seeds: {
      directory: './db/seeds/development'
    },
		useNullAsDefault: true
	}
};
