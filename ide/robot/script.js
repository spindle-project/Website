document.addEventListener('DOMContentLoaded', function() {
  const playgroundWrapper = document.getElementById('playgroundWrapper');
  const outputWrapper = document.getElementById('outputWrapper');
  const outputPlacementSelect = document.getElementById('outputPlacement');
  const outputSizeSelect = document.getElementById('outputSize');
  const optionsContainer = document.querySelector('.options-container');
  const mainElement = document.querySelector('main');

  // --- Robot State Variables ---
  let robotX = 0; // Current X position of the robot
  let robotY = 0; // Current Y position of the robot
  // robotDirection: 0: Up (North), 1: Right (East), 2: Down (South), 3: Left (West)
  let robotDirection = 0;
  const directionSymbols = ['⬆️', '➡️', '⬇️', '⬅️']; // Emojis for robot direction

  // 1. Dynamically create the Grid Size Input and Generate Button
  const gridOptionsGroup = document.createElement('div');
  gridOptionsGroup.classList.add('options-group');
  gridOptionsGroup.style.marginTop = '20px';

  const gridSizeLabel = document.createElement('label');
  gridSizeLabel.setAttribute('for', 'gridSize');
  gridSizeLabel.textContent = 'Grid Side Length:';

  const gridSizeInput = document.createElement('input');
  gridSizeInput.setAttribute('type', 'number');
  gridSizeInput.setAttribute('id', 'gridSize');
  gridSizeInput.setAttribute('value', '10'); // Default value
  gridSizeInput.setAttribute('min', '1');
  gridSizeInput.setAttribute('max', '50');

  const generateGridBtn = document.createElement('button');
  generateGridBtn.setAttribute('id', 'generateGridBtn');
  generateGridBtn.textContent = 'Generate Grid';
  generateGridBtn.classList.add('test-code-button');

  gridOptionsGroup.appendChild(gridSizeLabel);
  gridOptionsGroup.appendChild(gridSizeInput);
  gridOptionsGroup.appendChild(generateGridBtn);
  optionsContainer.appendChild(gridOptionsGroup);

  // 2. Create the completely new div for the grid output
  const gridOutputContainer = document.createElement('div');
  gridOutputContainer.setAttribute('id', 'gridOutputContainer');
  gridOutputContainer.classList.add('code-output');
  gridOutputContainer.style.marginTop = '20px';
  gridOutputContainer.innerHTML = 'Click "Generate Grid" or run Spindle code to see the robot here...';

  mainElement.insertBefore(gridOutputContainer, playgroundWrapper.nextSibling);

  // Reference to the original text output div (will not be used for grid)
  const originalOutputDiv = document.getElementById('output');


  /**
   * Applies the selected output placement and size settings to the DOM.
   */
  function applyOutputSettings() {
    const placement = outputPlacementSelect.value;
    const size = outputSizeSelect.value;

    playgroundWrapper.classList.remove('side-by-side');
    if (placement === 'side') {
      playgroundWrapper.classList.add('side-by-side');
    }

    outputWrapper.classList.remove('output-small', 'output-medium', 'output-large');
    if (size === 'small') {
      outputWrapper.classList.add('output-small');
    } else if (size === 'medium') {
      outputWrapper.classList.add('output-medium');
    } else if (size === 'large') {
      outputWrapper.classList.add('output-large');
    }
  }

  /**
   * Generates the grid based on the user-selected side length from the input.
   * Also places the robot in the center.
   */
  function generateGrid() {
    const gridSize = parseInt(gridSizeInput.value, 10);
    if (isNaN(gridSize) || gridSize < 1 || gridSize > 50) {
      gridOutputContainer.innerHTML = 'Please enter a valid grid size (1-50).';
      gridOutputContainer.style.display = 'block';
      gridOutputContainer.style.gridTemplateColumns = 'none';
      gridOutputContainer.style.gridTemplateRows = 'none';
      return;
    }

    gridOutputContainer.innerHTML = ''; // Clear existing grid cells
    gridOutputContainer.style.display = 'grid';
    gridOutputContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridOutputContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

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
      cell.textContent = ''; // Clear robot symbol
    }
  }

  /**
   * Renders the robot in its current cell with the correct direction symbol.
   */
  function renderRobot() {
    const gridSize = parseInt(gridSizeInput.value, 10);
    const cellIndex = robotY * gridSize + robotX; // Y * width + X
    const cell = gridOutputContainer.children[cellIndex];
    if (cell) {
      cell.classList.add('robot-cell');
      cell.textContent = directionSymbols[robotDirection];
    }
  }

  // --- PyScript / Spindle Integration ---
  window.execute_robo_commands = function(robo_commands_json) {
    let robo_commands;
    try {
      // Assuming robo_commands_json is an array of simple strings, e.g., ["MF", "RL"]
      // Or an array of objects like [{cmd: "MF"}, {cmd: "RL"}]
      robo_commands = JSON.parse(robo_commands_json);
    } catch (e) {
      console.error("Failed to parse robo_commands JSON:", e);
      gridOutputContainer.textContent = "Error: Invalid command format from Spindle.";
      return;
    }

    // Always regenerate/clear the grid and reset robot for a new run
    generateGrid();

    // Iterate through commands and move/rotate robot
    robo_commands.forEach(command => {
      execute_command(command);
    });
  };

  /**
   * Executes a single command received from the Spindle interpreter.
   * This now only handles 'MF', 'RL', and 'RR' robot commands.
   * @param {string|object} command - A string (e.g., "MF") or an object with a 'cmd' property.
   * Expected command forms: "MF", "RL", "RR" or { "cmd": "MF" }
   */
  function execute_command(command) {
    console.log(command)
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
    }
    
    renderRobot(); // Render robot at new position with new direction
  }

  // Initial setup when the page loads
  applyOutputSettings();
  generateGrid(); // Generate the initial grid with the robot

  // Event listeners for UI controls
  outputPlacementSelect.addEventListener('change', applyOutputSettings);
  outputSizeSelect.addEventListener('change', applyOutputSettings);
  generateGridBtn.addEventListener('click', generateGrid);
});
