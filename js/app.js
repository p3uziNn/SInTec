lucide.createIcons();

const dashboardView = document.getElementById('dashboard-view');
const moduleView = document.getElementById('module-view');
const moduleTitle = document.getElementById('module-title');
const moduleDuration = document.getElementById('module-duration');
const videoPlayer = document.getElementById('video-player');
const pdfLink = document.getElementById('pdf-link');

// 🚀 MAPEAMENTO DOS MÓDULOS (Convertido para formato /embed/ oficial do YouTube)
const MODULE_MAP = {
    "Introdução ao IGBT": { 
        index: 1, 
        duration: "12 min",
        // Convertido de: https://youtu.be/VOclZ1kRyaQ...
        video: "https://www.youtube.com/embed/VOclZ1kRyaQ", 
        pdf: "../recursos/material.pdf"
    },
    "Estrutura e Funcionamento": { 
        index: 2, 
        duration: "18 min",
        // Convertido de: https://youtu.be/wNM25imGvis... 
        video: "https://www.youtube.com/embed/askdxQGm3lg", 
        pdf: "../recursos/material.pdf"
    },
    "Aplicações Práticas": { 
        index: 3, 
        duration: "15 min",
        // Convertido de: https://youtu.be/askdxQGm3lg...
        video: "https://www.youtube.com/embed/wNM25imGvis", 
        pdf: "../recursos/material.pdf"
    },
};
const TOTAL_MODULES = Object.keys(MODULE_MAP).length; 

function getModulesState() {
    return JSON.parse(localStorage.getItem('modulesState')) || {
        "Introdução ao IGBT": false,
        "Estrutura e Funcionamento": false,
        "Aplicações Práticas": false,
    };
}

function saveModulesState(state) {
    localStorage.setItem('modulesState', JSON.stringify(state));
}

function updateDashboardUI() {
    const state = getModulesState();
    const completedCount = Object.values(state).filter(Boolean).length;
    const progressPercent = Math.round((completedCount / TOTAL_MODULES) * 100);

    document.getElementById('progress-txt').innerText  = `${progressPercent}%`;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('modules-count').innerText  = `${completedCount}/${TOTAL_MODULES}`;
    document.getElementById('modules-remaining').innerText = `${TOTAL_MODULES - completedCount} módulo(s) restante(s)`;

    Object.entries(MODULE_MAP).forEach(([name, meta]) => {
        const isDone   = !!state[name];
        const checkEl  = document.getElementById(`check-mod-${meta.index}`);
        const btnEl    = document.getElementById(`btn-mod-${meta.index}`);

        if (!checkEl || !btnEl) return;

        if (isDone) {
            checkEl.classList.remove('hidden');
            btnEl.innerHTML = `Revisar <i data-lucide="refresh-cw" class="w-4 h-4"></i>`;
            btnEl.className = 'flex items-center gap-1 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-600 text-sm font-bold px-4 py-2 rounded-xl transition';
        } else {
            checkEl.classList.add('hidden');
            btnEl.innerHTML = `Assistir <i data-lucide="play" class="w-4 h-4 fill-current"></i>`;
            btnEl.className = 'flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-md shadow-blue-100 transition';
        }
    });

    lucide.createIcons();

    const quizScore = localStorage.getItem('quizScore');
    const quizText  = document.getElementById('quiz-status-text');
    if (quizText) {
        quizText.innerText = quizScore !== null ? `Aproveitamento de ${quizScore}%` : 'Não realizado ainda';
    }
}

function openModule(title, duration) {
    moduleTitle.innerText   = title;
    moduleDuration.innerText = duration;

    if (MODULE_MAP[title]) {
        if (videoPlayer) videoPlayer.src = MODULE_MAP[title].video;
        if (pdfLink) pdfLink.href = MODULE_MAP[title].pdf;
    }

    dashboardView.classList.add('hidden');
    moduleView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const state = getModulesState();
    if (title in state && !state[title]) {
        state[title] = true;
        saveModulesState(state);
    }
}

function closeModule() {
    if (videoPlayer) videoPlayer.src = ""; 
    moduleView.classList.add('hidden');
    dashboardView.classList.remove('hidden');
    updateDashboardUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardUI();
});