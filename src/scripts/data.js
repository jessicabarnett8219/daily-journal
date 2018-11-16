import addEntriesToDOM from "./render"

const apiHandler = {
  entryObjectCreator: function (curDate, curConcept, curEntry, curMood, curInstructor) {
    return {
      date: curDate,
      concept: curConcept,
      entry: curEntry,
      moodId: curMood,
      instructorId: curInstructor
    }
  },
  saveNewEntry: function (object) {
    return fetch("http://localhost:8088/entries/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
    })
    .then(response => response.json())
    // .then(response => console.log(response))
  },
  loadExistingEntries: function () {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor")
    .then(entries => entries.json())
    // .then(entries => console.log(entries))
    .then(entries => addEntriesToDOM(entries))

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








