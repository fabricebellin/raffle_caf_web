function initAutoUpdate() {
    const inputField = document.getElementById("total-participants");
    inputField.addEventListener("input", genererParticipants);
    genererParticipants(); 
}
window.onload = initAutoUpdate;

function genererParticipants() {
    let n = parseInt(document.getElementById("total-participants").value);
    if (isNaN(n) || n < 1) return;
    let liste = "";
    for (let i = 1; i <= n; i++) { liste += "Participant " + i + "\n"; }
    document.getElementById("input").value = liste.trim();
}

function toggleListe() { document.getElementById("input").classList.toggle("hidden"); }

function toggleFullScreen() {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen(); }
}

function parseParticipants(text) { return text.split("\n").map(x => x.trim()).filter(x => x !== ""); }

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw() {
    document.getElementById("ticket-title").textContent = "SÉLECTION EN COURS...";
    document.getElementById("ticket-winner").innerHTML = "🥁";
    document.getElementById("result").textContent = "";

    let participants = parseParticipants(document.getElementById("input").value);
    let count = parseInt(document.getElementById("cars").value);

    if (participants.length < count) { alert("Pas assez de participants !"); return; }

    shuffle(participants);
    let winners = participants.slice(0, count);
    
    let result = "TIRAGE AU SORT CAF - CLIO\n\n";
    let ticketList = "";
    // MODIFICATION ICI : On s'assure que le numéro (i+1) est bien présent
    winners.forEach((w, i) => { 
        result += `${i+1}. ${w}\n`; 
        ticketList += `<div style="margin: 10px 0;"><strong>${i+1}.</strong> ${w}</div>`; 
    });

    document.getElementById("ticket-container").classList.remove("hidden");
    document.getElementById("left-stick").classList.remove("hidden");
    document.getElementById("right-stick").classList.remove("hidden");
    
    let audio = document.getElementById("audio-tambour");
    audio.load(); audio.play();

    setTimeout(() => {
        document.getElementById("ticket-title").textContent = "🏆 GAGNANT(S) 🏆";
        document.getElementById("ticket-winner").innerHTML = ticketList;
        document.getElementById("left-stick").classList.add("hidden");
        document.getElementById("right-stick").classList.add("hidden");
        document.getElementById("result").textContent = result;
        
        confetti({ 
            particleCount: 400, 
            spread: 360, 
            origin: { y: 0.5 },
            zIndex: 2000 
        });
        
        sauvegarderResultatTexte(result);
        setTimeout(() => document.getElementById("ticket-container").classList.add("hidden"), 6000);
    }, 5000);
}

function sauvegarderResultatTexte(texte) {
    const m = new Date();
    const nom = `Tirage_${m.getDate()}-${m.getMonth()+1}-${m.getFullYear()}_${m.getHours()}h${m.getMinutes()}.txt`;
    const blob = new Blob([texte], { type: "text/plain" });
    const lien = document.createElement("a");
    lien.href = URL.createObjectURL(blob);
    lien.download = nom; lien.click();
}