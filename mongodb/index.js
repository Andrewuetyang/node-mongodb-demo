import mongoose from 'mongoose'
const config = require('config-lite')(__dirname)

mongoose.connect(config.url, {userMongoClient: true})
const db = mongoose.connection

db.on('error', err => console.log('mongodb connect error'))
db.on('open', err => console.log('mongodb connect succeed'))
db.on('close', err => console.log('mongodb closed'))