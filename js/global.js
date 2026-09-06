const backToTopBtn = document.querySelector(".back-to-top");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) backToTopBtn.classList.add("visible");
    else backToTopBtn.classList.remove("visible");
  });
}