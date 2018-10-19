const journalEntries = [
  {
      date: "10/02/2018",
      concept: "Terminal & Git",
      entry: "We learned how to use the terminal to create files. We got set up with Git and GitHub. Still a little confusing ",
      mood: "content"
  },
  {
      date: "10/08/2018",
      concept: "FlexBox",
      entry: "We learned how to use flex box to lay out pages",
      mood: "happy"
  },
  {
      date: "10/12/2018",
      concept: "Objects",
      entry: "We learned how to work with objects and the differences between bracket and dot notation",
      mood: "content"
  }
]

let entryLog = document.querySelector(".entryLog")


// create the fragment
const fragment = document.createDocumentFragment()

const makeEntryComponent = (journalObject) => {
// create the entry container  (section?)
let entryComponent = document.createElement("section")
entryComponent.className = "entry"
// create the h2, add h2 text content
let currentConcept = document.createElement("h2")
currentConcept.textContent = journalObject.concept
// append the h2
entryComponent.appendChild(currentConcept)
// create the h3 and add text content
let currentDate = document.createElement("h3")
currentDate.textContent = journalObject.date
// append the h3
entryComponent.appendChild(currentDate)
// create the p for entry and add text content
let currentEntry = document.createElement("p")
currentEntry.textContent = journalObject.entry
// append the p entry
entryComponent.appendChild(currentEntry)
// create the p for mood and add text content
let currentMood = document.createElement("p")
currentMood.textContent = journalObject.mood
// append the p mood
entryComponent.appendChild(currentMood)
// return the container
return entryComponent
}

// function to add entries to the DOM. Calling the makeEntryComponent function inside.

const addEntriesToDOM = (array) => {
  for (i = 0; i < array.length; i++) {
    let entryComponent = makeEntryComponent(array[i])
    fragment.appendChild(entryComponent)
  } entryLog.appendChild(fragment)
}

// calling the function to add entries to the DOM
addEntriesToDOM(journalEntries)




 



