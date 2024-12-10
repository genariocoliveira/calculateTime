// Função para validar o formato do horário
function validarFormatoHorario(horario) {
    var pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(horario);
}

// Função para validar se um valor é numérico
function validarValorNumerico(valor) {
    return !isNaN(valor) && valor >= 0;
}

// Função para somar horas
function somarHoras() {
    const horaSomar = document.getElementById("horaSomar").value;
    const horasMinutosAdicionar = document.getElementById("horasMinutosAdicionar").value;

    // Verificar se o formato do horário de entrada é válido
    if (!validarFormatoHorario(horaSomar)) {
        alert("Informe o horário no formato HH:MM");
        return;
    }

    // Verificar se o horário a adicionar tem formato válido
    if (!validarFormatoHorario(horasMinutosAdicionar)) {
        alert("Informe as horas/minutos a adicionar no formato HH:MM");
        return;
    }

    let [hora, minuto] = horaSomar.split(':').map(Number);
    let [horaAdicionar, minutoAdicionar] = horasMinutosAdicionar.split(':').map(Number);

    hora += horaAdicionar;
    minuto += minutoAdicionar;

    // Ajustar minutos e horas
    if (minuto >= 60) {
        hora += Math.floor(minuto / 60);
        minuto = minuto % 60;
    }

    if (hora >= 24) {
        hora = hora % 24;
    }

    let mensagem = `Hora somada: ${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
    document.getElementById("resultadoSomar").innerHTML = mensagem;

    // Limpar campos após o cálculo
    document.getElementById("horaSomar").value = "";
    document.getElementById("horasMinutosAdicionar").value = "";

    // Manter o foco no campo de hora a somar
    document.getElementById("horaSomar").focus();
}

// Função para calcular a diferença entre os horários
function calcularDiferenca() {
    const horaInput = document.getElementById("start");
    const fimInput = document.getElementById("end");

    if (!horaInput || !fimInput) {
        console.error("Elementos de input não encontrados");
        return;
    }

    var inicioH = horaInput.value;
    var fimH = fimInput.value;

    // Verificando se os horários têm o formato correto
    if (!validarFormatoHorario(inicioH) || !validarFormatoHorario(fimH)) {
        mostrarErro("Erro. Informe os horários no formato HH:MM.");
        return;
    }

    var [horaInicio, minutoInicio] = inicioH.split(':').map(Number);
    var [horaFim, minutoFim] = fimH.split(':').map(Number);

    let diferencaMinutos = 0;

    // Calculando a diferença entre os horários
    if (horaFim < horaInicio || (horaFim === horaInicio && minutoFim <= minutoInicio)) {
        diferencaMinutos = ((horaFim + 24) * 60 + minutoFim) - (horaInicio * 60 + minutoInicio);
    } else {
        diferencaMinutos = (horaFim * 60 + minutoFim) - (horaInicio * 60 + minutoInicio);
    }

    const totalHoras = Math.floor(diferencaMinutos / 60);
    const totalMinutos = diferencaMinutos % 60;

    let mensagem = `Duração: ${totalHoras.toString().padStart(2, '0')}:${totalMinutos.toString().padStart(2, '0')}`;
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = mensagem;

    // Limpar campos após o cálculo
    horaInput.value = "";
    fimInput.value = "";

    // Manter o foco no campo de hora de início
    horaInput.focus();
}

// Função para mostrar o erro
function mostrarErro(mensagem) {
    const errorElement = document.getElementById("error");
    const resultadoElement = document.getElementById("resultado");

    errorElement.innerHTML = mensagem;
    errorElement.classList.add("show");
    resultadoElement.innerHTML = "";

    setTimeout(function () {
        errorElement.classList.remove("show");
    }, 3000);
}

// Função para formatar o horário enquanto o usuário digita
function formatarHorario(event) {
    let valor = event.target.value;

    // Remover todos os caracteres não numéricos antes de formatar
    valor = valor.replace(/\D/g, '');

    // Adicionar os dois pontos automaticamente após os dois primeiros caracteres
    if (valor.length > 2) {
        valor = valor.substring(0, 2) + ':' + valor.substring(2, 4);
    }

    // Atualizar o valor do input
    event.target.value = valor;
}

// Função que será chamada ao pressionar a tecla Enter
function adicionarEventoEnter() {
    const inputHoraInicio = document.getElementById("start");
    const inputHoraFim = document.getElementById("end");
    const inputHoraSomar = document.getElementById("horaSomar");
    const inputHorasMinutosAdicionar = document.getElementById("horasMinutosAdicionar");

    // Adicionando evento para o campo de hora de início
    inputHoraInicio.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calcularDiferenca();
        }
    });

    // Adicionando evento para o campo de hora de término
    inputHoraFim.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            calcularDiferenca();
        }
    });

    // Adicionando evento para o campo de hora a somar
    inputHoraSomar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            somarHoras();
        }
    });

    // Adicionando evento para o campo de horas e minutos a adicionar
    inputHorasMinutosAdicionar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            somarHoras();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const calcularBtn = document.getElementById("calcularBtn");
    const somarBtn = document.getElementById("somarBtn");
    const backToModalCalcular = document.getElementById("backToModalCalcular");
    const backToModalSomar = document.getElementById("backToModalSomar");

    const containerCalcular = document.getElementById("containerCalcular");
    const containerSomar = document.getElementById("containerSomar");

    // Exibir o modal inicial
    modal.style.display = "flex";

    calcularBtn.addEventListener("click", function () {
        modal.style.display = "none";
        containerCalcular.style.display = "block";
    });

    somarBtn.addEventListener("click", function () {
        modal.style.display = "none";
        containerSomar.style.display = "block";
    });

    backToModalCalcular.addEventListener("click", function () {
        containerCalcular.style.display = "none";
        modal.style.display = "flex";
    });

    backToModalSomar.addEventListener("click", function () {
        containerSomar.style.display = "none";
        modal.style.display = "flex";
    });

    // Adicionar evento para formatar o horário enquanto o usuário digita
    const inputHoraInicio = document.getElementById("start");
    const inputHoraFim = document.getElementById("end");
    const inputHoraSomar = document.getElementById("horaSomar");
    const inputHorasMinutosAdicionar = document.getElementById("horasMinutosAdicionar");

    inputHoraInicio.addEventListener("input", formatarHorario);
    inputHoraFim.addEventListener("input", formatarHorario);
    inputHoraSomar.addEventListener("input", formatarHorario);
    inputHorasMinutosAdicionar.addEventListener("input", formatarHorario);

    // Adicionar o evento para o ENTER
    adicionarEventoEnter();
});