const btnSendEmail = document.querySelector("#send-button");
const formContact = document.querySelector("#form-contact-now");
const urlEmail =
  "https://back-portafolio-web.herokuapp.com/api/email/contact-me-now";
const txtNameClient = document.getElementById("txtName");
const txtEmailClient = document.getElementById("txtEmail");
const txtSubject = document.getElementById("subject");
const txtMessage = document.getElementById("message");

window.addEventListener("load", () => {
  const overlay = document.getElementById("overlay");
  const laguajesDiv = document.getElementById("laguajes");
  const gitDiv = document.getElementById("git");
  const desingDiv = document.getElementById("desing");
  document
    .querySelectorAll(
      ".main .portafolio .container .container-text-portafolio .container-portafolio .item img"
    )
    .forEach((element) => {
      element.addEventListener("click", () => {
        const path = element.getAttribute("src");
        const category = element.parentNode.dataset.category;
        overlay.classList.add("active");
        document.querySelector("#overlay img").src = path;

        gitDiv.classList.remove("active-item");
        desingDiv.classList.remove("active-item");
        laguajesDiv.classList.remove("active-item");

        if (category == "languajes") {
          laguajesDiv.classList.add("active-item");
        }

        if (category == "git") {
          gitDiv.classList.add("active-item");
        }

        if (category == "desing") {
          desingDiv.classList.add("active-item");
        }
      });
    });

  document.querySelector("#btn-close-image").addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", (event) => {
    event.target.id === "overlay" ? overlay.classList.remove("active") : "";
  });
});

btnSendEmail.addEventListener("click", (event) => btnSendEmailClick(event));

function btnSendEmailClick(event) {
  event.preventDefault();
  let emailDto = getEmailDTOFromFrom();

  if (emailDto != null) sendEmail(emailDto);
}

function sendEmail(emailDto) {
  const settings = {
    method: "POST",
    timeout: 6000,
    body: JSON.stringify(emailDto),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(urlEmail, settings)
    .then((response) => response.json())
    .then(() => alert("Email enviado con exito"))
    .catch((err) => console.log(err));
}

function getEmailDTOFromFrom() {
  const nameClient = txtNameClient.value.trim();
  const emailClient = txtEmailClient.value.trim();
  const subject = txtSubject.value.trim();
  const message = txtMessage.value.trim();

  if (nameClient === "") {
    setErrorFrom(
      document.getElementById("txtName"),
      "Por favor ingrese un nombre !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("txtName"));
  }

  if (emailClient === "") {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email !"
    );
    return null;
  } else if (!isEmil(emailClient)) {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email valido!"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("txtEmail"));
  }

  if (subject === "") {
    setErrorFrom(
      document.getElementById("subject"),
      "Por favor ingrese un asunto !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("subject"));
  }

  if (message === "") {
    setErrorFrom(
      document.getElementById("message"),
      "Por favor ingrese un mensaje !"
    );
    return null;
  } else {
    setSuccessFrom(document.getElementById("message"));
  }

  return new EmailDTO(nameClient, emailClient, subject, message);
}

function setErrorFrom(input, message) {
  const formControl = input.parentNode;
  const small = formControl.querySelector("small");
  small.innerHTML = message;
  formControl.className = "form-control error";
}

function setSuccessFrom(input) {
  const formControl = input.parentNode;
  formControl.className = "form-control success";
}

function isEmil(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

txtNameClient.addEventListener("keyup", pressHandlerName);
txtEmailClient.addEventListener("keyup", pressHandlerEmail);
txtSubject.addEventListener("keyup", pressHandlerSubject);
txtMessage.addEventListener("keyup", pressHandlerMessage);

function pressHandlerName() {
  const nameClient = txtNameClient.value.trim();

  if (nameClient === "") {
    setErrorFrom(
      document.getElementById("txtName"),
      "Por favor ingrese un nombre !"
    );
  } else {
    setSuccessFrom(document.getElementById("txtName"));
  }
}

function pressHandlerEmail() {
  const emailClient = txtEmailClient.value.trim();

  if (emailClient === "") {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email !"
    );
  } else if (!isEmil(emailClient)) {
    setErrorFrom(
      document.getElementById("txtEmail"),
      "Por favor ingrese un email valido!"
    );
  } else {
    setSuccessFrom(document.getElementById("txtEmail"));
  }
}

function pressHandlerSubject() {
  const subject = txtSubject.value.trim();

  if (subject === "") {
    setErrorFrom(
      document.getElementById("subject"),
      "Por favor ingrese un asunto !"
    );
  } else {
    setSuccessFrom(document.getElementById("subject"));
  }
}

function pressHandlerMessage() {
  const message = txtMessage.value.trim();

  if (message === "") {
    setErrorFrom(
      document.getElementById("message"),
      "Por favor ingrese un mensaje !"
    );
  } else {
    setSuccessFrom(document.getElementById("message"));
  }
}
