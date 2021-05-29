const daysEl = document.body.querySelector(".days");
const hoursEl = document.body.querySelector(".hours");
const minutesEl = document.body.querySelector(".minutes");
const secondsEl = document.body.querySelector(".seconds");
const optionEl = document.body.querySelector("#event-types");

const countdownFunc = () => {
  let eventDate = new Date().getTime();

  if(optionEl.value === "N") {
    eventDate = "01 jan 2022";
  } else if (optionEl.value === "I") {
    eventDate = "17 aug 2021";
  } else if (optionEl.value === "H") {
    eventDate = "31 oct 2021";
  } else {
    eventDate = new Date().getTime();
  }

  
  const currentDateSeconds = new Date().getTime() / 1000;
  const eventDateSeconds = new Date(eventDate).getTime() / 1000;
  const intervalSeconds = eventDateSeconds - currentDateSeconds;
  const days = Math.floor(intervalSeconds / 3600 / 24);
  const hours = Math.floor((intervalSeconds / 3600) % 24)
  const minutes = Math.floor((intervalSeconds / 60) % 60);
  const seconds = Math.floor(intervalSeconds % 60);

  daysEl.textContent = formatDate(days);
  hoursEl.textContent = formatDate(hours);
  minutesEl.textContent = formatDate(minutes);
  secondsEl.textContent = formatDate(seconds);
}

const formatDate = (date) => date < 10 ? `0${date}` : date;


setInterval(countdownFunc , 1000);