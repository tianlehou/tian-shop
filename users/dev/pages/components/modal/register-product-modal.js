// register-product-modal.js

import { initializeSaveProduct } from "./register-product-modal-database.js";

function loadRegisterModal() {
  fetch("./components/modal/register-product-modal.html")
    .then((response) => response.text())
    .then((html) => {
      const modalContainer = document.getElementById("register-product-modal-container");
      modalContainer.innerHTML = html;

      initializeRealTimeCalculations();
      initializeSaveProduct();
    })
    .catch((error) => console.error("Error loading the modal:", error));
}

loadRegisterModal();

function initializeRealTimeCalculations() {
  const ventaInput = document.getElementById("venta");
  const costoInput = document.getElementById("costo");
  const unidadesInput = document.getElementById("unidades");
  const costoUnitarioInput = document.getElementById("costoUnitario");
  const gananciaInput = document.getElementById("ganancia");
  const porcentajeInput = document.getElementById("porcentaje");
  const costoConItbmsDescuentoInput = document.getElementById("costoConItbms-Descuento");
  const itbmsSelect = document.getElementById("itbms");
  const descuentoInput = document.getElementById("descuento");
  const costoConItbmsDescuentoLabel = document.querySelector("label[for='costoConItbms-Descuento']");

  if (!costoInput || !unidadesInput || !costoUnitarioInput || !itbmsSelect || !ventaInput || !gananciaInput || !porcentajeInput || !descuentoInput || !costoConItbmsDescuentoInput || !costoConItbmsDescuentoLabel) {
    console.error("Elementos del formulario no encontrados.");
    return;
  }

  costoConItbmsDescuentoInput.style.display = "none";
  costoConItbmsDescuentoLabel.style.display = "none";

  function formatInputAsDecimal(input) {
    input.addEventListener("input", () => {
      const rawValue = input.value.replace(/\D/g, "");
      const numericValue = parseFloat(rawValue) / 100;
      input.value = numericValue.toFixed(2);
    });
  }

  formatInputAsDecimal(costoInput);
  formatInputAsDecimal(ventaInput);
  formatInputAsDecimal(descuentoInput);

  function calcularCostoConItbmsYGanancia() {
    const costo = parseFloat(costoInput.value) || 0;
    const unidades = parseFloat(unidadesInput.value) || 1;
    const itbmsPorcentaje = parseFloat(itbmsSelect.value) || 0;
    const venta = parseFloat(ventaInput.value) || 0;
    const descuento = parseFloat(descuentoInput.value) || 0;

    const costoConItbms = costo + (costo * itbmsPorcentaje) / 100 - descuento;

    costoConItbmsDescuentoInput.value = costoConItbms.toFixed(2);

    if (itbmsPorcentaje > 0 || descuento > 0) {
      costoConItbmsDescuentoInput.style.display = "block";
      costoConItbmsDescuentoLabel.style.display = "block";

      if (itbmsPorcentaje > 0 && descuento > 0) {
        costoConItbmsDescuentoLabel.textContent = "Costo con Itbms & Descuento";
      } else if (itbmsPorcentaje > 0) {
        costoConItbmsDescuentoLabel.textContent = "Costo con Itbms";
      } else {
        costoConItbmsDescuentoLabel.textContent = "Costo con Descuento";
      }
    } else {
      costoConItbmsDescuentoInput.style.display = "none";
      costoConItbmsDescuentoLabel.style.display = "none";
    }

    const costoUnitario = unidades > 0 ? (costoConItbms / unidades).toFixed(2) : 0;
    costoUnitarioInput.value = costoUnitario;

    const ganancia = (venta - costoUnitario).toFixed(2);
    gananciaInput.value = ganancia;

    const porcentajeGanancia =
      costoUnitario > 0 ? (((venta - costoUnitario) / costoUnitario) * 100).toFixed(2) : 0;
    porcentajeInput.value = `${porcentajeGanancia}%`;
  }

  costoInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  unidadesInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  itbmsSelect.addEventListener("change", calcularCostoConItbmsYGanancia);
  ventaInput.addEventListener("input", calcularCostoConItbmsYGanancia);
  descuentoInput.addEventListener("input", calcularCostoConItbmsYGanancia);

  calcularCostoConItbmsYGanancia();
}