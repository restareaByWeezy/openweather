//current 쿼리셀렉
const tempElement = document.querySelector('#temp');
const minElement = document.querySelector('#min');
const maxElement = document.querySelector('#max');
const windElement = document.querySelector('#wind');
const weatherElement = document.querySelector('#weather');
const iconElement = document.querySelector('#icon');

//forecast 쿼리셀렉
const temp1Element = document.querySelector('#temp1');
const min1Element = document.querySelector('#min1')
const max1Element = document.querySelector('#max1')
const description1Element = document.querySelector('#description1')
const icon1Element = document.querySelector('#icon1')

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

        //필요한 데이터 변수 저장
        const dt1 = dailyJson.daily[1]
        const temp1 = Math.ceil(dailyJson.daily[1].temp.day -273) + "°C";
        const min1 = Math.ceil(dailyJson.daily[1].temp.min -273) + "°C";
        const max1 = Math.ceil(dailyJson.daily[1].temp.max -273) + "°C";
        const description1 = dailyJson.daily[1].weather[0].description;
        const icon1 = dailyJson.daily[1].weather[0].icon;
        const icon1_url = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
        
        
        try {
                console.log(temp1, min1, max1, description1, icon1);
                temp1Element.innerText = "Temp: "+ temp1
                min1Element.innerText = "Min: " + min1
                max1Element.innerText = "Max: " + max1
                description1Element.innerText = description1
                
                console.log(dailyJson)
                icon1.setAttribute('src', icon1_url);
                
        }
        catch(e){
                console.log(error);
        }
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


// //for문 작성 후 try안에 넣을 예정
for (let i = 1; i< 8; i++){
        //for문 내부에 변수 설정

        const day = dailyJson.daily[i]
        const dailyTemp = Math.ceil(day.temp.day -273) + "°C";
        const dailyMin = Math.ceil(day.temp.min -273) + "°C";
        const dailyMax = Math.ceil(day.temp.max -273) + "°C";
        const dailyDescription = day.weather[0].description;
        const dailyIcon = day.weather[0].icon;
        const dailyIcon_url = `http://openweathermap.org/img/wn/${dailyIcon}@2x.png`;

        
}
// 구현하지 못한 것: 반복문으로 +7일까지의 날씨를 화면에 띄워보기
// createElement이용, 레이아웃은 html