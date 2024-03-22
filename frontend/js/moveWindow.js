const dpr = window.devicePixelRatio;

// Function to handle the start of a drag event
function startDrag(e) {
    // Get the initial position of the window
    window.runtime.WindowGetPosition().then((position) => {
        // Store the initial position and cursor coordinates
        window.initialPosition = position;
        window.initialCursor = { x: e.screenX, y: e.screenY };
        // Listen for mouse movement and mouse release
        document.addEventListener('mousemove', dragWindow);
        document.addEventListener('mouseup', stopDrag);
    });
}

// Function to handle the dragging (mouse move event)
function dragWindow(e) {
    // Calculate the difference between the current and initial cursor position
    const dx = e.screenX - window.initialCursor.x;
    const dy = e.screenY - window.initialCursor.y;

    // Set the new position of the window
    window.runtime.WindowSetPosition(
        window.initialPosition.x + dx * dpr,
        window.initialPosition.y + dy * dpr
    );
}

// Function to handle the end of a drag event
function stopDrag() {
    // Remove the event listeners
    document.removeEventListener('mousemove', dragWindow);
    document.removeEventListener('mouseup', stopDrag);
}

// const draggableArea = document.getElementById('b1');
// draggableArea.addEventListener('mousedown', startDrag);
document.addEventListener('mousedown', startDrag);
