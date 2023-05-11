let geo = []
// let WeatherObj
let cities = [
    "Los Angeles",
    "San Diego",
    "San Jose",
    "San Francisco",
    "Daly City",
    "San Mateo",
    "Newark",
    "San Leandro",
    "Tracy",
    "Hayward",
    "Fresno",
    "Sacramento",
    "Long Beach",
    "Oakland",
    "Mountain View",
    "Anaheim",
    "Santa Ana",
    "Riverside",
    "Stockton",
    "Chula Vista",
    "Irvine",
    "Fremont",
    "San Bernardino",
    "Modesto",
    "Berkeley",
    "Richmond",
    "Fontana",
    "Oxnard",
    "Moreno Valley",
    "Huntington Beach",
    "Glendale",
    "Santa Clarita",
    "Garden Grove",
    "Oceanside",
    "Rancho Cucamonga",
    "Santa Rosa",
    "Santa Cruz",
    "Ontario",
    "Elk Grove"
]
let weatherObj = {
    city: "",
    image: "",
    shortForecast: "",
    windSpeed: "",
    windDirection: "",
    temperature: "",
    humidity: "",
    gridId: "",
    gridX: 0,
    gridY: 0,
    idName: "",
    color: "",
    count: 0
}
document.addEventListener('DOMContentLoaded', () => {
    showCards()
    ListCitys()
    getCity()
    setInterval(callFunc, 300000)
    document.querySelector("#searchInput").addEventListener("search", SearchCity)
})




function getCity() {
    const selectCity = document.querySelector('#citys_name')
    let city

    selectCity.addEventListener('change', (event) => {
        event.preventDefault()
        city = event.target.value
        // return value
        // document.querySelector('#Display_city').innerText = `the city is ${event.target.value}  `
        // document.querySelector('#city_collection').appendChild(city)
        getCityLocation(city)
    })

}
async function getCityLocation(city) {
    const state = 'CA'
    const API_key = config.key
    try {
        const getres = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${API_key}`)
        const geoData = await getres.json()
        let lat = geoData.results[0].geometry.location.lat;
        let lng = geoData.results[0].geometry.location.lng

        const res = await fetch(`https://api.weather.gov/points/${lat},${lng}`)
        let e = await res.json()
        console.log(e)
        let weatherUrl = `https://api.weather.gov/gridpoints/${e.properties.gridId}/${e.properties.gridX},${e.properties.gridY}/forecast/hourly`
        const response = await fetch(weatherUrl)
        let data = await response.json()
        let index = data.properties.periods.findIndex(findIndex)

        let WeatherObj = data.properties.periods[index]
        console.log(WeatherObj)
        console.log(WeatherObj.shortForecast)
        CreaterenderWeather(WeatherObj, city, e.properties.gridId, e.properties.gridX, e.properties.gridY)

    } catch (error) {
        console.error('fetch city data error:', error)
    }

}

function findIndex(element) {
    let curtime = new Date()
    let StartDate = new Date(element.startTime);
    let EndDate = new Date(element.endTime);
    let localStartTime = new Date(StartDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    let localEndTime = new Date(EndDate.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    // console.log("local time: " + curtime +"start time:" + localStartTime+'end time'+ localEndTime)
    if (curtime >= localStartTime && curtime <= localEndTime) {
        return true
    } else {
        return false
    }
}



function ListCitys() {

    // StatesArray = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];


    let CitysOption = []
    let i = 0
    const cityName = document.querySelector('#citys_name')
    cities.forEach(city => {
        CitysOption[i] = document.createElement('option')
        CitysOption[i].value = city
        CitysOption[i].innerText = city
        cityName.appendChild(CitysOption[i])
        i++
    })


}


function getphoto(shortForecast, isDaytime) {
    let forecastPhoto
    let color
    switch (shortForecast) {
        case 'Sunny':
            forecastPhoto = './assets/day.svg'
            color = '#00BFFF'
            break;
        case 'Mostly Sunny':
            forecastPhoto = './assets/cloudy-day-1.svg'
            color = '#00BFFF'
            break;
        case 'Partly Sunny':
            forecastPhoto = './assets/cloudy-day-2.svg'
            color = '#00BFFF'
            break;
        case 'Partly Cloudy':
            if (isDaytime) {
                forecastPhoto = './assets/cloudy-day-2.svg'
                color = '#00BFFF'
            } else {
                forecastPhoto = './assets/cloudy-night-2.svg'
                color = '#0C1445'
            }
            break;
        case 'Mostly Cloudy':
            if (isDaytime) {
                forecastPhoto = './assets/cloudy-day-3.svg'
                color = '#00BFFF'
            } else {
                forecastPhoto = './assets/cloudy-night-3.svg'
                color = '#0C1445'
            }
            break;
        case 'Scatt­erred clouds':
            if (isDaytime) {
                forecastPhoto = './assets/cloudy-day-2.svg'
                color = '#00BFFF'
            } else {
                forecastPhoto = './assets/cloudy-night-2.svg'
                color = '#0C1445'
            }
            break
        case 'Cloudy':
            if (cityWeatherObj.isDaytime) {
                forecastPhoto = './assets/cloudy.svg'
                color = '#87CEFA'
            } else {
                forecastPhoto = './assets/cloudy.svg'
                color = '#0C1445'
            }
            break;
        case 'Mostly Clear':
            forecastPhoto = './assets/cloudy-night-1.svg'
            color = '#0C1445'
            break
        case 'Clear':
            forecastPhoto = './assets/night.svg'
            color = '#0C1445'
            break;
        case 'Patchy Drizzle':
            if (isDaytime) {
                forecastPhoto = './assets/cloud-day-3.svg'
                color = '#D3D3D3'
            } else {
                forecastPhoto = './assets/cloud-night-3.svg'
                color = '#0C1445'
            }
            break;
        case 'Slight Chance Light Rain':
            if (isDaytime) {
                forecastPhoto = './assets/rainy-2.svg'
                color = '#8290AC'
            } else {
                forecastPhoto = './assets/rainy-4.svg'
                color = '#0C1445'
            }
            break;
        case 'Rain Showers':
            forecastPhoto = './assets/rainy-7.svg'
            color = '#8C96A1'
            break;
        case 'Thunderstorms':
            forecastPhoto = './assets/thunder.svg'
            color = '#8C96A1'
            break;
    }
    return [forecastPhoto, color]
}

async function CreaterenderWeather(cityWeatherObj, cityName, GridId, GridX, GridY) {

    let forecastPhoto, color
    [forecastPhoto, color] = getphoto(cityWeatherObj.shortForecast, cityWeatherObj.isDaytime)
    // console.log(forecastPhoto)
    let HaveItem = false
    let getItem = null
    try {
        const res = await fetch("http://localhost:3000/weatherCards")
        let data = await res.json()
        getItem = data.find(function (item) {
            return item.city === cityName
        })
        if (getItem) {
            HaveItem = true
        }
    } catch (error) {
        console.log(error.message)
    }

    let index = cities.findIndex(function (item) {
        return item === cityName
    })
    console.log(index)
    weatherObj = {
        id: index,
        city: cityName,
        image: forecastPhoto,
        shortForecast: cityWeatherObj.shortForecast,
        windSpeed: cityWeatherObj.windSpeed,
        windDirection: cityWeatherObj.windDirection,
        temperature: cityWeatherObj.temperature,
        humidity: cityWeatherObj.relativeHumidity.value,
        gridId: GridId,
        gridX: GridX,
        gridY: GridY,
        color: color,
        count: 1,
    }

    if (HaveItem) {
        weatherObj.count = getItem.count
        updateWeatherCard(weatherObj)
    } else {
        renderWeather(weatherObj)
        addWeatherCard(weatherObj)

    }

}



function renderWeather(weatherObj) {
    const cityCard = document.createElement('div');
    cityCard.className = 'citycard';
    let unit = 'F'
    let idName = weatherObj.city
    idName = idName.replace(" ", '_')
    weatherObj.idName = idName

    cityCard.innerHTML = `
        <div id=${idName}>
        <div class="degrees"><img src = ${weatherObj.image} class = 'forecastphoto'  >${weatherObj.temperature}&deg${unit}</div>
        <div class="place">${weatherObj.city}</div>
        <div class="weather">${weatherObj.shortForecast}</div>
        <div class="wind">Wind: ${weatherObj.windSpeed} | Direction: ${weatherObj.windDirection}</div>
        <div class="humidity">Humidity: ${weatherObj.humidity}% </div>
        <div class="count">the info updated: ${weatherObj.count} times</div>
        </div>
        <button id="clean" class="clean">x</button>
        `
    cityCard.querySelector(`#${idName}`).style.backgroundColor = weatherObj.color
    cityCard.querySelector("#clean").addEventListener('click', () => {
        cityCard.remove()
        // console.log(weatherObj.id)
        removeCityWeather(weatherObj.id)
    })
    document.querySelector("#city_collection").appendChild(cityCard)
}


async function addWeatherCard(WeatherObj) {
    try {
        const res = await fetch("http://localhost:3000/weatherCards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(WeatherObj)
        })
        const item = await res.json()
        //   console.log(item)
    } catch (error) {
        console.log(error.message)
    }


}

async function updateWeatherCard(WeatherObj) {
    fetch(`http://localhost:3000/weatherCards/${WeatherObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(WeatherObj)
    })

}

async function showCards() {
    try {
        const res = await fetch("http://localhost:3000/weatherCards")
        let weatherCards = await res.json()
        // console.log(weatherCards)
        weatherCards.forEach(card => renderWeather(card))
    } catch (error) {
        console.log(error.message)
    }

}

async function removeCityWeather(id) {
    await fetch(`http://localhost:3000/weatherCards/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
}

async function UpdateddataBase(weatherObj) {
    let weatherUrl = `https://api.weather.gov/gridpoints/${weatherObj.gridId}/${weatherObj.gridX},${weatherObj.gridY}/forecast/hourly`
    const response = await fetch(weatherUrl)
    let data = await response.json()
    // console.log(weatherObj.city)
    // console.log(data.properties.periods)
    let index = data.properties.periods.findIndex(findIndex)

    let WeatherElement = data.properties.periods[index]
    console.log(WeatherElement)
    // console.log('ShortForecast',WeatherElement.shortForecast)
    let forecastPhoto, color
    [forecastPhoto, color] = getphoto(WeatherElement.shortForecast, WeatherElement.isDaytime)
    weatherObj.image = forecastPhoto
    weatherObj.shortForecast = WeatherElement.shortForecast
    weatherObj.windSpeed = WeatherElement.windSpeed
    weatherObj.windDirection = WeatherElement.windDirection
    weatherObj.temperature = WeatherElement.temperature
    weatherObj.humidity = WeatherElement.relativeHumidity.value
    weatherObj.color = color
    weatherObj.count++
    // console.log(WeatherElement.shortForecast)
    let unit = 'F'
    let element = document.querySelector(`#${weatherObj.idName}`)
    // console.log('element id: ' + element.id)
    element.style.backgroundColor = color
    const degree = element.querySelector(".degrees")
    // const place = element.querySelector(".place")
    const weather = element.querySelector(".weather")
    const wind = element.querySelector(".wind")
    const humidity = element.querySelector(".humidity")
    const count = element.querySelector(".count")

    degree.innerHTML = `<img src = ${forecastPhoto} class = 'forecastphoto'  >${WeatherElement.temperature}&deg${unit}`
    weather.textContent = `${WeatherElement.shortForecast}`
    wind.textContent = `Wind: ${WeatherElement.windSpeed} | Direction: ${WeatherElement.windDirection}`
    humidity.textContent = `Humidity: ${WeatherElement.relativeHumidity.value}% `
    count.innerHTML = `the info updated: ${weatherObj.count} times`
    // console.log('count:', count.textContent)
    // console.log('The weatherObj count: ' + WeatherElement.count)


    updateWeatherCard(weatherObj)

}

async function updateCard() {
    try {
        const res = await fetch("http://localhost:3000/weatherCards")
        let weatherCards = await res.json()
        // console.log(weatherCards)
        weatherCards.forEach(card => UpdateBase(card))
    } catch (error) {
        console.log(error.message)
    }
}

async function callFunc() {
    // updateCityWeatherObj()
    try {
        const res = await fetch("http://localhost:3000/weatherCards")
        let weatherCards = await res.json()
        // console.log('before updated database: ', weatherCards)
        weatherCards.forEach(card => UpdateddataBase(card))
    } catch (error) {
        console.log(error.message)

    }
}


function SearchCity() {
    let val = document.querySelector('#searchInput').value
    console.log(val)
    let input = val.toLowerCase()
    console.log(input)
    document.getElementById("demo").innerHTML = "The city you search is " + val.value
    let x = document.getElementsByClassName('citycard')
    // console.log(x)
    for (let i = 0; i < x.length; i++) {
        // i => console.log(i)
        if (x[i].children[0].children[1].textContent.toLowerCase().includes(input)) {
            x[i].style.display = "list-item"
            x[i].style.backgroundColor= x[i].children[0].style.backgroundColor
            x[i].style.display= "inline-grid"
        } else {
            x[i].style.display = "none"
        }
    }
    //    x.forEach()
    //    x.forEach((item)=>{
    //     console.log(item)
    //     // i
    //    })

    // 
}