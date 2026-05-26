document.addEventListener("DOMContentLoaded", () => {

  const projektInput =
    document.querySelector('input[name="projekt"]');

  const verwaltungInput =
    document.querySelector('input[name="verwaltung"]');

  const hostingInput =
    document.querySelector('input[name="hosting"]');

  const priceOutput =
    document.getElementById("price-output");

  const burger =
    document.getElementById("burger");

  const navLinks =
    document.getElementById("navLinks");

  const contactForm =
    document.getElementById("contactForm");

  const projektPreise = {
    "Landingpage": 599,
    "Business Website": 999,
    "Premium Website": 1299,
    "Individual Website": 1999
  };

  const verwaltungPreise = {
    "Keine": 0,
    "Basic Care": 29,
    "Business Care": 59,
    "Premium Care": 99
  };

  const hostingPreise = {
    "Kein Hosting": 0,
    "Starter Hosting": 9,
    "Business Hosting": 19,
    "Premium Infrastructure": 39
  };

  function updatePrice() {

    if (!priceOutput) return;

    const projekt =
      projektInput?.value || "";

    const verwaltung =
      verwaltungInput?.value || "Keine";

    const hosting =
      hostingInput?.value || "Kein Hosting";

    const projektPreis =
      projektPreise[projekt] || 0;

    const verwaltungPreis =
      verwaltungPreise[verwaltung] || 0;

    const hostingPreis =
      hostingPreise[hosting] || 0;

    const monatlich =
      verwaltungPreis + hostingPreis;

    if (!projektPreis) {

      priceOutput.textContent =
        "Bitte Projekt auswählen";

      return;
    }

    if (monatlich > 0) {

      priceOutput.textContent =
        `ab ${projektPreis}€ einmalig + ${monatlich}€/Monat`;

    } else {

      priceOutput.textContent =
        `ab ${projektPreis}€ einmalig`;
    }
  }

  if (projektInput) {
    projektInput.addEventListener("input", updatePrice);
  }

  if (verwaltungInput) {
    verwaltungInput.addEventListener("input", updatePrice);
  }

  if (hostingInput) {
    hostingInput.addEventListener("input", updatePrice);
  }

  updatePrice();

  if (burger && navLinks) {

    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  if (navLinks) {

    navLinks.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

      event.preventDefault();

      updatePrice();

      const submitButton =
        contactForm.querySelector('button[type="submit"]');

      const originalButtonText =
        submitButton ? submitButton.textContent : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Wird gesendet...";
      }

      try {

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            "Accept": "application/json"
          }
        });

        if (response.ok) {
          window.location.href = "/success/";
        } else {
          alert("Die Anfrage konnte leider nicht gesendet werden. Bitte versuche es erneut.");
        }

      } catch (error) {

        alert("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.");

      } finally {

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalButtonText;
        }
      }
    });
  }
});