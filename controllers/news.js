const express = require('express');
const router = express.Router();

const News = require('../models/news');

router.get('/', News.findAll, (request, response) => {
	const dataArray = response.locals.news;
	response.json({
		message: 'Here is your data!',
		news: dataArray
	});
});

// router.get('/:id', News.findById, (request, response) => {
// 	response.json({
// 		message: 'Here is your news',
// 		news: response.locals.news
// 	});
// });


router.post('/', News.create, (request, response) => {
	const data = response.locals.news;
	response.json({
		news: data
	})
});

router.delete('/:id',  News.destroy, (request, response) => {
        response.send('deleted')
    }

);

module.exports = router;