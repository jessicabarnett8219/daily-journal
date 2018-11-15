const moodOptionMaker = (objId, objLabel) => {
  let newOption = document.createElement("option")
  newOption.setAttribute("value", objId)
  newOption.innerHTML = objLabel
  return newOption
}

export default moodOptionMaker

