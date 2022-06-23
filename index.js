// timestamp 1:22:21 to pick up from

const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const aliens = {
  'humans': {
    'speciesName': 'Humans',
    'homeworld': 'Earth',
    'features': 'Rounded ears, hair on head and face (sometimes)',
    'interestingFact': 'Founded the United Federation of Planets after first contact with the Vulcans',
    'notableExamples': 'James T. Kirk, Zephram Cochran, Abraham Lincoln',
    'image': 'https://static.wikia.nocookie.net/aliens/images/6/68/The_City_on_the_Edge_of_Forever.jpg'
  },
  'vulcans': {
    'speciesName': 'Vulcans',
    'homeworld': 'Vulcan',
    'features': 'Pointed ears, upward-curving eyebrows',
    'interestingFact': 'Practice an extreme form of emotional regulation that focuses on logic above all else, pioneered by a Vulcan named Surak',
    'notableExamples': "Spock, T'Pol, Sarek",
    'image': 'https://static.wikia.nocookie.net/aliens/images/7/75/Vulcans-FirstContact.jpg'
  },
  'klingons': {},
  'romulans': {},
  'borg': {},
  'gorn': {},
  'trill': {}
}

app.get('/', (request, response) => {
  response.sendFile(__dirname + `/index.html`)
})

app.get('/api/:alienName', (request, response) => {
  const aliensName = request.params.alienName.toLowerCase()
  if(aliens[aliensName]){
    response.json(aliens[aliensName])
  }
  else{
    response.json(aliens['humans'])
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log('server is running')
})
