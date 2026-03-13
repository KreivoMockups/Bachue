/* app.js */

// --- VARIABLES GLOBALES DE ESTADO ---
let currentStep = 0;
let isSimulationRunning = false;
let isSimulationFinished = false; // Variable global para controlar el estado final
let originalNarrative = ""; 
const TIME_PLAN_DROP = 1000; // Tiempo entre la aparición de cada paso del plan médico


// --- MÓDULO DE ACCESIBILIDAD (SÍNTESIS DE VOZ) ---
const synth = window.speechSynthesis;
let isAudioEnabled = false;

document.getElementById('toggle-audio').addEventListener('click', (e) => {
    isAudioEnabled = !isAudioEnabled;
    e.target.innerText = isAudioEnabled ? '🔊 (Activado)' : '🔇 (Silenciado)';
    e.target.classList.toggle('bg-emerald-600', isAudioEnabled);
    if (!isAudioEnabled) synth.cancel(); // Detiene el audio si se apaga
});


// --- FÓRMULA DE TIEMPO DINÁMICO ---
function calculateDynamicTime(text, voiceProfile = 'neutral') {
    const wordCount = text.trim().split(/\s+/).length;
    let msPerWord = 400; 

    if (voiceProfile === 'A') {
        msPerWord = 380; 
    } else if (voiceProfile === 'B') {
        msPerWord = 420; 
    }

    const baseReadingTime = wordCount * msPerWord;
    const buffer = 1500; 
    const finalTime = baseReadingTime + buffer;
    
    return Math.max(finalTime, 3000); 
}

function speakNarrative(text, voiceProfile = 'neutral') {
    if (!isAudioEnabled || !synth) return;
    
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-CO'; 
    
    if (voiceProfile === 'A') {
        utterance.pitch = 1.3; 
        utterance.rate = 1.05;
    } else if (voiceProfile === 'B') {
        utterance.pitch = 0.8; 
        utterance.rate = 0.95;
    } else {
        utterance.pitch = 1.0; 
        utterance.rate = 1.0;
    }
    
    synth.speak(utterance);
}


// --- LÓGICA DE LA SIMULACIÓN ---
function startSimulation() {
    if (isSimulationRunning) return;
    
    isSimulationRunning = true;
    isSimulationFinished = false;
    
    const btn = document.getElementById('start-demo');
    btn.disabled = true; // Deshabilitar botón mientras corre
    btn.classList.add('opacity-50', 'cursor-not-allowed');
    btn.innerText = "Analizando Historia...";

    // Limpiar UI por si acaso
    document.getElementById('agent-a-logs').innerHTML = '';
    document.getElementById('agent-b-logs').innerHTML = '';
    document.getElementById('final-plan').innerHTML = '<p class="text-slate-500">Analizando consenso...</p>';
    
    const caseKey = document.getElementById('case-selector').value;
    const activeCase = BachueRegistry[caseKey];
    
    // Cargar narrativa y audio inicial
    originalNarrative = activeCase.patient.narrative;
    document.getElementById('patient-data').innerText = originalNarrative;
    speakNarrative("Contexto del sector a evaluar: " + originalNarrative, 'neutral');
    
    currentStep = 0;
    
    const initialDynamicDelay = calculateDynamicTime(originalNarrative, 'neutral');
    
    setTimeout(() => {
        btn.innerText = "Simulación en curso...";
        processNextStep(activeCase);
    }, initialDynamicDelay);
}

function processNextStep(activeCase) {
    if (currentStep < activeCase.interactions.length) {
        const interaction = activeCase.interactions[currentStep];
        
        renderMessage(interaction.agent, interaction.content);
        highlightText(interaction.target, interaction.agent);
        speakNarrative(interaction.content, interaction.agent);
        
        if (interaction.asset) {
            showAsset(interaction.asset);
        }

        const dynamicDelay = calculateDynamicTime(interaction.content, interaction.agent);
        currentStep++;
        
        setTimeout(() => processNextStep(activeCase), dynamicDelay);
    } else {
        document.getElementById('patient-data').innerText = originalNarrative;
        finalizeSimulation(activeCase.plan);
    }
}

function finalizeSimulation(plan) {
    isSimulationRunning = false;
    isSimulationFinished = true; // ¡Marcamos que terminó!
    
    const btn = document.getElementById('start-demo');
    btn.innerText = "Seleccionar Nuevo Caso";
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-blue-600', 'hover:bg-blue-500');
    btn.classList.add('bg-emerald-600', 'hover:bg-emerald-500'); // Botón verde para nueva acción
    
    const container = document.getElementById('final-plan');
    container.innerHTML = "";
    speakNarrative("Consenso alcanzado. Hoja de ruta estratégica sugerida: " + plan.join(". "), 'neutral');

    plan.forEach((item, i) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.className = "p-2 bg-emerald-500/20 border-l-4 border-emerald-500 animate-fade-in mb-2";
            p.innerText = item;
            container.appendChild(p);
        }, i * TIME_PLAN_DROP);
    });
}


// --- LÓGICA DE REINICIO DE INTERFAZ ---
function resetUI() {
    isSimulationFinished = false;
    isSimulationRunning = false;
    
    // Limpiar textos
    document.getElementById('agent-a-logs').innerHTML = '';
    document.getElementById('agent-b-logs').innerHTML = '';
    document.getElementById('final-plan').innerHTML = '<p class="text-slate-500">Esperando consenso entre agentes...</p>';
    document.getElementById('patient-data').innerText = 'Active el audio y luego seleccione un caso del menú desplegable. Seguido oprima el botón "Iniciar Simulación" para comenzar la lectura...';
    
    // Restaurar estilo del botón
    const btn = document.getElementById('start-demo');
    btn.innerText = "Iniciar Simulación";
    btn.disabled = false;
    btn.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
    btn.classList.add('bg-blue-600', 'hover:bg-blue-500');
    
    // Limpiar visualizaciones (si estaban abiertas) y audio
    document.getElementById('viz-container').classList.add('hidden');
    if (synth) synth.cancel();
}


// --- UTILIDADES VISUALES ---
function highlightText(term, agent) {
    if (!term) return;
    const box = document.getElementById('patient-data');
    
    const highlightClass = agent === 'A' 
        ? 'text-blue-400 font-bold underline decoration-blue-500 decoration-2 underline-offset-4 transition-all duration-300' 
        : 'text-red-400 font-bold underline decoration-red-500 decoration-2 underline-offset-4 transition-all duration-300';
    
    const regex = new RegExp(`(${term})`, 'gi');
    box.innerHTML = originalNarrative.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

function renderMessage(agent, text) {
    const container = document.getElementById(`agent-${agent.toLowerCase()}-logs`);
    const div = document.createElement('div');
    div.className = `p-4 mb-4 rounded-lg border animate-fade-in ${agent === 'A' ? 'bg-blue-900/20 border-blue-500/30' : 'bg-red-900/20 border-red-500/30'}`;
    div.innerHTML = `<span class="text-xs font-bold block mb-1">${agent === 'A' ? 'ANALISTA' : 'VALIDADOR'}</span><p>${text}</p>`;
    container.prepend(div);
}

function showAsset(path) {
    const modal = document.getElementById('viz-container');
    const img = document.getElementById('asset-viewer');
    img.src = path;
    modal.classList.remove('hidden');
}


// --- GESTOR DE EVENTOS PRINCIPAL ---
document.getElementById('start-demo').addEventListener('click', () => {
    // El botón es inteligente: decide si reiniciar la UI o arrancar el caso
    if (isSimulationFinished) {
        resetUI();
    } else {
        startSimulation();
    }
});