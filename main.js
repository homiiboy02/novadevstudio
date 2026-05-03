const projektInput = document.querySelector('input[name="projekt"]');
const verwaltungInput = document.querySelector('input[name="verwaltung"]');
const priceOutput = document.getElementById("price-output");

const projektPreise = {
  "Landingpage": 599,
  "Business Website": 999,
  "Premium Website": 1299
};

const verwaltungPreise = {
  "Keine": 0,
  "Basic Care": 29,
  "Business Care": 59,
  "Premium Care": 99
};

function updatePrice() {
  if (!projektInput || !verwaltungInput || !priceOutput) return;

  const projekt = projektInput.value;
  const verwaltung = verwaltungInput.value || "Keine";

  const projektPreis = projektPreise[projekt];
  const verwaltungPreis = verwaltungPreise[verwaltung];

  if (!projektPreis) {
    priceOutput.textContent = "Bitte Projekt auswählen";
    return;
  }

  if (!verwaltung || verwaltung === "Keine" || verwaltungPreis === 0) {
    priceOutput.textContent = `ab ${projektPreis}€ einmalig`;
    return;
  }

  priceOutput.textContent = `ab ${projektPreis}€ einmalig + ${verwaltungPreis}€/Monat`;
}

if (projektInput && verwaltungInput && priceOutput) {
  projektInput.addEventListener("input", updatePrice);
  verwaltungInput.addEventListener("input", updatePrice);
  updatePrice();
}