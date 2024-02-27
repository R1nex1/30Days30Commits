const apiKey = // Enter your openweathermap API key here;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchField = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherImg = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        let data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "m/s";
    
        if(data.weather[0].main == "Clouds"){
            weatherImg.src = "images\\clouds.png"
        }
        else if(data.weather[0].main == "Clear"){
            weatherImg.src = "images\\clear.png"
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherImg.src = "images\\drizzle.png"
        }
        else if(data.weather[0].main == "Mist"){
            weatherImg.src = "images\\mist.png"
        }
        else if(data.weather[0].main == "Rain"){
            weatherImg.src = "images\\clear.png"
        }
        else if(data.weather[0].main == "Snow"){
            weatherImg.src = "images\\clear.png"
        }
    
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", ()=> {
    checkWeather(searchField.value);
})