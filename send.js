module.exports = function(message){
	var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.Client(),
    producer = new Producer(client),
    payloads = [
        { topic: 'topic1', messages: message, partition: 0 },
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
});
producer.on('error', function (err) {})
}