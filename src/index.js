let geo =[]
let CityObj={
    city:'',
    state:''
}
document.addEventListener('DOMContentLoaded',()=>{
    let state = 'CA'
    let city = 'San Francisco'
 
    
    // geo.push(getCityLocation(city,state)
    // if(geo[0] != undefined && geo[1] != undefined){
    //     console.log('geometry:'+geo[0])
    // }
   
    // 
   ListStates()
//    let getstr =
    getState()
//    console.log(getstr)
//    document.querySelector('#Display_state').innerText= `we get state ${getstr}`
})

let gridX=11, gridY=12,startTime,endTime

function getWeather(lat, lng){
    console.log(lat, lng)
    fetch(`https://api.weather.gov/points/${lat},${lng}`)
    .then(res=>res.json())
    .then(e=>{
        console.log(e.properties)
      let gridID = e.properties.gridId
      let gridX = e.properties.gridX
      let gridY = e.properties.gridY
      let weatherUrl = `https://api.weather.gov/gridpoints/${gridID}/${gridX},${gridY}/forecast/hourly`
    //   console.log(weatherUrl)
    //   let curTime = new Date()
      fetch(weatherUrl)
        .then(res=>res.json())
        .then(e=>{
            // let len = e.properties.periods.length
            // console.log(e.properties.periods[len-1])
            // startTime = e.properties.periods[len-1].startTime;
            // endTime = e.properties.periods[len-1].endTime;
            // showMyLocaltime()
            console.log(e.properties.periods)
            let index = e.properties.periods.findIndex(findIndex)
            console.log(index)
            let WeatherObj = e.properties.periods[index]
            console.log(WeatherObj.shortForecast)
        })
    })

    
}

function findIndex(element){
    let curtime = new Date()
    let StartDate = new Date(element.startTime);
    let EndDate = new Date(element.endTime);
    let localStartTime = new Date(StartDate.toLocaleString('en-US',{timeZone:'America/Los_Angeles'}))
    let localEndTime = new Date(EndDate.toLocaleString('en-US',{timeZone:'America/Los_Angeles'}))
    console.log("local time: " + curtime +"start time:" + localStartTime+'end time'+ localEndTime)
    if(curtime >= localStartTime && curtime <= localEndTime){
        return true
    }else{
        return false
    }
}

function showMyLocaltime(){
    const localTime = new Date();
    let StartDate = new Date(startTime);
    let EndDate = new Date(endTime);
    let localStartTime = new Date(StartDate.toLocaleString('en-US',{timeZone:'America/Los_Angeles'}))
    let localEndTime = new Date(EndDate.toLocaleString('en-US',{timeZone:'America/Los_Angeles'}))
   
    console.log("local time: " + localTime +"start time:" + localStartTime+'end time'+ localEndTime)
    if(localTime >= localStartTime && localTime <= localEndTime){
        console.log('the local time match period')
    }else{
        console.log('the local time not match period')
    }
}

const getCityLocation = (city,state)=>{
    // let LAT=0, LONG=0
    // const url = ;
    // console.log(url)
    // let CityLoc = []
    const API_key = ''
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city},+${state}&key=${API_key}`)
    .then(res => res.json())
    .then(geoData=>{
        // console.log(geoData.results[0].geometry.location)
         geo[0] = geoData.results[0].geometry.location.lat;
         geo[1] = geoData.results[0].geometry.location.lng
        //  console.log([LAT,LONG])
        // console.log(geo)
        //  return [LAT, LONG]
        getWeather(geo[0],geo[1])
    })
    
}


function ListStates(){

    // StatesArray = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    cities = [
        "Los Angeles",
        "San Diego",
        "San Jose",
        "San Francisco",
        "Fresno",
        "Sacramento",
        "Long Beach",
        "Oakland",
        "Bakersfield",
        "Anaheim",
        "Santa Ana",
        "Riverside",
        "Stockton",
        "Chula Vista",
        "Irvine",
        "Fremont",
        "San Bernardino",
        "Modesto",
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
        "Ontario",
        "Elk Grove"
    ]
    
    let StateOption =[] 
    let i=0
    const stateName = document.querySelector('#state_name')
    cities.forEach(state=>{
        StateOption[i]=document.createElement('option')
        StateOption[i].value = state
        StateOption[i].innerText= state
        stateName.appendChild(StateOption[i])
        i++
    })
    

}

function getState(){
    const selectCity = document.querySelector('#new_state')
    let city
    const state= 'CA'
    selectCity.addEventListener('change',(event)=>{
        event.preventDefault()
        city = event.target.value
        // return value
    document.querySelector('#Display_state').innerText= `the state is ${event.target.value}  `  
    getCityLocation(city,state)
    })
    console.log(city)
    
}