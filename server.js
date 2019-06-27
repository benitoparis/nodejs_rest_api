
var express = require('express');
app = express();
app.route('/hello').get(function(req, res) {
    res.send('hello world !');
});


app.use(express.static('public'));

app.listen(8080);
