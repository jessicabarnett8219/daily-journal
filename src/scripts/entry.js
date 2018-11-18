const makeEntryComponent = (journalObject) => {

  let entryComponent = document.createElement("section")
  entryComponent.className = "entry"

  let currentDate = document.createElement("h2")
  currentDate.textContent = journalObject.date
  entryComponent.appendChild(currentDate)

  let entryList = document.createElement("ul")

  entryList.innerHTML = `
    <li>Concept: ${journalObject.concept}</li>
    <li>Entry: ${journalObject.entry}</li>
    <li>Mood: ${journalObject.mood.label}</li>
    <li>Instructor: ${journalObject.instructor.firstName} ${journalObject.instructor.lastName}</li>
  `
  entryComponent.appendChild(entryList)

  return entryComponent

}

export default makeEntryComponent