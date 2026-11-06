const SpeechRecognition = 
window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition()

rec.lang ='en-US'
rec.continuous = true
rec.interimResults = false

const people = [
  {
    name: 'Jamie Williams',
    age: 26,
    gender: 'female',
    location: 'Los Angeles, CA',
    imageURL: 'https://randomuser.me/api/portraits/women/1.jpg',
    looking: 'Female looking for male',
  },
  {
    name: 'John Smith',
    age: 35,
    gender: 'male',
    location: 'New York, NY',
    imageURL: 'https://randomuser.me/api/portraits/men/1.jpg',
    looking: 'Male looking for female',
  },
  {
    name: 'Bob Johnson',
    age: 42,
    gender: 'male',
    location: 'Chicago, IL',
    imageURL: 'https://randomuser.me/api/portraits/men/2.jpg',
    looking: 'Male looking for female',
  },
  {
    name: 'Shannon Jackson',
    age: 29,
    gender: 'female',
    location: 'Los Angeles, CA',
    imageURL: 'https://randomuser.me/api/portraits/women/2.jpg',
    looking: 'Female looking for female',
  },
];

const container = document.querySelector('.profile-container')
const img = document.querySelector('img')
const profileInfo = document.querySelector('.profile-info')
const nextBtn = document.querySelector('#next')
const voiceBtn = document.querySelector('#voice')

function* createpeople () {
  let index = 0
  while (true) {
    yield person = people[index++ % people.length]
  }
}
const iterator = createpeople()

function Create() {
  const person = iterator.next().value
  img.src = person.imageURL
  profileInfo.querySelector('h3').textContent = person.name
  profileInfo.querySelectorAll('p')[0].textContent = `${person.age} Years Old`
  profileInfo.querySelectorAll('p')[1].textContent = `From ${person.location}`
  profileInfo.querySelectorAll('p')[2].textContent = person.looking
}

nextBtn.addEventListener('click', Create)
// nextBtn.click()

rec.onresult = function (e) {
  for (let i = e.resultIndex; i < e.results.length; i++) {
    const transcript = e.results[i][0].transcript.trim().toLowerCase()
    const confidence = e.results[i][0].confidence
  console.log(transcript, confidence)

  if (!transcript || confidence === 0){
    continue
  }
    if(transcript.includes('next')) {
      Create()
      
    }
}}
let islistening = false
function sstart() {
  rec.start()
  islistening = true
  voiceBtn.innerHTML = 'Stop Voice'
}
function sstop() {
  rec.stop()
  islistening = false
  voiceBtn.innerHTML = 'Use Voice'
  
}

voiceBtn.addEventListener('click', ()=>{
  if(islistening){
    sstop()
  }else{
    sstart()
  }
})
rec.onstart = () => {
  console.log('rec start')
}
rec.onerror = (e) => console.log('Error:', e.error)
rec.onend = () => {
  console.log('rec end')
}


