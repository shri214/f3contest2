let fetch_btn = document.querySelector(".fecthing");
let demo = document.getElementById("demo");
let lans = document.querySelector(".lans");
let details = document.querySelector(".details");
let weather = document.querySelector(".weather");
let lat;
let lon;
fetch_btn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    console.log(lat, lon);

    lans.innerHTML = `<span>Lat: ${lat}</span><span>Long: ${lon} </span>`;

    fetch_btn.style.display = "none";
    demo.style.display = "block";

    var lattlong = new google.maps.LatLng(lat, lon);
    var myOptions = {
      center: lattlong,
      zoom: 15,
      mapTypeControl: true,
      navigationControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL,
      },
    };
    var maps = new google.maps.Map(document.getElementById("demo"), myOptions);
    new google.maps.Marker({
      position: lattlong,
      map: maps,
      title: "You are here!",
    });

    console.log(lat, lon);
    const END_POINT = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d4cd2f8f82755b4d77f813f5cbef36df`;
    fetch(END_POINT)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        weather.style.display = "block";
        console.log(data);
        console.log(data.value);
        details.innerHTML = `<div><span>Location: </span><span>${data.name}</span></div>
        <div id="latLon">
        <div><span>Lat: </span> <span>${data.coord.lat}</span></div>
        <div><span>Long: </span><span> ${data.coord.lon}</span></div>
        </div>
        <div><span>TimeZone: </span><span>${data.timezone}</span></div>
        <div><span>Wind Speed: </span><span>${data.wind.speed}</span></div>
        <div><span>Pressure: </span><span>${data.main.pressure}</span></div>
        <div><span>Humidity: </span><span>${data.main.humidity}</span></div>
        <div><span>Wind Direction: </span><span>${data.wind.deg}</span></div>
        <div><span>UV Index: </span><span>${data.timezone}</span></div>
        <div><span>Feels Like: </span><span>${data.main.feels_like}</span></div>`;
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
});
