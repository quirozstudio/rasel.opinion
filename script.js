// Pega aquí los enlaces directos de Google para escribir una reseña.
const ITURRAMA_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJIe2Xy12SUA0Ri3WA3m-Vn00";
const ZARAGOZA_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJxeH1aVaSUA0R4pJPSXbsdfg";

// Todos los datos editables de las sedes están centralizados aquí.
const salons = [
  {
    name: "ITURRAMA",
    address: "C. Íñigo Arista, 18",
    postcode: "31007 Pamplona",
    phone: "848 41 20 60",
    reviewUrl: ITURRAMA_REVIEW_URL,
  },
  {
    name: "AV. ZARAGOZA",
    address: "Av. de Zaragoza, 9",
    postcode: "31003 Pamplona",
    phone: "948 59 61 15",
    reviewUrl: ZARAGOZA_REVIEW_URL,
  },
];

const icons = {
  location: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="m8 3 2 5-3 2a15 15 0 0 0 7 7l2-3 5 2v4a2 2 0 0 1-2 2C9 22 2 15 2 5a2 2 0 0 1 2-2Z"/>',
  arrow: '<path d="M4 12h15m-5-5 5 5-5 5"/>',
};
const icon = (name) => `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

function detail(iconName, text, secondaryText) {
  const row = document.createElement("p");
  row.className = "detail";
  row.innerHTML = icon(iconName);
  const content = document.createElement("span");
  content.textContent = text;
  if (secondaryText) {
    content.append(document.createElement("br"));
    const secondary = document.createElement("span");
    secondary.className = "postcode";
    secondary.textContent = secondaryText;
    content.append(secondary);
  }
  row.append(content);
  return row;
}

function validReviewUrl(value) {
  try { return new URL(value).protocol === "https:"; }
  catch { return false; }
}

const container = document.querySelector(".salons");
salons.forEach((salon) => {
  const card = document.createElement("article");
  card.className = "salon";
  const title = document.createElement("h2");
  title.textContent = salon.name;
  const details = document.createElement("div");
  details.className = "details";
  details.append(detail("location", salon.address, salon.postcode), detail("phone", salon.phone));

  const link = document.createElement("a");
  link.className = "review-link";
  link.setAttribute("aria-label", `He estado aquí: ${salon.name}. Escribir una reseña en Google`);
  link.innerHTML = `HE ESTADO AQUÍ ${icon("arrow")}`;
  if (validReviewUrl(salon.reviewUrl)) {
    link.href = salon.reviewUrl;
  } else {
    // Mantiene el diseño de prueba sin navegar a un enlace ficticio.
    link.href = "#review-status";
    link.setAttribute("aria-disabled", "true");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const status = document.querySelector("#review-status");
      status.textContent = "El enlace de reseñas de esta peluquería estará disponible pronto.";
      status.hidden = false;
    });
  }
  card.append(title, details, link);
  container.append(card);
});
