
const menubtn = document.querySelector('.menu-btn')
const navlink = document.querySelector('.nav-link')
menubtn.addEventListener('click', () => {
  navlink.classList.toggle('mobile-menu')
})
const text = "A WINDERFUL GIFT";
const target = document.getElementById("typing");

function startTypingAnimation() {
  let i = 0;
  target.textContent = "";

  function type() {
    if (i < text.length) {
      target.textContent += text.charAt(i);
      i++;
      setTimeout(type, 150);
    }
  }

  type();

  // Schedule to repeat the animation every 60 seconds
  setTimeout(startTypingAnimation, 6000);
}

startTypingAnimation();
