const optionMaker = (objId, objLabel) => {
  let newOption = document.createElement("option")
  newOption.setAttribute("value", objId)
  newOption.innerHTML = objLabel
  return newOption
}

export default optionMaker

