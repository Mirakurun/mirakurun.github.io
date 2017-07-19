var express = require('express'),
    bodyParser = require('body-parser'),
    { mongoose } = require('./db/mongoose'),
    { Salary } = require('./models/salary'),
    app = express(),
    port = process.env.PORT || 3000,
    jsonParser = bodyParser.json(),
    urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(__dirname + '/../static'))

app.route('/salary/:location/year/:start-:end/title/:title')
    .get(function (req, res) {
        var range = [],
            location = req.params.location.split(","),
            title = req.params.title.split(/,(?!\s)/g);

        for (var i = req.params.start; i <= req.params.end; i++) {
            range.push(i);
        }

        var query = {
            year: { $in: range },
            location: { $in: location },
            occ_title: { $in: title }
        }

        Salary.find(query).then(function (salary) {
            res.send({salary});
        }, function (error) {
            res.status(400).send(error);
        });
    });

app.listen(port, function () {
    console.log(`Started server on port ${port}.`);
});