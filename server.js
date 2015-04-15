var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Consumer = require('sqs-consumer');
var AlchemyAPI = require('alchemy-api');
//82cc14f948a6227508a9541076e2807db0e5af49
//c1188b9280ccd232f51f3fba2400c26e79a54cf8
var alchemy = new AlchemyAPI('82cc14f948a6227508a9541076e2807db0e5af49');
var kafka = require('kafka-node')
Consumer = kafka.Consumer;
client = new kafka.Client(),
consumer = new Consumer( 

client,
[{topic:'topic1'}]

);

consumer.on('message', function(message){
  var tweet = JSON.parse(message.value);
 var geo = {}; 
  geo['lat'] =  tweet.coordinates.coordinates[1];
  geo['lng'] =  tweet.coordinates.coordinates[0];
  geo['text'] = tweet.text;

  alchemy.sentiment(tweet.text, {}, function(err, response) {
    if (err) throw err;

    //console.log('Analizing tweets');
    var sentiment = response.docSentiment;
    //console.log(sentiment);
    console.log(sentiment);
    if(sentiment!= null && sentiment!=undefined && sentiment['score'] != null && sentiment['score']!= undefined){
      geo['score'] = sentiment['score'];
    }
    else
      geo['score'] = 0;

    //console.log(JSON.stringify(geo));
   console.log(geo);
    io.emit('response', JSON.stringify(geo));
    
  });
  

});




app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/heatmap.min.js', function(req, res){
  res.sendfile('heatmap.min.js');
});

app.get('/gmaps-heatmap.js', function(req, res){
  res.sendfile('gmaps-heatmap.js');
});


io.on('connection', function(socket){
   console.log('user connected');
     
    socket.on('stop', function(data) {
       // sqsapp.stop();
    }); 

    socket.on('hello', function(msg){    
      console.log('message recieved ')
      //sqsapp.start();
    });
});

http.listen(process.env.PORT || 3002, function(){
  console.log('listening on *:3000');
});