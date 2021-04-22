/* eslint-disable indent */
const form = document.querySelector('#submit')
const city = document.querySelector('.location')
const Weather = document.querySelector('.weather')
const minTemp = document.querySelector('#minTemp')
const maxTemp = document.querySelector('#maxTemp')
const Temp = document.querySelector('#temperature')
const welcome = document.querySelector('#welcome')
const status = document.querySelector('#status')

const para = document.createElement('p')
const api = {
    key: '84e3ce37011040abf36aaea9a1c60c3a'
}

form.addEventListener('submit', async function (e) {
    try {
        e.preventDefault()
        welcome.innerText = ''
        status.innerText = ''

        const cityName = form.elements.query.value
        // eslint-disable-next-line no-undef
        const url = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api.key}`)

        city.textContent = url.data.name
        Temp.innerText = `Currently ${calTemp(url.data.main.feels_like)}`
        Weather.textContent = url.data.weather[0].main
        minTemp.innerText = `Min: ${calTemp(url.data.main.temp_min)}`
        maxTemp.innerText = `Max: ${calTemp(url.data.main.temp_max)}`
        form.elements.query.value = ''
        para.innerText = null
    } catch (exception) {
        para.style.color = '#6e394e'
        para.style.fontSize = '30px'
        para.innerText = 'Oops...Enter valid city name'
        document.body.append(para)
        city.innerText = ''
        Temp.innerText = ''
        Weather.textContent = ''
        minTemp.innerText = ''
        maxTemp.innerText = ''
        form.elements.query.value = ''
    }
})

const calTemp = (Temperature) => {
    const finalT = Temperature - 273.15
    const finalt = finalT.toFixed(2)
    return `${finalt} ℃`
}
