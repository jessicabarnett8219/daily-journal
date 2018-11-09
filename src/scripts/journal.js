// TODO figure out how to get value of mood selections

apiHandler.loadExistingEntries()
const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", (event) => {
  let dateInput = document.querySelector("#dateInput")
  let conceptInput = document.querySelector("#conceptInput")
  let entryTextInput = document.querySelector("#entryTextInput")
  let moodInput = document.querySelector("#moodInput")

  const journalEntryObject = {
    date: dateInput.value,
    concept: conceptInput.value,
    entry: entryTextInput.value,
    mood: moodInput.options[moodInput.selectedIndex].value
  }
  $(".entryLog").empty()
  apiHandler.saveNewEntry(journalEntryObject)
  .then(data => apiHandler.loadExistingEntries(data))

  dateInput.value = ""
  conceptInput.value = ""
  entryTextInput.value = ""
  moodInput.selectedIndex = 0;
})


// const radioBtns = document.getElementsByName("mood")

// radioBtns.forEach(radioBtn => {
//   radioBtn.addEventListener("click", (event) => {
//     const mood = event.target.value
//     console.log(mood)

//   })
// })

