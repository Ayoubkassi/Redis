const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const app = express();

// Make request to Github for data

const  getRepos = async (req, res , next) => {
  try{
    console.log('Fetching data');
    const { username } = req.params;

    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    console.log(data);


  } catch(err){
    console.log(err);
    res.status(500);
  }
}

app.get('/repos/:username', getRepos);

app.listen(PORT , () => {
  console.log(`App listening on port ${PORT}`);
});
