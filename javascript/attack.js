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

    setTimeout(() => {
        document.body.removeChild(tieFighter);
    }, animationDuration);
};
