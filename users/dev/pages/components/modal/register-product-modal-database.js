// Importa las funciones necesarias de Firebase
import { auth, database } from "../../../../../environment/firebaseConfig.js";
import { ref, push, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

export function initializeSaveProduct() {
  const modalForm = document.getElementById("registerProductForm");

  if (modalForm) {
    modalForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Obtener valores del formulario
      const fecha = document.getElementById("fecha").value;

      // Valores para el objeto producto
      const empresa = document.getElementById("empresa").value;
      const marca = document.getElementById("marca").value;
      const descripcion = document.getElementById("descripcion").value;

      // Valores para el objeto precio
      const venta = document.getElementById("venta").value;
      const precioUnitario = document.getElementById("precioUnitario").value;
      const itbms = document.getElementById("itbms").value;
      const ganancia = document.getElementById("ganancia").value;
      const cantidad = document.getElementById("cantidad").value;
      const porcentaje = document.getElementById("porcentaje").value;
      const precio = document.getElementById("precio").value;

      // Valores para el objeto promo
      const descuento = document.getElementById("descuento").value;
      const regalia = document.getElementById("regalia").value;
      const compraCajas = document.getElementById("compraCajas").value;

      // Estructura de datos
      const productData = {
        fecha,
        producto: {
          empresa,
          marca,
          descripcion,
        },
        precio: {
          venta,
          precioUnitario,
          itbms,
          ganancia,
          cantidad,
          porcentaje,
          precio,
          descuento,
        },
        promo: {
          regalia,
          compraCajas,
        },
      };

      try {
        // Obtén el UID del usuario autenticado
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert("Debes iniciar sesión para registrar un producto.");
          return;
        }

        const userId = currentUser.uid;

        // Verifica si el usuario existe en la base de datos
        const dbRef = ref(database);
        const userSnapshot = await get(child(dbRef, `users`));

        if (!userSnapshot.exists()) {
          alert("Usuario no encontrado en la base de datos.");
          return;
        }

        // Guarda los datos del producto en la referencia del usuario actual
        const userProductsRef = ref(database, `users/${userId}/productData`);
        await push(userProductsRef, productData);

        alert("Producto registrado con éxito");

        // Limpia el formulario
        modalForm.reset();

        // Cierra el modal
        const modalElement = document.getElementById("registerProductModal");
        const bootstrapModal = bootstrap.Modal.getInstance(modalElement); // Obtiene la instancia del modal
        bootstrapModal.hide();
      } catch (error) {
        console.error("Error al guardar los datos:", error);
        alert("Hubo un error al registrar el producto");
      }
    });
  } else {
    console.error("No se encontró el formulario del modal.");
  }
}
