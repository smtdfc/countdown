const socket = io()

function addMsg(t=false,user, msg) {
  let div = document.createElement("div")
  div.className = "message"
  div.textContent = `[${t ? `User ${user}`:"You"}]:${msg}`
  document.getElementById("messages").appendChild(div)
}

socket.on("chat message", function(data) {
  addMsg(true,data.id, data.msg)
})

document.getElementById("form_msg").addEventListener("submit",function (e) {
  e.preventDefault()
  
  let msg = document.getElementById("message_input").value 
  socket.emit("send message",{
    msg:msg
  })
  
  addMsg(false,null, msg)
})

function playMusic(param) {

  var audio = new Audio('./happynewyear.mp3');
  audio.play();

}

// Set the target date and time (New Year's)
const targetDate = new Date('January 1, 2024 00:00:00').getTime();

// Update the countdown every second
const countdownInterval = setInterval(() => {
  // Get the current date and time
  const currentDate = new Date().getTime();

  // Calculate the time difference between now and the target date
  const timeDifference = targetDate - currentDate;
  //console.log(timeDifference);
  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the countdown values
  document.getElementById('days').innerText = formatTime(days);
  document.getElementById('hours').innerText = formatTime(hours);
  document.getElementById('minutes').innerText = formatTime(minutes);
  document.getElementById('seconds').innerText = formatTime(seconds);

  // Check if it's the last minute

  if (minutes < 1 && hours == 0 && seconds < 59) {
    document.getElementById('day-countdown').style.display = "none"
    document.getElementById('hours-countdown').style.display = "none"
    document.getElementById('minutes-countdown').style.display = "none"
    document.getElementById('seconds').style.fontSize = "40px"
  }

  if (minutes < 1 && hours == 0 && seconds < 10) {

    document.getElementById('seconds').classList.add("effect")
    document.getElementById('seconds').style.fontSize = "60px"
    //  document.getElementById('right-panel').style.display = "none"
    //   document.getElementById('left-panel').style.display = "none"
  }

  if (minutes < 1 && hours == 0 && seconds == 0) {
    document.getElementById('right-panel').style.display = "none"
    document.getElementById('left-panel').style.display = "none"
    document.getElementById('firework').style.display = "block"
    setTimeout(() => {
      document.getElementById('right-panel').style.display = "block"

    }, 1 * 60 * 1000)

  }

  if (minutes < 1 && hours == 0 && seconds == 26) {
    playMusic()
  }


  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    document.getElementById('countdown').innerHTML = `
Thank you for participating in this event!
The year 2024 has arrived, and I wish everyone a year filled with joy, abundant health, and radiant success. Let's together create memorable moments and overcome challenges with optimism. Happy New Year, a year of new opportunities and boundless happiness!    `;
    document.getElementById('title').innerHTML = 'Happy New Year 2024 !';

  }
}, 1000);

// Helper function to format time with leading zeros
function formatTime(time) {
  return time < 10 ? '0' + time : time;
}