import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database, auth } from "../../../environment/firebaseConfig.js";
import { checkAuth } from "../../../modules/accessControl/authCheck.js";

// Constantes y variables de estado
const tabla = document.getElementById("contenidoTabla");

export function mostrarDatos() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("El usuario no ha iniciado sesión.");
    return;
  }

  const userId = currentUser.uid;
  const userProductsRef = ref(database, `users/${userId}/productData`);

  onValue(userProductsRef, async (snapshot) => {
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar datos

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    // Ordenar alfabéticamente los datos por fecha
    data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    let filaNumero = 1;

    for (let i = 0; i < data.length; i++) {
      const productData = data[i];

      const row = `
        <tr>
          <td>
            <button class="btn btn-primary edit-user-button" data-id="${productData.id}">
              <i class="bi bi-highlighter"></i>
            </button>
          </td>
          <td class="text-center">${productData.fecha}</td>
          <td class="text-center">${productData.producto.empresa}</td>
          <td class="text-center">${productData.producto.marca}</td>
          <td class="text-center">${productData.producto.descripcion}</td>
          <td class="text-center">${productData.precio.venta}</td>
          <td class="text-center">${productData.precio.costoUnitario}</td>
          <td class="text-center">${productData.precio.ganancia}</td>
          <td class="text-center">${productData.precio.porcentaje}%</td>
          <td class="text-center">${productData.precio.costo}</td>
          <td class="text-center">${productData.precio.unidades}</td>
        </tr>
      `;

      tabla.innerHTML += row;
    }
  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener("DOMContentLoaded", async () => {
  checkAuth(); // Verificar autenticación
  auth.onAuthStateChanged((user) => {
    if (user) {
      mostrarDatos(); // Mostrar datos solo si el usuario está autenticado
    } else {
      console.error("Usuario no autenticado.");
    }
  });
});
