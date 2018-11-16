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
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor")
    .then(entries => entries.json())
  },
  loadMoodCollection: function () {
    return fetch("http://localhost:8088/moods/")
    .then(collection => collection.json())
    .then(collection => collection)
  },
  loadInstructorCollection: function () {
    return fetch("http://localhost:8088/instructors/")
    .then(collection => collection.json())
    .then(collection => collection)
  }
}

export default apiHandler








