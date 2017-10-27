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
const pgp = require('pg-promise');

//API keys
const url = 'http://webhose.io/filterWebContent?token=';
const token0 = process.env.API_TOKEN0;
const token1 = process.env.API_TOKEN1;
const token2 = process.env.API_TOKEN2;
const token3 = process.env.API_TOKEN3;
const token4 = process.env.API_TOKEN4;
const token5 = process.env.API_TOKEN5;
const token6 = process.env.API_TOKEN6;
const token7 = process.env.API_TOKEN7;
const token8 = process.env.API_TOKEN8;
const token9 = process.env.API_TOKEN9;
const token10 = process.env.API_TOKEN10;
const token11 = process.env.API_TOKEN11;
const token12 = process.env.API_TOKEN12;

const tokens = [token0, token1, token2, token3, token4, token5, token6, token7, token8, token9, token10, token11, token12];

News.terms = (req, res, next) => {
    // PULL TERMS FROM DATABASE AND SET AS FIRST ENTRY IN OBJECT ARRAY
    console.log('News.terms');
    db.many('SELECT * FROM news')
        .then(terms => {
            const termsArray = [];
            terms.forEach(e => {
                termsArray.push({ term: e.search_term,
                                  id: e.id })
            })
            res.locals.newsArray = termsArray;
            next();
        })
}
News.cnn = (req, res, next) => {
    console.log('News.cnn')

    //set array to collect promises from axios.all()s for each term
    const newsPromises = [];
    //make an axios call for each search term in database


    res.locals.newsArray.forEach((element, index) => {
        console.log('inside terms.forEach');
        const query = element.term;
        //axios call to CNN route for each search term
        console.log(`${url}${tokens[index]}&format=json&sort=crawled&site=cnn.com&q=%22${query}%22language%3Aenglish&size=2`);
        newsPromises.push(
            axios(`${url}${tokens[index]}&format=json&sort=crawled&site=cnn.com&q=%22${query}%22language%3Aenglish&size=2`));
        //console log length of promise array to make sure it's working
        console.log('promise array check: ', newsPromises.length, newsPromises)
    })
    axios.all(newsPromises).then(results => {
            res.locals.newsArray = res.locals.newsArray.map((element, index) => {
                console.log(results[index].data.totalResults);
                return {
                    term: element.term,
                    cnn: results[index].data.totalResults
                }
            })
            console.log(res.locals.newsArray)
            next();
        })
        .catch(err => {
            console.log("error fetching data --News.cnn")
        })
};
News.fox = (req, res, next) => {
    //AXIOS calls to fox
    console.log('News.fox')

    //set array to collect promises from axios.all()s for each term
    const newsPromises = [];

    res.locals.newsArray.forEach((element, index) => {
        console.log('inside terms.forEach');
        const query = element.term;
        //axios call to fox route for each search term
        console.log(`${url}${tokens[index]}&format=json&sort=crawled&site=foxnews.com&q=%22${query}%22language%3Aenglish&size=2`)
        newsPromises.push(
            axios(`${url}${tokens[index]}&format=json&sort=crawled&site=foxnews.com&q=%22${query}%22language%3Aenglish&size=2`));
        //console log length of promise array to make sure it's working
        console.log('promise array check: ', newsPromises.length, newsPromises)
    })
    axios.all(newsPromises).then(results => {
            res.locals.newsArray = res.locals.newsArray.map((element, index) => {
                console.log(results[index].data.totalResults);
                return {
                    term: element.term,
                    cnn: element.cnn,
                    fox: results[index].data.totalResults
                }
            })
            console.log(res.locals.newsArray)
            next();
        })
        .catch(err => {
            console.log("error fetching data --News.fox", err)
        })
}
News.bbc = (req, res, next) => {
    console.log('News.bbc')

    //set array to collect promises from axios.all()s for each term
    const newsPromises = [];
    //make an axios call for each search term in database


    res.locals.newsArray.forEach((element, index) => {
        console.log('inside terms.forEach');
        const query = element.term;
        //axios call to bbc route for each search term
        console.log(`${url}${tokens[index]}&format=json&sort=crawled&site=bbc.com&q=%22${query}%22language%3Aenglish&size=2`)
        newsPromises.push(
            axios(`${url}${tokens[index]}&format=json&sort=crawled&site=bbc.com&q=%22${query}%22language%3Aenglish&size=2`));
        //console log length of promise array to make sure it's working
        console.log('promise array check: ', newsPromises.length, newsPromises)
    })
    axios.all(newsPromises).then(results => {
            res.locals.newsArray = res.locals.newsArray.map((element, index) => {
                console.log(results[index].data.totalResults);
                return {
                    term: element.term,
                    cnn: element.cnn,
                    fox: element.fox,
                    bbc: results[index].data.totalResults
                }
            })
            console.log(res.locals.newsArray)
            next();
        })
        .catch(err => {
            console.log("error fetching data --News.bbc")
        })
}

// News.findById = (req, res, next) => {
//  db.one('SELECT * FROM news WHERE ID=$1', [req.params.id]).then((news) => {
//      res.locals.news = news;
//      next();
//  })
//  .catch(err => {
//      console.log("error fetching data from the database")
//  })
// };

News.create = (req, res, next) => {
    const { id } = req.params
    const { search_term, user_id } = req.body;
    console.log(req.body);
    db.one(
            'INSERT INTO news (search_term, user_id)  VALUES ($1, $2) RETURNING *', [search_term, user_id])
        .then(news => {
            res.locals.news = news;
            next()
        })
}

News.destroy = (req, res, next) => {
    console.log("Firing delete");
    const { id } = req.params;
    db.none(
            'DELETE FROM news WHERE id = $1', [id]
        ).then(() => next())
        .catch(err => console.log(err));
}

module.exports = News;