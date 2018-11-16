import addEntriesToDOM from "./entriesDOM"
import apiHandler from "./data"
import optionMaker from "./options"


apiHandler.loadExistingEntries()
  .then(entries => addEntriesToDOM(entries))

const submitBtn = document.querySelector("#submitBtn")


submitBtn.addEventListener("click", (event) => {
  let dateInput = document.querySelector("#dateInput")
  let conceptInput = document.querySelector("#conceptInput")
  let entryTextInput = document.querySelector("#entryTextInput")
  let moodInput = document.querySelector("#moodInput")
  let instructorInput = document.querySelector("#instructorInput")

  const journalEntryObject = {
    date: dateInput.value,
    concept: conceptInput.value,
    entry: entryTextInput.value,
    moodId: moodInput.options[moodInput.selectedIndex].value,
    instructorId: instructorInput.options[instructorInput.selectedIndex].value
  }

  console.log(journalEntryObject)

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
    $(".entryLog").empty()
    let currentMood = event.target.value
    apiHandler.loadExistingEntries()
      .then(entries => {
        return entries.filter(entry => {
          return entry.mood === currentMood
        })
      })
      .then(returns => {
        addEntriesToDOM(returns)
      })
  })
})

// let moodSelectMenu = document.querySelector("#moodInput")
apiHandler.loadMoodCollection()
.then(collection => {
  collection.forEach(obj => {
    let newMoodOption = optionMaker(obj.id, obj.label)
    moodInput.appendChild(newMoodOption)
  })
})

// let instructorSelectMenu = document.querySelector("#instructorInput")
apiHandler.loadInstructorCollection()
.then( collection => {
  collection.forEach(obj => {
    let newInstOption = optionMaker(obj.id, `${obj.firstName} ${obj.lastName}`)
    instructorInput.appendChild(newInstOption)
  })

})