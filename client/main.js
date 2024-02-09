const socket = io("https://hospitable-plaid-count.glitch.me/")

function addMsg(t=false,user, msg) {
  let div = document.createElement("div")
  div.className = "message"
  div.textContent = `[${t ? `Others`:"You"}]:${msg}`
  document.getElementById("messages").appendChild(div)
}

socket.on("message", function(data) {
  addMsg(true,data.id, data.msg)
})

document.getElementById("form_msg").addEventListener("submit",function (e) {
  e.preventDefault()
  
  let msg = document.getElementById("message_input").value 
  socket.emit("sendMsg",{
    msg:msg
  })
  
  addMsg(false,null, msg)
})

//window.addEventListener("resize", resizeCanvas, false);
// window.addEventListener("DOMContentLoaded", onLoad, false);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var canvas, ctx, w, h, particles = [],
  probability = 0.06,
  xPoint, yPoint;





function onLoad() {
  canvas = document.getElementById("canvas");
  canvas.style.display = "block"
  ctx = canvas.getContext("2d");
  resizeCanvas();

  window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
  if (!!canvas) {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
}

function updateWorld() {
  update();
  paint();
  window.requestAnimationFrame(updateWorld);
}

function update() {
  if (particles.length < 500 && Math.random() < probability) {
    createFirework();
  }
  var alive = [];
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].move()) {
      alive.push(particles[i]);
    }
  }
  particles = alive;
}

function paint() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
  }
}

function createFirework() {
  xPoint = Math.random() * (w - 200) + 100;
  yPoint = Math.random() * (h - 200) + 100;
  var nFire = Math.random() * 50 + 100;
  var c = "rgb(" + (~~(Math.random() * 200 + 55)) + "," +
    (~~(Math.random() * 200 + 55)) + "," + (~~(Math.random() * 200 + 55)) + ")";
  for (var i = 0; i < nFire; i++) {
    var particle = new Particle();
    particle.color = c;
    var vy = Math.sqrt(25 - particle.vx * particle.vx);
    if (Math.abs(particle.vy) > vy) {
      particle.vy = particle.vy > 0 ? vy : -vy;
    }
    particles.push(particle);
  }
}

function Particle() {
  this.w = this.h = Math.random() * 4 + 1;

  this.x = xPoint - this.w / 2;
  this.y = yPoint - this.h / 2;

  this.vx = (Math.random() - 0.5) * 10;
  this.vy = (Math.random() - 0.5) * 10;

  this.alpha = Math.random() * .5 + .5;

  this.color;
}

Particle.prototype = {
  gravity: 0.1,
  move: function() {
    this.x += this.vx;
    this.vy += this.gravity;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (this.x <= -this.w || this.x >= window.innerWidth ||
      this.y >= window.innerHeight ||
      this.alpha <= 0) {
      return false;
    }
    return true;
  },
  draw: function(c) {
    c.save();
    c.beginPath();

    c.translate(this.x + this.w / 2, this.y + this.h / 2);
    c.arc(0, 0, this.w, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;

    c.closePath();
    c.fill();
    c.restore();
  }
}

let started = false
// Âm thanh Tết (có thể thay đổi thành âm thanh khác)
const tetSound = new Audio('tet_sound.mp3');
// Tính toán thời gian còn lại đến Tết Giáp Thìn
function calculateCountdown() {
  const now = new Date();
  const tetGiapThin = new Date("2024-02-10T00:00:00");
  const difference = tetGiapThin - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let text = `${days}d ${hours}h ${minutes}m ${seconds}s`
    if (minutes == 0 && hours == 0 && seconds <= 10) {
      text = `${seconds}s`
    }
    document.getElementById("countdown").innerHTML = text

    // Phát âm thanh Tết khi còn 1 ngày trở lại
    if (days === 1 && hours === 0 && minutes === 0 && seconds === 0) {
      tetSound.play();
    }
  } else {
    if (!started) {
      document.getElementById("countdown").innerHTML = "Chúc mừng năm mới!";

      document.getElementById("container").style.display = "none"
      document.getElementById("left-panel").remove()
document.getElementById("right-panel").classList.add("active")
      onLoad()
      setTimeout(() => {
        document.getElementById("container").style.display = "block"
        //document.getElementById("container").style.background = "rgba(0,0,0,0)"
        document.getElementById("countdown").innerHTML = `
          <div style="padding:1rem; background:white;">
           <h3>Chúc mừng năm mới</h3>
           <span>Kính gửi tất cả các bạn thân mến, <br>
           Trong không khí rộn ràng của ngày Tết, chúng ta hân hoan chào đón năm mới Giáp Thìn với tất cả những niềm vui và hy vọng tươi sáng.Chúng ta đã cùng nhau trải qua một năm với những thử thách và khó khăn, nhưng cũng có những niềm vui và thành tựu đáng nhớ.Bằng sự đoàn kết và nỗ lực không ngừng, chúng ta đã vượt qua mọi khó khăn và bước vào năm mới với tinh thần mạnh mẽ và quyết tâm mới.Trong năm mới này, chúng ta hãy cùng nhau xây dựng một cộng đồng đoàn kết và hạnh phúc hơn bao giờ hết.Hãy chia sẻ yêu thương và niềm vui với nhau, và hãy hỗ trợ nhau trong mọi thử thách và thách thức.Chúc mừng năm mới Giáp Thìn!Chúc tất cả các bạn được mạnh khỏe, hạnh phúc và thành công trong mọi lĩnh vực của cuộc sống.Mong rằng năm mới sẽ mang lại nhiều cơ hội mới, may mắn và thành công cho mỗi người trong chúng ta.Xin chân thành cảm ơn và kính chúc mừng năm mới!Trân trọng,
           smtdfc study administrator group</span>
          </div>
        `;
        document.getElementById("countdown-header").style.display = "none";
        setTimeout(() => {
          document.getElementById("container").style.display = "none"
          canvas.style.display = "none"
        }, 15000)
      }, 10000)
    }
    started = true

  }
}
// Cập nhật countdown mỗi giây
setInterval(calculateCountdown, 1000);

// Tính toán countdown khi trang được tải lần đầu
calculateCountdown();