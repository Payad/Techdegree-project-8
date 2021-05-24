

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");

//fetch data from API

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
// store the employee HTML as we create it
    let employeeHTML = '';

// loop through each employee and create HTML markup
employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    

    employeeHTML += `
    <div class="card" data-index="${index}">
    <img class="avatar" src="${picture.large}"/>
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    </div>
    </div>
    `
});  

gridContainer.innerHTML = employeeHTML;

}

// const searchUser = document.getElementById('search');

//Search filter 
function search_name() {
    //declare variables
    input = document.getElementById('search').value;
    input = input.toLowerCase();
    employeeName = document.getElementsByClassName('card');
     let a, textValue;

     //loop through list of names
    for (i = 0; i < employeeName.length; i++ ) {
        a = employeeName[i].getElementsByClassName('name')[0];
        textValue = a.textContent || a.innerText;
        if (textValue.toLowerCase().indexOf(input) > -1) {
            employeeName[i].style.display = "";
        } else {
            employeeName[i].style.display = "none";
        }

    }
}

const searchUser = document.getElementById('search');
searchUser.addEventListener('keyup', search_name);


function displayModal(index) {

let { name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];    
let date = new Date(dob.date);


const modalHTML = `
<img class="avatar" src="${picture.large}" />
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr/>
<p>${phone}</p>
<p class="address">${street.number}, ${street.name}, ${state} ${postcode}</p>
<p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
   
    <button class="arrow" id="left-arrow" onclick="prevModal(${index})"><</button>
    <button class="arrow" id="right-arrow" onclick="nextModal(${index})">></button>

 `;

    
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}       

gridContainer.addEventListener('click', e => {
    //make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {

        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }

});

modalClose.addEventListener('click', () => {
overlay.classList.add("hidden");

});

// next and previous model arrows
function prevModal(index) {
    let prevIndex = index -= 1;
    if (prevIndex > -1) {
        displayModal(prevIndex);

    } else {
        displayModal(11);
    }
}

function nextModal(index) {
    let nextIndex = index += 1;
    if (nextIndex < 12) {
        displayModal(nextIndex);

    } else {
        displayModal(0);
    }
}