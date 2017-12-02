const twit = require('twit')
// var config = require('./config.js');
const TwitterSearch = [
  '#technology',
  '#algorithm',
  '#algorave',
  '#tech',
  '#TechNews',
  '#IoT',
  '#arduino',
  '#algomech',
  '#Robotics'
];

// var Twitter = new twit(config);

const Twitter = new twit({
  consumer_key: process.env.BOT_CONSUMER_KEY,
  consumer_secret: process.env.BOT_CONSUMER_SECRET,
  access_token: process.env.BOT_ACCESS_TOKEN,
  access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

console.log('Ab1gail403 is booting up...');

// --------------------------------//
// First Tweet for testing purposes
const firstTweet = () => {
  Twitter.post(
    'statuses/update',
    { status: 'Ab1gail403 is saying hello!' },
    (err, data, response) => {
      if (err) {
        console.log(`Ab1gail403 could not post it's first tweet... ${err}`);
      } else {
        console.log(`Ab1gail403 posted it's first tweet! ${data}`);
      }
    }
  );
};

// -------------------------------//

// Choose a hashtag randomly in the given list
const chooseSearchTopic = arr => {
  let index = Math.floor(Math.random() * arr.length);
  console.log(`Chosen Topic in the list: ${index} ${arr[index]}`);
  return arr[index];
};

// Function to RETWEET according to a search phrase or hashtags
const RetweetByTopic = () => {
  const query = {
    q: chooseSearchTopic(TwitterSearch),
    result_type: 'recent',
    lang: 'en'
  };

  Twitter.get('search/tweets', query, (err, data) => {
    if (err) {
      console.log(`Could not search... ${err}`);
    } else {
      let retweetID = data.statuses[0].id_str;
      let tweet = data.statuses[0].text;

      Twitter.post(
        'statuses/retweet/:id',
        { id: retweetID },
        (err, data, response) => {
          if (err) {
            console.log(`Could not RETWEET ${err}`);
          } else {
            console.log(
              `Ab1gail403 RETWEETED!! ID: ${retweetID} Tweet: ${tweet}`
            );
          }
        }
      );
    }
  });
};

// Retweet a tweet posted by one of EarthToAbigail's friends
const RetweetFromFriend = () => {
  // Find the ids of E+A's friends
  Twitter.get(
    'friends/ids',
    { screen_name: 'EarthAbigail' },
    (err, data, response) => {
      if (err) {
        console.log(err);
      } else {
        // Choose 1 friend randomly in the list of ids
        let len = Object.keys(data.ids).length;
        let index = Math.floor(Math.random() * len);
        console.log(index);
        // Retrieve 1 tweet from this friend's timeline
        Twitter.get(
          'statuses/user_timeline',
          { user_id: data.ids[index], count: 1 },
          (err, data, response) => {
            if (err) {
              console.log(`Couldn't retrieve your friend's tweet! ${err}`);
            } else {
              let retweetID = data[0].id_str;
              // Retweet
              Twitter.post(
                'statuses/retweet/:id',
                { id: retweetID },
                (err, data, response) => {
                  if (err) {
                    console.log(`Could not RETWEET ${err}`);
                  } else {
                    let tweet = data.text;
                    console.log(
                      `Ab1gail403 RETWEETED!! ID: ${retweetID} Tweet: ${tweet}`
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

// Call Functions and set appropriate intervals
RetweetByTopic();
RetweetFromFriend();
setInterval(RetweetByTopic, 3600000);
setInterval(RetweetFromFriend, 3600000);
