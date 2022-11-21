// IIFE
(function () {
  let hour = document.querySelector(".hour");
  let minute = document.querySelector(".minute");
  let second = document.querySelector(".sec");

  let startBtn = document.querySelector(".start");
  let pauseBtn = document.querySelector(".pause");
  let resetBtn = document.querySelector(".reset");

  let countdownTimer = null;

  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
    startBtn.style.display = "initial";
    pauseBtn.style.display = "none";
    clearInterval(countdownTimer);
  }

  startBtn.addEventListener("click", function () {
    if (
      parseInt(hour.value, 10) === 0 &&
      parseInt(minute.value, 10) === 0 &&
      parseInt(second.value, 10) === 0
    ) {
      return;
    }

    function startInterval() {
      startBtn.style.display = "none";
      pauseBtn.style.display = "initial";

      countdownTimer = setInterval(() => {
        timer();
      }, 1000);
    }

    startInterval();
  });

  pauseBtn.addEventListener("click", function () {
    stopInterval("pause");
  });

  resetBtn.addEventListener("click", function () {
    hour.value = "";
    minute.value = "";
    second.value = "";
    stopInterval();
  });

  function timer() {
    if (parseInt(second.value, 10) > 60) {
      minute.value++;
      second.value = parseInt(second.value, 10) - 59;
    }
    if (parseInt(minute.value, 10) > 60) {
      hour.value++;
      minute.value = parseInt(minute.value, 10) - 60;
    }
    if (
      parseInt(hour.value, 10) === 0 &&
      parseInt(minute.value, 10) === 0 &&
      parseInt(second.value, 10) === 0
    ) {
      hour.value = "";
      minute.value = "";
      second.value = "";
      stopInterval();
    } else if (parseInt(second.value, 10) !== 0) {
      second.value = `${parseInt(second.value, 10) <= 10 ? "0" : ""}${
        parseInt(second.value, 10) - 1
      }`;
    } else if (
      parseInt(minute.value, 10) !== 0 &&
      parseInt(second.value, 10) === 0
    ) {
      second.value = "59";
      minute.value = `${parseInt(minute.value, 10) <= 10 ? "0" : ""}${
        parseInt(minute.value, 10) - 1
      }`;
    } else if (
      parseInt(hour.value, 10) !== 0 &&
      parseInt(minute.value, 10) === 0
    ) {
      minute.value = "60";
      hour.value = `${parseInt(hour.value, 10) <= 10 ? "0" : ""}${
        parseInt(hour.value, 10) - 1
      }`;
    }
  }
})();
