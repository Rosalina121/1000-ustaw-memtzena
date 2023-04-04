function getColorValues() {
    return {
        h: 360 * Math.random(),
        s: 15 + 45 * Math.random(),
        l: 55 + 10 * Math.random()
    }
}

function getHSLElement(hsl) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
}

function getHSLAElement(hsl, a) {
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${a})`
}

function setColors() {
    const baseColor = getColorValues()
    const suppColor = {h: baseColor.h, s: baseColor.s + 10, l: baseColor.l + 25}
    const shadowLColor = {h: baseColor.h, s: baseColor.s, l: baseColor.l + 10}
    const shadowDColor = {h: baseColor.h, s: baseColor.s, l: baseColor.l - 70}
    
    const bgColor = getHSLElement(baseColor)
    const bgColor2 = getHSLElement(suppColor)
    const shadowLight = getHSLAElement(shadowLColor, 0.45)
    const shadowDark = getHSLAElement(shadowDColor, 0.3);

    const r = document.querySelector(":root");

    r.style.setProperty("--bgColor", bgColor);
    r.style.setProperty("--bgColor2", bgColor2);
    r.style.setProperty("--shadowLight", shadowLight);
    r.style.setProperty("--shadowDark", shadowDark);

    DarkReader.auto({
        brightness: 100,
        contrast: 105
    });
}

function getUstawaId() {
    return Math.floor(Math.random() * 26).toString();
}

function refreshUstawa() {
    const title = document.querySelector(".title");
    const description = document.querySelector(".text");

    fetch("http://local.palitechnika.com:3000/ustawa")
    .then((response) => {
        return response.json();
    })
    .then((ustawa) => {
        title.innerHTML = `<h1>Ustawa #${ustawa.number}: ${ustawa.title}</h1>`;
        description.innerHTML = ustawa.description;
        setColors()
    })
    .catch((error) => {
        title.innerHTML = "<h1>Ustawa #404: Ustaw nie znaleziono</h1>";
        description.innerHTML = "Wygasł hosting czy co?\n<span style=\"font-family: Consolas, Menlo;\">" + error + "<span>";
    });
}

setColors()
refreshUstawa()

