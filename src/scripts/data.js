 
fetch("http://localhost:8088/entries/") // Fetch from the API
    .then(entries => entries.json())  // Parse as JSON
    .then(entries => {
        // calling the function that creates the HTML component and adds all the entries to the DOM
        addEntriesToDOM(entries)
    })



