//current 쿼리셀렉
const tempElement = document.querySelector('#temp');
const minElement = document.querySelector('#min');
const maxElement = document.querySelector('#max');
const windElement = document.querySelector('#wind');
const weatherElement = document.querySelector('#weather');
const iconElement = document.querySelector('#icon');
const weatherforecastElement = document.querySelector('#weatherforecast');

//섭씨변경
function convertTemp (temp) {
        return Math.ceil(temp - 273) + "°C"
};

axios.get('https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=76209317c9b1d073e5818a21195ec832')
        .then(function(response) {
          // let main = response.data.main;
          // let exdata = response.data.weather[0];
          // let windData = response.data.wind;

          const {main, weather, wind} = response.data;

          const icon_url = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

          tempElement.innerText = Math.ceil(main.temp -273) + "°C";
          minElement.innerText = Math.ceil(main.temp_min -273)
          maxElement.innerText = Math.ceil(main.temp_max -273)
          windElement.innerText = wind.speed;

          weather.innerText = weather[0].description;

          icon.setAttribute('src', icon_url);
        })
        .catch(function(error) {
            console.log(error);
        })

//async 활용하여 주간 날씨 조회하기 

async function fetchDailyWeather () {
        const dailyResponse = await fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=35.6895&lon=139.6917&appid=76209317c9b1d073e5818a21195ec832'
        )
        const dailyJson = await dailyResponse.json();

        //7일간의 날씨 데이터 생성
        for (let i = 1; i< 8; i++){
        
        //변수 지정
        const day = dailyJson.daily[i]

        const dailyTemp = convertTemp(day.temp.day);
        const dailyMin = convertTemp(day.temp.min);
        const dailyMax = convertTemp(day.temp.max);
        const dailyDescription = day.weather[0].description;
        const dailyIcon = day.weather[0].icon;
        const dailyIcon_url = `http://openweathermap.org/img/wn/${dailyIcon}@2x.png`;


        //요소 만들기
        const divElement = document.createElement('div');
        const descriptionElement = document.createElement('div');
        const dailyTempElement = document.createElement('div');
        const dailyMinElement = document.createElement('div');
        const dailyMaxElement = document.createElement('div');
        const iconElement = document.createElement('img');


        //텍스트 넣기
        descriptionElement.innerText = dailyDescription;
        dailyTempElement.innerText = dailyTemp;
        dailyMinElement.innerText = "Min: " + dailyMin;
        dailyMaxElement.innerText = "Max: " + dailyMax;
        iconElement.setAttribute('src', dailyIcon_url);

        console.log(weatherforecastElement);
        
        divElement.className = 'daily'
        
        //appenchild로 붙혀주기
        divElement.appendChild(iconElement);
        divElement.appendChild(dailyTempElement);
        divElement.appendChild(dailyMinElement);
        divElement.appendChild(dailyMaxElement);
        divElement.appendChild(descriptionElement);
        weatherforecastElement.appendChild(divElement);
}
        
                console.log(dailyJson)

                
}

fetchDailyWeather()


// 시간 변환
// var unixTimestamp = 1631671200
// var date = new Date(unixTimestamp*1000);
// console.log("Unix Timestamp:",unixTimestamp)
// console.log("Date Timestamp:",date.getTime())
// console.log(date)
// console.log("Date: "+date.getDate()+
//           "/"+(date.getMonth()+1)+
//           "/"+date.getFullYear());



// 구현하지 못한 것: 반복문으로 +7일까지의 날씨를 화면에 띄워보기
// createElement이용, 레이아웃은 html

