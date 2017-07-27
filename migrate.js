var fs = require('fs');
var eachOfSeries = require('async/eachOfSeries');
var request = require('superagent');

var file = fs.readFileSync(__dirname + '/events-bkup.json', 'utf-8');
var json = JSON.parse(file);

eachOfSeries(json.items, function(item, index, eachOfCallback) {
  request
    .post('https://chaus.herokuapp.com/apis/fs/events')
    .send({
      name: item.name,
      latlng: item.latlng,
      place: item.id,
      day: item.day,
      strength: item.strength,
      popurarity: item.popurarity,
      type: item.type,
    })
    .set('Accept', 'application/json')
    .end(function() {
      eachOfCallback()
    });
});
