let geo =[]
document.addEventListener('DOMContentLoaded',()=>{
    let state = 'CA'
    let city = 'San Francisco'
 
    getCityLocation(city,state)
    // geo.push(getCityLocation(city,state)
    // if(geo[0] != undefined && geo[1] != undefined){
    //     console.log('geometry:'+geo[0])
    // }
   
    // 
   
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
      fetch(`https://api.weather.gov/gridpoints/${gridID}/${gridX},${gridY}/forecast/hourly`)
        .then(res=>res.json())
        .then(e=>{
            let len = e.properties.periods.length
            // console.log(e.properties.periods[len-1])
            startTime = e.properties.periods[len-1].startTime;
            endTime = e.properties.periods[len-1].endTime;
            showMyLocaltime()
        })
    })

    
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
    const API_key = 'AIzaSyAZWvO6Bj5hK2q5gb8_p2jDnbe-COTXcVM'
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