var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twitter = require('twitter');
var client = new Twitter({

  	consumer_key: 'MrIUJ9otXLJOB5Rosyxz1PtUt',
  	consumer_secret: 'tYcRkQoxBe661dlGuVg8J2yapLJTRL56OJaRQb5cBiC7bBmUvt',
  	access_token_key: '704254436-kmSw5csSdNcxnswfL0i7NaAwiHF6ODvV8hR6BkRf',
  	access_token_secret: 'nCIgOKKys64lStK3WxLaeu1sJ27yeprpX4ixCrutWgm8r'

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
            client.stream.stop();
        }); 

    socket.on('hello', function(msg){
    
    console.log('message recieved ')

	client.stream('statuses/filter',{locations: '-74,40,-73,41' } , function(stream) {
  	stream.on('data', function(tweet) {
      if(tweet.coordinates!=null && tweet.coordinates !='undefined'){
      	var geo = {}; 
        geo['lat'] =  tweet.coordinates.coordinates[0];
        geo['lng'] =  tweet.coordinates.coordinates[1];
        geo['value'] =  1;

        console.log(geo)
        io.emit('response', JSON.stringify(geo));
      }
  	});

  	stream.on('error', function(error) {
    throw error;
  	});
	});
   
  });


});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});