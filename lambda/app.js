// NOTE: This is only for referencing the source code of the AWS Lambda function, it has no direct attachment to the main Next.js front end.
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const { getCurrentInvoke } = require('@vendia/serverless-express')
const ejs = require('ejs').__express
const app = express()
const router = express.Router()
app.use(cors());
const axios = require('axios');

app.set('view engine', 'ejs')
app.engine('.ejs', ejs)

router.use(compression())

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'))

router.get('/', (req, res) => {
  const currentInvoke = getCurrentInvoke()
  const { event = {} } = currentInvoke
  const {
    requestContext = {},
    multiValueHeaders = {}
  } = event
  const { stage = '' } = requestContext
  const {
    Host = ['localhost:3000']
  } = multiValueHeaders
  const apiUrl = `https://${Host[0]}/${stage}`
  res.send("api");
})


//Reeceives the lists of spells and races as well as sends the first item so there is something to display when the page loads.
app.get('/spells/', (req, res) => {
  axios.get('https://www.dnd5eapi.co/api/spells').then(response => {
      axios.get(`https://www.dnd5eapi.co${response.data.results[0].url}`).then(firstItem => {
          res.header("Access-Control-Allow-Origin", "*");
      res.send([response.data, firstItem.data]);
}).catch(error => {
  console.log(error)
})
  }).catch(error => {
      console.log(error)
  })
});

app.get('/races/', (req, res) => {
  axios.get('https://www.dnd5eapi.co/api/races').then(response => {
      axios.get(`https://www.dnd5eapi.co${response.data.results[0].url}`).then(firstItem => {
          res.header("Access-Control-Allow-Origin", "*");
      res.send([response.data, firstItem.data]);
}).catch(error => {
  console.log(error)
})
  }).catch(error => {
      console.log(error)
  })
});



//Receives the URL parameter from the list items on the front end and sends a call to receive additional details
app.get('/races/:name', (req, res) => {
  axios.get(`https://www.dnd5eapi.co/api/races/${req.params.name}`).then(response => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(response.data);
  }).catch(error => {
      console.log(error)
  })
});

app.get('/spells/:name', (req, res) => {
  axios.get(`https://www.dnd5eapi.co/api/spells/${req.params.name}`).then(response => {
      res.header("Access-Control-Allow-Origin", "*");
      res.send(response.data);
  }).catch(error => {
      console.log(error)
  })
});

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
