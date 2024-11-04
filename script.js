document.addEventListener("DOMContentLoaded", function() {
  const horaInput = document.getElementById("start");
  const fimInput = document.getElementById("end");

  if (horaInput && fimInput) {
      // Adicionando os dois pontos automaticamente ao digitar nos campos de entrada de texto
      horaInput.addEventListener("input", function() {
          var value = this.value.replace(/\D/g, '');
          var hours = value.substring(0, 2);
          var minutes = value.substring(2, 4);
          this.value = hours + (minutes ? ':' + minutes : '');
      });
      
      fimInput.addEventListener("input", function() {
          var value = this.value.replace(/\D/g, '');
          var hours = value.substring(0, 2);
          var minutes = value.substring(2, 4);
          this.value = hours + (minutes ? ':' + minutes : '');
      });
  }
});

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

  // Separando horas e minutos do início e fim
  var [horaInicio, minutoInicio] = inicioH.split(':').map(Number);
  var [horaFim, minutoFim] = fimH.split(':').map(Number);

  // Calculando a diferença total em minutos
  let diferencaMinutos = 0;
  
  // Se o horário final for menor ou igual ao inicial, adiciona 24 horas
  if (horaFim < horaInicio || (horaFim === horaInicio && minutoFim <= minutoInicio)) {
      diferencaMinutos = ((horaFim + 24) * 60 + minutoFim) - (horaInicio * 60 + minutoInicio);
  } else {
      diferencaMinutos = (horaFim * 60 + minutoFim) - (horaInicio * 60 + minutoInicio);
  }

  // Convertendo para o formato HH:MM
  const totalHoras = Math.floor(diferencaMinutos / 60);
  const totalMinutos = diferencaMinutos % 60;

  // Formatando a mensagem de resultado
  let mensagem = `Duração: ${totalHoras}:${totalMinutos.toString().padStart(2, '0')}`;

  // Exibindo o resultado
  const errorElement = document.getElementById("error");
  const resultadoElement = document.getElementById("resultado");

  if (errorElement && resultadoElement) {
      errorElement.innerHTML = "";
      errorElement.classList.remove("show");
      resultadoElement.innerHTML = mensagem;
  }

  // Limpar os campos de entrada
  horaInput.value = "";
  fimInput.value = "";
}

function validarFormatoHorario(horario) {
  var pattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return pattern.test(horario);
}

function mostrarErro(mensagem) {
  const errorElement = document.getElementById("error");
  const resultadoElement = document.getElementById("resultado");

  if (errorElement && resultadoElement) {
      errorElement.innerHTML = mensagem;
      errorElement.classList.add("show");
      resultadoElement.innerHTML = "";
      
      setTimeout(function() {
          errorElement.classList.remove("show");
      }, 3000);
  }
}
