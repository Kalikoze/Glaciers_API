const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
