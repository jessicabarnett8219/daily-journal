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
    return fetch("http://localhost:8088/entries/").then(entries => entries.json()).then(entries => entries);
  }
};
var _default = apiHandler;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./data":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2RhdGEuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLFVBQVUsR0FBRztBQUNqQixFQUFBLFlBQVksRUFBRSxVQUFVLE1BQVYsRUFBa0I7QUFDOUIsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDL0MsTUFBQSxNQUFNLEVBQUUsTUFEdUM7QUFFL0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZzQztBQUsvQyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7QUFMeUMsS0FBbkMsQ0FBWjtBQU9ELEdBVGdCO0FBVWpCLEVBQUEsbUJBQW1CLEVBQUUsWUFBWTtBQUMvQixXQUFPLEtBQUssQ0FBQyxnQ0FBRCxDQUFMLENBQ04sSUFETSxDQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBUixFQURWLEVBRU4sSUFGTSxDQUVELE9BQU8sSUFBSSxPQUZWLENBQVA7QUFHRDtBQWRnQixDQUFuQjtlQWlCZSxVOzs7Ozs7QUNqQmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBhcGlIYW5kbGVyID0ge1xuICBzYXZlTmV3RW50cnk6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy9cIiwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxuICAgIH0pXG4gIH0sXG4gIGxvYWRFeGlzdGluZ0VudHJpZXM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvZW50cmllcy9cIilcbiAgICAudGhlbihlbnRyaWVzID0+IGVudHJpZXMuanNvbigpKVxuICAgIC50aGVuKGVudHJpZXMgPT4gZW50cmllcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhcGlIYW5kbGVyXG5cblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IGFwaUhhbmRsZXIgZnJvbSBcIi4vZGF0YVwiIl19
