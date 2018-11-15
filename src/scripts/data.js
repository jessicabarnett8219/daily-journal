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
    return fetch("http://localhost:8088/entries?_expand=mood")
    .then(entries => entries.json())
    .then(entries => entries)
  },
  loadMoodCollection: function () {
    return fetch("http://localhost:8088/moods/")
    .then(collection => collection.json())
    .then(collection => collection)
  }
}

export default apiHandler








