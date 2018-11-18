import addEntriesToDOM from "./render"
import apiHandler from "./data"
import optionMaker from "./options"


apiHandler.loadExistingEntries()
apiHandler.loadMoodCollection()
  .then(collection => {
    collection.forEach(obj => {
      let newMoodOption = optionMaker(obj.id, obj.label)
      moodInput.appendChild(newMoodOption)
    })
  })

apiHandler.loadInstructorCollection()
  .then(collection => {
    collection.forEach(obj => {
      let newInstOption = optionMaker(obj.id, `${obj.firstName} ${obj.lastName}`)
      instructorInput.appendChild(newInstOption)
    })
  })


$("#submitBtn").click("click", (event) => {
  let date = $("#dateInput").val()
  let concept = $("#conceptInput").val()
  let entryText = $("#entryTextInput").val()
  let mood = document.querySelector("#moodInput").options[moodInput.selectedIndex].value
  let instructor = document.querySelector("#instructorInput").options[instructorInput.selectedIndex].value

  let entryObj = apiHandler.entryObjectCreator(date, concept, entryText, mood, instructor)

  apiHandler.saveNewEntry(entryObj)
    .then(data => {
      $(".entryLog").empty()
      apiHandler.loadExistingEntries(data)
    })
})

const radioBtns = document.getElementsByName("mood")
radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("click", (event) => {
    $(".entryLog").empty()
    let currentMood = parseInt(event.target.value, 10)
    apiHandler.fetchEntries()
      .then(entries => {
        return entries.filter(entry => {
          return entry.moodId === currentMood
        })
      })
      .then(returns => {
        addEntriesToDOM(returns)
      })
  })
})

