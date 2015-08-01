/// <reference path="../typings/node/node.d.ts"/>
var express = require('express')
var coMicroFileDb = require('comicrofiledb')
var app = express()
var path = require('path')
var http = require('http')
var cors = require('cors')
var docsRootDir = process.env.DB_FOLDER || path.resolve(__dirname, '../www/recipes-db-examples')

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../www')))
app.use(express.static(docsRootDir))

coMicroFileDb({
  app: app,
  docsRootDir: docsRootDir,
  specFile: 'recipe.json',
  rootRoute: '/recipes'
})

var httpPort = 3000
http.createServer(app).listen(httpPort)
console.log('http at port: ' + httpPort)