function calculateTime() {
  let startTime = document.getElementById('start-time').value;
  let endTime = document.getElementById('end-time').value;

  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
    document.getElementById('time-difference').innerHTML =
      'Formato inválido. Por favor, insira o tempo no formato hh:mm.';
    return;
  }

  startTime = startTime.split(':');
  endTime = endTime.split(':');

  let startDate = new Date();
  startDate.setHours(startTime[0]);
  startDate.setMinutes(startTime[1]);
  startDate.setSeconds(0);

  let endDate = new Date();
  endDate.setHours(endTime[0]);
  endDate.setMinutes(endTime[1]);
  endDate.setSeconds(0);

  let difference = endDate.getTime() - startDate.getTime();
  difference = Math.floor(difference / 1000 / 60);

  let hours = Math.floor(difference / 60);
  let minutes = difference % 60;

  let result = hours + ' horas e ' + minutes + ' minutos';
  document.getElementById('time-difference').innerHTML = result;
}

let inputs = document.querySelectorAll("input[type='text']");

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      if (i === inputs.length - 1) {
        inputs[0].focus();
        startTime.value = '';
      } else {
        inputs[i + 1].focus();
        endTime.value = '';
      }
    }
  });
}

let startTime = document.getElementById('start-time');

startTime.addEventListener('input', function () {
  if (this.value.length === 2) {
    this.value += ':';
  }
});
let endTime = document.getElementById('end-time');

endTime.addEventListener('input', function () {
  if (this.value.length === 2) {
    this.value += ':';
  }
});
