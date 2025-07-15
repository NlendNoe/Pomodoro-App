const display = document.getElementById("display")
const timerPomo = document.getElementById("timer")
const start = document.getElementById("start")
const reset = document.getElementById("reset")
let temps = 25 * 60
let timer = null
let tempsEnCours = false

afficheTemps = (e) => {
    const minutes = Math.floor(temps / 60)
    const secondes = temps % 60

    timerPomo.textContent = `${String(minutes).padStart(2, "0")}:${String(secondes).padStart(2, "0")}`
}

start.addEventListener("click", () => {
    if (!tempsEnCours) {
        timer = setInterval(() => {
            if (temps > 0) {
                temps--
                afficheTemps()
            } else {
                clearInterval(timer)
                display.textContent = "Il est temps de faire une pause 😯😮‍💨"

                tempsEnCours = false
                start.textContent = "Début"
            }
        }, 1000)

        start.textContent = "Pause"
        tempsEnCours = true
    } else {
        clearInterval(timer)
        start.textContent = "Reprendre"
        tempsEnCours = false
    }
})

reset.addEventListener("click", () => {
    clearInterval(timer)
    temps = 25 * 60
    afficheTemps()
    start.textContent = "Début"
    tempsEnCours = false
})

afficheTemps()