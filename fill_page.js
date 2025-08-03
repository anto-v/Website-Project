const Poze = [
    {nume:"alien", src:"alien.jpg"},
    {nume:"annabelle", src:"annabelle.jpg"},
    {nume:'blair_witch', src:'blair_witch.jpg'},
    {nume:'babadook', src:'babadook.jpg'},
    {nume:'conjuring', src:'conjuring.jpg'},
    {nume:'carrie', src:'carrie.jpg'},
    {nume:'dracula', src:'dracula.jpg'},
    {nume:'dawn', src:'dawn_of_the_dead.jpg'}
];

var index = 0;
var lastUsedIndex = {}; 
inaltime = innerHeight;
latime = innerWidth;
var Procentaj_Ocupat = 0;
var Marime_Ocupata = 0;

window.onload = function() {
    var Text_Procentaj = document.createElement("div");
    Text_Procentaj.setAttribute("id", "txtp");
    Text_Procentaj.style.color = "white";
    Text_Procentaj.style.fontSize = "50px";
    Text_Procentaj.style.textAlign = "center";
    Text_Procentaj.textContent = Procentaj_Ocupat + "%";
    document.body.style.overflow = "hidden";
    var container = document.querySelector(".container");
    container.appendChild(Text_Procentaj);
    window.addEventListener("keyup", apas);
}

function apas(event) {
    let bila = document.createElement("div");
    bila.style.display = "inline-block";
    bila.style.position = "absolute";
    let imagine = document.createElement("img");

    let y_bila = Math.floor(Math.random() * inaltime) + 40;
    let x_bila = Math.floor(Math.random() * latime);
    bila.style.left = x_bila + "px";
    bila.style.top = y_bila + "px";
    let lat = (Math.random() * 250) + 20;
    let inal = (Math.random() * 250) + 20;
    imagine.style.width = lat + "px"; 
    imagine.style.height = inal + "px";
    bila.appendChild(imagine);
    bila.style.width = lat + "px";
    bila.style.height = inal + "px";
    Marime_Ocupata = lat * inal;
    let Valoare = (Marime_Ocupata / (inaltime * latime)) * 80;
    let ans = Math.round(Valoare * 10) / 10;
    Procentaj_Ocupat += ans;
    let Text_Proc = document.getElementById("txtp");
    Text_Proc.textContent = Procentaj_Ocupat + "%";
    if (Procentaj_Ocupat > 80) {
        alert("Good job, you move fast!");
        location.reload();
    }

    let initial = event.key;
    if (lastUsedIndex[initial] === undefined) {
        lastUsedIndex[initial] = -1;
    }
    let availableMovies = Poze.filter(p => p.nume.startsWith(initial));
    if (availableMovies.length > 0) {
        lastUsedIndex[initial] = (lastUsedIndex[initial] + 1) % availableMovies.length;
        index = Poze.indexOf(availableMovies[lastUsedIndex[initial]]);
    } else {
        return;
    }

    switch (event.key) {
        case "a":
            bila.style.borderColor = "red";
            bila.style.borderWidth = "5px";
            break;
        case "b":
            bila.style.borderColor = "green";
            bila.style.borderWidth = "5px";
            break;
        case "c":
            bila.style.borderColor = "yellow";
            bila.style.borderWidth = "5px";
            break;
        case "d":
            bila.style.borderColor = "pink";
            bila.style.borderWidth = "5px";
            break;
        default: return;
    }
    imagine.setAttribute("src", Poze[index].src);
    bila.appendChild(imagine);
    document.body.appendChild(bila);
    bila.addEventListener("click", clickez);
    let opacity = 1;
    let intervalId = setInterval(() => {
        opacity -= 0.01;
        bila.style.opacity = opacity;
        if (opacity <= 0) {
            let Valoare = (parseFloat(bila.style.width) * parseFloat(bila.style.height) / (inaltime * latime)) * 80;
            let ans = Math.round(Valoare * 10) / 10;
            Procentaj_Ocupat -= ans;
            if (Procentaj_Ocupat < 0)
                Procentaj_Ocupat = 0;
            let Text_Proc = document.getElementById("txtp");
            Text_Proc.textContent = Procentaj_Ocupat + "%";
            clearInterval(intervalId);
            document.body.removeChild(bila);
        }
    }, 50);
}

function clickez(event) {
    let bila = document.createElement("div");
    bila.style.display = "inline-block";
    bila.style.position = "absolute";

    let y_bila = Math.floor(Math.random() * inaltime) + 40;
    let x_bila = Math.floor(Math.random() * latime);
    bila.style.left = x_bila + "px";
    bila.style.top = y_bila + "px";

    let marime = event.target.offsetWidth;
    bila.style.width = marime + "px";
    bila.style.height = marime + "px";
    bila.style.borderColor = getComputedStyle(event.target).borderColor;
    bila.style.borderWidth = "5px";
    let imagine = document.createElement("img");
    imagine.setAttribute("src", Poze[index].src);
    imagine.style.width = marime + "px";
    bila.appendChild(imagine);
    document.body.appendChild(bila);
    let Valoare = (Marime_Ocupata / (inaltime * latime)) * 80;
    let ans = Math.round(Valoare * 10) / 10;
    Procentaj_Ocupat += ans;
    let Text_Proc = document.getElementById("txtp");
    Text_Proc.textContent = Procentaj_Ocupat + "%";
    if (Procentaj_Ocupat > 80) {
        alert("Good job, you move fast!");
        location.reload();
    }
    bila.addEventListener("click", clickez);
    let opacity = 1;
    let intervalId = setInterval(() => {
        opacity -= 0.01;
        bila.style.opacity = opacity;
        if (opacity <= 0) {
            let Valoare = (Marime_Ocupata / (inaltime * latime)) * 80;
            let ans = Math.round(Valoare * 10) / 10;
            Procentaj_Ocupat -= ans;
            if (Procentaj_Ocupat < 0)
                Procentaj_Ocupat = 0;
            let Text_Proc = document.getElementById("txtp");
            Text_Proc.textContent = Procentaj_Ocupat + "%";
            if (Procentaj_Ocupat > 50) {
                alert("Good job, you move fast!");
                location.reload();
            }
            clearInterval(intervalId);
            document.body.removeChild(bila);
        }
    }, 50);
    event.stopPropagation();
}

window.onload = function() {
    var button = document.getElementById("alien");
    if (button) {
        button.addEventListener("click", toggleAlienMode);
    }

    // Apply the mode based on the saved state
    if (localStorage.getItem("alienMode") === "true") {
        applyAlienMode();
    }

    var Text_Procentaj = document.createElement("div");
    Text_Procentaj.setAttribute("id", "txtp");
    Text_Procentaj.style.color = "white";
    Text_Procentaj.style.fontSize = "50px";
    Text_Procentaj.style.textAlign = "center";
    Text_Procentaj.textContent = Procentaj_Ocupat + "%";
    document.body.style.overflow = "hidden";
    var container = document.querySelector(".container");
    container.appendChild(Text_Procentaj);
    window.addEventListener("keyup", apas);
}

function applyAlienMode() {
    document.body.style.background = "linear-gradient(to bottom, grey, chartreuse)";
    
    var h1 = document.querySelector("h1");
    if (h1) {
        h1.style.backgroundColor = "green";
    }

    var otherHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");
    otherHeadings.forEach(function(heading) {
        heading.style.backgroundColor = "darkgreen";
    });

    var splatter = document.getElementById("splatter");
    if (splatter) {
        splatter.style.filter = "invert(1)";
    }

    var logo = document.getElementById("logo");
    if (logo) {
        logo.style.filter = "invert(1)";
    }
}

function revertAlienMode() {
    document.body.style.background = "";
    
    var h1 = document.querySelector("h1");
    if (h1) {
        h1.style.backgroundColor = "";
    }

    var otherHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");
    otherHeadings.forEach(function(heading) {
        heading.style.backgroundColor = "";
    });

    var splatter = document.getElementById("splatter");
    if (splatter) {
        splatter.style.filter = "";
    }
    
    var logo = document.getElementById("logo");
    if (logo) {
        logo.style.filter = "";
    }
}

function toggleAlienMode() {
    if (localStorage.getItem("alienMode") === "true") {
        revertAlienMode();
        localStorage.setItem("alienMode", "false");
    } else {
        applyAlienMode();
        localStorage.setItem("alienMode", "true");
    }
}

if (button) {
    button.addEventListener("click", toggleAlienMode);
}

// Apply the mode based on the saved state
if (localStorage.getItem("alienMode") === "true") {
    applyAlienMode();
}