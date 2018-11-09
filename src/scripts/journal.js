// TODO figure out how to get value of mood selections

apiHandler.loadExistingEntries()
  .then(entries => addEntriesToDOM(entries))

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
    .then(entries => addEntriesToDOM(entries))

  dateInput.value = ""
  conceptInput.value = ""
  entryTextInput.value = ""
  moodInput.selectedIndex = 0;
})


const radioBtns = document.getElementsByName("mood")

radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("click", (event) => {
    let currentMood = event.target.value
    apiHandler.loadExistingEntries()
      .then(entries => {
        if (currentMood === "frustrated") {
          return entries.filter(entry => {
            return entry.mood === "frustrated"
          })
        } else if (currentMood === "sad") {
          return entries.filter(entry => {
            return entry.mood === "sad"
          })
        } else if (currentMood === "happy") {
          return entries.filter(entry => {
            return entry.mood === "happy"
          })
        } else if (currentMood === "hopeful") {
          return entries.filter(entry => {
            return entry.mood === "hopeful"
          })
        }
      })
      .then(returns => {
        $(".entryLog").empty()
        addEntriesToDOM(returns)
      })
  })
})
