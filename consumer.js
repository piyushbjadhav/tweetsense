var kafka = require('kafka-node')
Consumer = kafka.Consumer;
client = new kafka.Client(),
consumer = new Consumer( 

client,
[{topic:'topic1'}]

);

consumer.on('message', function(message){
	var tweet = JSON.parse(message.value);
	console.log(tweet.text);

});

