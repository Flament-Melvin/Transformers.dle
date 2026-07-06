// 1. Ta base de données de Transformers
const transformersDatabase = [
    { name: "Optimus Prime", faction: "Autobot", generation: "G1", altMode: "Camion", color: "Bleu/Rouge" },
    { name: "Megatron", faction: "Decepticon", generation: "G1", altMode: "Pistolet", color: "Gris" },
    { name: "Bumblebee", faction: "Autobot", generation: "G1", altMode: "Voiture", color: "Jaune" },
    { name: "Starscream", faction: "Decepticon", generation: "G1", altMode: "Avion", color: "Gris/Rouge" },
    { name: "Grimlock", faction: "Autobot", generation: "G1", altMode: "Dinosaure", color: "Gris/Or" },
    { name: "Soundwave", faction: "Decepticon", generation: "G1", altMode: "Cassette", color: "Bleu" }
];

// 2. Sélectionner le Transformer du jour (Change toutes les 24 heures)
function getTransformerOfTheDay() {
    const today = new Date();
    // Crée un identifiant unique basé sur la date (ex: 20260706)
    const dateIdentifier = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    // Utilise le modulo pour choisir un index fixe pour toute la journée
    const index = dateIdentifier % transformersDatabase.length;
    return transformersDatabase[index];
}

const targetTransformer = getTransformerOfTheDay();
console.log("Chut... Le robot à trouver est :", targetTransformer.name); // Visible uniquement dans la console pour tricher

// 3. Écouter le clic sur le bouton Valider
document.getElementById("submit-btn").addEventListener("click", () => {
    const inputElement = document.getElementById("character-input");
    const playerGuessName = inputElement.value.trim();

    // Trouver le personnage correspondant dans la base de données
    const playerGuess = transformersDatabase.find(
        t => t.name.toLowerCase() === playerGuessName.toLowerCase()
    );

    if (!playerGuess) {
        alert("Ce Transformer n'est pas dans notre base de données ! Vérifiez l'orthographe.");
        return;
    }

    // Si le personnage existe, on compare ses attributs
    addNewGuessRow(playerGuess);
    
    // Vider la barre de recherche
    inputElement.value = "";
});

// 4. Fonction qui compare et affiche la ligne de résultat
function addNewGuessRow(guess) {
    const container = document.getElementById("guesses-container");
    const row = document.createElement("div");
    row.className = "guess-row";

    // Case 1 : Nom du Robot (Toujours gris/neutre)
    row.appendChild(createBox(guess.name, "gray"));

    // Case 2 : Comparaison Faction (Vert ou Rouge)
    const factionClass = guess.faction === targetTransformer.faction ? "correct" : "wrong";
    row.appendChild(createBox(guess.faction, factionClass));

    // Case 3 : Comparaison Génération (Vert ou Rouge)
    const genClass = guess.generation === targetTransformer.generation ? "correct" : "wrong";
    row.appendChild(createBox(guess.generation, genClass));

    // Case 4 : Comparaison Mode Alternatif (Vert ou Rouge)
    const altClass = guess.altMode === targetTransformer.altMode ? "correct" : "wrong";
    row.appendChild(createBox(guess.altMode, altClass));

    // Case 5 : Comparaison Couleur (Vert, Orange si correspondance partielle, ou Rouge)
    let colorClass = "wrong";
    if (guess.color === targetTransformer.color) {
        colorClass = "correct";
    } else if (guess.color.split('/').some(c => targetTransformer.color.includes(c))) {
        colorClass = "partial"; // Si une des couleurs matche (ex: Rouge dans "Bleu/Rouge")
    }
    row.appendChild(createBox(guess.color, colorClass));

    // Ajouter la ligne en haut de la liste des essais
    container.insertBefore(row, container.firstChild);

    // Vérifier si le joueur a gagné
    if (guess.name === targetTransformer.name) {
        setTimeout(() => alert("Bravo ! Tu as trouvé le Transformer du jour ! 🤖🎉"), 200);
    }
}

// Fonction utilitaire pour créer une case HTML
function createBox(text, className) {
    const box = document.createElement("div");
    box.className = `box ${className}`;
    box.textContent = text;
    return box;
}
