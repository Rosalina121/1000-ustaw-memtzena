function refreshUstawa() {
    const number = document.querySelector(".text");
    const title = document.querySelector(".ustawa__title");
    const description = document.querySelector(".ustawa__text");

    fetch("http://local.palitechnika.com:3000/ustawa")
        .then((response) => {
            return response.json();
        })
        .then((ustawa) => {
            scrambleNumber(number, ustawa.number)
            if (ustawa.number === "665") {
                ustawaLokalizacyjna(description);
            } else {
                description.innerHTML = ustawa.description;
            }
            console.log(ustawa.number)
            title.innerHTML = `${ustawa.title}`;
            console.log(ustawa.title)
        })
        .catch((error) => {
            title.innerHTML = "Ustawa #404: Ustaw nie znaleziono";
            description.innerHTML =
                'Wygasł hosting czy co?\n<span style="font-family: Consolas, Menlo;">' +
                error +
                "<span>";
        });
}

refreshUstawa();
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createInterval(htmlElement, interval) {
    return setInterval(() => {
        htmlElement.innerHTML = `#${randomIntFromInterval(0, 999)}`;
    }, interval);
}

function clearTicker(interval, delay) {
    setTimeout(() => {
        clearInterval(interval);
    }, delay);
}

function scrambleNumber(htmlElement, finalNumber) {
    
    clearTicker(createInterval(htmlElement, 10), 500)
    clearTicker(createInterval(htmlElement, 20), 800)
    clearTicker(createInterval(htmlElement, 40), 1200)
    clearTicker(createInterval(htmlElement, 80), 1800)
    clearTicker(createInterval(htmlElement, 100), 2400)



    setTimeout(() => {
        htmlElement.innerHTML = `#${finalNumber}`;
    }, 2800);
}

function ustawaLokalizacyjna(description) {
    fetch("https://api.db-ip.com/v2/free/self")
    .then((response) => {
        return response.json();
    })
    .then((ip) => {
        console.log(ip)
        description.innerHTML = `<tt>${ip.ipAddress}<br>${ip.continentName}<br>${ip.countryName}<br>${ip.city}</tt>`
    })

}