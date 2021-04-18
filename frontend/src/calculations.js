/**
 * Gets the value from a group of radio buttons.
 * 
 * @param {*} element the element with the group of radio buttons.
 * @returns the selected radio value
 */
export const getRadioVal = (element) => {
  const options = document.getElementsByName(element);
  let val = "";
  options.forEach(elt => {
    if (elt.checked) {
      val = elt.value;
    }
  })
  return val;
}

/**
 * Gets the values from a group of checkboxes.
 * 
 * @param {*} element 
 * @returns the selected checkbox values
 */
export const getCheckedVals = (element) => {
  let result = []
  let markedCheckbox = document.getElementsByName(element);  
  for (let checkbox of markedCheckbox) {  
    if (checkbox.checked) {
      result.push(checkbox.value)
    }
  }  
  return result;
}

/**
 * Gets the value of all the selected exercises.
 * 
 * @param {*} element the list of exercises
 * @returns a list of all the selected exercises
 */
export const getSelected = (element) => {
  let selected = []
  for (let option of document.getElementById(element).options) {
    if (option.selected) {
      selected.push(option.value);
    }
  }
  return selected;
}
