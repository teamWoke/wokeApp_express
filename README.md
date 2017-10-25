# wokeApp_express

This repository is the Express component of a full stack App.

Woke

Woke is a news analysis app that gives data-based insight into editorial choices and presents them without comment.

Woke receives and stores search term(s) provided by the user.  It then retrieves news data related to those search terms and provides the user with the number of relevant articles published by [PUBLICATIONS USED IN APP] over [DATE RANGE COVERED BY SEARCH].  As a user stores more search terms, they are provided with a more robust pictures of the editorial choices made by each publication.  The user compare the relative importance placed on a given topic by the publication given the amount of coverage devoted to it.

********************************

THIS IS SAMPLE DATA.  IT IS NOT INFORMED BY ANY REAL SEARCH.

						| Pub1			|	Pub2			|	Pub3			|	Pub4       |	Pub5
---------------------------------------------------------------------------
Trump				|	4 000			|	5	000			|	2 000			| 300 			 | 730
Wild+Fire		|	600				|	300				|	40				|	3					 | 220
Kardashian	|	600				|	300				|	0					| 0					 | 10

********************************
Reach Goals:
-Visual representation of data returned to user in the form of a bar graph.
-Visual representation of data returned to user in the form of a word cloud.
-Adjustable date range to compare topic coverage during a given period in history.
-"Choose two" compare function that selects two or three search terms instead of selcting all saved terms.
-Delete account functionality so user can leave service.

********************************
API:
-Webhose News API

********************************
Technologies:
-React.js
-Express.js 
-HTML
-CSS

********************************
Node Packages:
-PG-Promise
-Moment
-Body-Parser
-Dotenv
-Cors
-Express
-React-router-dom
-Underscore.js
-Axios
-Bcrypt

********************************
This works in concert with the React App found here: https://github.com/teamWoke/WokeApp
