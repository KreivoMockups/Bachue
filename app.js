// --- CASO DE ESTUDIO INTEGRADo ---
const govCase = {
    narrative: "El despliegue de la Malla de Soberanía Muisca requiere el procesamiento de volúmenes masivos de información nacional. El desafío crítico es establecer un marco regulatorio que permita entrenar Modelos Fundacionales Soberanos sin vulnerar la privacidad ciudadana, asegurando nuestra posición en el Índice Latinoamericano de IA.",
    interactions: [
        { 
            agent: "A", 
            content: "Para proteger nuestra biodiversidad, adaptar el territorio al cambio climático y potenciar la bioeconomía, requiero procesar terabytes de datos satelitales. La IA soberana debe clasificar especies a una escala sin precedentes.", 
            target: "procesamiento de volúmenes masivos"
        },
        { 
            agent: "B", 
            content: "Esa escala es vital, pero debe equilibrarse. Desde la Salud Pública, mi prioridad es la predicción epidemiológica. Esto exige acceder a historiales clínicos, lo cual es inviable sin un procesamiento anclado en la Ley 1581 de protección de datos.", 
            target: "vulnerar la privacidad ciudadana"
        },
        { 
            agent: "A", 
            content: "Comprendo la restricción. No dependeremos de plataformas extranjeras (cajas negras). Para que mi análisis medioambiental y tu análisis clínico converjan de forma segura, necesitamos una barrera de contención técnica y ética en nuestros servidores.", 
            target: "entrenar Modelos Fundacionales Soberanos"
        },
        { 
            agent: "B", 
            content: "Consenso estratégico alcanzado. Instauraremos un Comité Interno de Ética. Aplicaremos anonimización profunda para garantizar el Habeas Data, con auditorías continuas validadas por médicos y biólogos para mitigar sesgos.", 
            target: "marco regulatorio"
        }
    ],
    plan: [
        "1. Conformación del Comité Interno de Ética y Gobernanza de Datos Multi-Agente.",
        "2. Implementación de algoritmos de anonimización profunda (Habeas Data / Ley 1581) previos al entrenamiento.",
        "3. Establecimiento de reportes de transparencia para validación humana de los modelos.",
        "4. Consolidación de infraestructura soberana para impulsar a Colombia en el ILIA."
    ]
};

// --- ESTADOS Y REFERENCIAS AL DOM ---
let currentStep = 0;
let isSimulationRunning = false;
const synth = window.speechSynthesis;

const narrativeBox = document.getElementById('narrative-text');
const fluidPerimeter = document.getElementById('fluid-perimeter');
const btnStart = document.getElementById('btn-start');
const consensusCrystal = document.getElementById('consensus-crystal');
const planContainer = document.getElementById('plan-container');

// --- LÓGICA DE SIMULACIÓN ---
btnStart.addEventListener('click', () => {
    if (isSimulationRunning) return;
    isSimulationRunning = true;
    currentStep = 0;
    
    // UI Reset
    btnStart.innerText = "Evaluando...";
    btnStart.classList.add('opacity-50', 'cursor-not-allowed');
    consensusCrystal.classList.add('hidden', 'opacity-0', 'translate-y-10');
    planContainer.innerHTML = '';
    
    // Iniciar Narrativa
    narrativeBox.innerHTML = govCase.narrative;
    speakText(govCase.narrative, 'neutral', () => {
        setTimeout(processNextStep, 1000);
    });
});

function processNextStep() {
    if (currentStep < govCase.interactions.length) {
        const interaction = govCase.interactions[currentStep];
        
        // 1. Efecto Visual de Fluidez de Esencia
        activateAgentPerimeter(interaction.agent);
        highlightText(interaction.target, interaction.agent);

        // 2. Leer con voz sintética y pasar al siguiente al terminar
        speakText(interaction.content, interaction.agent, () => {
            deactivateAgentPerimeter(interaction.agent);
            currentStep++;
            setTimeout(processNextStep, 800);
        });
    } else {
        triggerConsensus();
    }
}

function triggerConsensus() {
    isSimulationRunning = false;
    narrativeBox.innerHTML = govCase.narrative; // Limpiar subrayados
    fluidPerimeter.className = "absolute inset-0 opacity-0 transition-all duration-700 pointer-events-none"; // Apagar perímetro
    
    // EL MOMENTO DEL ÉXITO: Todos los pentágonos brillan
    const pentagons = ['A', 'B', 'Xue', 'Chia', 'Bochica'];
    pentagons.forEach(id => {
        const el = document.getElementById(`pentagon-${id}`);
        el.classList.add('shadow-[0_0_40px_rgba(255,255,255,0.4)]', 'border-white/60');
        el.classList.add('scale-110'); // Expansión de aceptación
    });

    // Materializar el cristal (Plan)
    consensusCrystal.classList.remove('hidden');
    setTimeout(() => {
        consensusCrystal.classList.remove('opacity-0', 'translate-y-10');
        consensusCrystal.classList.add('opacity-100', 'translate-y-0');
        
        govCase.plan.forEach((item, i) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = "p-3 border-l-2 border-emerald-500/50 bg-slate-800/30 rounded shadow-sm";
                p.innerText = item;
                planContainer.appendChild(p);
            }, i * 800);
        });

        speakText("El consenso ético ha sido materializado en la Malla Soberana.", 'neutral');
        
        // Reiniciar botón
        btnStart.innerText = "Reiniciar Malla";
        btnStart.classList.remove('opacity-50', 'cursor-not-allowed');
    }, 500);
}

// --- UTILIDADES VISUALES Y AUDIO ---
function activateAgentPerimeter(agent) {
    const pentagon = document.getElementById(`pentagon-${agent}`);
    pentagon.classList.add('speaking');
    
    fluidPerimeter.className = "absolute inset-0 opacity-100 transition-all duration-700 pointer-events-none";
    if (agent === 'A') {
        fluidPerimeter.classList.add('shadow-[inset_0_0_50px_rgba(249,115,22,0.3)]', 'border-2', 'border-orange-500/50');
    } else {
        fluidPerimeter.classList.add('shadow-[inset_0_0_50px_rgba(6,182,212,0.3)]', 'border-2', 'border-cyan-500/50');
    }
}

function deactivateAgentPerimeter(agent) {
    const pentagon = document.getElementById(`pentagon-${agent}`);
    pentagon.classList.remove('speaking');
    fluidPerimeter.className = "absolute inset-0 opacity-0 transition-all duration-700 pointer-events-none";
}

function highlightText(term, agent) {
    if (!term) return;
    const highlightClass = agent === 'A' 
        ? 'text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500' 
        : 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500';
    
    const regex = new RegExp(`(${term})`, 'gi');
    narrativeBox.innerHTML = govCase.narrative.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

function speakText(text, agent, callback) {
    synth.cancel(); // Detener audios previos
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO'; // Español Colombia
    
    if (agent === 'A') {
        utterance.pitch = 0.8; // Voz grave para el hardware/energía
        utterance.rate = 1.0;
    } else if (agent === 'B') {
        utterance.pitch = 1.3; // Voz fluida/nítida para el software/agua
        utterance.rate = 1.05;
    } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
    }
    
    utterance.onend = callback;
    synth.speak(utterance);
}
