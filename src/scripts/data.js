const apiHandler = {
  saveNewEntry: function (object) {
    return fetch("http://localhost:8088/entries/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
    })
  },
  loadExistingEntries: function () {
    return fetch("http://localhost:8088/entries/")
    .then(entries => entries.json())
    .then(entries => entries)
  }
}

export default apiHandler








