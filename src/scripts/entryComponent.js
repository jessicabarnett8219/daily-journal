// function to make HTML component

const makeEntryComponent = (journalObject) => {

  let entryComponent = document.createElement("section")
  entryComponent.className = "entry"

  let currentConcept = document.createElement("h2")
  currentConcept.textContent = journalObject.concept
  entryComponent.appendChild(currentConcept)

  let currentDate = document.createElement("h3")
  currentDate.textContent = journalObject.date
  entryComponent.appendChild(currentDate)

  let currentEntry = document.createElement("p")
  currentEntry.textContent = journalObject.entry
  entryComponent.appendChild(currentEntry)

  let currentMood = document.createElement("p")
  currentMood.textContent = journalObject.mood.label
  entryComponent.appendChild(currentMood)

  return entryComponent

  }

  export default makeEntryComponent