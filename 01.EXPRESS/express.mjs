import express from 'express'
import path from 'path'
import cors from 'cors'
const app = express()
const __dirname = path.resolve()
const port = 3000
app.use(cors())


app.get('/weather/:cityName', (req, res) => {

    let weatherData = {
        karachi: {
            city: "karachi",
            temp: "50C",
            wind: "50km",
            humidity: 84
        },
        london: {
            city: "london",
            temp: "15C",
            wind: "25km",
            humidity: 44
        }
    }

    console.log(req)
    let userInputCityName = req.params.cityName.toLowerCase();
    console.log(userInputCityName)

    let weatherDataToSend = weatherData[userInputCityName]

    if (weatherDataToSend) {
        res.send(weatherDataToSend);
    } else {
        res.status(404)
            .send(`weather data is not available for ${userInputCityName}`);
    }

})

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
