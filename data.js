/* data.js */
// Extraemos el caso actual a evaluar desde el Registry
const activeCase = MuiscaRegistry["CASE_GOV_001"];

// Variables de estado global
let currentStep = 0;
let isSimulationRunning = false;
