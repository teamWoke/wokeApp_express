const express = require('express');
const router = express.Router();

const News = require('../models/news');

router.get('/',
	 News.terms,
	 News.cnn,
	 News.fox,
	 News.bbc,
	  (req, res) => {
	console.log('controller /')
	const dataArray = res.locals.newsArray;
	res.json({
		message: 'Here is your data!',
		news: dataArray
	});
});

// router.get('/:id', News.findById, (req, res) => {
// 	res.json({
// 		message: 'Here is your news',
// 		news: res.locals.news
// 	});
// });


router.post('/', News.create, (req, res) => {
	const data = res.locals.news;
	res.json({
		news: data
	})
});

router.delete('/:id', News.destroy, (req, res) => {
        res.send('deleted');
        console.log("Hitting delete at controller");
    }

);

router.get('/dashboard',
	 News.terms,
	  (req, res) => {
	console.log('controller /')
	const dataArray = res.locals.newsArray;
	res.json({
		message: 'Here is your data!',
		news: dataArray
	});
});

module.exports = router;