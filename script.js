

const searchbtn = document.getElementById("searchbtn");
const input = document.getElementById("input");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
let city = document.getElementById("location");
let toggle = document.getElementById("toggle");
let labelText = document.getElementById("labelText");
let card = document.getElementById("card");
let main2 = document.getElementsByClassName("main2");
let classes=["card","card-nightTheme"]


let day = {
    cloudy: "fa-solid fa-cloud-sun",
    clear: "fa-solid fa-sun",
    rainy: "fa-solid fa-cloud-sun-rain",
    snowy: "fa-solid fa-snowflake"
};

let night = {
    cloudy: "fa-solid fa-cloud-moon",
    clear: "fa-solid fa-moon",
    rainy: "fa-solid fa-cloud-moon-rain",
    snowy: "fa-solid fa-snowflake"
};

let place;
let weatherInfo;

toggle.addEventListener("change",()=>{
    if(toggle.checked){
        card.classList.remove("card-min")
        card.classList.add(classes[1])

        labelText.innerText="DARK MODE"
    }else{
        card.classList.remove(classes[1])
        card.classList.add(classes[0])
    }
})





searchbtn.addEventListener("click", () => {
    card.classList.remove("card-min")
    card.classList.add(classes[0])
   
    main2[0].style.display="flex"
   


    
    place = input.value;

    const fun1 = async () => {
        let weatherInfo = await getData(place);
        console.log(weatherInfo);
        
        // Set weather information
        temp.innerText = weatherInfo.temperature + "°C";
        humidity.innerText = weatherInfo.humidity + "%";
        windSpeed.innerText = weatherInfo.wind_speed + "km/h";
        city.innerText = place.toUpperCase();

        // Check if it is day or night and set appropriate weather icon
        if (weatherInfo.is_day === "yes") {  // Fixed comparison using `===`
            if (weatherInfo.weather_descriptions.some(description => description.includes("Clear") || description.includes("Clear"))) {
                weatherIcon.setAttribute("class", day.clear);
                console.log("Clear night mode set");
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("rainy") || description.includes("drizzle") || description.includes("thunderstorm") || description.includes("Drizzle") || description.includes("Thunderstorm"))) {
                weatherIcon.setAttribute("class", day.rainy);
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("cloudy") || (description => description.includes("Cloudy")) )) {
                weatherIcon.setAttribute("class", day.cloudy);
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("snowy")|| (description => description.includes("Snowy")))) {
                weatherIcon.setAttribute("class", day.snowy);
            }
            console.log("Day mode set");
        } else {
            if (weatherInfo.weather_descriptions.some(description => description.includes("Clear") || description.includes("Clear"))) {
                weatherIcon.setAttribute("class", night.clear);
                console.log("Clear night mode set");
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("rainy") || description.includes("drizzle") || description.includes("thunderstorm") || description.includes("Drizzle") || description.includes("Thunderstorm"))) {
                weatherIcon.setAttribute("class", night.rainy);
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("cloudy") || (description => description.includes("Cloudy")) )) {
                weatherIcon.setAttribute("class", night.cloudy);
            } else if (weatherInfo.weather_descriptions.some(description => description.includes("snowy")|| (description => description.includes("Snowy")))) {
                weatherIcon.setAttribute("class", night.snowy);
            }
            console.log("Night mode set");
        }
    };
    fun1();
});

async function getData(place) {
    let url = `https://api.weatherstack.com/current?access_key=174ba2f7cdf964d07a2f6f7e8b527495&query=${place}`;
    let result;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        result = await response.json();
    } catch (error) {
        console.error(error.message);
    }
    return result.current;
}
