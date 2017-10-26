const db = require('../db/config');
const News = {};

//require packages
const axios = require('axios');
require('dotenv').config();
// const passport = require('passport');
const auth = require('../services/auth');
const methodOverride = require('express-method-override');
const bodyParser = require('body-parser');
const moment = require('moment');

//API keys
const url = 'http://webhose.io/filterWebContent?token=';
const token = process.env.API_TOKEN;

News.findAll = (request, response, next) => {
	db.many('SELECT * FROM news')
	.then((news) => {
		//axios call [`&format=json&sort=crawled&q=` ... `language%3Aenglish`]
		//collect promises
		//package promises
		//return promises as response.locals.news = news;
		next();
	})
	.catch(err => {
		console.log("error fetching data from the database")
	})
};

// News.findById = (request, response, next) => {
// 	db.one('SELECT * FROM news WHERE ID=$1', [request.params.id]).then((news) => {
// 		response.locals.news = news;
// 		next();
// 	})
// 	.catch(err => {
// 		console.log("error fetching data from the database")
// 	})
// };

News.create = (request, response, next) => {
	const { id } = request.params
	const { search_term, user_id } = request.body;
	 console.log(request.body);
	db.one(
		'INSERT INTO news (search_term, user_id)  VALUES ($1, $2) RETURNING *', 
		[search_term, user_id])
			.then(news => {
				response.locals.news = news;
				next()
			})
}

News.destroy = (request, response, next) => {
	console.log("Firing delete");
    const {id} = request.params;
    db.none(
        'DELETE FROM news WHERE id = $1', [id]
    ).then(() => next())
     .catch(err => console.log(err));
}

module.exports = News;