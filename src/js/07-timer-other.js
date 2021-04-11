import '../css/common.css'

//Таймер
const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stopBtn: document.querySelector('button[data-action-stop]'),
    clockface: document.querySelector('.js-clockface'),
}


const timer = {
  intervalId: null,
  isActive: false,

  start() {
      //Робимо провірку чи старт вже запущено
    if (this.isActive) {
      return
    }
        //Визначаємо час поточний
    const startTime = new Date('Jul 04, 2021');;
    this.isActive = true;

        this.intervalId= setInterval(() => {
            //Визнач час після спрацювання інтервалу 1 сек
            const currentTime = Date.now();
            //Віднімаємо поточний час від стартового
            const deltaTime = startTime - currentTime;
          //Викликаємо ф-цію яка переводить deltaTime  в години хвилини 
            //Виконуємо деструктуризацію
          const { hours, mins, secs } = getTimeComponents(deltaTime);
          updateClockface( { hours, mins, secs })
            console.log(`${hours}:${mins}:${secs}`);
        },1000);
    },
    stop() {
      clearInterval(this.intervalId);
      this.isActive = false
    }
}
// запускаємо таймер при натиску на кнопку
refs.startBtn.addEventListener('click',() => {
  timer.start()  
});
//зупиняємо таймер
refs.stopBtn.addEventListener('click', () => {
    timer.stop();
})


// Ф-ція яко отриманий час записує в інтерфейс
function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent=`${hours}:${mins}:${secs}`
}

 /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  function pad(value) {
    return String(value).padStart(2, '0');
  }


 /*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами hours, mins, secs
   * - Адская копипаста со стека 💩
   */
  function getTimeComponents (time) {
    const hours =pad( Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }