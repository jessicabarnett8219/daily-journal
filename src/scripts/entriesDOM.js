import makeEntryComponent from "./entryComponent"

// function to loop over the entries array and add to DOM
const addEntriesToDOM = (entries) => {
  let entryLog = document.querySelector(".entryLog")
  let fragment = document.createDocumentFragment()
  entries.forEach(entry => {
    let entryComponent = makeEntryComponent(entry)
    fragment.appendChild(entryComponent)
  })
  entryLog.appendChild(fragment)
}

export default addEntriesToDOM

