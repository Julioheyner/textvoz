let synth = window.speechSynthesis;
let utterance;
let isPaused = false;

function speakText() {
    let textInput = document.getElementById('textInput').value;
    let languageSelect = document.getElementById('languageSelect').value;

    if (isPaused && utterance) {
        // Se o áudio estiver pausado, continue o mesmo utterance
        synth.resume();
        isPaused = false;
        updatePauseResumeButton();
    } else {
        // Caso contrário, cria um novo utterance e começa a fala
        utterance = new SpeechSynthesisUtterance(textInput);
        utterance.lang = languageSelect;
        synth.speak(utterance);
    }
}

function togglePauseResume() {
    if (synth.speaking) {
        if (synth.paused) {
            // Retoma a fala se estiver pausado
            synth.resume();
            isPaused = false;
        } else {
            // Pausa a fala se estiver ativo
            synth.pause();
            isPaused = true;
        }
        updatePauseResumeButton();
    }
}

function updatePauseResumeButton() {
    let pauseResumeBtn = document.getElementById('pauseResumeBtn');
    if (synth.paused) {
        pauseResumeBtn.innerHTML = '<i class="fas fa-play"></i>'; // Muda para ícone de continuar
    } else {
        pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Muda para ícone de pausar
    }
}

function clearText() {
    document.getElementById('textInput').value = '';
    if (synth.speaking || synth.paused) {
        synth.cancel();
        isPaused = false;
        updatePauseResumeButton();
    }
}

function toggleMode() {
    let body = document.getElementById('body');
    let toggleBtn = document.getElementById('toggleBtn');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Light';
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Dark';
    }
}

