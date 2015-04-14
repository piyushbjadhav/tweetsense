var Consumer = require('sqs-consumer');
var AlchemyAPI = require('alchemy-api');
var alchemy = new AlchemyAPI('c1188b9280ccd232f51f3fba2400c26e79a54cf8'); 
var app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/572855649604/tweetsense',
  region: 'us-east-1',
  handleMessage: function (message, done) {
  var tweet = JSON.parse(message['Body']); 
  alchemy.sentiment(tweet.text, {}, function(err, response) {
    if (err) throw err;
    var sentiment = response.docSentiment;
    console.log(sentiment);
  });
  done(); //Done Processing Tweet
  }
});
app.on('error', function (err) {
  console.log(err.message);
});
app.start();