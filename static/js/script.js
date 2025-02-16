document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    emailjs.sendForm(emailjsServiceId, emailjsTemplateId, "#myForm").then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        // Display success message
        const successMessageEl = document.getElementById("success-message");
        successMessageEl.textContent =
          "Your message has been submitted successfully!";
        // Clear any previous error message
        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.textContent = "";
        // Reset the form fields
        form.reset();
      },
      (error) => {
        console.log("FAILED...", error);
        // Display error message
        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.textContent =
          "There was an error submitting your message. Please try again.";
      }
    );
  });
});
