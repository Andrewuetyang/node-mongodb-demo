import express from 'express'
import bodyParser from 'body-parser'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import cookieParser from 'cookie-parser'
import history from 'connect-history-api-fallback'
const config = require('config-lite')(__dirname)

import db from './mongodb'
import routes from './routes' 

const app = express()

const MongoStore = connectMongo(session);
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(history())
app.use(express.static('./public'))
app.use(session({
	name: config.session.name,
	secret: config.session.secret,
	resave: true,
	saveUninitialized: false,
	cookie: config.session.cookie,
	store: new MongoStore({
		url: config.url
	})
}))
routes(app)

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
})

app.listen(config.port, () => {
  console.log('listen at http://localhost:%d', config.port)
})

export default app
