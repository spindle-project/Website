document.addEventListener('DOMContentLoaded', function() {
    const playgroundWrapper = document.getElementById('playgroundWrapper');
    const outputWrapper = document.getElementById('outputWrapper');
    const mainElement = document.querySelector('main');

    // --- Robot State Variables ---
    let robotX = 0; // Current X position of the robot
    let robotY = 0; // Current Y position of the robot
    // robotDirection: 0: Up (North), 1: Right (East), 2: Down (South), 3: Left (West)
    let robotDirection = 0;
    const directionSymbols = ['⬆️', '➡️', '⬇️', '⬅️']; // Emojis for robot direction

    // --- NEW: Create a single container for grid, grid settings, and output ---
    const robotPlaygroundContainer = document.createElement('div');
    robotPlaygroundContainer.setAttribute('id', 'robotPlaygroundContainer');
    robotPlaygroundContainer.style.marginTop = '20px';
    robotPlaygroundContainer.style.padding = '15px';
    robotPlaygroundContainer.style.border = '1px solid #ccc';
    robotPlaygroundContainer.style.borderRadius = '8px';
    robotPlaygroundContainer.style.backgroundColor = 'var(--card-bg)'; // Corrected syntax
    robotPlaygroundContainer.style.gap = '15px';
    robotPlaygroundContainer.style.flexDirection = 'row'; // Initial layout for larger screens

    // 1. Dynamically create the Grid Size Input and Generate Button
    const gridSettingsGroup = document.createElement('div');
    gridSettingsGroup.classList.add('options-group');
    gridSettingsGroup.style.display = 'flex';
    gridSettingsGroup.style.alignItems = 'center';
    gridSettingsGroup.style.gap = '10px';

    const gridSizeLabel = document.createElement('label');
    gridSizeLabel.setAttribute('for', 'gridSize');
    gridSizeLabel.textContent = 'Grid Side Length:';

    const gridSizeInput = document.createElement('input');
    gridSizeInput.setAttribute('type', 'number');
    gridSizeInput.setAttribute('id', 'gridSize');
    gridSizeInput.setAttribute('value', '10');
    gridSizeInput.setAttribute('min', '1');
    gridSizeInput.setAttribute('max', '50');
    gridSizeInput.style.width = '60px';

    const generateGridBtn = document.createElement('button');
    generateGridBtn.setAttribute('id', 'generateGridBtn');
    generateGridBtn.textContent = 'Generate Grid';
    generateGridBtn.classList.add('test-code-button');

    gridSettingsGroup.appendChild(gridSizeLabel);
    gridSettingsGroup.appendChild(gridSizeInput);
    gridSettingsGroup.appendChild(generateGridBtn);
    robotPlaygroundContainer.appendChild(gridSettingsGroup);

    // 2. Create the div for the grid output
    const gridOutputContainer = document.createElement('div');
    gridOutputContainer.setAttribute('id', 'gridOutputContainer');
    gridOutputContainer.style.minHeight = '200px';
    gridOutputContainer.style.display = 'flex'; // Keep flex for centering initial text
    gridOutputContainer.style.justifyContent = 'center';
    gridOutputContainer.style.alignItems = 'center';
    gridOutputContainer.style.width = 'min(100%, 600px)'; // Max width for grid
    gridOutputContainer.innerHTML = 'Click "Generate Grid" or run Spindle code to see the robot here...';

    robotPlaygroundContainer.appendChild(gridOutputContainer);

    // --- Handling the existing outputWrapper (which contains the "Run Code" button) ---
    if (outputWrapper.parentNode) {
        outputWrapper.parentNode.removeChild(outputWrapper);
    }
    robotPlaygroundContainer.appendChild(outputWrapper);

    // Finally, insert the new combined container into the main element.
    playgroundWrapper.appendChild(robotPlaygroundContainer);

    // Reference to the original text output div (inside outputWrapper)
    const originalOutputDiv = document.getElementById('output');

    // Reference the 'Run Code' button
    const runButton = document.getElementById('runButton');


    /**
     * Generates the grid based on the user-selected side length from the input.
     * Also places the robot in the center.
     */
    function generateGrid() {
        const gridSize = parseInt(gridSizeInput.value, 10);
        if (isNaN(gridSize) || gridSize < 1 || gridSize > 30) {
            gridOutputContainer.innerHTML = 'You will only see gridsizes around 10-15 on the AP exam. Our maximum gridsize is 30.';
            gridOutputContainer.style.display = 'flex'; // Keep flex for centering error message
            gridOutputContainer.style.gridTemplateColumns = 'none';
            gridOutputContainer.style.gridTemplateRows = 'none';
            return;
        }

        gridOutputContainer.innerHTML = ''; // Clear existing grid cells
        gridOutputContainer.style.display = 'grid'; // Set to grid display for cells
        gridOutputContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridOutputContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

        // No longer setting --grid-cell-size directly in JS, relying on CSS `aspect-ratio` and `1fr`

        for (let i = 0; i < gridSize * gridSize; i++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridCell.textContent = '';
            gridOutputContainer.appendChild(gridCell);
        }
        console.log(`Generated a ${gridSize}x${gridSize} grid.`);

        // --- Place robot in the center ---
        robotX = Math.floor(gridSize / 2);
        robotY = Math.floor(gridSize / 2);
        robotDirection = 0; // Default to Up/North
        renderRobot(); // Render the robot at its initial position
    }

    /**
     * Clears the robot from its current cell.
     */
    function clearRobot() {
        const gridSize = parseInt(gridSizeInput.value, 10);
        const cellIndex = robotY * gridSize + robotX; // Y * width + X
        const cell = gridOutputContainer.children[cellIndex];
        if (cell) {
            cell.classList.remove('robot-cell');
            // Reset font size if you dynamically set it on the cell itself
            cell.style.fontSize = ''; // Remove inline font size
            cell.textContent = ''; // Clear robot symbol
        }
    }

    /**
     * Renders the robot in its current cell with the correct direction symbol.
     * Also dynamically adjusts the robot's font size to fit the cell.
     */
    function renderRobot() {
        const gridSize = parseInt(gridSizeInput.value, 10);
        const cellIndex = robotY * gridSize + robotX; // Y * width + X
        const cell = gridOutputContainer.children[cellIndex];
        cell.textContent = directionSymbols[robotDirection];
scaleRobotToCellHeight(cell, gridSize)
        
    }

    // --- PyScript / Spindle Integration ---
    window.execute_robo_commands = function(robo_commands_json) {
        let robo_commands;
        try {
            robo_commands = JSON.parse(robo_commands_json);
            originalOutputDiv.textContent = `Processing ${robo_commands.length} robot commands...`;
        } catch (e) {
            console.error("Failed to parse robo_commands JSON:", e);
            originalOutputDiv.textContent = "Error: Invalid command format from Spindle.";
            return;
        }

        generateGrid(); // Always regenerate/clear the grid and reset robot for a new run

        robo_commands.forEach((command, index) => {
            execute_command(command);
        });

        originalOutputDiv.textContent += `\nAll ${robo_commands.length} commands executed. Robot at (${robotX}, ${robotY}) facing ${directionSymbols[robotDirection]}.`;
    };

    /**
     * Executes a single command received from the Spindle interpreter.
     * This now only handles 'MF', 'RL', and 'RR' robot commands.
     * @param {string|object} command - A string (e.g., "MF") or an object with a 'cmd' property.
     * Expected command forms: "MF", "RL", "RR" or { "cmd": "MF" }
     */
    function execute_command(command) {
        const gridSize = parseInt(gridSizeInput.value, 10);
        let cmd = typeof command === 'string' ? command : command.cmd;

        clearRobot(); // Clear robot from current position before applying new state
        switch (cmd) {
            case 'MF': // Move Forward
                let newX = robotX;
                let newY = robotY;

                // Apply movement based on current direction
                if (robotDirection === 0) newY--; // Up (North)
                else if (robotDirection === 1) newX++; // Right (East)
                else if (robotDirection === 2) newY++; // Down (South)
                else if (robotDirection === 3) newX--; // Left (West)

                // Boundary checks: Ensure robot stays within grid
                if (newX >= 0 && newX < gridSize && newY >= 0 && newY < gridSize) {
                    robotX = newX;
                    robotY = newY;
                } else {
                    console.warn("Robot hit boundary at:", newX, newY, ". Command ignored:", cmd);
                    originalOutputDiv.textContent += `\nWarning: Robot hit boundary at (${newX},${newY}) for command '${cmd}'.`;
                }
                break;

            case 'RL': // Rotate Left (counter-clockwise)
                robotDirection = (robotDirection - 1 + 4) % 4;
                break;

            case 'RR': // Rotate Right (clockwise)
                robotDirection = (robotDirection + 1) % 4;
                break;

            default:
                console.warn("Unknown robot command:", cmd, ". Command ignored.");
                originalOutputDiv.textContent += `\nWarning: Unknown robot command '${cmd}'.`;
        }

        renderRobot(); // Render robot at new position with new direction
    }

    // Initial setup when the page loads
    generateGrid(); // Generate the initial grid with the robot

    // Event listeners for UI controls
    generateGridBtn.addEventListener('click', generateGrid);

    // Optional: Add a resize listener to re-render the robot (and thus re-scale its font)
    // if the grid cell sizes can change dynamically due to window resizing.
    // This is important if your grid cells resize via CSS flex/grid and not just initial generation.
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-render the robot to apply new font size based on resized cell
            // This will also re-apply its font size
            renderRobot();
        }, 150); // Debounce to prevent excessive calls during resizing
    });
});

function scaleRobotToCellHeight(cell, size) {
    if (!cell) {
        console.warn("Attempted to scale robot, but the cell element was null or undefined.");
        return;
    }
// Get the computed height of the cell
    const cellComputedStyle = window.getComputedStyle(cell);
    const cellHeight = parseFloat(cellComputedStyle.height);

    // Calculate an appropriate font size.
    // Emojis often have internal padding, so a factor like 0.8 or 0.9
    // helps ensure it fits without clipping, while still being large.
    const fontSize = cellHeight * 0.4; // Use 80% of the cell's height

    // Apply the calculated font size and reset line-height for snug fit
    cell.style.fontSize = `${fontSize}px`;
    cell.style.lineHeight = '1'; // Important to remove extra vertical space
    cell.style.display = 'flex'; // Ensure flex properties for centering if not already
    cell.style.justifyContent = 'center'; // Center horizontally
    cell.style.alignItems = 'center'; // Center vertically

}