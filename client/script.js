document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".fade-in");
    if (!fadeElements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        function (entries, activeObserver) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("active");
                activeObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    fadeElements.forEach(function (element) {
        observer.observe(element);
    });
});


// Dinamismo swiper carrusel Nuestro equipo
const track = document.getElementById("track");
const carrusel = document.getElementById("carrusel");

let speed = 0.7;
let position = 0;

// Duplicar contenido para infinito
track.innerHTML += track.innerHTML;

function animar() {
  position -= speed;

  if (position <= -track.scrollWidth / 2) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;
  requestAnimationFrame(animar);
}

animar();

// Pausar al hover
carrusel.addEventListener("mouseenter", () => speed = 0);
carrusel.addEventListener("mouseleave", () => speed = 0.4);