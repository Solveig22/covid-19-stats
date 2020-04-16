let countryName
const ipstackApi = 'http://api.ipstack.com/41.200.63.130?access_key=783e83095f58e1f55c41bbb7da89a702'
const covidApi = 'https://api.covid19api.com/summary'

const stats = document.querySelectorAll('.stat')
const tablestatsData = document.querySelector('.stats-table')

const global = [
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered',
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered'
]

let statsData = [
    'Country',
    'NewConfirmed',
    'NewDeaths',
    'NewRecovered',
    'TotalConfirmed',
    'TotalDeaths',
    'TotalRecovered'
]

fetch(ipstackApi)
.then(response => response.json())
.then(countries => {
    
    countryName = countries.country_name

    fetch(covidApi)
    .then(response => response.json())
    .then(datas => {
        stats.forEach((stat, index)=> {
            let span = document.createElement('span')
            span.innerText = new Intl.NumberFormat().format(datas.Global[global[index]])
                stat.appendChild(span)
            })
    
            datas.Countries.sort((a, b) => {
                return b.TotalConfirmed - a.TotalConfirmed
            })

            datas.Countries.forEach((data, index) => {
                let row = document.createElement('tr')
                for(let i=0; i<statsData.length + 1; i++) {
                    let column = document.createElement('td')
                    if(i === 0) {
                        column.innerText = (index + 1)
                    }else {
                        let cpt = i - 1
                        let value = data[statsData[cpt]]
                        if(isNaN(value)) {
                            column.innerText = value
                            if(data.Country === countryName) {
                                row.style.backgroundColor = '#42A5F5'
                                row.style.color = '#FFFFFF'
                            }
                        }else {
                            column.innerText = new Intl.NumberFormat().format(value)
                        }
                    }
                    row.appendChild(column)
                }
                tablestatsData.appendChild(row)
            })
    
        })
})
