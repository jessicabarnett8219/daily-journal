import makeEntryComponent from "./entryComponent"
let entryLog = document.querySelector(".entryLog")
// function to loop over the entries array and add to DOM
const addEntriesToDOM = (entries) => {
  let fragment = document.createDocumentFragment()
  entries.forEach(entry => {
    let entryComponent = makeEntryComponent(entry)
    fragment.appendChild(entryComponent)
  })
  entryLog.appendChild(fragment)
}

export default addEntriesToDOM

