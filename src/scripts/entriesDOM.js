// function to loop over the entries array and add to DOM
const addEntriesToDOM = (array) => {
  let entryLog = document.querySelector(".entryLog")
  let fragment = document.createDocumentFragment()
  for (i = 0; i < array.length; i++) {
    let entryComponent = makeEntryComponent(array[i])
    fragment.appendChild(entryComponent)
  } entryLog.appendChild(fragment)
}



