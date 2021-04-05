import '../css/common.css'
//ЧАС через який закриється оповіщення
const NOTIFICATION_DELAY = 3000;
//створ змінну для таймера
let timeoutID = null

const refs = {
    notification: document.querySelector('.js-alert'),
}
refs.notification.addEventListener('click', onNotificationClick);

showNotification()

function onNotificationClick() {
    hideNotification();
    clearTimeout(timeoutID);
}

function showNotification() {
    refs.notification.classList.add('is-visible');
    
     timeoutID = setTimeout(() => {
        console.log('dddddd')
      hideNotification()  
    }, NOTIFICATION_DELAY)
}

function hideNotification() {
    refs.notification.classList.remove('is-visible')
}