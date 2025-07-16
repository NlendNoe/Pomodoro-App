const display = document.getElementById("display");
const timerPomo = document.getElementById("timer");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const pauseTimer = document.querySelector("#pause-timer");
const sessionNumber = document.querySelector('.session-number');
const TEMPS_TRAVAIL = 25 * 60;
const PETITE_PAUSE = 5 * 60;
const LONGUE_PAUSE = 30 * 60;
const INCREMENT_PAUSE = 5 * 60;

let dureeActuelle = TEMPS_TRAVAIL;
let temps = dureeActuelle;
let timer = null;
let tempsEnCours = false;
let isWorkSession = true;
let sessionsCompleted = 0;

function afficheTemps() {
    const minutes = Math.floor(temps / 60);
    const secondes = Math.floor(temps % 60);

    timerPomo.textContent = `${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;

    if (!isWorkSession) {
        pauseTimer.textContent = `Pause: ${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`;
        pauseTimer.style.display = "block";
    } else {
        pauseTimer.style.display = "none";
        pauseTimer.style.fontSize = "30px";
        pauseTimer.style.marginTop = "-80px";
        pauseTimer.style.marginBottom = "25px";
    }
}

function demarrerSession() {
    if (isWorkSession) {
        dureeActuelle = TEMPS_TRAVAIL;
        display.textContent = "Session de travail en cours";
    } else {
        const pausesEffectuees = Math.max(0, sessionsCompleted - 1);
        dureeActuelle = Math.min(
            PETITE_PAUSE + (pausesEffectuees * INCREMENT_PAUSE),
            LONGUE_PAUSE
        );
        display.textContent = `Tu as mérite uen pause Nice Job! 🥳`;
    }
    temps = dureeActuelle;
    afficheTemps();
    sessionNumber.textContent = sessionsCompleted;
}

start.addEventListener("click", () => {
    if (!tempsEnCours) {
        timer = setInterval(() => {
            temps--;
            afficheTemps();

            if (temps <= 0) {
                clearInterval(timer);

                if (isWorkSession) {
                    sessionsCompleted++;
                }

                isWorkSession = !isWorkSession;
                demarrerSession();

                if (!isWorkSession) {
                    tempsEnCours = true;
                    start.textContent = "Stop";
                    timer = setInterval(() => {
                        temps--;
                        afficheTemps();
                        if (temps <= 0) {
                            clearInterval(timer);
                            isWorkSession = true;
                            demarrerSession();
                            tempsEnCours = false;
                            start.textContent = "Début";
                        }
                    }, 1000);
                } else {
                    tempsEnCours = false;
                    start.textContent = "Début";
                }
            }
        }, 1000);

        start.textContent = isWorkSession ? "Stop" : "Stop";
        tempsEnCours = true;
    } else {
        clearInterval(timer);
        start.textContent = "Reprendre";
        tempsEnCours = false;
    }
});

reset.addEventListener("click", () => {
    clearInterval(timer);
    isWorkSession = true;
    sessionsCompleted = 0;
    demarrerSession();
    start.textContent = "Début";
    tempsEnCours = false;
    display.textContent = "Prêt à travailler! 🧐";
    sessionNumber.textContent = sessionsCompleted;
});

demarrerSession();