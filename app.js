// $.ajax({
//     url: 'https://randomuser.me/api/',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-text");
const modalClose = document.querySelector(".modal-close");
// const input = document.getElementById('search');
// const filter = input.value.toUpperCase();
// const ul = document.getElementById('searchList');
// const li = ul.getELementsByTagName('li');
// const a;
// const i;
// const txtValue;

// function nameList() {

// var input, filter, ul, li, a, i, txtValue;
// input = document.getElementById('search');
// filter = input.value.toUpperCase();
// ul = document.getElementById('searchList');
// li = ul.getElementsByTagName('li');

// for (i = 0; i < li.length; i++) {
//     a = li[i].getELementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         li[i].style.display = "";

//     } else {
//         li[i].style.display = "none";
//     }
// }
// }
        
//fetch data from API

// fetch('https://randomuser.me/api/?results=12&inc=img,firstName,lastName,email,city')
fetch(urlAPI)
// fetch('https://randomuser.me/api/?results=12&inc=name,picture,email,location,phone,dob,&noinfo,&nat=US')
.then(res => res.json())
// .then(data => console.log(data.response))
.then(res => res.results)
// .then(data => data.results)
.then(displayEmployees)
.catch(err => console.log(err))

// url: 'https://randomuser.me/api/',
// dataType: 'json',
// success: function(data) {
//   console.log(data);

// fetch('https://randomuser.me/api/')

// $.ajax({
//     url: 'https://randomuser.me/api/',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });

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

function displayModal(index) {

let { name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];    
let date = new Date(dob.date);

//  leftArrowButton = document.getElementById('left-arrow');
//  rightArrowButton = document.getElementById('right-arrow');

const modalHTML = `
<img class="avatar" src="${picture.large}" />
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr/>
<p>${phone}</p>
<p class="address">${street.name}, ${state} ${postcode}</p>
<p>Birthday:
    ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
    // <button class="arrow" id="left-arrow" onclick="prevModel(${index})"><</button>
    // <button class="arrow" id="right-arrow" onclick="nextModel(${index})">></button>
    <button class="arrow" id="left-arrow"><</button>
    <button class="arrow" id="right-arrow">></button>

    `;

{
    /* <button class="arrow" id="left-arrow"><</button>
    <button class="arrow" id="right-arrow">></button> */}

    leftArrowButton.addEventListener('click', () =>{
        let prevIndex = index -= 1;
        if (prevIndex > -1) {
            displayModel(prevIndex(index));
        } else {
            displayModel(11);
        }
    }); 

    rightArrowButton.addEventListener('click', () => {
let nextIndex = index += 1;
if (nextIndex < 12) {
    displayModel(nextIndex);
} else {
    displayModel(0);
}

    });

    


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

//next and previous model arrows
// function nextModel(index) {
//     let prevIndex = index -= 1;
//     if (prevIndex > -1) {
//         displayModel(prevIndex);

//     } else {
//         displayModel(11);
//     }
// }

// function prevModel(index) {
//     let nextIndex = index += 1;
//     if (nextIndex < 12) {
//         displayModel(nextIndex);

//     } else {
//         displayModel(0);
//     }
// }