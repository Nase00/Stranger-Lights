const moment = require('moment');

const ENV = require('./env');
const { TWEET_EXPIRED } = require('./constants');

module.exports.convertTweetToLetterIndexes = (
  { text },
  screenName = ENV.screen_name
) => {
  const indexes = text
    .toLowerCase()
    // .replace(`@${screenName.toLowerCase()}`, '') // Filter only defined username
    .replace(/@\w+/g, '') // Filter all usernames
    .split('')
    .map(letter => letter.charCodeAt(0) - 97)
    .filter(index => index >= 0 && index <= 26);

  return JSON.stringify({
    indexes: indexes,
    rawText: text
  });
};

module.exports.getTimeSinceLastTweet = () =>
  moment().subtract(TWEET_EXPIRED, 'seconds');

module.exports.getScreenName = (res, req) =>
  req.params.screen_name || ENV.screen_name;
