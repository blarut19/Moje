let device_type;
let interval_set = false;
let interval;

function start()
{
    document.getElementById("time_slider").value = 0;
    update();
}
function update()
{
    let weather = document.getElementById("weather");

    let time = document.getElementById("time_slider").value;
    let day = Math.floor(time/24);
    let hour_int = time%24;
    let hour = hour_int.toString();

    let forecast_day = new Date();
    let dd = String(forecast_day.getDate()+day).padStart(2, '0');
    let mm = String(forecast_day.getMonth() + 1).padStart(2, '0');
    let yyyy = forecast_day.getFullYear();
    weather.setAttribute("alt", "Forecast for " + dd + " " + mm + " " + yyyy + " at " + hour + ":00");
    
    forecast_day = yyyy + mm + dd;
    if(hour.length == 1)
    {
        hour = "0" + hour;
    }
    let path = "https://pl.sat24.com/image?type=forecastCloud&region=europa&timestamp="+ forecast_day + hour + "00";
    weather.src = path;
    console.log(weather)

    let description = document.getElementById("date");
    description.innerText = "Weather report for " + dd + " " + mm + " " + yyyy + " at " + hour + ":00";
}
function auto_update()
{
    if(interval_set == true){clearInterval(interval); interval_set=false; return;}
    document.getElementById("auto_update").disabled =  true;
    interval = setInterval(function(){
        interval_set = true;
        let slider = document.getElementById("time_slider");
        let time = parseInt(slider.value) + 3;
        if(time >= slider.getAttribute("max"))
            time = 0;
        slider.value = time;
        update();
        document.getElementById("auto_update").disabled =  false;
    }, 200);
}