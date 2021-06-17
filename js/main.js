const btnSendEmail = document.querySelector("#send-button");
const formContact = document.querySelector("#form-contact-now");

window.addEventListener("load", () => {
  const overlay = document.getElementById("overlay");
  document
    .querySelectorAll(
      ".main .portafolio .container .container-text-portafolio .container-portafolio .item img"
    )
    .forEach((element) => {
      element.addEventListener("click", () => {
        const path = element.getAttribute("src");
        const description = element.parentNode.dataset.description;
        overlay.classList.add("active");
        document.querySelector("#overlay img").src = path;
        document.querySelector("#overlay .description").innerHTML = description;
      });
    });

  document.querySelector("#btn-close-image").addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (event) => {
    event.target.id === "overlay" ? overlay.classList.remove("active") : "";
  });
});

btnSendEmail.addEventListener("click", (event) => sendEmail(event));

function sendEmail(event) {

  event.preventDefault();

  let emailDto = getEmailDTOFromFrom();

  fetch("https://back-portafolio-web.herokuapp.com/api/email/contact-me-now", {
    method: "POST",
    body: JSON.stringify(emailDto),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => console.log(response))
    .catch((error) => console.error("Error:", error))
    .then((response) => alert('Correo enviado con exito !'));
}

function getEmailDTOFromFrom() {
  let formContactData = new FormData(formContact);

  let nameClient = formContactData.get("name-contact");
  let emailClient = formContactData.get("email-contact");
  let subject = formContactData.get("subject");
  let message = formContactData.get("message");

  return new EmailDTO(nameClient, emailClient, subject, message);
}
