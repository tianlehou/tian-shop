// register-product-modal-database.js
import { auth, database } from "../../../../../environment/firebaseConfig.js";
import { ref, push, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { showToast } from "../toast/toastLoader.js";

export function initializeSaveProduct() {
  const modalForm = document.getElementById("registerForm");

  if (!modalForm) {
    console.error("No se encontró el formulario del modal.");
    return;
  }

  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validar y obtener valores
    const fecha = document.getElementById("fecha").value;
    const empresa = document.getElementById("empresa").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    const venta = parseFloat(document.getElementById("venta").value);
    const costo = parseFloat(document.getElementById("costo").value);
    const unidades = parseInt(document.getElementById("unidades").value, 10);
    const itbms = parseInt(document.getElementById("itbms").value, 10) || 0;
    const descuento = parseFloat(document.getElementById("descuento").value) || 0;

    if (!fecha || !empresa || !marca || !descripcion || isNaN(venta) || isNaN(costo) || isNaN(unidades)) {
      showToast("Por favor, completa todos los campos obligatorios.", "error");
      return;
    }

    // Cálculos
    const costoUnitario = (costo / unidades).toFixed(2);
    const ganancia = (venta - costoUnitario).toFixed(2);
    const porcentaje = ((ganancia / costoUnitario) * 100).toFixed(2);
    const costoConItbmsDescuento = (costo * (1 + itbms / 100) - descuento).toFixed(2);

    // Estructura de datos
    const productData = {
      fecha,
      producto: { empresa, marca, descripcion },
      precio: {
        venta,
        costoUnitario,
        costo,
        ganancia,
        unidades,
        porcentaje,
      },
      impuesto_descuento: {
        costoConItbmsDescuento,
        itbms,
        descuento,
      },
    };

    try {
      // Autenticación del usuario
      const currentUser = auth.currentUser;
      if (!currentUser) {
        showToast("Debes iniciar sesión para registrar un producto.", "error");
        return;
      }

      const userId = currentUser.uid;

      // Verificar usuario en la base de datos
      const dbRef = ref(database);
      const userSnapshot = await get(child(dbRef, `users/${userId}`));

      if (!userSnapshot.exists()) {
        showToast("Usuario no encontrado en la base de datos.", "error");
        return;
      }

      // Guardar datos del producto
      const userProductsRef = ref(database, `users/${userId}/productData`);
      await push(userProductsRef, productData);

      showToast("Producto registrado con éxito.", "success");
      modalForm.reset();

      // Cerrar modal
      const modalElement = document.getElementById("registerProductModal");
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      bootstrapModal.hide();
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      showToast("Hubo un error al registrar el producto.", "error");
    }
  });
}
