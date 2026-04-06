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


// Transición de carrusel "Nuestro equipo"
const track = document.getElementById("track");
const carrusel = document.getElementById("carrusel");

let speed = 0.4;
let position = 0;

if (track && carrusel) {
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
  carrusel.addEventListener("pointerenter", () => (speed = 0));
  carrusel.addEventListener("pointerleave", () => (speed = 0.4));
  document.addEventListener("pointerup", () => {
    speed = 0.4;
  });

  // Botones de carrusel
  const btnPrev = document.getElementById("prev");
  const btnFast = document.getElementById("fast");

  if (btnPrev) {
    btnPrev.addEventListener("pointerdown", () => {
      speed = -5;
    });

    btnPrev.addEventListener("pointerup", () => {
      speed = 0.4;
    });
  }

  if (btnFast) {
    btnFast.addEventListener("pointerdown", () => {
      speed = 5;
    });

    btnFast.addEventListener("pointerup", () => {
      speed = 0.4;
    });
  }
}

(function initContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  const statusEl = document.getElementById("contactFormStatus");
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  const setStatus = (message = "") => {
    if (statusEl) {
      statusEl.textContent = message;
    }
  };

  const updateFieldState = (field) => {
    const valid = field.checkValidity();
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);
    return valid;
  };

  const clearFieldState = () => {
    fields.forEach((field) => field.classList.remove("is-valid", "is-invalid"));
  };

  fields.forEach((field) => {
    const syncValidity = () => updateFieldState(field);
    field.addEventListener("blur", syncValidity);
    field.addEventListener("input", syncValidity);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = fields.every(updateFieldState);
    if (!allValid) {
      form.reportValidity();
      setStatus("Revisa los campos marcados antes de enviar.");
      return;
    }

    setStatus("Formulario valido. (Demo) Envio simulado.");
    form.reset();
    clearFieldState();
  });
})();

