const heavy = () => {
  for (let i = 0; i < 10000; i++) {
    console.log(new Date())
  }
}

// comment this to let it be sync and freezing
setTimeout(heavy, 20)

//comment this to let it be async and non-freezing
// heavy()

document.getElementById('root').innerHTML = 'ready!'
