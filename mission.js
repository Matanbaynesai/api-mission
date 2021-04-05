let users = [];
const apiLink = "https://next.json-generator.com/api/json/get/NJ-UoW2Xq"
async function bringProfiles() {
    let result = await fetch(apiLink);
    let apiUsers = await result.json();
    let allUsers = [...apiUsers, ...users];

    return allUsers;
}

let profiles;
async function showProfiles() {
    history.pushState('cards', 'cards', '/index.html')

    mainDiv.innerHTML = "";
    profiles = await bringProfiles()
    profiles.forEach(profileObj => {
        mainDiv.innerHTML +=
            `<a href="/user.html?id=${profileObj._id}" class="profileDiv">
                <img class = profileImg src="${profileObj.picture}" alt="">
                <p>first name :${profileObj.name.first}</p>
                <p> last name: ${profileObj.name.last}</p>
                <p>age :${profileObj.age}</p>
                <p> email :${profileObj.email}</p>
                <p> phone number :${profileObj.phone}</p>
            </a>`
    });
}


let counter = 1;
async function tableProfiles() {
    history.pushState('table', 'table', '/index.html?mode=table')
    mainDiv.innerHTML = "";
    profiles = await bringProfiles()
    profiles.forEach(profileObj => {
        table.innerHTML += `
        <tr> 
            <td>
                <a href="/user.html?id=${profileObj._id}">${profileObj._id}</a>
            </td>
            <td>${profileObj.picture}</td>
            <td>${profileObj.name.first}</td>
            <td>${profileObj.name.last}</td>
            <td>${profileObj.age}</td>
            <td>${profileObj.email}</td>
            <td>${profileObj.phone}</td>    
        </tr>`
    });
}

function addUser(event) {
    // event.stopPropagation();
    event.preventDefault();
    let user = {
        _id: `${users.length + 1}`,
        name: {
            first: firstNameInput.value,
            last: lastNameInput.value,
        },


        age: ageInput.value,
        picture: imgInput.value,
        phone: phoneNumberInput.value,

    };


    users.push(user);
    loadMode();


}

function loadMode() {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('mode')) {
        const mode = searchParams.get('mode');
        if (mode === 'table') {
            tableProfiles();
        }
    } else {
        showProfiles();
    }
}


document.addEventListener('DOMContentLoaded', loadMode, false)

function createUser(paramFirst, paramLast, paramAge, paramImage ,paramMail){
    let user = new User(paramFirst, paramLast, paramAge, paramImage ,paramMail)
    console.log(user);
}

class User {
    constructor(firstName, lastName, age, image, email, phone) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.image = image;
      this.email = email;
      this.phone = phone;
    }
  }
  