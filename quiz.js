// ============================================================
// SINTEC - quiz.js
// Renderização, avaliação e persistência do resultado do quiz
// ============================================================

// Banco de questões sobre IGBT
const quizData = [
    {
        question: "1. Por que o IGBT combina características de MOSFET e transistor bipolar?",
        options: [
            "Para aumentar apenas a resistência de entrada.",
            "Para unir acionamento simples e alta capacidade de corrente.",
            "Para eliminar a necessidade de dissipadores.",
            "Para funcionar apenas em corrente contínua."
        ],
        correct: 1
    },
    {
        question: "2. Em quais situações um IGBT é mais vantajoso que um MOSFET?",
        options: [
            "Em baixíssimas tensões.",
            "Em circuitos de áudio.",
            "Em aplicações de alta tensão e potência.",
            "Em sensores de temperatura."
        ],
        correct: 2
    },
    {
        question: "3. O que é o fenômeno de latch-up em um IGBT?",
        options: [
            "Um aumento controlado da eficiência.",
            "Uma redução da tensão de gate.",
            "Um disparo indesejado que pode destruir o dispositivo.",
            "Um método de proteção térmica."
        ],
        correct: 2
    },
    {
        question: "4. Como a frequência de chaveamento afeta o desempenho do IGBT?",
        options: [
            "Não afeta o desempenho.",
            "Frequências maiores aumentam as perdas de chaveamento.",
            "Frequências maiores eliminam perdas.",
            "Frequências menores aumentam a tensão máxima."
        ],
        correct: 1
    },
    {
        question: "5. Por que o IGBT é amplamente utilizado em inversores de frequência?",
        options: [
            "Porque opera sem alimentação.",
            "Porque controla potência com eficiência.",
            "Porque substitui transformadores.",
            "Porque gera energia elétrica."
        ],
        correct: 1
    },
    {
        question: "6. Qual a função da porta (gate) no IGBT?",
        options: [
            "Dissipar calor.",
            "Controlar a condução entre coletor e emissor.",
            "Armazenar energia.",
            "Aumentar a tensão de saída."
        ],
        correct: 1
    },
    {
        question: "7. Como a temperatura influencia as perdas de potência em um IGBT?",
        options: [
            "Não influencia.",
            "Diminui sempre as perdas.",
            "Pode aumentar as perdas e reduzir a vida útil.",
            "Aumenta apenas a corrente de gate."
        ],
        correct: 2
    },
    {
        question: "8. Por que os tempos de desligamento do IGBT costumam ser maiores que os de um MOSFET?",
        options: [
            "Porque possuem armazenamento de cargas internas.",
            "Porque usam menos silício.",
            "Porque não possuem gate.",
            "Porque operam apenas em CA."
        ],
        correct: 0
    },
    {
        question: "9. O que acontece se a tensão máxima coletor-emissor for excedida?",
        options: [
            "O dispositivo melhora sua eficiência.",
            "Pode ocorrer ruptura e dano permanente.",
            "A corrente é bloqueada automaticamente.",
            "O gate é desligado."
        ],
        correct: 1
    },
    {
        question: "10. Como os diodos de roda livre complementam circuitos com IGBTs?",
        options: [
            "Aumentam a frequência de chaveamento.",
            "Permitem a circulação da corrente em cargas indutivas.",
            "Eliminam o uso do gate.",
            "Reduzem a tensão de alimentação."
        ],
        correct: 1
    },
    {
        question: "11. Quais são as principais causas de falha em módulos IGBT?",
        options: [
            "Sobrecorrente, sobretensão e superaquecimento.",
            "Umidade do ar apenas.",
            "Baixa frequência de operação.",
            "Excesso de isolamento."
        ],
        correct: 0
    },
    {
        question: "12. Como o encapsulamento influencia a dissipação térmica?",
        options: [
            "Não influencia.",
            "Influencia a remoção do calor gerado.",
            "Aumenta a tensão do gate.",
            "Diminui a corrente máxima."
        ],
        correct: 1
    },
    {
        question: "13. Qual a importância do gate driver?",
        options: [
            "Decorar o circuito.",
            "Garantir acionamento adequado e proteção.",
            "Produzir energia.",
            "Medir temperatura."
        ],
        correct: 1
    },
    {
        question: "14. Como a evolução dos materiais semicondutores tem melhorado os IGBTs?",
        options: [
            "Reduzindo eficiência.",
            "Aumentando tamanho e peso.",
            "Reduzindo perdas e aumentando desempenho.",
            "Eliminando a necessidade de tensão."
        ],
        correct: 2
    },
    {
        question: "15. Por que veículos elétricos utilizam IGBTs?",
        options: [
            "Para iluminar os faróis.",
            "Para controlar grandes potências nos motores elétricos.",
            "Para armazenar energia nas baterias.",
            "Para substituir as rodas do veículo."
        ],
        correct: 1
    }
];

// ============================================================
// Inicialização
// ============================================================
lucide.createIcons();

const container = document.getElementById('questions-container');
const form       = document.getElementById('quiz-form');

// ============================================================
// 1. Renderização dinâmica das questões
// ============================================================
quizData.forEach((item, qIndex) => {
    const questionCard = document.createElement('div');
    questionCard.className = "bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3";

    const title = document.createElement('h3');
    title.className = "font-bold text-slate-950 text-base leading-snug";
    title.innerText = item.question;
    questionCard.appendChild(title);

    const optionsGroup = document.createElement('div');
    optionsGroup.className = "space-y-2";

    item.options.forEach((opt, oIndex) => {
        const label = document.createElement('label');
        label.className =
            "flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 " +
            "text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100/70 " +
            "hover:border-slate-300 transition";

        const radio = document.createElement('input');
        radio.type     = "radio";
        radio.name     = `question-${qIndex}`;
        radio.value    = oIndex;
        radio.required = true;
        radio.className = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500";

        const textSpan = document.createElement('span');
        textSpan.innerText = opt;

        label.appendChild(radio);
        label.appendChild(textSpan);
        optionsGroup.appendChild(label);
    });

    questionCard.appendChild(optionsGroup);
    container.appendChild(questionCard);
});

// ============================================================
// 2. Submissão, cálculo de resultado e persistência
// ============================================================
form.addEventListener('submit', function (e) {
    e.preventDefault();

    let hits   = 0;
    let errors = 0;

    quizData.forEach((item, qIndex) => {
        const selected = form.querySelector(`input[name="question-${qIndex}"]:checked`);
        if (selected && parseInt(selected.value) === item.correct) {
            hits++;
        } else {
            errors++;
        }
    });

    const percentage = Math.round((hits / quizData.length) * 100);

    // Persiste o aproveitamento para a Dashboard ler
    localStorage.setItem('quizScore', percentage);

    // Se aprovado (≥ 80%), desbloqueia o módulo 3 no progresso geral
    if (percentage >= 80) {
        const state = JSON.parse(localStorage.getItem('modulesState')) || {};
        state["Aplicações Práticas"] = true;
        localStorage.setItem('modulesState', JSON.stringify(state));
    }

    // --- Atualiza elementos do resultado ---
    document.getElementById('score-hits').innerText    = hits;
    document.getElementById('score-errors').innerText  = errors;
    document.getElementById('score-percent').innerText = `${percentage}%`;

    const feedback = document.getElementById('feedback-message');
    if (percentage >= 80) {
        feedback.innerText   = "Parabéns! Você foi aprovado e atingiu a meta de 80%.";
        feedback.className   = "text-sm font-bold text-emerald-600 mt-1";
    } else {
        feedback.innerText   = "Atenção: Você ficou abaixo da meta de 80%. Revise o material.";
        feedback.className   = "text-sm font-bold text-rose-500 mt-1";
    }

    // Troca de tela
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Gera o gráfico após a tela ser visível
    renderChart(hits, errors);
});

// ============================================================
// 3. Gráfico de rendimento (Chart.js)
// ============================================================
function renderChart(hits, errors) {
    const ctx = document.getElementById('yieldChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Acertos', 'Erros'],
            datasets: [{
                data: [hits, errors],
                backgroundColor: ['#10b981', '#f43f5e'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { weight: 'bold', family: 'sans-serif' },
                        color: '#475569'
                    }
                }
            }
        }
    });
}