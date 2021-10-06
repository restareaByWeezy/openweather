const today = new Date();
const tomorrowUnix = today.setDate(today.getDate() + 1);
const popupButton = document.querySelector('#popup-button')


function popup_click() {
        localStorage.setItem('tomorrowUnix', today);
}    
console.log(localStorage.getItem('tomorrowUnix'));

function popup_closed() {
    self.close();
}
