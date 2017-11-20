var twit = require('twit');
//var config = require('./config.js');
var TwitterSearch = ['#technology', '#algorithm', '#algorave', '#tech', '#TechNews', '#IoT', '#arduino', '#algomech', '#Robotics'];
var Twitter = new twit(config);

var Bot = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

console.log("Ab1gail403 is booting up...");

//--------------------------------//
//First Tweet for testing purposes
var firstTweet = function() {
  Twitter.post('statuses/update', { status: "Ab1gail403 is saying hello!" }, function(err, data, response) {
    if (err) {
      console.log("Ab1gail403 could not post it's first tweet..." + err);
    }
    else {
      console.log("Ab1gail403 posted it's first tweet!" + data);
    }
  });
}
//-------------------------------//

//Choose a hashtag randomly in the given list
var chooseSearchTopic = function(arr) {
  var index = Math.floor(Math.random() * arr.length);
  console.log("Chosen Topic in the list: " + index + " " + arr[index]);
  return arr[index];
}

//Function to RETWEET according to a search phrase or hashtags
var RetweetByTopic = function() {

  var query = {
    q: chooseSearchTopic(TwitterSearch),
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', query, function(err, data) {
    if (err) {
      console.log("Could not search..." + err);
    }
    else {
      var retweetID =  data.statuses[0].id_str;
      var tweet = data.statuses[0].text;

      Twitter.post('statuses/retweet/:id', { id: retweetID }, function(err, data, response) {
        if (err) {
          console.log("Could not RETWEET" + err);
        }
        else {
          console.log("Ab1gail403 RETWEETED!! ID: " + retweetID + " Tweet: " + tweet);
        }
      });
    }
  });
}


//Retweet a tweet posted by one of EarthToAbigail's friends
var RetweetFromFriend = function() {
  //Find the ids of E+A's friends
  Twitter.get('friends/ids', { screen_name: 'EarthAbigail' }, function (err, data, response) {
    if (err) {
      console.log(err);
    }
    else {
      //Choose 1 friend randomly in the list of ids
      var len = Object.keys(data.ids).length;
      var index =  Math.floor(Math.random() * len);
      console.log(index);
      //Retrieve 1 tweet from this friend's timeline
      Twitter.get('statuses/user_timeline', { user_id: data.ids[index], count: 1 }, function(err, data, response) {
        if (err) {
          console.log("Couldn't retrieve your friend's tweet!" + err);
        }
        else {
          //console.log(data);
          var retweetID = data[0].id_str;
          //Retweet
          Twitter.post('statuses/retweet/:id', { id: retweetID }, function(err, data, response) {
            if (err) {
              console.log("Could not RETWEET" + err);
            }
            else {
              var tweet = data.text;
              console.log("Ab1gail403 RETWEETED!! ID: " + retweetID + " Tweet: " + tweet);
            }
          });
        }
      })
    }
  });
}

//Call Functions and set appropriate intervals
RetweetByTopic();
RetweetFromFriend();
setInterval(RetweetByTopic, 3600000);
setInterval(RetweetFromFriend, 3600000);
