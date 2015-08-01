/// <reference path="../typings/node/node.d.ts"/>
var express = require('express')
var coMicroFileDb = require('comicrofiledb')
var app = express()
var path = require('path')
var http = require('http')
var cors = require('cors')

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../www')))

coMicroFileDb({
  app: app,
  docsRootDir: path.resolve(__dirname, '../www/recipes-db-examples'),
  specFile: 'recipe.json',
  rootRoute: '/recipes'
})

var httpPort = 3000
http.createServer(app).listen(httpPort)
console.log('http at port: ' + httpPort)