const dotenv = require("dotenv");
dotenv.config();

const api = {
  key: process.env.OPEN_WEATHER_API_KEY,
  call: "https://api.openweathermap.org/data/2.5/",
};

const https = require("https");

const weatherFetch = (city) => {
  https
    .get(
      `${api.call}weather?q=${city}&units=metric&appid=${api.key}`,
      (resp) => {
        resp.on("data", (d) => {
          //   console.log(d);
          const weat = JSON.parse(d);
          weat.cod == "404"
            ? console.log(weat.message)
            : console.log(
                `Location: ${weat.name} \n Tempreature: ${
                  weat.main.temp
                }*C \n Env: ${weat.weather[0].description} \n Visibility: ${
                  weat.visibility / 1000
                }km`
              );
        });
      }
    )
    .on("error", (err) =>
      console.log(`Error [weatherFetch() -> API CALL]: ${err}!`)
    );
};
// console.log(process.argv);

async function main() {
  const arg1 = process.argv[2];
  const arg2 = process.argv[3];
  //   console.log(arg1);
  //   console.log(arg2);

  if (arg1 === undefined) {
    console.error(
      "Error [main() -> arg1 check] : Command should be node index.js weather city_name"
    );
    process.exit(1);
  }
  if (arg2 === undefined) {
    console.error(
      "Error [main() -> arg2 check] : [provide city name] Command should be node index.js weather city_name"
    );
    process.exit(1);
  }
  weatherFetch(arg2);
}

main();
