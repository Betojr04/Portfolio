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
