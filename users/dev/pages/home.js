<<<<<<< HEAD
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../environment/firebaseConfig.js";

import { checkAuth } from "../../../modules/accessControl/authCheck.js";

import { deleteRow } from "../modules/tabla/deleteRow.js";
import { addEditEventListeners } from "./modules/editRow.js";
// import { initializeSearch } from "./modules/searchFunction.js";
// Constantes y variables de estado
const tabla = document.getElementById("contenidoTabla");

export function mostrarDatos() {
  onValue(ref(database, collection), async (snapshot) => {
    tabla.innerHTML = "";

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    // Ordenar alfabéticamente los datos sin filtrar
    data.sort((a, b) => a.nombre.localeCompare(b.nombre));

    let filaNumero = 1;

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const row = `
            <tr>
              <td class="text-center sticky-col-1">${filaNumero++}</td>
              <td class="text-center">${user.fecha}</td>
              <td class="text-center">${user.empresa}</td>
              <td class="text-center">${user.descripcion}</td>
              <td class="text-center">${user.marca}</td>
              <td class="text-center">${user.tamaño}</td>
              <td class="text-center">${user.precio}</td>
              <td class="text-center">${user.cantidad}</td>
              <td class="text-center">${user.p_unitario}</td>
              <td>
                <button class="btn btn-primary edit-user-button" data-id="${user.id}"><i class="bi bi-highlighter"></i></button>
              </td>
            </tr>
          `;
      tabla.innerHTML += row;
    }
    deleteRow(database, collection);

  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  mostrarDatos();
  // initializeSearch(tabla);
});

console.log(database);
=======
import {
  ref,
  onValue
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
import { database } from "../../../environment/firebaseConfig.js";

import { checkAuth } from "../../../modules/accessControl/authCheck.js";

import { deleteRow } from "../modules/tabla/deleteRow.js";
import { addEditEventListeners } from "./modules/editRow.js";
// import { initializeSearch } from "./modules/searchFunction.js";
// Constantes y variables de estado
const tabla = document.getElementById("contenidoTabla");

export function mostrarDatos() {
  onValue(ref(database, collection), async (snapshot) => {
    tabla.innerHTML = "";

    const data = [];
    snapshot.forEach((childSnapshot) => {
      data.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    // Ordenar alfabéticamente los datos sin filtrar
    data.sort((a, b) => a.nombre.localeCompare(b.nombre));

    let filaNumero = 1;

    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      const row = `
            <tr>
              <td class="text-center sticky-col-1">${filaNumero++}</td>
              <td class="text-center sticky-col-2">${user.fecha}</td>
              <td class="text-center">${user.empresa}</td>
              <td class="text-center">${user.descripcion}</td>
              <td class="text-center">${user.marca}</td>
              <td class="text-center">${user.tamaño}</td>
              <td class="text-center">${user.precio}</td>
              <td class="text-center">${user.cantidad}</td>
              <td class="text-center">${user.p_unitario}</td>
              <td>
                <button class="btn btn-primary edit-user-button" data-id="${user.id}"><i class="bi bi-highlighter"></i></button>
              </td>
            </tr>
          `;
      tabla.innerHTML += row;
    }
    deleteRow(database, collection);

  });
}

// Inicializa la tabla y eventos al cargar el documento
document.addEventListener('DOMContentLoaded', async () => {
  checkAuth();
  mostrarDatos();
  // initializeSearch(tabla);
});

console.log(database);
>>>>>>> da8aea408b82b4d7d2efccdecd3eb1fec47fdcbf
