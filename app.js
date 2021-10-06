//current 쿼리셀렉
const tempElement = document.querySelector('#temp');
const minElement = document.querySelector('#min');
const maxElement = document.querySelector('#max');
const windElement = document.querySelector('#wind');
const weatherElement = document.querySelector('#weather');
const iconElement = document.querySelector('#icon');
const weatherforecastElement = document.querySelector('#weatherforecast');

//함수
function convertTemp (temp) {
        return Math.ceil(temp - 273) + "°C"
};
function getDate(d){
        const week = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat'];
        const dayOfWeek = week[new Date(d).getDay()];

        return dayOfWeek;
}


//팝업

const tomorrowUnix = localStorage.getItem('tomorrowUnix');
const now = new Date();
const now_unix = now.setDate(now.getDate() + 0);
console.log(now_unix);


// const open_win = function()
// {
//  window.open('popup.html','popup', 'width=300, height=200, left=50%, top=50%, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
// }

// if (now_unix > tomorrowUnix) {
//        return open_win();
// } else if (tomorrowUnix == undefined) {
//         return open_win();
// } 왜 안되는지 설명 듣기!!

function callPopup(){
        const open_win = function()
        {
         window.open('popup.html','popup', 'width=300, height=200, left=50%, top=50%, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
        }
        
        if (now_unix > tomorrowUnix) {
               return open_win();
        } else if (tomorrowUnix == undefined) {
                return open_win();
        }
        }
        callPopup();

//API CALL & CURRENT WEATHER
axios.get('https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=76209317c9b1d073e5818a21195ec832')
        .then(function(response) {
          // let main = response.data.main;
          // let exdata = response.data.weather[0];
          // let windData = response.data.wind;

          const {main, weather, wind} = response.data;
          const icon_num = weather[0].icon;

          //로컬스토리지 현재 날씨 정보 저징
          localStorage.setItem("wind", wind.speed);
          localStorage.setItem("temp", main.temp);
          localStorage.setItem("temp_min", main.temp_min);
          localStorage.setItem("temp_max", main.temp_max);
          localStorage.setItem("icon_num", icon_num);


          const icon_url = `http://openweathermap.org/img/wn/${icon_num}@2x.png`;
      

          tempElement.innerText = Math.ceil(main.temp -273) + "°C";
          minElement.innerText = Math.ceil(main.temp_min -273)
          maxElement.innerText = Math.ceil(main.temp_max -273)
          windElement.innerText = wind.speed;
          weather.innerText = weather[0].description;

          icon.setAttribute('src', icon_url);
        })
        .catch(function(error) {
            console.log(error);
            
            //에러일 때 로컬스토리지 정보 불러오기 
            const icon_num = localStorage.getItem("icon_num");
            const temp = localStorage.getItem("temp");
            const temp_min = localStorage.getItem("temp_min");
            const temp_max = localStorage.getItem("temp_max");
            const wind = localStorage.getItem("wind");

            const icon_url = `http://openweathermap.org/img/wn/${icon_num}@2x.png`;
            
            tempElement.innerText = Math.ceil(temp -273) + "°C";
            minElement.innerText = Math.ceil(temp_min -273)
            maxElement.innerText = Math.ceil(temp_max -273)
            windElement.innerText = wind;

            icon.setAttribute('src', icon_url);
          
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
        
        const timestamp = day.dt;
        const date = new Date(timestamp*1000);
        const days = date.getDate();
        const month = (date.getMonth()+1);
        const dailyTempDate = month + "/" + days
        const dotw = getDate(date);

        //요소 만들기
        const divElement = document.createElement('div');
        const descriptionElement = document.createElement('div');
        const dailyTempElement = document.createElement('div');
        const dailyMinElement = document.createElement('div');
        const dailyMaxElement = document.createElement('div');
        const iconElement = document.createElement('img');
        const dateElement = document.createElement('div');


        //텍스트 넣기
        dateElement.innerText = dailyTempDate + " " + dotw;
        descriptionElement.innerText = dailyDescription;
        dailyTempElement.innerText = dailyTemp;
        dailyMinElement.innerText = "Min: " + dailyMin;
        dailyMaxElement.innerText = "Max: " + dailyMax;
        iconElement.setAttribute('src', dailyIcon_url);

        console.log(weatherforecastElement);
        
        divElement.className = 'daily'
        
        //appenchild로 붙혀주기
        divElement.appendChild(dateElement);
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