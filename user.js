const apiLink = "https://next.json-generator.com/api/json/get/NJ-UoW2Xq"
async function bringProfiles() {
    const result = await fetch(apiLink);
    const apiUsers = await result.json();
    return apiUsers;
}

async function getUserById(id) {
    const profiles = await bringProfiles();
    return profiles.find(profile => profile._id === id);

}

async function loadUser() {
    const searchParams = new URLSearchParams(location.search);
    if (!searchParams.has('id')) {
        user.classList = 'hidden';
        error.classList = '';
        error.innerText = 'No ID provided';
        return;
    }

    const id = searchParams.get('id');
    const u = await getUserById(id);
    console.debug('user: ', u);


    user.innerHTML = `
    <h1>User id: ${u._id}</h1>
    <div>
        <div>picture: ${u.picture}</div>
        <div>first name: ${u.name.first}</div>
        <div>last name: ${u.name.last}</div>
        <div>age: ${u.age}</div>
        <div>email: ${u.email}</div>
        <div>phone: ${u.phone}</div>
    </div>
    `;
}


document.addEventListener('DOMContentLoaded', loadUser, false);
