import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          icon: '',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          pauseOnHover: false,
          backgroundColor: '#59A10D',
          messageColor: '#ffffff',
        });
        resolve();
      } else {
        iziToast.error({
          icon: '',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          pauseOnHover: false,
          backgroundColor: '#EF4040',
          messageColor: '#ffffff',
        });
        reject();
      }
    }, delay);
  });

  promise
    .then(() => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(() => {
      console.log(`❌ Rejected promise in ${delay}ms`);
    });

  form.reset();
}
