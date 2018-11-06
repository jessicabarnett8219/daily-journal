// TODO figure out how to get value of mood selections

apiHandler.loadExistingEntries()
const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", (event) => {
  const journalEntryObject = {
    date: document.querySelector("#dateInput").value,
    concept: document.querySelector("#conceptInput").value,
    entry: document.querySelector("#entryTextInput").value,
    mood: ""
  }
  apiHandler.saveNewEntry(journalEntryObject)
  .then( data => {
    apiHandler.loadExistingEntries(data)
  })
})


const radioBtns = document.getElementsByName("mood")

radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("click", (event) => {
    const mood = event.target.value
    return console.log(mood)
  })
})

