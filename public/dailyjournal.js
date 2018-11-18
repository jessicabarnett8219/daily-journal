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
      moodId: +curMood,
      instructorId: +curInstructor
    };
  },
  saveNewEntry: function (object) {
    return fetch("http://localhost:8088/entries/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json());
  },
  loadExistingEntries: function () {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor").then(entries => entries.json()).then(entries => (0, _render.default)(entries));
  },
  fetchEntries: function () {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor").then(entries => entries.json());
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

_data.default.loadMoodCollection().then(collection => {
  collection.forEach(obj => {
    let newMoodOption = (0, _options.default)(obj.id, obj.label);
    moodInput.appendChild(newMoodOption);
  });
});

_data.default.loadInstructorCollection().then(collection => {
  collection.forEach(obj => {
    let newInstOption = (0, _options.default)(obj.id, `${obj.firstName} ${obj.lastName}`);
    instructorInput.appendChild(newInstOption);
  });
});

$("#submitBtn").click("click", event => {
  let date = $("#dateInput").val();
  let concept = $("#conceptInput").val();
  let entryText = $("#entryTextInput").val();
  let mood = document.querySelector("#moodInput").options[moodInput.selectedIndex].value;
  let instructor = document.querySelector("#instructorInput").options[instructorInput.selectedIndex].value;

  let entryObj = _data.default.entryObjectCreator(date, concept, entryText, mood, instructor);

  _data.default.saveNewEntry(entryObj).then(data => {
    $(".entryLog").empty();

    _data.default.loadExistingEntries(data);
  });
});
const radioBtns = document.getElementsByName("mood");
radioBtns.forEach(radioBtn => {
  radioBtn.addEventListener("click", event => {
    $(".entryLog").empty();
    let currentMood = parseInt(event.target.value, 10);

    _data.default.fetchEntries().then(entries => {
      return entries.filter(entry => {
        return entry.moodId === currentMood;
      });
    }).then(returns => {
      (0, _render.default)(returns);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL2VudHJ5LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIiwiLi4vc2NyaXB0cy9vcHRpb25zLmpzIiwiLi4vc2NyaXB0cy9yZW5kZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDQUE7Ozs7QUFFQSxNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLGtCQUFrQixFQUFFLFVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixRQUEvQixFQUF5QyxPQUF6QyxFQUFrRCxhQUFsRCxFQUFpRTtBQUNuRixXQUFPO0FBQ0wsTUFBQSxJQUFJLEVBQUUsT0FERDtBQUVMLE1BQUEsT0FBTyxFQUFFLFVBRko7QUFHTCxNQUFBLEtBQUssRUFBRSxRQUhGO0FBSUwsTUFBQSxNQUFNLEVBQUUsQ0FBQyxPQUpKO0FBS0wsTUFBQSxZQUFZLEVBQUUsQ0FBQztBQUxWLEtBQVA7QUFPRCxHQVRnQjtBQVVqQixFQUFBLFlBQVksRUFBRSxVQUFVLE1BQVYsRUFBa0I7QUFDOUIsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDL0MsTUFBQSxNQUFNLEVBQUUsTUFEdUM7QUFFL0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZzQztBQUsvQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7QUFMeUMsS0FBbkMsQ0FBTCxDQU9OLElBUE0sQ0FPRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFQWCxDQUFQO0FBUUQsR0FuQmdCO0FBb0JqQixFQUFBLG1CQUFtQixFQUFFLFlBQVk7QUFDL0IsV0FBTyxLQUFLLENBQUMsK0RBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxPQUFPLElBQUksT0FBTyxDQUFDLElBQVIsRUFEVixFQUVOLElBRk0sQ0FFRCxPQUFPLElBQUkscUJBQWdCLE9BQWhCLENB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QUFXLEdBQUcsQ0FBQyxLQUFELEVBQVEsUUFBUixLQUFxQjtBQUN2QyxNQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBLEVBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBdUIsT0FBdkIsRUFBZ0MsS0FBaEM7QUFDQSxFQUFBLFNBQVMsQ0FBQyxTQUFWLEdBQXNCLFFBQXRCO0FBQ0EsU0FBTyxTQUFQO0FBQ0QsQ0FMRDs7ZUFPZSxXOzs7Ozs7Ozs7OztBQ1BmOzs7O0FBRUEsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBZjs7QUFFQSxNQUFNLGVBQWUsR0FBSSxPQUFELElBQWE7QUFDbkMsTUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFULEVBQWY7QUFDQSxFQUFBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLEtBQUssSUFBSTtBQUN2QixRQUFJLGNBQWMsR0FBRyxvQkFBbUIsS0FBbkIsQ0FBckI7QUFDQSxJQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLGNBQXJCO0FBQ0QsR0FIRDtBQUlBLEVBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsUUFBckI7QUFDRCxDQVBEOztlQVNlLGUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgYWRkRW50cmllc1RvRE9NIGZyb20gXCIuL3JlbmRlclwiXG5cbmNvbnN0IGFwaUhhbmRsZXIgPSB7XG4gIGVudHJ5T2JqZWN0Q3JlYXRvcjogZnVuY3Rpb24gKGN1ckRhdGUsIGN1ckNvbmNlcHQsIGN1ckVudHJ5LCBjdXJNb29kLCBjdXJJbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGU6IGN1ckRhdGUsXG4gICAgICBjb25jZXB0OiBjdXJDb25jZXB0LFxuICAgICAgZW50cnk6IGN1ckVudHJ5LFxuICAgICAgbW9vZElkOiArY3VyTW9vZCxcbiAgICAgIGluc3RydWN0b3JJZDogK2N1ckluc3RydWN0b3JcbiAgICB9XG4gIH0sXG4gIHNhdmVOZXdFbnRyeTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9lbnRyaWVzL1wiLCB7XG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIH0sXG4gIGxvYWRFeGlzdGluZ0VudHJpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcz9fZXhwYW5kPW1vb2QmX2V4cGFuZD1pbnN0cnVjdG9yXCIpXG4gICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgICAudGhlbihlbnRyaWVzID0+IGFkZEVudHJpZXNUb0RPTShlbnRyaWVzKSlcblxuICB9LFxuICBmZXRjaEVudHJpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcz9fZXhwYW5kPW1vb2QmX2V4cGFuZD1pbnN0cnVjdG9yXCIpXG4gICAgLnRoZW4oZW50cmllcyA9PiBlbnRyaWVzLmpzb24oKSlcbiAgfSxcbiAgbG9hZE1vb2RDb2xsZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L21vb2RzL1wiKVxuICAgIC50aGVuKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbi5qc29uKCkpXG4gICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uKVxuICB9LFxuICBsb2FkSW5zdHJ1Y3RvckNvbGxlY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW5zdHJ1Y3RvcnMvXCIpXG4gICAgLnRoZW4oY29sbGVjdGlvbiA9PiBjb2xsZWN0aW9uLmpzb24oKSlcbiAgICAudGhlbihjb2xsZWN0aW9uID0+IGNvbGxlY3Rpb24pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBpSGFuZGxlclxuXG5cblxuXG5cblxuXG5cbiIsImNvbnN0IG1ha2VFbnRyeUNvbXBvbmVudCA9IChqb3VybmFsT2JqZWN0KSA9PiB7XG5cbiAgbGV0IGVudHJ5Q29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIilcbiAgZW50cnlDb21wb25lbnQuY2xhc3NOYW1lID0gXCJlbnRyeVwiXG5cbiAgbGV0IGN1cnJlbnREYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXG4gIGN1cnJlbnREYXRlLnRleHRDb250ZW50ID0gam91cm5hbE9iamVjdC5kYXRlXG4gIGVudHJ5Q29tcG9uZW50LmFwcGVuZENoaWxkKGN1cnJlbnREYXRlKVxuXG4gIGxldCBlbnRyeUxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIilcblxuICBlbnRyeUxpc3QuaW5uZXJIVE1MID0gYFxuICAgIDxsaT5Db25jZXB0OiAke2pvdXJuYWxPYmplY3QuY29uY2VwdH08L2xpPlxuICAgIDxsaT5FbnRyeTogJHtqb3VybmFsT2JqZWN0LmVudHJ5fTwvbGk+XG4gICAgPGxpPk1vb2Q6ICR7am91cm5hbE9iamVjdC5tb29kLmxhYmVsfTwvbGk+XG4gICAgPGxpPkluc3RydWN0b3I6ICR7am91cm5hbE9iamVjdC5pbnN0cnVjdG9yLmZpcnN0TmFtZX0gJHtqb3VybmFsT2JqZWN0Lmluc3RydWN0b3IubGFzdE5hbWV9PC9saT5cbiAgYFxuICBlbnRyeUNvbXBvbmVudC5hcHBlbmRDaGlsZChlbnRyeUxpc3QpXG5cbiAgcmV0dXJuIGVudHJ5Q29tcG9uZW50XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFrZUVudHJ5Q29tcG9uZW50IiwiaW1wb3J0IGFkZEVudHJpZXNUb0RPTSBmcm9tIFwiLi9yZW5kZXJcIlxuaW1wb3J0IGFwaUhhbmRsZXIgZnJvbSBcIi4vZGF0YVwiXG5pbXBvcnQgb3B0aW9uTWFrZXIgZnJvbSBcIi4vb3B0aW9uc1wiXG5cblxuYXBpSGFuZGxlci5sb2FkRXhpc3RpbmdFbnRyaWVzKClcbmFwaUhhbmRsZXIubG9hZE1vb2RDb2xsZWN0aW9uKClcbiAgLnRoZW4oY29sbGVjdGlvbiA9PiB7XG4gICAgY29sbGVjdGlvbi5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICBsZXQgbmV3TW9vZE9wdGlvbiA9IG9wdGlvbk1ha2VyKG9iai5pZCwgb2JqLmxhYmVsKVxuICAgICAgbW9vZElucHV0LmFwcGVuZENoaWxkKG5ld01vb2RPcHRpb24pXG4gICAgfSlcbiAgfSlcblxuYXBpSGFuZGxlci5sb2FkSW5zdHJ1Y3RvckNvbGxlY3Rpb24oKVxuICAudGhlbihjb2xsZWN0aW9uID0+IHtcbiAgICBjb2xsZWN0aW9uLmZvckVhY2gob2JqID0+IHtcbiAgICAgIGxldCBuZXdJbnN0T3B0aW9uID0gb3B0aW9uTWFrZXIob2JqLmlkLCBgJHtvYmouZmlyc3ROYW1lfSAke29iai5sYXN0TmFtZX1gKVxuICAgICAgaW5zdHJ1Y3RvcklucHV0LmFwcGVuZENoaWxkKG5ld0luc3RPcHRpb24pXG4gICAgfSlcbiAgfSlcblxuXG4kKFwiI3N1Ym1pdEJ0blwiKS5jbGljayhcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICBsZXQgZGF0ZSA9ICQoXCIjZGF0ZUlucHV0XCIpLnZhbCgpXG4gIGxldCBjb25jZXB0ID0gJChcIiNjb25jZXB0SW5wdXRcIikudmFsKClcbiAgbGV0IGVudHJ5VGV4dCA9ICQoXCIjZW50cnlUZXh0SW5wdXRcIikudmFsKClcbiAgbGV0IG1vb2QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb2RJbnB1dFwiKS5vcHRpb25zW21vb2RJbnB1dC5zZWxlY3RlZEluZGV4XS52YWx1ZVxuICBsZXQgaW5zdHJ1Y3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5zdHJ1Y3RvcklucHV0XCIpLm9wdGlvbnNbaW5zdHJ1Y3RvcklucHV0LnNlbGVjdGVkSW5kZXhdLnZhbHVlXG5cbiAgbGV0IGVudHJ5T2JqID0gYXBpSGFuZGxlci5lbnRyeU9iamVjdENyZWF0b3IoZGF0ZSwgY29uY2VwdCwgZW50cnlUZXh0LCBtb29kLCBpbnN0cnVjdG9yKVxuXG4gIGFwaUhhbmRsZXIuc2F2ZU5ld0VudHJ5KGVudHJ5T2JqKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgJChcIi5lbnRyeUxvZ1wiKS5lbXB0eSgpXG4gICAgICBhcGlIYW5kbGVyLmxvYWRFeGlzdGluZ0VudHJpZXMoZGF0YSlcbiAgICB9KVxufSlcblxuY29uc3QgcmFkaW9CdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJtb29kXCIpXG5yYWRpb0J0bnMuZm9yRWFjaChyYWRpb0J0biA9PiB7XG4gIHJhZGlvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAkKFwiLmVudHJ5TG9nXCIpLmVtcHR5KClcbiAgICBsZXQgY3VycmVudE1vb2QgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKVxuICAgIGFwaUhhbmRsZXIuZmV0Y2hFbnRyaWVzKClcbiAgICAgIC50aGVuKGVudHJpZXMgPT4ge1xuICAgICAgICByZXR1cm4gZW50cmllcy5maWx0ZXIoZW50cnkgPT4ge1xuICAgICAgICAgIHJldHVybiBlbnRyeS5tb29kSWQgPT09IGN1cnJlbnRNb29kXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgLnRoZW4ocmV0dXJucyA9PiB7XG4gICAgICAgIGFkZEVudHJpZXNUb0RPTShyZXR1cm5zKVxuICAgICAgfSlcbiAgfSlcbn0pXG5cbiIsImNvbnN0IG9wdGlvbk1ha2VyID0gKG9iaklkLCBvYmpMYWJlbCkgPT4ge1xuICBsZXQgbmV3T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKVxuICBuZXdPcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgb2JqSWQpXG4gIG5ld09wdGlvbi5pbm5lckhUTUwgPSBvYmpMYWJlbFxuICByZXR1cm4gbmV3T3B0aW9uXG59XG5cbmV4cG9ydCBkZWZhdWx0IG9wdGlvbk1ha2VyXG5cbiIsImltcG9ydCBtYWtlRW50cnlDb21wb25lbnQgZnJvbSBcIi4vZW50cnlcIlxuXG5sZXQgZW50cnlMb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVudHJ5TG9nXCIpXG5cbmNvbnN0IGFkZEVudHJpZXNUb0RPTSA9IChlbnRyaWVzKSA9PiB7XG4gIGxldCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeUNvbXBvbmVudCA9IG1ha2VFbnRyeUNvbXBvbmVudChlbnRyeSlcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbnRyeUNvbXBvbmVudClcbiAgfSlcbiAgZW50cnlMb2cuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFkZEVudHJpZXNUb0RPTVxuXG4iXX0=
