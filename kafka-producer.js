var sendmessage = require('./send.js');
var kafka = require('kafka-node');
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: 'MrIUJ9otXLJOB5Rosyxz1PtUt',
    consumer_secret: 'tYcRkQoxBe661dlGuVg8J2yapLJTRL56OJaRQb5cBiC7bBmUvt',
    access_token_key: '704254436-kmSw5csSdNcxnswfL0i7NaAwiHF6ODvV8hR6BkRf',
    access_token_secret: 'nCIgOKKys64lStK3WxLaeu1sJ27yeprpX4ixCrutWgm8r'
});
client.stream('statuses/filter',{locations: '-74,40,-73,41' } , function(stream) {
    stream.on('data', function(tweet) {
      if(tweet.coordinates!=null && tweet.coordinates !='undefined'){
        // send messages to the queue 
       sendmessage(JSON.stringify(tweet));
    }     
    });
    stream.on('error', function(error) {
    throw error;
    });
});



