(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = _interopRequireDefault(require("./render"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const apiHandler = {
  entryObjectCreator: function (curDate, curConcept, curEntry, curMood, curInstructor) {
    return {
      date: curDate,
      concept: curConcept,
      entry: curEntry,
      moodId: curMood,
      instructorId: curInstructor
    };
  },
  saveNewEntry: function (object) {
    return fetch("http://localhost:8088/entries/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json()); // .then(response => console.log(response))
  },
  loadExistingEntries: function () {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor").then(entries => entries.json()) // .then(entries => console.log(entries))
    .then(entries => (0, _render.default)(entries));
  },
  loadMoodCollection: function () {
    return fetch("http://localhost:8088/moods/").then(collection => collection.json()).then(collection => collection);
  },
  loadInstructorCollection: function () {
    return fetch("http://localhost:8088/instructors/").then(collection => collection.json()).then(collection => collection);
  }
};
var _default = apiHandler;
exports.default = _default;

},{"./render":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeEntryComponent = journalObject => {
  let entryComponent = document.createElement("section");
  entryComponent.className = "entry";
  let currentDate = document.createElement("h2");
  currentDate.textContent = journalObject.date;
  entryComponent.appendChild(currentDate);
  let entryList = document.createElement("ul");
  entryList.innerHTML = `
    <li>Concept: ${journalObject.concept}</li>
    <li>Entry: ${journalObject.entry}</li>
    <li>Mood: ${journalObject.mood.label}</li>
    <li>Instructor: ${journalObject.instructor.firstName} ${journalObject.instructor.lastName}</li>
  `;
  entryComponent.appendChild(entryList);
  return entryComponent;
};

var _default = makeEntryComponent;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _render = _interopRequireDefault(require("./render"));

var _data = _interopRequireDefault(require("./data"));

var _options = _interopRequireDefault(require("./options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_data.default.loadExistingEntries();

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", event => {
  let date = $("#dateInput").val();
  let concept = $("#conceptInput").val();
  let entryText = $("#entryTextInput").val();
  let mood = document.querySelector("#moodInput").options[moodInput.selectedIndex].value;
  let instructor = document.querySelector("#instructorInput").options[instructorInput.selectedIndex].value;

  let entryObj = _data.default.entryObjectCreator(date, concept, entryText, mood, instructor);

  $(".entryLog").empty();

  _data.default.saveNewEntry(entryObj).then(data => console.log(data)).then(data => _data.default.loadExistingEntries(data));

  date = "";
  concept = "";
  entryText = "";
  mood = 0;
  instructor = 0;
});
const radioBtns = document.getElementsByName("mood");
radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("click", event => {
    $(".entryLog").empty();
    let currentMood = event.target.value;

    _data.default.loadExistingEntries().then(entries => {
      return entries.filter(entry => {
        return entry.mood === currentMood;
      });
    }).then(returns => {
      (0, _render.default)(returns);
    });
  });
}); // let moodSelectMenu = document.querySelector("#moodInput")

_data.default.loadMoodCollection().then(collection => {
  collection.forEach(obj => {
    let newMoodOption = (0, _options.default)(obj.id, obj.label);
    moodInput.appendChild(newMoodOption);
  });
}); // let instructorSelectMenu = document.querySelector("#instructorInput")


_data.default.loadInstructorCollection().then(collection => {
  collection.forEach(obj => {
    let newInstOption = (0, _options.default)(obj.id, `${obj.firstName} ${obj.lastName}`);
    instructorInput.appendChild(newInstOption);
  });
});

},{"./data":1,"./options":4,"./render":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const optionMaker = (objId, objLabel) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", objId);
  newOption.innerHTML = objLabel;
  return newOption;
};

var _default = optionMaker;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entry = _interopRequireDefault(require("./entry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let entryLog = document.querySelector(".entryLog");

const addEntriesToDOM = entries => {
  let fragment = document.createDocumentFragment();
  entries.forEach(entry => {
    let entryComponent = (0, _entry.default)(entry);
    fragment.appendChild(entryComponent);
  });
  entryLog.appendChild(fragment);
};

var _default = addEntriesToDOM;
exports.default = _default;

},{"./entry":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJ5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9vcHRpb25zLmpzIiwiLi4vc2NyaXB0cy9yZW5kZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFFQSxNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLGtCQUFrQixFQUFFLFVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixRQUEvQixFQUF5QyxPQUF6QyxFQUFrRCxhQUFsRCxFQUFpRTtBQUNuRixXQUFPO0FBQ0wsTUFBQSxJQUFJLEVBQUUsT0FERDtBQUVMLE1BQUEsT0FBTyxFQUFFLFVBRko7QUFHTCxNQUFBLEtBQUssRUFBRSxRQUhGO0FBSUwsTUFBQSxNQUFNLEVBQUUsT0FKSDtBQUtMLE1BQUEsWUFBWSxFQUFFO0FBTFQsS0FBUDtBQU9ELEdBVGdCO0FBVWpCLEVBQUEsWUFBWSxFQUFFLFVBQVUsTUFBVixFQUFrQjtBQUM5QixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMvQyxNQUFBLE1BQU0sRUFBRSxNQUR1QztBQUUvQyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRnNDO0FBSy9DLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUx5QyxLQUFuQyxDQUFMLENBT04sSUFQTSxDQU9ELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQVBYLENBQVAsQ0FEOEIsQ0FTOUI7QUFDRCxHQXBCZ0I7QUFxQmpCLEVBQUEsbUJBQW1CLEVBQUUsWUFBWTtBQUMvQixXQUFPLEtBQUssQ0FBQywrREFBRCxDQUFMLENBQ04sSUFETSxDQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURWLEVBRVA7QUFGTyxLQUdOLElBSE0sQ0FHRCxPQUFPLElBQUkscUJB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ckQsQ0FBcEI7QUFDQSxJQUFBLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixhQUE1QjtBQUNELEdBSEQ7QUFLRCxDQVBIOzs7Ozs7Ozs7O0FDM0RBLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBRCxFQUFRLFFBQVIsS0FBcUI7QUFDdkMsTUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxZQUFWLENBQXVCLE9BQXZCLEVBQWdDLEtBQWhDO0FBQ0EsRUFBQSxTQUFTLENBQUMsU0FBVixHQUFzQixRQUF0QjtBQUNBLFNBQU8sU0FBUDtBQUNELENBTEQ7O2VBT2UsVzs7Ozs7Ozs7Ozs7QUNQZjs7OztBQUVBLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLENBQWY7O0FBRUEsTUFBTSxlQUFlLEdBQUksT0FBRCxJQUFhO0FBQ25DLE1BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxzQkFBVCxFQUFmO0FBQ0EsRUFBQSxPQUFPLENBQUMsT0FBUixDQUFnQixLQUFLLElBQUk7QUFDdkIsUUFBSSxjQUFjLEdBQUcsb0JBQW1CLEtBQW5CLENBQXJCO0FBQ0EsSUFBQSxRQUFRLENBQUMsV0FBVCxDQUFxQixjQUFyQjtBQUNELEdBSEQ7QUFJQSxFQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLFFBQXJCO0FBQ0QsQ0FQRDs7ZUFTZSxlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGFkZEVudHJpZXNUb0RPTSBmcm9tIFwiLi9yZW5kZXJcIlxuXG5jb25zdCBhcGlIYW5kbGVyID0ge1xuICBlbnRyeU9iamVjdENyZWF0b3I6IGZ1bmN0aW9uIChjdXJEYXRlLCBjdXJDb25jZXB0LCBjdXJFbnRyeSwgY3VyTW9vZCwgY3VySW5zdHJ1Y3Rvcikge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRlOiBjdXJEYXRlLFxuICAgICAgY29uY2VwdDogY3VyQ29uY2VwdCxcbiAgICAgIGVudHJ5OiBjdXJFbnRyeSxcbiAgICAgIG1vb2RJZDogY3VyTW9vZCxcbiAgICAgIGluc3RydWN0b3JJZDogY3VySW5zdHJ1Y3RvclxuICAgIH1cbiAgfSxcbiAgc2F2ZU5ld0VudHJ5OiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAvLyAudGhlbihyZXNwb25zZSA9PiBjb25zb2xlLmxvZyhyZXNwb25zZSkpXG4gIH0sXG4gIGxvYWRFeGlzdGluZ0VudHJpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcz9fZXhwYW5kPW1vb2QmX2V4cGFuZD1pbnN0cnVjdG9yXCIpXG4gICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgICAvLyAudGhlbihlbnRyaWVzID0+IGNvbnNvbGUubG9nKGVudHJpZXMpKVxuICAgIC50aGVuKGVudHJpZXMgPT4gYWRkRW50cmllc1RvRE9NKGVudHJpZXMpKVxuXG4gIH0sXG4gIGxvYWRNb29kQ29sbGVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tb29kcy9cIilcbiAgICAudGhlbihjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24uanNvbigpKVxuICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbilcbiAgfSxcbiAgbG9hZEluc3RydWN0b3JDb2xsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2luc3RydWN0b3JzL1wiKVxuICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5qc29uKCkpXG4gICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwaUhhbmRsZXJcblxuXG5cblxuXG5cblxuXG4iLCJjb25zdCBtYWtlRW50cnlDb21wb25lbnQgPSAoam91cm5hbE9iamVjdCkgPT4ge1xuXG4gIGxldCBlbnRyeUNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXG4gIGVudHJ5Q29tcG9uZW50LmNsYXNzTmFtZSA9IFwiZW50cnlcIlxuXG4gIGxldCBjdXJyZW50RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKVxuICBjdXJyZW50RGF0ZS50ZXh0Q29udGVudCA9IGpvdXJuYWxPYmplY3QuZGF0ZVxuICBlbnRyeUNvbXBvbmVudC5hcHBlbmRDaGlsZChjdXJyZW50RGF0ZSlcblxuICBsZXQgZW50cnlMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXG5cbiAgZW50cnlMaXN0LmlubmVySFRNTCA9IGBcbiAgICA8bGk+Q29uY2VwdDogJHtqb3VybmFsT2JqZWN0LmNvbmNlcHR9PC9saT5cbiAgICA8bGk+RW50cnk6ICR7am91cm5hbE9iamVjdC5lbnRyeX08L2xpPlxuICAgIDxsaT5Nb29kOiAke2pvdXJuYWxPYmplY3QubW9vZC5sYWJlbH08L2xpPlxuICAgIDxsaT5JbnN0cnVjdG9yOiAke2pvdXJuYWxPYmplY3QuaW5zdHJ1Y3Rvci5maXJzdE5hbWV9ICR7am91cm5hbE9iamVjdC5pbnN0cnVjdG9yLmxhc3ROYW1lfTwvbGk+XG4gIGBcbiAgZW50cnlDb21wb25lbnQuYXBwZW5kQ2hpbGQoZW50cnlMaXN0KVxuXG4gIHJldHVybiBlbnRyeUNvbXBvbmVudFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1ha2VFbnRyeUNvbXBvbmVudCIsImltcG9ydCBhZGRFbnRyaWVzVG9ET00gZnJvbSBcIi4vcmVuZGVyXCJcbmltcG9ydCBhcGlIYW5kbGVyIGZyb20gXCIuL2RhdGFcIlxuaW1wb3J0IG9wdGlvbk1ha2VyIGZyb20gXCIuL29wdGlvbnNcIlxuXG5cbmFwaUhhbmRsZXIubG9hZEV4aXN0aW5nRW50cmllcygpXG5cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdG5cIilcbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gIGxldCBkYXRlID0gJChcIiNkYXRlSW5wdXRcIikudmFsKClcbiAgbGV0IGNvbmNlcHQgPSAkKFwiI2NvbmNlcHRJbnB1dFwiKS52YWwoKVxuICBsZXQgZW50cnlUZXh0ID0gJChcIiNlbnRyeVRleHRJbnB1dFwiKS52YWwoKVxuICBsZXQgbW9vZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZElucHV0XCIpLm9wdGlvbnNbbW9vZElucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlXG4gIGxldCBpbnN0cnVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNpbnN0cnVjdG9ySW5wdXRcIikub3B0aW9uc1tpbnN0cnVjdG9ySW5wdXQuc2VsZWN0ZWRJbmRleF0udmFsdWVcblxuICBsZXQgZW50cnlPYmogPSBhcGlIYW5kbGVyLmVudHJ5T2JqZWN0Q3JlYXRvcihkYXRlLCBjb25jZXB0LCBlbnRyeVRleHQsIG1vb2QsIGluc3RydWN0b3IpXG5cbiAgJChcIi5lbnRyeUxvZ1wiKS5lbXB0eSgpXG4gIGFwaUhhbmRsZXIuc2F2ZU5ld0VudHJ5KGVudHJ5T2JqKVxuICAudGhlbihkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpKVxuICAudGhlbihkYXRhID0+IGFwaUhhbmRsZXIubG9hZEV4aXN0aW5nRW50cmllcyhkYXRhKSlcblxuICBkYXRlID0gXCJcIlxuICBjb25jZXB0ID0gXCJcIlxuICBlbnRyeVRleHQgPSBcIlwiXG4gIG1vb2QgPSAwXG4gIGluc3RydWN0b3IgPSAwXG59KVxuXG5cbmNvbnN0IHJhZGlvQnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwibW9vZFwiKVxuXG5yYWRpb0J0bnMuZm9yRWFjaChyYWRpb0J0biA9PiB7XG4gIHJhZGlvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAkKFwiLmVudHJ5TG9nXCIpLmVtcHR5KClcbiAgICBsZXQgY3VycmVudE1vb2QgPSBldmVudC50YXJnZXQudmFsdWVcbiAgICBhcGlIYW5kbGVyLmxvYWRFeGlzdGluZ0VudHJpZXMoKVxuICAgICAgLnRoZW4oZW50cmllcyA9PiB7XG4gICAgICAgIHJldHVybiBlbnRyaWVzLmZpbHRlcihlbnRyeSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGVudHJ5Lm1vb2QgPT09IGN1cnJlbnRNb29kXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmV0dXJucyA9PiB7XG4gICAgICAgIGFkZEVudHJpZXNUb0RPTShyZXR1cm5zKVxuICAgICAgfSlcbiAgfSlcbn0pXG5cbi8vIGxldCBtb29kU2VsZWN0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZElucHV0XCIpXG5hcGlIYW5kbGVyLmxvYWRNb29kQ29sbGVjdGlvbigpXG4gIC50aGVuKGNvbGxlY3Rpb24gPT4ge1xuICAgIGNvbGxlY3Rpb24uZm9yRWFjaChvYmogPT4ge1xuICAgICAgbGV0IG5ld01vb2RPcHRpb24gPSBvcHRpb25NYWtlcihvYmouaWQsIG9iai5sYWJlbClcbiAgICAgIG1vb2RJbnB1dC5hcHBlbmRDaGlsZChuZXdNb29kT3B0aW9uKVxuICAgIH0pXG4gIH0pXG5cbi8vIGxldCBpbnN0cnVjdG9yU2VsZWN0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5zdHJ1Y3RvcklucHV0XCIpXG5hcGlIYW5kbGVyLmxvYWRJbnN0cnVjdG9yQ29sbGVjdGlvbigpXG4gIC50aGVuKGNvbGxlY3Rpb24gPT4ge1xuICAgIGNvbGxlY3Rpb24uZm9yRWFjaChvYmogPT4ge1xuICAgICAgbGV0IG5ld0luc3RPcHRpb24gPSBvcHRpb25NYWtlcihvYmouaWQsIGAke29iai5maXJzdE5hbWV9ICR7b2JqLmxhc3ROYW1lfWApXG4gICAgICBpbnN0cnVjdG9ySW5wdXQuYXBwZW5kQ2hpbGQobmV3SW5zdE9wdGlvbilcbiAgICB9KVxuXG4gIH0pIiwiY29uc3Qgb3B0aW9uTWFrZXIgPSAob2JqSWQsIG9iakxhYmVsKSA9PiB7XG4gIGxldCBuZXdPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gIG5ld09wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBvYmpJZClcbiAgbmV3T3B0aW9uLmlubmVySFRNTCA9IG9iakxhYmVsXG4gIHJldHVybiBuZXdPcHRpb25cbn1cblxuZXhwb3J0IGRlZmF1bHQgb3B0aW9uTWFrZXJcblxuIiwiaW1wb3J0IG1ha2VFbnRyeUNvbXBvbmVudCBmcm9tIFwiLi9lbnRyeVwiXG5cbmxldCBlbnRyeUxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZW50cnlMb2dcIilcblxuY29uc3QgYWRkRW50cmllc1RvRE9NID0gKGVudHJpZXMpID0+IHtcbiAgbGV0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG4gIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgbGV0IGVudHJ5Q29tcG9uZW50ID0gbWFrZUVudHJ5Q29tcG9uZW50KGVudHJ5KVxuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVudHJ5Q29tcG9uZW50KVxuICB9KVxuICBlbnRyeUxvZy5hcHBlbmRDaGlsZChmcmFnbWVudClcbn1cblxuZXhwb3J0IGRlZmF1bHQgYWRkRW50cmllc1RvRE9NXG5cbiJdfQ==
