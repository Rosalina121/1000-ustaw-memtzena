function getColorValues() {
    return {
        h: 360 * Math.random(),
        s: 25 + 70 * Math.random(),
        l: 65 + 10 * Math.random()
    }
}

function getHSLElement(hsl) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

function getHSLAElement(hsl, a) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a})`
}

const baseColor = getColorValues()
const suppColor = {h: baseColor.h, s: baseColor.s, l: baseColor.l + 7}
const shadowLColor = {h: baseColor.h, s: baseColor.s, l: baseColor.l + 10}
const shadowDColor = {h: baseColor.h, s: baseColor.s, l: baseColor.l - 70}

const bgColor = getHSLElement(baseColor)
const bgColor2 = getHSLElement(suppColor)
const shadowLight = getHSLAElement(shadowLColor, 0.45)
const shadowDark = getHSLAElement(shadowDColor, 0.3);

function getUstawaId() {
    return Math.floor(Math.random() * 26).toString();
}

const r = document.querySelector(":root");
const title = document.querySelector(".title");
const description = document.querySelector(".text");

r.style.setProperty("--bgColor", bgColor);
r.style.setProperty("--bgColor2", bgColor2);
r.style.setProperty("--shadowLight", shadowLight);
r.style.setProperty("--shadowDark", shadowDark);


fetch("http://localhost:3000/ustawa")
    .then((response) => {
        return response.json();
    })
    .then((ustawa) => {
        console.log(ustawa)
        title.innerHTML = `<h1>Ustawa #${ustawa.number}: ${ustawa.title}</h1>`;
        description.innerHTML = ustawa.description;
    })
    .catch((error) => {
        title.innerHTML = "<h1>Ustawa #404: Ustaw nie znaleziono</h1>";
        description.innerHTML = "Wygasł hosting czy co?\n<span style=\"font-family: Consolas, Menlo;\">" + error + "<span>";
    });
