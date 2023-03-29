import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));
  let position = 1;

  for (let i = 0; i < amount; i++) {   
    makePromise(position, delay + step * i)
      .then(({position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({position, delay}) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    position += 1;
  }
  event.currentTarget.reset();
}
function makePromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}