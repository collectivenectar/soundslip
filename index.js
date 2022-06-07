const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const aliens = {
  'humans': {
    'speciesName' : 'Humans',
    'homeworld': 'Earth',
    'location': 'Alpha Quadrant',
    'features': 'Rounded ears, hard on head and face',
    'image': 'https://somerandomwebsite.com/ebbasegjsdvoisva'
  },
  'vulcans': {
    'speciesName' : 'Humans',
    'homeworld': 'Earth',
    'location': 'Alpha Quadrant',
    'features': 'Rounded ears, hard on head and face',
    'image': 'https://somerandomwebsite.com/ebbasegjsdvoisva
  },
  'klingons': {
    'speciesName' : 'Humans',
    'homeworld': 'Earth',
    'location': 'Alpha Quadrant',
    'features': 'Rounded ears, hard on head and face',
    'image': 'https://somerandomwebsite.com/ebbasegjsdvoisva
  },
  'romulans': {
    'speciesName' : 'Humans',
    'homeworld': 'Earth',
    'location': 'Alpha Quadrant',
    'features': 'Rounded ears, hard on head and face',
    'image': 'https://somerandomwebsite.com/ebbasegjsdvoisva
  }
}

app.get('/', (request, response) => {
  response.send(__dirname + ''/index.html')
})

app.get('/api/:alienName', (request, responts) => {
  request.params.alienName.toLowerCase()
  if(aliens[aliensName]){
    response.json(aliens[aliensName])
  } else{
    response.json(aliens['humans'])
  }
})

app.listen(process.env.PORT || PORT, () => {
  console.log('server is running')
}
