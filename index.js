function getColor() {
    return (
        "hsl(" +
        360 * Math.random() +
        "," +
        (25 + 70 * Math.random()) +
        "%," +
        (85 + 10 * Math.random()) +
        "%)"
    );
}

function getUstawaId() {
    // return Math.floor(Math.random() * 1000).toString();
    return "0";
}

const r = document.querySelector(":root");
const title = document.querySelector(".title");
const description = document.querySelector(".text");

r.style.setProperty("--bgColor", getColor());

fetch("http://localhost:3000/ustawa/" + getUstawaId())
    .then((response) => {
        return response.json();
    })
    .then((ustawa) => {
        console.log(ustawa)
        title.innerHTML = `<h1>#${ustawa.number}: ${ustawa.title}</h1>`;
        description.innerHTML = ustawa.description;
    })
    .catch((error) => {
        title.innerHTML = "#404: Ustaw nie znaleziono";
        description.innerHTML = "Wygasł hosting czy co?\n" + error;
    });
