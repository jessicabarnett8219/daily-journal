(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const apiHandler = {
  saveNewEntry: function (object) {
    return fetch("http://localhost:8088/entries/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    });
  },
  loadExistingEntries: function () {
    return fetch("http://localhost:8088/entries?_expand=mood").then(entries => entries.json()).then(entries => entries);
  },
  loadMoodCollection: function () {
    return fetch("http://localhost:8088/moods/").then(collection => collection.json()).then(collection => collection);
  }
};
var _default = apiHandler;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let entryLog = document.querySelector(".entryLog"); // function to loop over the entries array and add to DOM

const addEntriesToDOM = entries => {
  let fragment = document.createDocumentFragment();
  entries.forEach(entry => {
    let entryComponent = (0, _entryComponent.default)(entry);
    fragment.appendChild(entryComponent);
  });
  entryLog.appendChild(fragment);
};

var _default = addEntriesToDOM;
exports.default = _default;

},{"./entryComponent":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// function to make HTML component
const makeEntryComponent = journalObject => {
  let entryComponent = document.createElement("section");
  entryComponent.className = "entry";
  let currentConcept = document.createElement("h2");
  currentConcept.textContent = journalObject.concept;
  entryComponent.appendChild(currentConcept);
  let currentDate = document.createElement("h3");
  currentDate.textContent = journalObject.date;
  entryComponent.appendChild(currentDate);
  let currentEntry = document.createElement("p");
  currentEntry.textContent = journalObject.entry;
  entryComponent.appendChild(currentEntry);
  let currentMood = document.createElement("p");
  currentMood.textContent = journalObject.mood.label;
  entryComponent.appendChild(currentMood);
  return entryComponent;
};

var _default = makeEntryComponent;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

var _entriesDOM = _interopRequireDefault(require("./entriesDOM"));

var _data = _interopRequireDefault(require("./data"));

var _moodOptions = _interopRequireDefault(require("./moodOptions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_data.default.loadExistingEntries().then(entries => (0, _entriesDOM.default)(entries));

const submitBtn = document.querySelector("#submitBtn");
submitBtn.addEventListener("click", event => {
  let dateInput = document.querySelector("#dateInput");
  let conceptInput = document.querySelector("#conceptInput");
  let entryTextInput = document.querySelector("#entryTextInput");
  let moodInput = document.querySelector("#moodInput");
  const journalEntryObject = {
    date: dateInput.value,
    concept: conceptInput.value,
    entry: entryTextInput.value,
    moodId: moodInput.options[moodInput.selectedIndex].value
  };
  console.log(journalEntryObject);
  $(".entryLog").empty();

  _data.default.saveNewEntry(journalEntryObject).then(data => _data.default.loadExistingEntries(data)).then(entries => (0, _entriesDOM.default)(entries));

  dateInput.value = "";
  conceptInput.value = "";
  entryTextInput.value = "";
  moodInput.selectedIndex = 0;
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
      (0, _entriesDOM.default)(returns);
    });
  });
});
let moodSelectMenu = document.querySelector("#moodInput");

_data.default.loadMoodCollection().then(collection => {
  collection.forEach(obj => {
    let newOption = (0, _moodOptions.default)(obj.id, obj.label);
    moodSelectMenu.appendChild(newOption);
  });
});

},{"./data":1,"./entriesDOM":2,"./moodOptions":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const moodOptionMaker = (objId, objLabel) => {
  let newOption = document.createElement("option");
  newOption.setAttribute("value", objId);
  newOption.innerHTML = objLabel;
  return newOption;
};

var _default = moodOptionMaker;
exports.default = _default;

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJpZXNET00uanMiLCIuLi9zY3JpcHRzL2VudHJ5Q29tcG9uZW50LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9tb29kT3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sVUFBVSxHQUFHO0FBQ2pCLEVBQUEsWUFBWSxFQUFFLFVBQVUsTUFBVixFQUFrQjtBQUM5QixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUMvQyxNQUFBLE1BQU0sRUFBRSxNQUR1QztBQUUvQyxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRnNDO0FBSy9DLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUx5QyxLQUFuQyxDQUFaO0FBT0QsR0FUZ0I7QUFVakIsRUFBQSxtQkFBbUIsRUFBRSxZQUFZO0FBQy9CLFdBQU8sS0FBSyxDQUFDLDRDQUFELENBQUwsQ0FDTixJQURNLENBQ0QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFSLEVBRFYsRUFFTixJQUZNLENBRUQsT0FBTyxJQUFJLE9BRlYsQ0FBUDtBQUdELEdBZGdCO0FBZWpCLEVBQUEsa0JBQWtCLEVBQUUsWUFBWTtBQUM5QixXQUFPLEtBQUssQ0FBQyw4QkFBRCxDQUFMLENBQ04sSUFETSxDQUNELFVBQVUsSUFBSSxVQUFVLENBQUMsSUFBWCxFQURiLEVBRU4sSUFGTSxDQUVELFVBQVUsSUFBSSxVQUZiLENBQVA7QUFHRDtBQW5CZ0IsQ0FBbkI7ZUFzQmUsVTs7Ozs7Ozs7Ozs7QUN0QmY7Ozs7QUFDQSxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixDQUFmLEMsQ0FDQTs7QUFDQSxNQUFNLGVBQWUsR0FBSSxPQUFELElBQWE7QUFDbkMsTUFBSSxR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M0MsTUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQSxFQUFBLFNBQVMsQ0FBQyxZQUFWLENBQXVCLE9BQXZCLEVBQWdDLEtBQWhDO0FBQ0EsRUFBQSxTQUFTLENBQUMsU0FBVixHQUFzQixRQUF0QjtBQUNBLFNBQU8sU0FBUDtBQUNELENBTEQ7O2VBT2UsZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwaUhhbmRsZXIgPSB7XG4gIHNhdmVOZXdFbnRyeTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzL1wiLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXG4gICAgfSlcbiAgfSxcbiAgbG9hZEV4aXN0aW5nRW50cmllczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzP19leHBhbmQ9bW9vZFwiKVxuICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcy5qc29uKCkpXG4gICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzKVxuICB9LFxuICBsb2FkTW9vZENvbGxlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHMvXCIpXG4gICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLmpzb24oKSlcbiAgICAudGhlbihjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlclxuXG5cblxuXG5cblxuXG5cbiIsImltcG9ydCBtYWtlRW50cnlDb21wb25lbnQgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxubGV0IGVudHJ5TG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lbnRyeUxvZ1wiKVxuLy8gZnVuY3Rpb24gdG8gbG9vcCBvdmVyIHRoZSBlbnRyaWVzIGFycmF5IGFuZCBhZGQgdG8gRE9NXG5jb25zdCBhZGRFbnRyaWVzVG9ET00gPSAoZW50cmllcykgPT4ge1xuICBsZXQgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbiAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICBsZXQgZW50cnlDb21wb25lbnQgPSBtYWtlRW50cnlDb21wb25lbnQoZW50cnkpXG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZW50cnlDb21wb25lbnQpXG4gIH0pXG4gIGVudHJ5TG9nLmFwcGVuZENoaWxkKGZyYWdtZW50KVxufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRFbnRyaWVzVG9ET01cblxuIiwiLy8gZnVuY3Rpb24gdG8gbWFrZSBIVE1MIGNvbXBvbmVudFxuXG5jb25zdCBtYWtlRW50cnlDb21wb25lbnQgPSAoam91cm5hbE9iamVjdCkgPT4ge1xuXG4gIGxldCBlbnRyeUNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpXG4gIGVudHJ5Q29tcG9uZW50LmNsYXNzTmFtZSA9IFwiZW50cnlcIlxuXG4gIGxldCBjdXJyZW50Q29uY2VwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKVxuICBjdXJyZW50Q29uY2VwdC50ZXh0Q29udGVudCA9IGpvdXJuYWxPYmplY3QuY29uY2VwdFxuICBlbnRyeUNvbXBvbmVudC5hcHBlbmRDaGlsZChjdXJyZW50Q29uY2VwdClcblxuICBsZXQgY3VycmVudERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIilcbiAgY3VycmVudERhdGUudGV4dENvbnRlbnQgPSBqb3VybmFsT2JqZWN0LmRhdGVcbiAgZW50cnlDb21wb25lbnQuYXBwZW5kQ2hpbGQoY3VycmVudERhdGUpXG5cbiAgbGV0IGN1cnJlbnRFbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gIGN1cnJlbnRFbnRyeS50ZXh0Q29udGVudCA9IGpvdXJuYWxPYmplY3QuZW50cnlcbiAgZW50cnlDb21wb25lbnQuYXBwZW5kQ2hpbGQoY3VycmVudEVudHJ5KVxuXG4gIGxldCBjdXJyZW50TW9vZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4gIGN1cnJlbnRNb29kLnRleHRDb250ZW50ID0gam91cm5hbE9iamVjdC5tb29kLmxhYmVsXG4gIGVudHJ5Q29tcG9uZW50LmFwcGVuZENoaWxkKGN1cnJlbnRNb29kKVxuXG4gIHJldHVybiBlbnRyeUNvbXBvbmVudFxuXG4gIH1cblxuICBleHBvcnQgZGVmYXVsdCBtYWtlRW50cnlDb21wb25lbnQiLCJpbXBvcnQgYWRkRW50cmllc1RvRE9NIGZyb20gXCIuL2VudHJpZXNET01cIlxuaW1wb3J0IGFwaUhhbmRsZXIgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgbW9vZE9wdGlvbk1ha2VyIGZyb20gXCIuL21vb2RPcHRpb25zXCJcblxuXG5hcGlIYW5kbGVyLmxvYWRFeGlzdGluZ0VudHJpZXMoKVxuICAudGhlbihlbnRyaWVzID0+IGFkZEVudHJpZXNUb0RPTShlbnRyaWVzKSlcblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRCdG5cIilcblxuXG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBsZXQgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkYXRlSW5wdXRcIilcbiAgbGV0IGNvbmNlcHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uY2VwdElucHV0XCIpXG4gIGxldCBlbnRyeVRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlUZXh0SW5wdXRcIilcbiAgbGV0IG1vb2RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vZElucHV0XCIpXG5cbiAgY29uc3Qgam91cm5hbEVudHJ5T2JqZWN0ID0ge1xuICAgIGRhdGU6IGRhdGVJbnB1dC52YWx1ZSxcbiAgICBjb25jZXB0OiBjb25jZXB0SW5wdXQudmFsdWUsXG4gICAgZW50cnk6IGVudHJ5VGV4dElucHV0LnZhbHVlLFxuICAgIG1vb2RJZDogbW9vZElucHV0Lm9wdGlvbnNbbW9vZElucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlXG4gIH1cblxuICBjb25zb2xlLmxvZyhqb3VybmFsRW50cnlPYmplY3QpXG5cbiAgJChcIi5lbnRyeUxvZ1wiKS5lbXB0eSgpXG4gIGFwaUhhbmRsZXIuc2F2ZU5ld0VudHJ5KGpvdXJuYWxFbnRyeU9iamVjdClcbiAgICAudGhlbihkYXRhID0+IGFwaUhhbmRsZXIubG9hZEV4aXN0aW5nRW50cmllcyhkYXRhKSlcbiAgICAudGhlbihlbnRyaWVzID0+IGFkZEVudHJpZXNUb0RPTShlbnRyaWVzKSlcblxuICBkYXRlSW5wdXQudmFsdWUgPSBcIlwiXG4gIGNvbmNlcHRJbnB1dC52YWx1ZSA9IFwiXCJcbiAgZW50cnlUZXh0SW5wdXQudmFsdWUgPSBcIlwiXG4gIG1vb2RJbnB1dC5zZWxlY3RlZEluZGV4ID0gMDtcbn0pXG5cblxuY29uc3QgcmFkaW9CdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJtb29kXCIpXG5cbnJhZGlvQnRucy5mb3JFYWNoKHJhZGlvQnRuID0+IHtcbiAgcmFkaW9CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICQoXCIuZW50cnlMb2dcIikuZW1wdHkoKVxuICAgIGxldCBjdXJyZW50TW9vZCA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIGFwaUhhbmRsZXIubG9hZEV4aXN0aW5nRW50cmllcygpXG4gICAgICAudGhlbihlbnRyaWVzID0+IHtcbiAgICAgICAgcmV0dXJuIGVudHJpZXMuZmlsdGVyKGVudHJ5ID0+IHtcbiAgICAgICAgICByZXR1cm4gZW50cnkubW9vZCA9PT0gY3VycmVudE1vb2RcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgICAudGhlbihyZXR1cm5zID0+IHtcbiAgICAgICAgYWRkRW50cmllc1RvRE9NKHJldHVybnMpXG4gICAgICB9KVxuICB9KVxufSlcblxuXG5cblxubGV0IG1vb2RTZWxlY3RNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29kSW5wdXRcIilcbmFwaUhhbmRsZXIubG9hZE1vb2RDb2xsZWN0aW9uKClcbi50aGVuKChjb2xsZWN0aW9uKSA9PiB7XG4gIGNvbGxlY3Rpb24uZm9yRWFjaChvYmogPT4ge1xuICAgIGxldCBuZXdPcHRpb24gPSBtb29kT3B0aW9uTWFrZXIob2JqLmlkLCBvYmoubGFiZWwpXG4gICAgbW9vZFNlbGVjdE1lbnUuYXBwZW5kQ2hpbGQobmV3T3B0aW9uKVxuICB9KVxufSkiLCJjb25zdCBtb29kT3B0aW9uTWFrZXIgPSAob2JqSWQsIG9iakxhYmVsKSA9PiB7XG4gIGxldCBuZXdPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpXG4gIG5ld09wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBvYmpJZClcbiAgbmV3T3B0aW9uLmlubmVySFRNTCA9IG9iakxhYmVsXG4gIHJldHVybiBuZXdPcHRpb25cbn1cblxuZXhwb3J0IGRlZmF1bHQgbW9vZE9wdGlvbk1ha2VyXG5cbiJdfQ==
