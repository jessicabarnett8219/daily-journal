import addEntriesToDOM from "./render"
import apiHandler from "./data"
import optionMaker from "./options"


apiHandler.loadExistingEntries()


const submitBtn = document.querySelector("#submitBtn")
submitBtn.addEventListener("click", (event) => {
  let date = $("#dateInput").val()
  let concept = $("#conceptInput").val()
  let entryText = $("#entryTextInput").val()
  let mood = document.querySelector("#moodInput").options[moodInput.selectedIndex].value
  let instructor = document.querySelector("#instructorInput").options[instructorInput.selectedIndex].value

  let entryObj = apiHandler.entryObjectCreator(date, concept, entryText, mood, instructor)

  $(".entryLog").empty()
  apiHandler.saveNewEntry(entryObj)
  .then(data => console.log(data))
  .then(data => apiHandler.loadExistingEntries(data))

  date = ""
  concept = ""
  entryText = ""
  mood = 0
  instructor = 0
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
  .then(collection => {
    collection.forEach(obj => {
      let newInstOption = optionMaker(obj.id, `${obj.firstName} ${obj.lastName}`)
      instructorInput.appendChild(newInstOption)
    })

  })