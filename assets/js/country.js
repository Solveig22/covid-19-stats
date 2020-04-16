const ipstackApi =
    "http://api.ipstack.com/41.200.63.130?access_key=783e83095f58e1f55c41bbb7da89a702";
const covidSummaryApi = "https://api.covid19api.com/summary";
const covidCountryApi =
    "https://api.covid19api.com/all?from=2020-03-01T00:00:00Z&to=2020-04-15T00:00:00Z";

const loading = document.querySelector('.loading')
const stats = document.querySelectorAll(".stat");
const chart = document.querySelector(".ct-chart");

let labels = [];
let confirmedSeries = [];
let deathsSeries = [];
let newCase = [];
let objCountry, chartDatas, options;
let countryName, countryObject;
let statsData = [
    "NewConfirmed",
    "NewDeaths",
    "NewRecovered",
    "TotalConfirmed",
    "TotalDeaths",
    "TotalRecovered",
];

fetch(ipstackApi)
    .then((response) => response.json())
    .then((datas) => {
        countryName = datas.country_name
        fetch(covidSummaryApi)
            .then((response) => response.json())
            .then((datas) => {
                countryObject = datas.Countries.find(
                    (item) => item.Country === countryName
                )
                stats.forEach((stat, index) => {
                    let span = document.createElement("span")
                    span.innerText = countryObject[statsData[index]]
                    stat.appendChild(span)
                })

                fetch(covidCountryApi)
                    .then((response) => response.json())
                    .then((datas) => {
                        objCountry = datas.filter((item) => {
                            return item.Country === countryName && item.Confirmed !== 0
                        })

                        objCountry.forEach((item, index) => {
                            if (index % 2 == 0) {
                                let objDate = new Date(item.Date);
                                newCase.push()
                                labels.push(objDate.getDate() + "/" + (objDate.getMonth() + 1))
                                confirmedSeries.push(item.Confirmed)
                                deathsSeries.push(item.Deaths)
                            }
                        })

                        chartDatas = {
                            labels: labels,
                            series: [confirmedSeries, deathsSeries],
                        };

                        options = {
                            height: 350,
                            low: 10,
                            stretch: true,
                            plugins: [Chartist.plugins.tooltip()],
                            anchorToPoint: true,
                        }

                        loading.style.display = 'none'
                        new Chartist.Line(chart, chartDatas, options)
                    })
            })
    })