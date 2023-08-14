function getRandomHexColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }

    let intervalId = null;
    let lastBackgroundColor = '';
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    const body = document.body;

    function changeBackgroundColor() {
      const randomColor = getRandomHexColor();
      body.style.backgroundColor = randomColor;
    }

    startButton.addEventListener('click', () => {
      if (!intervalId) {
        startButton.disabled = true;
        changeBackgroundColor();
        intervalId = setInterval(changeBackgroundColor, 1000); 
      }
    });

    stopButton.addEventListener('click', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        lastBackgroundColor = body.style.backgroundColor;
        startButton.disabled = false;
      }
      // Set the background color to the last recorded color when "Stop" was clicked
      body.style.backgroundColor = lastBackgroundColor;
    });
