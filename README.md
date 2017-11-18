# Ab1gail403 - Simple TwitterBot :eyes:

Ab1gail403 is a TwitterBot that I created with Node.js. It's purpose is to help me find relevant tweets to retweet on my own personal account. This simple app contains 2 functions:

  **RetweetByTopic**: Randomly chooses a hashtag from an array of hashtags and posts a tweet containing  this hashtag.

  **RetweetFromFriend**: Retrieves a list of ids of all the people a given user is following and then retweets the latest tweet of one of these users chosen at random.

## Dependencies :package:


      npm init

      npm install --save twit


## Notes :closed_book:

If you wish to clone this repository to create your own twitterBot, please note that you will need to create your own `config.js` file which should contain all of the necessary authentication keys and tokens provided to you when you create a new app on Twitter.

The content of `config.js` should look something like this:


      module.exports = {
         consumer_key: 'YOUR_CONSUMMER_KEY',
         consumer_secret: 'YOUR_SECRET_KEY',
         access_token: 'YOUR_ACCESS_TOKEN',
         access_token_secret: 'YOUR_SECRET_ACCESS_TOKEN'
      }


Also, make sure to replace the `screen_name` in the RetweetFromFriend() function and replace it with your own.

## Follow Up :mailbox_with_mail:

:loudspeaker: If you use the files in this repo as a starting point for your own TwitterBot, please send me a shoutout  on Twitter and share your creation!

My Twitter username: **@EarthAbigail** :raising_hand:

Take a look at Ab1gail403 in action on Twitter! **@Ab1gail403** :space_invader:
