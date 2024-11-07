function searchHandle(event) {
    event.preventDefault();

    let inputElement = document.querySelector(".search");
    let cityElement = document.querySelector(".location");
    cityElement.innerHTML=inputElement.value  
}

let outputElement = document.querySelector("#search-engine");
outputElement.addEventListener("submit", searchHandle);

