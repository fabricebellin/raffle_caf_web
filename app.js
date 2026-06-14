function draw() {
    // 1. Récupération et validation stricte des entrées
    const participantsInput = document.getElementById("total-participants").value;
    const carsInput = document.getElementById("cars").value;

    const totalParticipants = parseInt(participantsInput);
    const cars = parseInt(carsInput);

    // Vérification : entiers positifs uniquement
    if (!Number.isInteger(Number(participantsInput)) || totalParticipants <= 0 ||
        !Number.isInteger(Number(carsInput)) || cars <= 0) {
        alert("Erreur : Veuillez saisir uniquement des nombres entiers positifs pour les participants et les Clio.");
        return; 
    }

    // 2. Initialisation de l'interface
    document.getElementById("ticket-title").textContent = "SÉLECTION EN COURS...";
    document.getElementById("ticket-winner").innerHTML = "🥁";
    document.getElementById("result").textContent = "";

    let participants = parseParticipants(document.getElementById("input").value);

    // 3. Vérification du nombre de participants
    if (participants.length < cars) { 
        alert("Pas assez de participants pour le nombre de Clio défini !"); 
        return; 
    }

    // 4. Tirage au sort
    shuffle(participants);
    let winners = participants.slice(0, cars);
    
    let result = "TIRAGE AU SORT CAF - CLIO\n\n";
    let ticketList = "";
    
    winners.forEach((w, i) => { 
        result += `${i+1}. ${w}\n`; 
        ticketList += `<div style="margin: 10px 0;"><strong>${i+1}.</strong> ${w}</div>`; 
    });

    document.getElementById("ticket-container").classList.remove("hidden");
    document.getElementById("left-stick").classList.remove("hidden");
    document.getElementById("right-stick").classList.remove("hidden");
    
    let audio = document.getElementById("audio-tambour");
    audio.load(); audio.play();

    // 5. Affichage des résultats après l'animation
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
