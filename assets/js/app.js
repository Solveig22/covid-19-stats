fetch('https://api.covid19api.com/summary')
.then(response => response.json())
.then(datas => {
    const stats = document.querySelectorAll('.stat')
    
    console.log(datas.Countries)

    let global = [
        'NewConfirmed',
        'NewDeaths',
        'NewRecovered',
        'TotalConfirmed',
        'TotalDeaths',
        'TotalRecovered'
    ]
    
    stats.forEach((stat, index)=> {
        let span = document.createElement('span')
        span.innerText = new Intl.NumberFormat().format(datas.Global[global[index]])
            stat.appendChild(span)
        })

        datas.Countries.sort((a, b) => {
            return b.TotalConfirmed - a.TotalConfirmed
        })

        /*let stats = [
            'Country',
            'NewConfirmed',
            'NewDeaths',
            'NewRecovered',
            'TotalConfirmed',
            'TotalDeaths',
            'TotalRecovered'
        ]*/

        /*
        const tableStats = document.querySelector('.country-stats--table')

        datas.Countries.forEach((data, index) => {
            let row = document.createElement('tr')
            for(let i=0; i<stats.length + 1; i++) {
                let column = document.createElement('td')
                if(i === 0) {
                    column.innerText = (index + 1)
                }else {
                    let cpt = i - 1
                    let value = data[stats[cpt]]
                    if(isNaN(value)) {
                        column.innerText = value
                    }else {
                        column.innerText = new Intl.NumberFormat().format(value)
                    }
                }
                row.appendChild(column)
            }
            tableStats.appendChild(row)
        })
        */

    })