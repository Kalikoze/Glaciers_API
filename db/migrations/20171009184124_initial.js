exports.up = (knex, Promise) => {
	return Promise.all([
		knex.schema.createTable('sources', table => {
			table.integer('SOURCE_ID').primary()
			table.integer('YEAR')
			table.integer('MONTH')
			table.string('COUNTRY')
			table.string('STATE/PROVINCE')
			table.string('LOCATION')
			table.integer('LATITUDE')
			table.integer('LONGITUDE')
			table.integer('MAXIMUM_HEIGHT')
			table.integer('FATALITITES')
			table.integer('FATALITY_ESTIMATE')
			table.integer('ALL_DAMAGE_MILLIONS')
			table.integer('DAMAGE_ESTIMATE')
			table.timestamps(true, true)
		}),
		knex.schema.createTable('waves', table => {
			table.integer('WAVE_ID').primary()
			table.integer('SOURCE_ID').unsigned()
			table.foreign('SOURCE_ID').references('sources.SOURCE_ID')
			table.integer('YEAR')
			table.integer('MONTH')
			table.integer('LOCATION')
			table.integer('MAXIMUM_HEIGHT')
			table.integer('FATALITITES')
			table.integer('FATALITY_ESTIMATE')
			table.integer('ALL_DAMAGE_MILLIONS')
			table.integer('DAMAGE_ESTIMATE')
			table.timestamps(true, true)
		})
	])
}

exports.down = (knex, Promise) => {
	return Promise.all([knex.schema.dropTable('waves'), knex.schema.dropTable('sources')])
}
