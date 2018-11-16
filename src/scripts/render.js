import makeEntryComponent from "./entry"

let entryLog = document.querySelector(".entryLog")

const addEntriesToDOM = (entries) => {
  let fragment = document.createDocumentFragment()
  entries.forEach(entry => {
    let entryComponent = makeEntryComponent(entry)
    fragment.appendChild(entryComponent)
  })
  entryLog.appendChild(fragment)
}

export default addEntriesToDOM

