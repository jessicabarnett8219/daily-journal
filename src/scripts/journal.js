const journalEntries = [
  {
      date: "10/02/2018",
      concept: "Terminal and Git",
      entry: "We learned how to use the terminal to create files. We got set up with Git and GitHub. Still a little confusing ",
      mood: "content"
  },
  {
      date: "10/08/2018",
      concept: "Flex Box",
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
/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
// const makeJournalEntryComponent = (journalEntry) => `
//   <div class = "entry">
//     <h2>${journalEntry["concept"]}</h2>
//     <h3>${journalEntry["date"]}</h3>
//     <p>${journalEntry["entry"]}</p> 
//     <p>${journalEntry["mood"]}</p> 
//   </div>
//  `

// create the fragment
const fragment = document.createDocumentFragment()

const makeJournalEntryComponent = (entryConcept, entryDate, currentEntry, entryMood) => {
// create the entry container  (section?)
let entryComponent = document.createElement("section")
// create the h2, add h2 text content
let concept = document.createElement("h2")
concept.textContent = entryConcept;
// append the h2
entryComponent.appendChild(concept)
// create the h3 and add text content
let date = document.createElement("h3")
date.textContent = entryDate
// append the h3
entryComponent.appendChild(date)
// create the p for entry and add text content
let entry = document.createElement("p")
entry.textContent = currentEntry
// append the p entry
entryComponent.appendChild(entry)
// create the p for mood and add text content
let mood = document.createElement("p")
mood.textContent = entryMood
// append the p mood
entryComponent.appendChild(mood)
// return the container
return entryComponent
}

const entry1 = makeJournalEntryComponent("functions", "Sept 3", "today was confusing", "sad")

console.log(entry1)



// append the container to the fragment
// append the container to the article in the DOM
 



