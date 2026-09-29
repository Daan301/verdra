const ingredientData = {
  caffeine: {
    mark: "75",
    kicker: "Sursa energiei",
    title: "Cafeină din cafea verde",
    description: "O sursă recognoscibilă și ușor de comunicat, aleasă pentru o formulă cu poziționare naturală și curată.",
    foot: "75 mg per doză de 250 ml",
  },
  bvitamins: {
    mark: "B8",
    kicker: "Complex complet",
    title: "Opt vitamine B",
    description: "B1, B2, B3, B5, B6, B7, B9 și B12 formează un complex ușor de explicat și compatibil cu poziționarea pentru energie și ritm activ.",
    foot: "Țintă: 30% VNR per doză",
  },
  vitaminc: {
    mark: "C",
    kicker: "Plus de valoare",
    title: "Vitamina C",
    description: "O completare eficientă pentru profilul wellness: solubilă, familiară consumatorului și potrivită cu nota acidulată de măr verde.",
    foot: "30 mg per doză",
  },
  apple: {
    mark: "●",
    kicker: "Semnătura gustului",
    title: "Aromă de măr verde",
    description: "Crocantă, acrișoară și imediat recognoscibilă. Este elementul senzorial care leagă formula de identitatea vizuală VERDRA.",
    foot: "Profil proaspăt și carbogazos",
  },
};

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");
const header = document.querySelector("[data-header]");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation?.classList.toggle("open", !open);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

const tabButtons = [...document.querySelectorAll("[data-ingredient]")];
const panel = document.querySelector("#ingredient-panel");

function activateIngredient(key) {
  const item = ingredientData[key];
  if (!item || !panel) return;
  tabButtons.forEach((button) => button.setAttribute("aria-selected", String(button.dataset.ingredient === key)));
  panel.querySelector("[data-mark]").textContent = item.mark;
  panel.querySelector("[data-kicker]").textContent = item.kicker;
  panel.querySelector("[data-title]").textContent = item.title;
  panel.querySelector("[data-description]").textContent = item.description;
  panel.querySelector("[data-foot]").textContent = item.foot;
}

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => activateIngredient(button.dataset.ingredient));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabButtons.length) % tabButtons.length;
    tabButtons[nextIndex].focus();
    activateIngredient(tabButtons[nextIndex].dataset.ingredient);
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}
