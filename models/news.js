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
		//console log to check response from DB
		console.log(news)
		//set array to collect promises from axios calls
		const newsPromises = [];
		//make an axios call for each search term in database
		news.forEach(element => {
			const query = element.search_term;
			//console log axios URL to check for errors
			//NOTE!! CONVERT ' ' to '%20' within queries && learn to save ' ' in SQL
			console.log(`${url}${token}&format=json&sort=crawled&q=%22${query}%22language%3Aenglish`);
			//push axios call promises into empty array outside of forEach loop
			newsPromises.push(
				axios(`${url}${token}&format=json&sort=crawled&q=%22${query}%22language%3Aenglish`));
			//console log length of promise array to make sure it's working
			console.log('promise array check: ', newsPromises.length)

		});
		
		//attach .then() call backs to package each axios result
		axios.all(newsPromises).then(results => {
			//set res.locals.newsArray to our processed results
			//run a map on the axios results array to transform it into an array of packaged data we can use
			res.locals.newsArray = results.map(element => {	
				return element;
				// { THIS OBJECT WILL BE THE RELEVANT DATA TO RETURN}
			});
		});
		next();
	})
	.catch(err => {
		console.log("error fetching data --News.findAll")
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