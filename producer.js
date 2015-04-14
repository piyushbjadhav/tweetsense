var Producer = require('sqs-producer');
var Twitter = require('twitter');
var client = new Twitter({
  	consumer_key: 'MrIUJ9otXLJOB5Rosyxz1PtUt',
  	consumer_secret: 'tYcRkQoxBe661dlGuVg8J2yapLJTRL56OJaRQb5cBiC7bBmUvt',
  	access_token_key: '704254436-kmSw5csSdNcxnswfL0i7NaAwiHF6ODvV8hR6BkRf',
  	access_token_secret: 'nCIgOKKys64lStK3WxLaeu1sJ27yeprpX4ixCrutWgm8r'
});
var producer = Producer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/572855649604/tweetsense',
  region: 'us-east-1'
});
client.stream('statuses/filter',{locations: '-74,40,-73,41' } , function(stream) {
  	stream.on('data', function(tweet) {
      if(tweet.coordinates!=null && tweet.coordinates !='undefined'){
      	// send messages to the queue 
      	var message = {};
      	message['id'] = tweet.id.toString();
      	message['body'] = JSON.stringify(tweet);

	  producer.send([message], function(err) {
	  if (err) console.log(err);
       });

	  }
 
      
  	});

  	stream.on('error', function(error) {
    throw error;
  	});

});



