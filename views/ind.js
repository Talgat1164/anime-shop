/* 2 task */

var now = new Date();
localStorage.time = now;


/* 3 task */

function setValues() {
    let name = document.getElementById("name").value
    let country = document.getElementById("country").value
    let email = document.getElementById("email").value
    localStorage.setItem('name', JSON.stringify(name));
    localStorage.setItem('country', JSON.stringify(country));
    localStorage.setItem('email', JSON.stringify(email));
}


document.getElementById("name1").innerHTML = localStorage.getItem("name");
document.getElementById("country1").innerHTML = localStorage.getItem("country");
document.getElementById("email1").innerHTML = localStorage.getItem("email");
document.getElementById("time").innerHTML = String(localStorage.getItem("time"));


