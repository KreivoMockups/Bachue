/* app.js */
const synth = window.speechSynthesis;
let systemVoices = [];
let activeCase = null;
let currentStep = 0;
let isSimulationRunning = false;
let isVoiceEnabled = true; // Control global del sonido

// Cargar catálogo de voces
function loadVoices() {
    systemVoices = synth.getVoices();
}
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Referencias al DOM
const narrativeBox = document.getElementById('narrative-text');
const fluidPerimeter = document.getElementById('fluid-perimeter');
const btnStart = document.getElementById('btn-start');
const consensusCrystal = document.getElementById('consensus-crystal');
const planContainer = document.getElementById('plan-container');
const caseSelector = document.getElementById('case-selector');

// Referencias del Teleprompter y Botón Voz
const activeThoughtContainer = document.getElementById('active-thought-container');
const activeAgentName = document.getElementById('active-agent-name');
const activeThoughtText = document.getElementById('active-thought-text');
const btnToggleVoice = document.getElementById('btn-toggle-voice');
const voiceIcon = document.getElementById('voice-icon');
const voiceText = document.getElementById('voice-text');

// --- CONTROLADOR DE VOZ ---
btnToggleVoice.addEventListener('click', () => {
    isVoiceEnabled = !isVoiceEnabled;
    if (isVoiceEnabled) {
        voiceIcon.innerText = "🔊";
        voiceText.innerText = "Voz Activada";
        btnToggleVoice.classList.remove('opacity-50', 'text-slate-400');
        btnToggleVoice.classList.add('text-slate-200');
    } else {
        voiceIcon.innerText = "🔇";
        voiceText.innerText = "Voz Silenciada";
        btnToggleVoice.classList.remove('text-slate-200');
        btnToggleVoice.classList.add('opacity-50', 'text-slate-400');
        synth.cancel(); // Detiene el audio inmediatamente si estaba sonando
    }
});

// --- ACTUALIZACIÓN AL CAMBIAR DE CASO ---
function updateNarrativeScreen() {
    const selectedKey = caseSelector.value;
    activeCase = MuiscaRegistry[selectedKey];
    narrativeBox.innerHTML = activeCase.narrative;
}
caseSelector.addEventListener('change', updateNarrativeScreen);
updateNarrativeScreen();

// --- EVENTOS DE INICIO ---
btnStart.addEventListener('click', () => {
    if (isSimulationRunning) return;
    isSimulationRunning = true;
    currentStep = 0;
    
    btnStart.innerText = "Evaluando...";
    btnStart.classList.add('opacity-50', 'cursor-not-allowed');
    caseSelector.disabled = true;
    consensusCrystal.classList.add('hidden', 'opacity-0', 'translate-y-10');
    planContainer.innerHTML = '';
    
    activeThoughtContainer.classList.add('hidden');
    narrativeBox.className = "text-lg md:text-xl leading-relaxed text-slate-300 font-light relative z-10 transition-all duration-700 ease-in-out";
    
    speakText(activeCase.narrative, 'neutral', () => {
        setTimeout(processNextStep, 800);
    });
});

// --- MOTOR DE SIMULACIÓN ---
function processNextStep() {
    if (currentStep < activeCase.interactions.length) {
        const interaction = activeCase.interactions[currentStep];
        
        activateAgentPerimeter(interaction.agent, interaction.content);
        highlightText(interaction.target, interaction.agent);

        speakText(interaction.content, interaction.agent, () => {
            deactivateAgentPerimeter(interaction.agent);
            currentStep++;
            setTimeout(processNextStep, 1000); 
        });
    } else {
        triggerConsensus();
    }
}

// --- CONSTRUCCIÓN DEL CONSENSO ---
function triggerConsensus() {
    isSimulationRunning = false;
    narrativeBox.innerHTML = activeCase.narrative; 
    fluidPerimeter.className = "absolute inset-0 opacity-0 scale-100 transition-all duration-700 pointer-events-none rounded-xl";
    
    activeThoughtContainer.classList.add('hidden');
    narrativeBox.className = "text-lg md:text-xl leading-relaxed text-slate-300 font-light relative z-10 transition-all duration-700 ease-in-out";
    
    const pentagons = ['A', 'B', 'Xue', 'Chia', 'Bochica'];
    pentagons.forEach(id => {
        const el = document.getElementById(`pentagon-${id}`);
        el.classList.add('shadow-[0_0_40px_rgba(255,255,255,0.4)]', 'border-white/60', 'scale-110');
    });

    consensusCrystal.classList.remove('hidden');
    setTimeout(() => {
        consensusCrystal.classList.remove('opacity-0', 'translate-y-10');
        consensusCrystal.classList.add('opacity-100', 'translate-y-0');
        
        activeCase.plan.forEach((item, i) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.className = "p-3 border-l-2 border-emerald-500/50 bg-slate-800/30 rounded shadow-sm";
                p.innerText = item;
                planContainer.appendChild(p);
            }, i * 800);
        });

        speakText("El consenso ético ha sido materializado en la Malla Soberana.", 'neutral', () => {});
        
        btnStart.innerText = "Reiniciar Malla";
        btnStart.classList.remove('opacity-50', 'cursor-not-allowed');
        caseSelector.disabled = false;
        
        setTimeout(() => {
            pentagons.forEach(id => {
                const el = document.getElementById(`pentagon-${id}`);
                el.classList.remove('shadow-[0_0_40px_rgba(255,255,255,0.4)]', 'border-white/60', 'scale-110');
            });
        }, 5000);

    }, 500);
}

// --- UTILIDADES VISUALES Y DE VOZ ---
function activateAgentPerimeter(agent, content) {
    const pentagon = document.getElementById(`pentagon-${agent}`);
    pentagon.classList.add('speaking');
    
    fluidPerimeter.className = "absolute inset-0 opacity-100 scale-105 transition-all duration-700 pointer-events-none rounded-xl";
    narrativeBox.className = "text-sm leading-relaxed text-slate-500 font-light relative z-10 transition-all duration-700 ease-in-out line-clamp-3 md:line-clamp-none";
    
    activeThoughtContainer.classList.remove('hidden');
    activeThoughtText.innerText = `"${content}"`;
    
    if (agent === 'A') {
        fluidPerimeter.classList.add('shadow-[0_0_80px_rgba(249,115,22,0.4),inset_0_0_80px_rgba(249,115,22,0.3)]', 'border-4', 'border-orange-500/80');
        activeAgentName.innerText = "CHIMINIGAGUA ANALIZA:";
        activeAgentName.className = "text-[10px] md:text-xs font-bold tracking-widest mb-2 block text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]";
        activeThoughtText.className = "text-xl md:text-2xl font-medium leading-relaxed text-orange-100";
    } else {
        fluidPerimeter.classList.add('shadow-[0_0_80px_rgba(6,182,212,0.4),inset_0_0_80px_rgba(6,182,212,0.3)]', 'border-4', 'border-cyan-500/80');
        activeAgentName.innerText = "BACHUÉ PROPONE:";
        activeAgentName.className = "text-[10px] md:text-xs font-bold tracking-widest mb-2 block text-cyan-500 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]";
        activeThoughtText.className = "text-xl md:text-2xl font-medium leading-relaxed text-cyan-100";
    }
}

function deactivateAgentPerimeter(agent) {
    const pentagon = document.getElementById(`pentagon-${agent}`);
    pentagon.classList.remove('speaking');
    fluidPerimeter.className = "absolute inset-0 opacity-0 scale-100 transition-all duration-700 pointer-events-none rounded-xl";
}

function highlightText(term, agent) {
    if (!term) return;
    const highlightClass = agent === 'A' 
        ? 'text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-500' 
        : 'text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500';
    
    const regex = new RegExp(`(${term})`, 'gi');
    narrativeBox.innerHTML = activeCase.narrative.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

function speakText(text, agent, callback) {
    synth.cancel(); // Prevenir colisiones de audio
    
    // MODO PRESENTADOR: Calcula el tiempo si la voz está silenciada
    if (!isVoiceEnabled) {
        const wordCount = text.split(' ').length;
        const readingTimeMs = Math.max((wordCount / 200) * 60000 + 1500, 3000); 
        
        if (callback) {
            setTimeout(callback, readingTimeMs);
        }
        return; 
    }

    // MODO NORMAL: Síntesis de voz
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-CO'; 
    
    if (systemVoices.length > 0) {
        if (agent === 'A') {
            const maleVoice = systemVoices.find(v => v.lang.startsWith('es') && (v.name.includes('Pablo') || v.name.includes('Jorge') || v.name.includes('Diego') || v.name.includes('Male')));
            if (maleVoice) utterance.voice = maleVoice;
        } else if (agent === 'B') {
            const femaleVoice = systemVoices.find(v => v.lang.startsWith('es') && (v.name.includes('Helena') || v.name.includes('Sabina') || v.name.includes('Laura') || v.name.includes('Female')));
            if (femaleVoice) utterance.voice = femaleVoice;
        }
    }

    if (agent === 'A') {
        utterance.pitch = 0.4; 
        utterance.rate = 1.0;
    } else if (agent === 'B') {
        utterance.pitch = 1.4; 
        utterance.rate = 1.05;
    } else {
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
    }
    
    // Manejo de finalización y cancelaciones forzadas
    if (callback) {
        utterance.onend = callback;
        utterance.onerror = function(e) {
            // Si el usuario presiona "Silenciar" a mitad de la frase, pasamos al siguiente turno.
            if (e.error === 'canceled' || e.error === 'interrupted') {
                callback();
            }
        };
    }
    
    synth.speak(utterance);
}
