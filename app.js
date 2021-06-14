window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let feelsLike = document.querySelector('.feels-like');
    let temperatureFeelsLike = document.querySelector('.temperature-feels-like');
    let temperatureHumidity = document.querySelector('.temperature-humidity');
    const temperatureSpan = document.querySelector('.temperature span');
    const feelsLikeSpan = document.querySelector('.feels-like span');
   

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(postion =>{
            long = postion.coords.longitude;
            lat = postion.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=AUGXZUYH32ALE3WVJKQXJMBRX`;

            fetch(api)
            .then(responce =>{
                return responce.json();
            })
            .then(data => {
                console.log(data);
                
                const {temp, conditions, icon, feelslike, humidity} = data.currentConditions;
                //set DOM elements from the API
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = conditions;
                locationTimezone.textContent = data.timezone;
                temperatureFeelsLike.textContent = feelslike;
                temperatureHumidity.textContent = humidity; 
                //formula form C
                let celsius = (temp - 32) * (5/9);
                let celsius1 = (feelslike - 32) * (5/9);
                //setting icon
                setIcons(icon, document.querySelector('.icon'));

                
                [temperatureSection, feelsLike].forEach(item =>{
                    item.addEventListener('click', () =>{
                        if(temperatureSpan.textContent && feelsLikeSpan.textContent === "F"){
                            temperatureSpan.textContent = "°C";
                            feelsLikeSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                            temperatureFeelsLike.textContent = Math.floor(celsius1);
                        }else {
                            temperatureSpan.textContent = "F";
                            feelsLikeSpan.textContent ="F";
                            temperatureDegree.textContent = temp;
                            temperatureFeelsLike.textContent = feelslike;
                        }  
                    })
                })

            });
        });       
     } 

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});