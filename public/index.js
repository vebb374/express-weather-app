let input = document.getElementById("location_search");

const setWeather = (data, city) => {
  input.value = "";
  let discription = document.querySelector(".weather_status");
  discription.textContent = data.weather[0].description;
  let icon = document.getElementById("icon_");
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let location = document.querySelector(".location_status");
  location.textContent = data.weather.name;
  let humidity = document.querySelector(".humidity_value");
  humidity.textContent = data.main.humidity;
  let temperature = document.querySelector(".temperature_value");
  temperature.textContent = data.main.temp;
  let feels_like = document.querySelector(".feels_like_value");
  feels_like.textContent = data.main.feels_like;
};
document.onkeydown = function (evt) {
  city = input.value;
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
    fetch("/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        city: city,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWeather(data, city);
      })
      .catch((err) => {
        let invalid_address = document.querySelector(".weather_status");
        invalid_address.textContent = "ENTER A VALID LOCATION";
      });
  }
};
