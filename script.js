const hora = document.getElementById("start");
const fim = document.getElementById('end');

hora.focus();

// Adicionando os dois pontos automaticamente ao digitar nos campos de entrada de texto
document.addEventListener("DOMContentLoaded", function() {
    hora.addEventListener("input", function() {
        var value = this.value.replace(/\D/g, '');
        var hours = value.substring(0, 2);
        var minutes = value.substring(2, 4);
        this.value = hours + (minutes ? ':' + minutes : '');
    });

    fim.addEventListener("input", function() {
        var value = this.value.replace(/\D/g, '');
        var hours = value.substring(0, 2);
        var minutes = value.substring(2, 4);
        this.value = hours + (minutes ? ':' + minutes : '');
    });
});

function calcularDiferenca() {
    var inicioH = hora.value;
    var fimH = fim.value;

    // Verificando se os horários têm o formato correto
    if (!validarFormatoHorario(inicioH) || !validarFormatoHorario(fimH)) {
        document.getElementById("error").innerHTML = "Erro. Informe os horários no formato HH:MM.";
        document.getElementById("error").classList.add("show"); // Adiciona a classe "show" para exibir a mensagem de erro
        document.getElementById("resultado").innerHTML = "";

        // Coloca o foco no primeiro input
        hora.focus();

        // Define um tempo para a mensagem de erro desaparecer após 3 segundos
        setTimeout(function() {
            document.getElementById("error").classList.remove("show"); // Remove a classe "show" para ocultar a mensagem de erro
        }, 3000);

        return;
    }

    // Convertendo os horários para objetos Date
    var inicioObj = new Date("2020-01-01T" + inicioH + ":00");
    var fimObj = new Date("2020-01-01T" + fimH + ":00");

    // Calculando a diferença de tempo em milissegundos
    var diferenca = Math.abs(fimObj - inicioObj);

    // Convertendo a diferença de tempo em horas e minutos
    var horas = Math.floor(diferenca / (1000 * 60 * 60));
    var minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

    if (horas === 0 && minutos === 0) {
        document.getElementById("error").innerHTML = "Erro. Os horários são iguais.";
        document.getElementById("error").classList.add("show"); // Adiciona a classe "show" para exibir a mensagem de erro
        document.getElementById("resultado").innerHTML = "";

        // Coloca o foco no primeiro input
        hora.focus();

        // Define um tempo para a mensagem de erro desaparecer após 3 segundos
        setTimeout(function() {
            document.getElementById("error").classList.remove("show"); // Remove a classe "show" para ocultar a mensagem de erro
        }, 3000);

    } else {
        document.getElementById("error").innerHTML = "";
        document.getElementById("error").classList.remove("show"); // Remove a classe "show" para ocultar a mensagem de erro
        document.getElementById("resultado").innerHTML = "Diferença: " + horas + " horas e " + minutos + " minutos.";
    }

    // Limpar os campos de entrada
    hora.value = "";
    fim.value = "";
    hora.focus();
}

function validarFormatoHorario(horario) {
    var pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(horario);
}
