var Twitter = require('twitter');


var client = new Twitter({

  consumer_key: 'MrIUJ9otXLJOB5Rosyxz1PtUt',

  consumer_secret: 'tYcRkQoxBe661dlGuVg8J2yapLJTRL56OJaRQb5cBiC7bBmUvt',

  access_token_key: '704254436-kmSw5csSdNcxnswfL0i7NaAwiHF6ODvV8hR6BkRf',

  access_token_secret: 'nCIgOKKys64lStK3WxLaeu1sJ27yeprpX4ixCrutWgm8r'

});

 



//util = require('util');
client.stream('statuses/filter', {track: 'the'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});
