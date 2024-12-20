function loadRegisterModal() {
  // Ruta al archivo HTML del modal
  fetch("./components/modal/register-product-modal.html")
    .then((response) => response.text())
    .then((html) => {
      const modalContainer = document.getElementById(
        "register-product-modal-container"
      );
      modalContainer.innerHTML = html;
    })
    .catch((error) => console.error("Error loading the modal:", error));
}

// Llama a la función para cargar el modal
loadRegisterModal();

document.addEventListener("DOMContentLoaded", () => {
  const precioInput = document.getElementById("precio");
  const cantidadInput = document.getElementById("cantidad");
  const precioUnitarioInput = document.getElementById("precioUnitario");
  const itbmsSelect = document.getElementById("itbms");
  const precioLabel = document.querySelector("label[for='precio']");

  function calcularPrecioConItbms() {
    const precio = parseFloat(precioInput.value) || 0; // Permitir al usuario editar el precio libremente
    const cantidad = parseFloat(cantidadInput.value) || 1; // Evitar división por 0
    const itbmsPorcentaje = parseFloat(itbmsSelect.value) || 0;

    // Calcular precio con ITBMS
    const precioConItbms = precio + (precio * itbmsPorcentaje) / 100;

    // Calcular y actualizar el precio unitario
    const precioUnitario = cantidad > 0 ? (precioConItbms / cantidad).toFixed(2) : 0;
    precioUnitarioInput.value = precioUnitario;

    // Cambiar el texto del label de precio
    precioLabel.textContent = "Precio + ITBMS";
  }

  // Escuchar cambios en los inputs y el selector
  precioInput.addEventListener("input", calcularPrecioConItbms);
  cantidadInput.addEventListener("input", calcularPrecioConItbms);
  itbmsSelect.addEventListener("change", calcularPrecioConItbms);
});