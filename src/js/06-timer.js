import '../css/common.css'

//Таймер
const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stopBtn: document.querySelector('button[data-action-stop]'),
    clockface: document.querySelector('.js-clockface'),
}
class Timer {
  constructor({onTick}) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.init()
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time)
  }

   start() {
      //Робимо провірку чи старт вже запущено
    if (this.isActive) {
      return
    }
        //Визначаємо час поточний
    const startTime = Date.now();
    this.isActive = true;

        this.intervalId= setInterval(() => {
            //Визнач час після спрацювання інтервалу 1 сек
            const currentTime = Date.now();
            //Віднімаємо поточний час від стартового
            const deltaTime = currentTime - startTime;
          //Викликаємо ф-цію яка переводить deltaTime  в години хвилини 
            //Виконуємо деструктуризацію
          const time = this.getTimeComponents(deltaTime);
          this.onTick(time)

          // ( { hours, mins, secs })
            // console.log(`${hours}:${mins}:${secs}`);
        }, 1000);
     
  }
   stop() {
      clearInterval(this.intervalId);
     this.isActive = false;
     const time = this.getTimeComponents(0);
     this.onTick(time)
  }
   /*
   * - Принимает время в миллисекундах
   * - Высчитывает сколько в них вмещается часов/минут/секунд
   * - Возвращает обьект со свойствами hours, mins, secs
   * - Адская копипаста со стека 💩
   */
  getTimeComponents (time) {
    const hours =this.pad( Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
  }
   /*
   * Принимает число, приводит к строке и добавляет в начало 0 если число меньше 2-х знаков
   */
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockface
})
  
// запускаємо таймер при натиску на кнопку
refs.startBtn.addEventListener('click',
  timer.start.bind(timer));
//зупиняємо таймер
refs.stopBtn.addEventListener('click', timer.stop.bind(timer))


// Ф-ція яко отриманий час записує в інтерфейс
function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent=`${hours}:${mins}:${secs}`
}




