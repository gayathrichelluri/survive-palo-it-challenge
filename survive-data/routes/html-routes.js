const mysql = require('mysql');

module.exports = function(app, connection) {
    app.get('/', async function(req, res){
        // res.send("Hello there, its working!");
        await connection.query('select * from patients', function(err, data){
            (err) ? res.send(err) : res.json({patients: data});
        });
    });

    app.post('/', async function(req, res){
        var postData  = req.body;
        await connection.query('INSERT INTO patients SET ?', postData, (error, results, fields) => {
            if (error) throw error;
            console.log("Table updated!");
            res.end(JSON.stringify(results));
        });
        // console.log(postData);
    });
};