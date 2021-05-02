// Initializing variable for array that will have all the data

let array = [];

// Getting IDs of the elements that we will work with
const addButton = document.getElementById("add");
const deleteButton = document.getElementById("delete");
const show = document.getElementById("show");

// Function that allows to work with the value of the input and assign the value to localStorage

const addItemToArray = function () {
  const input = document.getElementById("input");

  if (input.value.length === 0) {
    alert("Input cannot be empty. Please insert at least 1 character.");
    return;
  } else if (array.length === 26) {
    alert("Only 26 items are allowed.");
    return;
  } else {
    array.push(input.value);
    setValueOfStorage();
  }

  createNewElement();

  input.value = "";
};

// Function that creates new element

const createNewElement = function () {
  const newElement = document.createElement("div");
  show.appendChild(newElement);
  show.lastChild.setAttribute("class", "show__inner");

  array.forEach((item) => {
    show.lastChild.innerHTML = item;
  });
};

// Function for deleting element
const deleteAnElement = function () {
  show.lastChild.remove();
};

// Function that assigns values of the array to the localStorage
const setValueOfStorage = function () {
  localStorage.setItem("data", JSON.stringify(array));
};

// Getting data from local storage
const getDataFromLocalStorage = function () {
  return JSON.parse(localStorage.getItem("data"));
};

// Rendering data from local storage
const renderDataFromLocalStorage = function () {
  array = getDataFromLocalStorage();

  getDataFromLocalStorage().forEach((item) => {
    const newElement = document.createElement("div");
    show.appendChild(newElement).innerHTML = item;

    if (show.lastChild) {
      show.lastChild.setAttribute("class", "show__inner");
    }
  });
};

// Deleting last element from array
const deleteElementFromArray = function () {
  if (show.lastChild) {
    array.pop();
    deleteAnElement();
    setValueOfStorage();
    if (array.length === 0) {
      alert("Array is empty!");
    }
  }
};

// Check if there is any data stored in localStorage
const checkLocalStorage = function () {
  if (JSON.parse(localStorage.getItem("data"))) {
    return;
  } else {
    setValueOfStorage();
  }
};

checkLocalStorage();
renderDataFromLocalStorage();

// Assigning event listeners to the butttons that we created in the beginning
addButton.addEventListener("click", addItemToArray);
deleteButton.addEventListener("click", deleteElementFromArray);
