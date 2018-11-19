const makeEntryComponent = (journalObject) => {

  let entryComponent = document.createElement("section")
  entryComponent.className = "entry"

  let currentDate = document.createElement("h3")
  currentDate.textContent = journalObject.date
  entryComponent.appendChild(currentDate)

  let entryList = document.createElement("ul")

  entryList.innerHTML = `
    <div class="divider"></div>
    <br>
    <li><span class="entry-label">Concept</span></br>${journalObject.concept}</li>
    <li><span class="entry-label">Entry</span></br>${journalObject.entry}</li>
    <li><span class="entry-label">Mood</span></br>${journalObject.mood.label}</li>
    <li><span class="entry-label">Instructor</span></br>${journalObject.instructor.firstName} ${journalObject.instructor.lastName}</li>
  `
  entryComponent.appendChild(entryList)

  return entryComponent

}

export default makeEntryComponent