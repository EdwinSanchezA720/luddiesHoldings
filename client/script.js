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

// Validación KISS para formulario de contacto
(function initContactFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) {
    return;
  }

  const statusEl = document.getElementById("contactFormStatus");
  const fields = Array.from(form.querySelectorAll("input, select, textarea"));

  function setFieldValidity(field) {
    const isValid = field.checkValidity();
    field.classList.toggle("is-invalid", !isValid);
    field.classList.toggle("is-valid", isValid);
    return isValid;
  }

  fields.forEach((field) => {
    field.addEventListener("blur", () => setFieldValidity(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) {
        setFieldValidity(field);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = fields.every((field) => setFieldValidity(field));
    if (!allValid) {
      form.reportValidity();
      if (statusEl) {
        statusEl.textContent = "Revisa los campos marcados antes de enviar.";
      }
      return;
    }

    if (statusEl) {
      statusEl.textContent = "Formulario válido. (Demo) Envío simulado.";
    }
    form.reset();
    fields.forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });
  });
})();

