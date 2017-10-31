**This repository is the Express component of a full stack App.  It works in concert with the React App found [here](https://github.com/teamWoke/WokeApp).**

# Woke

#### Woke is a news analysis app that gives data-based insight into editorial choices and presents them without comment.

Woke receives and stores search term(s) provided by the user.  It then retrieves news data related to those search terms and provides the user with the number of relevant articles published by CNN, Fox News, and the BBC over the past three days.  As a user stores more search terms, s/he is provided with a more robust picture of the editorial choices made by each publication.  The user is then able to compare the relative importance placed on a given topic by the publication given the amount of coverage devoted to it.

********************************
## User Stories:
- I am interested in using news sources that invest minimal resources in covering entertainment news.  I would like to see how much coverage [ENTERTAINMENT STORY] got compared to [STORY I THINK IS MORE IMPORTANT].
- I can't believe no one is following up on [HUGE EVENT WITH LONG TERM IMPLICATIONS].  What news sources are covering the recovery efforts now that the initial impact is over?
- I think that [STORY X] is just a bunch of noise to distract from [STORY Y].  I believe it speaks to the integrity of an organization that they are committed to covering [STORY Y].  Who is actually doing that?

********************************
## Minimum Viable Product:
- [x] Sign-up / Log-in authentication
- [x] Persistent retention of search terms
- [x] News data analysis returning number of articles by publiction
- [x] Numeric represntation of data comparison to user

********************************
## Reach Goals:
- [x] Visual representation of data returned to user in the form of a bar graph
- [ ] Visual representation of data returned to user in the form of a word cloud
- [ ] "Choose two" compare function that selects two or three search terms instead of selcting all saved terms
- [ ] Adjustable date range to compare topic coverage during a given period in history
- [ ] Delete account functionality so user can leave service

********************************
## API:
- Webhose News API

********************************
## Technologies:
- React.js
- Express.js 
- HTML
- CSS
- PostgreSQL
- Token authentication by Jackie Casper

********************************
## Node Packages:
- PG-Promise
- Moment
- Body-Parser
- Dotenv
- Cors
- Express
- React-router-dom
- Underscore.js
- Axios
- Bcrypt
- d3.js


