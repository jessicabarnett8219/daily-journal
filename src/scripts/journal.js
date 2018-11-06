apiHandler.loadExistingEntries()

const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", (event) => {
  const journalEntryObject = {
    date: document.querySelector("#dateInput").value,
    concept: document.querySelector("#conceptInput").value,
    entry: document.querySelector("#entryTextInput").value,
    mood: ""
  }
  apiHandler.saveNewEntry(journalEntryObject)
  .then( data => {
    apiHandler.loadExistingEntries(data)
  })
})