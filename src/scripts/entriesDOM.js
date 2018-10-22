// obtain reference to entry list container
let entryLog = document.querySelector(".entryLog")

// create fragment
let fragment = document.createDocumentFragment()

// function to loop over the entries array and add to DOM
const addEntriesToDOM = (array) => {
    for (i = 0; i < array.length; i++) {
      let entryComponent = makeEntryComponent(array[i])
      fragment.appendChild(entryComponent)
    } entryLog.appendChild(fragment)
  }

 

