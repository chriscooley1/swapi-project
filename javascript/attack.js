document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", () => {
        createAttackingTieFighters(5); // Number of attacking TIE fighters
    });
});

const createAttackingTieFighters = (count) => {
    for (let i = 0; i < count; i++) {
        setTimeout(spawnAttackingTieFighter, i * 1000); // Delay between each TIE fighter
    }
};

const spawnAttackingTieFighter = () => {
    const tieFighter = document.createElement("div");
    tieFighter.classList.add("attacking-tie-fighter");

    const body = document.createElement("div");
    body.classList.add("body");
    tieFighter.appendChild(body);

    const leftWing = document.createElement("div");
    leftWing.classList.add("left-wing");
    tieFighter.appendChild(leftWing);

    const rightWing = document.createElement("div");
    rightWing.classList.add("right-wing");
    tieFighter.appendChild(rightWing);

    document.body.appendChild(tieFighter);

    // Random starting position (left or right of the screen)
    const startPosition = Math.random() > 0.5 ? "left" : "right";
    tieFighter.style[startPosition] = "0";
    tieFighter.style.top = `${Math.random() * 100}%`;

    const target = document.getElementById("custom-cursor");
    const targetRect = target.getBoundingClientRect();

    const animationDuration = 2000; // Animation duration in ms

    // Move the TIE fighter towards the cursor
    tieFighter.animate([
        { transform: `translate(${startPosition === "left" ? "-100%" : "100%"}, 0)` },
        { transform: `translate(${targetRect.left}px, ${targetRect.top}px)` }
    ], {
        duration: animationDuration,
        easing: "linear",
        fill: "forwards"
    });

    // Add event listener to blow up TIE fighter when clicked
    tieFighter.addEventListener("click", (event) => {
        event.stopPropagation();
        blowUpTieFighter(tieFighter);
    });

    setTimeout(() => {
        if (document.body.contains(tieFighter)) {
            document.body.removeChild(tieFighter);
        }
    }, animationDuration);
};

const blowUpTieFighter = (tieFighter) => {
    // Get current position of TIE fighter
    const rect = tieFighter.getBoundingClientRect();
    const explosion = document.createElement("div");
    explosion.classList.add("explosion");
    explosion.style.left = `${rect.left + rect.width / 2}px`;
    explosion.style.top = `${rect.top + rect.height / 2}px`;

    console.log("Explosion coordinates:", explosion.style.left, explosion.style.top);

    document.body.appendChild(explosion);

    const explosionSound = new Audio("sounds/explosion.mp3");
    explosionSound.play();

    setTimeout(() => {
        if (document.body.contains(explosion)) {
            document.body.removeChild(explosion);
        }
        if (document.body.contains(tieFighter)) {
            document.body.removeChild(tieFighter);
        }
    }, 1000); // Remove explosion after animation
};
