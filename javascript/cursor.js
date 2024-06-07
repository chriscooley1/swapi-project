document.addEventListener("DOMContentLoaded", () => {
    // Create custom cursor elements
    const customCursor = document.createElement("div");
    customCursor.id = "custom-cursor";
    document.body.appendChild(customCursor);
  
    const blade = document.createElement("div");
    blade.id = "blade";
    customCursor.appendChild(blade);
  
    // For rotation animation
    let rotationSpeed = 2; // Default rotation speed (degrees per frame)
    let isRotating = false;
    let rotationAngleX = 0;
    let rotationAngleY = 0;
    let rotationAngleZ = 0;
  
    let active = false;
  
    const cursorOffsetX = -7;
    const cursorOffsetY = -20;
  
    // Update cursor position
    document.addEventListener("mousemove", (e) => {
      customCursor.style.left = `${e.clientX + cursorOffsetX}px`;
      customCursor.style.top = `${e.clientY + cursorOffsetY}px`;
    });
  
    document.addEventListener("mousedown", () => {
      if (active) {
        document.getElementById("lightSaberClick").play();
      }
  
      customCursor.style.transform = `rotateZ(90deg)`;
      requestAnimationFrame(rotateCursor);
    });
  
    document.addEventListener("mouseup", () => {
      customCursor.style.transform = `rotateZ(0deg)`;
      requestAnimationFrame(rotateCursor);
    });
  
    // Handle key down event to start/stop rotation
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "r":
          if (active) {
            isRotating = !isRotating;
            if (isRotating) {
              requestAnimationFrame(rotateCursor);
            }
          }
          break;
        case "s":
          toggleLightSaber();
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
  
    const toggleLightSaber = () => {
      if (!active) {
        blade.style.height = "100px"; // Extend blade
        document.getElementById("lightSaberActivate").play();
      } else {
        blade.style.height = "0"; // Retract blade
        document.getElementById("lightSaberDeactivate").play();
      }
      active = !active;
    };
  });