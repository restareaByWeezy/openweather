const today = new Date();
const todayUnix = today.setDate(today.getDate() + 0);
const popupButton = document.querySelector('#popup-button')


function popup_click() {
        localStorage.setItem('todayUnix', today);
}    
console.log(localStorage.getItem('today'));

function popup_closed() {
    self.close();
}