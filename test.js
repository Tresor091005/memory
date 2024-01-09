/*

let startTime; // Pour stocker le moment où le chronomètre démarre
let running = false; // Pour suivre l'état du chronomètre
let timerInterval; // Pour stocker l'identifiant de l'intervalle

function startChronometer() {
  if (!running) {
    startTime = Date.now(); // Enregistrer le temps de départ
    running = true;
    timerInterval = setInterval(updateChronometer, 1000); // Mettre à jour le chronomètre toutes les secondes
  }
}

function stopChronometer() {
  if (running) {
    clearInterval(timerInterval); // Arrêter l'intervalle de mise à jour
    running = false;
  }
}

function updateChronometer() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime; // Calculer le temps écoulé en millisecondes

  const hours = Math.floor(elapsedTime / 3600000); // Calculer les heures
  const minutes = Math.floor((elapsedTime % 3600000) / 60000); // Calculer les minutes
  const seconds = Math.floor((elapsedTime % 60000) / 1000); // Calculer les secondes

  console.log(`${hours}h ${minutes}min ${seconds}sec`); // Afficher le temps écoulé au format heures:minutes:secondes
}
*/

let startTime;
let running = false;
let timerInterval;

function startChronometer() {
  if (!running) {
    startTime = Date.now();
    running = true;
    timerInterval = setInterval(updateChronometer, 1000); // Mettre à jour le chronomètre toutes les secondes
  }
}

function stopChronometer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function updateChronometer() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;

  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);

  const timerElement = document.getElementById('timer');
  timerElement.textContent = `${hours}h ${minutes}min ${seconds}sec`; // Afficher le temps écoulé dans la balise HTML
}

// Démarrer le chronomètre au chargement de la page (à titre d'exemple)
window.onload = startChronometer;
