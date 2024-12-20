import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { auth } from "../environment/firebaseConfig.js";

document.addEventListener("DOMContentLoaded", function () {
  const signInForm = document.querySelector("#signInForm");

  if (signInForm) {
    signInForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = signInForm["signInUsernameOrEmail"].value;
      const password = signInForm["signInPassword"].value;

      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
      const signInSuccess = document.getElementById("signInSuccess");

      // Limpiar mensajes previos
      emailError.textContent = "";
      passwordError.textContent = "";
      signInSuccess.textContent = "";

      try {
        // Intento de inicio de sesión
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(credential);

        // Mostrar mensaje de éxito de inicio de sesión
        signInSuccess.textContent = `${credential.user.email} ¡Bienvenido!`;

        // Redirigir a home.html después de inicio de sesión exitoso
        setTimeout(() => {
          window.location.href = "../users/dev/pages/home.html"; // Redirección a home.html
        }, 1500); // Esperar 1.5 segundos antes de redirigir para mostrar el mensaje de éxito

      } catch (error) {
        // Manejo de errores
        if (error.code === "auth/wrong-password") {
          passwordError.textContent = "¡Contraseña incorrecta!";
        } else if (error.code === "auth/user-not-found") {
          emailError.textContent = "¡Usuario no encontrado!";
        } else if (error.code === "auth/network-request-failed") {
          signInSuccess.textContent =
            "Error de red, por favor verifica tu conexión.";
          signInSuccess.style.color = "red";
        } else {
          signInSuccess.textContent = error.message;
          signInSuccess.style.color = "red"; // Mostrar el mensaje de error general en rojo
        }
      }
    });
  } else {
    console.error("Formulario de inicio de sesión no encontrado.");
  }
});
