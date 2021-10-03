const today = new Date();
const saveDay = today.getDate();
const popupButton = document.querySelector('#popup-button')

console.log(today);

function popup_click() {
        localStorage.setItem('today', today);
       }    
const localDate = localStorage.getItem('today')
console.log(localStorage.getItem('today'));
function popup_closed() {
    self.close();
}
