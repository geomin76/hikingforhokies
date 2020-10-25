const express = require('express')
const app = express();
const { MongoClient } = require('mongodb');
var cors = require('cors');

const fs = require('fs')
const readLine = require('readline')

var secrets = require('./secrets.js');

app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello, World!")
})


app.get('/getData', (req, res) => {
    const connectionString = "mongodb+srv://" + process.env.USER + ":" + process.env.PASS +"@" + process.env.CLUSTER + "/test?retryWrites=true&w=majority"
    MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('hikingforhokies');
        // res.json(JSON.stringify(db.collection("places").find()))
        db.collection("places").find().toArray((err, result) => {
            res.json(result)
        })
    })
}) 



const connectionString = "mongodb+srv://" + process.env.USER + ":" + process.env.PASS +"@" + process.env.CLUSTER + "/test?retryWrites=true&w=majority"
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('hikingforhokies');

    function postHike(title, lat, lng, link, desc, dist, elev, diff, map) {
        db.collection("places").insert({
            title:title,
            lat:lat,
            lng:lng,
            link:link,
            desc:desc,
            dist:dist,
            elev:elev,
            diff:diff,
            map:map
        })
    }

    function postView(title, lat, lng, link, desc, map) {
        db.collection("places").insert({
            title:title,
            lat:lat,
            lng:lng,
            link:link,
            desc:desc,
            map:map
        })
    }

    async function readData() {
        const fileStream = fs.createReadStream("data.txt");
        const rl = readLine.createInterface({
            input:fileStream,
            crlfDelay:Infinity
        });
    
        for await (const line of rl) {
            var res = line.split("|");
            if (res[0] === "Hike") {
                postHike(res[1], res[2], res[3], res[4], res[5], res[6], res[7], res[8], res[9])
            }
            else {
                postView(res[1], res[2], res[3], res[4], res[5], res[6])
            }
        }
        console.log("done")
    }


    // app.get('/getData', (req, res) => {
    //     // res.json(JSON.stringify(db.collection("places").find()))
    //     db.collection("places").find().toArray((err, result) => {
    //         res.json(result)
    //     })
    // }) 

  })

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`App listening on port ${PORT}`);
//     console.log('Run http://localhost:5000')
//     console.log('Press Ctrl+C to quit.');
// })

module.exports = app;