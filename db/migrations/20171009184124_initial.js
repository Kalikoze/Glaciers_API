exports.up = (knex, Promise) => {
	return Promise.all([
		knex.schema.createTable('sources', table => {
			table.string('SOURCE_ID').primary()
			table.string('YEAR')
			table.string('MONTH')
			table.string('COUNTRY')
			table.string('STATEPROVINCE')
			table.string('LOCATION')
			table.string('LATITUDE')
			table.string('LONGITUDE')
			table.string('MAXIMUM_HEIGHT')
			table.string('FATALITIES')
			table.string('FATALITY_ESTIMATE')
			table.string('ALL_DAMAGE_MILLIONS')
			table.string('DAMAGE_ESTIMATE')
			table.timestamps(true, true)
		}),
		knex.schema.createTable('waves', table => {
			table.string('WAVE_ID').primary()
			table.string('SOURCE_ID').unsigned()
			table.foreign('SOURCE_ID').references('sources.SOURCE_ID')
			table.string('YEAR')
			table.string('MONTH')
			table.string('LOCATION')
			table.string('MAXIMUM_HEIGHT')
			table.string('FATALITIES')
			table.string('FATALITY_ESTIMATE')
			table.string('ALL_DAMAGE_MILLIONS')
			table.string('DAMAGE_ESTIMATE')
			table.timestamps(true, true)
		})
	])
}

exports.down = (knex, Promise) => {
	return Promise.all([knex.schema.dropTable('waves'), knex.schema.dropTable('sources')])
}
