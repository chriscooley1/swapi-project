document.addEventListener("DOMContentLoaded", () => {
    // Create custom cursor elements
    const customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    document.body.appendChild(customCursor);

    const blade = document.createElement("div");
    blade.id = "blade";
    customCursor.appendChild(blade);

    let rotationSpeed = 4; // Default rotation speed (degrees per frame)
    let isRotating = false;
    let rotationAngleX = 0;
    let rotationAngleY = 0;
    let rotationAngleZ = 0;
    let saberActivated = false;

    const cursorOffsetX = -7;
    const cursorOffsetY = -20;

    // Update cursor position
    document.addEventListener("mousemove", (e) => {
        customCursor.style.left = `${e.clientX + cursorOffsetX}px`;
        customCursor.style.top = `${e.clientY + cursorOffsetY}px`;
    });

    // Handle mouse down event to extend the lightsaber blade
    document.addEventListener("mousedown", () => {
        blade.style.height = "100px"; // Extend blade
    });

    // Handle mouse up event to retract the lightsaber blade
    document.addEventListener("mouseup", () => {
        blade.style.height = "0"; // Retract blade
    });

    // Handle key down event to start/stop rotation and toggle lightsaber blade
    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "r":
                isRotating = !isRotating;
                if (isRotating) {
                    requestAnimationFrame(rotateCursor);
                }
                break;
            case "s":
                if (!saberActivated) {
                    blade.style.height = "100px"; // Extend blade
                } else {
                    blade.style.height = "0"; // Retract blade
                }
                saberActivated = !saberActivated;
                break;
        }
    });

    // Function to rotate the cursor
    const rotateCursor = () => {
        if (isRotating) {
            rotationAngleX = (rotationAngleX + rotationSpeed) % 360;
            rotationAngleY = (rotationAngleY + rotationSpeed) % 360;
            rotationAngleZ = (rotationAngleZ + rotationSpeed) % 360;
            customCursor.style.transform = `rotateX(${rotationAngleX}deg) rotateY(${rotationAngleY}deg) rotateZ(${rotationAngleZ}deg)`;
            requestAnimationFrame(rotateCursor);
        }
    };
});
