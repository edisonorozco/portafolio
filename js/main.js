window.addEventListener("load", () => {
  const overlay = document.getElementById("overlay");
  document.querySelectorAll(".main .portafolio .container .container-text-portafolio .container-portafolio .item img").forEach((element) => {
    element.addEventListener("click", () => {
      const path = element.getAttribute("src");
      const description = element.parentNode.dataset.description;
      console.log(description);
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
