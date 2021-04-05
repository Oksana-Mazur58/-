//Надоїдалка
import '../css/common.css'
import BSN from 'bootstrap.native';

const refs = {
    modal: document.querySelector('#subscription-modal'),
    subscribeBtn: document.querySelector('button[data-subscribe]')
}

const PROMT_DELAY = 3000;
const MAX_PROMT_ATTEMPTS = 3;
let promptCounter = 0;
let hasSubscribed = false;

const modal = new BSN.Modal('#subscription-modal')

openModal()

refs.modal.addEventListener('hide.bs.modal', openModal)
refs.subscribeBtn.addEventListener('click', onSubscribeBtnClick)

   
function openModal() {
    if (promptCounter === MAX_PROMT_ATTEMPTS || hasSubscribed) {
        return;
    }
    setTimeout(() => {
        modal.show()
        promptCounter += 1;
}, PROMT_DELAY)
}

function onSubscribeBtnClick() {
     hasSubscribed = true;
    modal.hide();
}