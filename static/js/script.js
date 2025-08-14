document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    emailjs.sendForm(emailjsServiceId, emailjsTemplateId, "#myForm").then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        const successMessageEl = document.getElementById("success-message");
        successMessageEl.textContent =
          "Your message has been submitted successfully!";
        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.textContent = "";
        form.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.textContent =
          "There was an error submitting your message. Please try again.";
      }
    );
  });
});

/* ===========================
   Dev Beto UI – Progress, Magnet, Reveal
   =========================== */
(() => {
  const raf = window.requestAnimationFrame || ((fn) => setTimeout(fn, 16));

  /* -------- Scroll progress bar -------- */
  const progressEl = document.getElementById("scroll-progress");
  const updateProgress = () => {
    if (!progressEl) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight || 1;
    const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
    progressEl.style.width = pct + "%";
  };
  updateProgress();
  window.addEventListener("scroll", () => raf(updateProgress), {
    passive: true
  });
  window.addEventListener("resize", () => raf(updateProgress));

  /* -------- Magnetic buttons --------
     Auto-applies to:
       .btn.magnet, .hero-cta, .cta-button
     To opt-in any button, add class="btn magnet"
  */
  const magnets = Array.from(
    document.querySelectorAll(".btn.magnet, .hero-cta, .cta-button")
  );
  const strength = 18; // px offset at edge
  magnets.forEach((btn) => {
    let hovering = false;

    const enter = (e) => {
      hovering = true;
      btn.style.transition = "transform 120ms ease";
    };
    const move = (e) => {
      if (!hovering) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left; // inside [0, width]
      const y = e.clientY - rect.top; // inside [0, height]
      const relX = (x / rect.width) * 2 - 1; // [-1, 1]
      const relY = (y / rect.height) * 2 - 1; // [-1, 1]
      const tx = relX * strength;
      const ty = relY * strength;
      btn.style.transform = `translate(${tx}px, ${ty}px)`;
    };
    const leave = () => {
      hovering = false;
      btn.style.transition = "transform 180ms ease";
      btn.style.transform = "translate(0, 0)";
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);
    btn.addEventListener("blur", leave);
    btn.addEventListener("touchstart", leave, { passive: true }); // no magnet on touch
  });

  /* -------- Reveal animations --------
     Adds .reveal to target elements and toggles .in on view.
  */
  const autoRevealSelectors = [
    ".panel",
    ".service-card",
    ".project-card",
    ".pill",
    ".step",
    ".about-image",
    ".about-text",
    ".tech-pills .pill",
    ".contact-form",
    ".contact-info",
    ".button-cards .card"
  ];

  // Seed .reveal on targets that don't have it yet
  document.querySelectorAll(autoRevealSelectors.join(",")).forEach((el, i) => {
    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal");
      // soft stagger
      if (i % 3 === 1) el.classList.add("delay1");
      if (i % 3 === 2) el.classList.add("delay2");
    }
  });

  // Observe and toggle .in
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add("in");
          // Unobserve once revealed for perf
          io.unobserve(target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();
