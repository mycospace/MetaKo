document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("metacognition-form");
  const formSteps = document.querySelectorAll(".form-step");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const progressSteps = document.querySelectorAll("#progressbar .step");
  const resultDiv = document.getElementById("result");
  const resultOutput = document.getElementById("result-output");
  const restartBtn = document.getElementById("restart-btn");

  let currentStep = 0;
  formSteps[currentStep].classList.add("active");

  // Update der Fortschrittsanzeige
  function updateProgressBar(step) {
    progressSteps.forEach((progress, index) => {
      if (index <= step) {
        progress.classList.add("active");
      } else {
        progress.classList.remove("active");
      }
    });
  }

  // Event Listener für "Weiter"
  nextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep < formSteps.length - 1) {
        formSteps[currentStep].classList.remove("active");
        currentStep++;
        formSteps[currentStep].classList.add("active");
        updateProgressBar(currentStep);
      }
    });
  });

  // Event Listener für "Zurück"
  prevBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        formSteps[currentStep].classList.remove("active");
        currentStep--;
        formSteps[currentStep].classList.add("active");
        updateProgressBar(currentStep);
      }
    });
  });

  // Update der Range-Inputs (Schritt 2)
  const frequencyInput = document.getElementById("frequency");
  const frequencyValue = document.getElementById("frequency-value");
  const intensityInput = document.getElementById("intensity");
  const intensityValue = document.getElementById("intensity-value");

  frequencyInput.addEventListener("input", function () {
    frequencyValue.textContent = frequencyInput.value;
  });
  intensityInput.addEventListener("input", function () {
    intensityValue.textContent = intensityInput.value;
  });

  // Formular absenden
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Alle Eingaben sammeln
    const data = {
      thoughtPattern: document.getElementById("thought-pattern").value,
      frequency: frequencyInput.value,
      intensity: intensityInput.value,
      distortions: Array.from(document.querySelectorAll("input[name='distortions']:checked")).map(el => el.value),
      alternativeThoughts: document.getElementById("alternative-thoughts").value,
      reflection: document.getElementById("reflection").value
    };

    // Ergebnis anzeigen (als formatiertes JSON)
    resultOutput.textContent = JSON.stringify(data, null, 2);
    resultDiv.classList.remove("hidden");
    // Formular ausblenden
    form.classList.add("hidden");
  });

  // Übung neu starten
  restartBtn.addEventListener("click", () => {
    form.reset();
    // Range-Werte zurücksetzen
    frequencyValue.textContent = frequencyInput.value;
    intensityValue.textContent = intensityInput.value;
    // Ergebnis ausblenden und Formular wieder anzeigen
    resultDiv.classList.add("hidden");
    form.classList.remove("hidden");
    // Zurück zum ersten Schritt
    formSteps[currentStep].classList.remove("active");
    currentStep = 0;
    formSteps[currentStep].classList.add("active");
    updateProgressBar(currentStep);
  });
});
