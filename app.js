/* 
 O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
 Aqui você deverá desenvolver a lógica para resolver o problema.
 
 Curso: Praticando Logica de programação
 Desafio: Challenge Amigo Secreto
 Projeto: challenge-amigo-secreto.
  
 Autor: Raimundo Nonato de Sousa.
 Local:	Pacujá/CE.
 Data:	16/02/2025.

 Aprimorado por: Emanuel Lázaro Custódio Silva
*/

document.addEventListener('DOMContentLoaded', initApp);

let listaAmigoSecreto = [];
let amigoIndexParaEditar = -1;
let amigoIndexParaRemover = -1;

function initApp() {
  carregarListaAmigos();
  atualizarListaAmigosDisplay();
  setupEventListeners();
// Inicializa tooltips se necessário
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

function setupEventListeners() {
  document.getElementById('confirmEditFriend').addEventListener('click', confirmarEdicaoAmigo);
  document.getElementById('confirmRemoveFriend').addEventListener('click', confirmarRemocaoAmigo);
  document.getElementById('copyResult').addEventListener('click', copyResultado);
  document.getElementById('shareEmail').addEventListener('click', shareByEmail);
  // Evento para importação de amigos via arquivo CSV
  document.getElementById('importFriends').addEventListener('change', handleFileSelect);
}

// --- Funções de Armazenamento Local ---
function carregarListaAmigos() {
  const listaSalva = localStorage.getItem('amigoSecretoLista');
  if (listaSalva) {
    try {
      let tempLista = JSON.parse(listaSalva);
      // Verifica se os itens são strings (para compatibilidade) e converte para objetos
      listaAmigoSecreto = tempLista.map(item => typeof item === 'string' ? { name: item, preference: '' } : item);
    } catch (e) {
      listaAmigoSecreto = [];
    }
  } else {
    listaAmigoSecreto = [];
  }
}

function salvarListaAmigos() {
  localStorage.setItem('amigoSecretoLista', JSON.stringify(listaAmigoSecreto));
}

// --- Adicionar Amigos ---
function adicionarAmigo() {
  const nomeInput = document.getElementById("amigo");
  const prefInput = document.getElementById("preferencia");
  let nomeAmigo = nomeInput.value.trim();
  let preferencia = prefInput.value.trim();

  if (!validarNomeAmigo(nomeAmigo)) {
    nomeInput.value = "";
    return;
  }
  if (listaAmigoSecreto.some(amigo => amigo.name.toLowerCase() === nomeAmigo.toLowerCase())) {
    showToast('error', `"${nomeAmigo}" já está na lista.`, 'Nome Duplicado');
    nomeInput.value = "";
    return;
  }

  listaAmigoSecreto.push({ name: nomeAmigo, preference: preferencia });
  salvarListaAmigos();
  atualizarListaAmigosDisplay();
  nomeInput.value = "";
  prefInput.value = "";
  showToast('success', `"${nomeAmigo}" adicionado!`, 'Amigo Adicionado');
}

function validarNomeAmigo(nome) {
  if (!nome) {
    showToast('warning', 'Por favor, digite um nome.', 'Nome Inválido');
    return false;
  }
  if (/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/.test(nome)) {
    showToast('warning', 'Use apenas letras e espaços no nome.', 'Nome Inválido');
    return false;
  }
  return true;
}

// --- Editar Amigos ---
function editarAmigo(index) {
  amigoIndexParaEditar = index;
  const amigoObj = listaAmigoSecreto[index];
  document.getElementById("editFriendName").value = amigoObj.name;
  document.getElementById("editFriendPreference").value = amigoObj.preference;
  new bootstrap.Modal(document.getElementById('editFriendModal')).show();
}

function confirmarEdicaoAmigo() {
  const novoNomeInput = document.getElementById("editFriendName");
  const novoPrefInput = document.getElementById("editFriendPreference");
  const novoNome = novoNomeInput.value.trim();
  const novaPreferencia = novoPrefInput.value.trim();

  if (!validarNomeAmigo(novoNome)) return;
  if (listaAmigoSecreto.some((amigo, idx) => amigo.name.toLowerCase() === novoNome.toLowerCase() && idx !== amigoIndexParaEditar)) {
    showToast('error', `"${novoNome}" já está na lista.`, 'Nome Duplicado');
    return;
  }

  listaAmigoSecreto[amigoIndexParaEditar] = { name: novoNome, preference: novaPreferencia };
  salvarListaAmigos();
  atualizarListaAmigosDisplay();
  const modalEl = document.getElementById('editFriendModal');
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) {
    modalInstance.hide();
  }
  showToast('success', `Nome alterado para "${novoNome}".`, 'Nome Editado');
  amigoIndexParaEditar = -1;
}

// --- Remover Amigos ---
function removerAmigo(index) {
  amigoIndexParaRemover = index;
  document.getElementById("removeFriendNamePlaceholder").textContent = listaAmigoSecreto[index].name;
  new bootstrap.Modal(document.getElementById('removeFriendModal')).show();
}

function confirmarRemocaoAmigo() {
  if (amigoIndexParaRemover !== -1) {
    const nomeRemovido = listaAmigoSecreto[amigoIndexParaRemover].name;
    listaAmigoSecreto.splice(amigoIndexParaRemover, 1);
    salvarListaAmigos();
    atualizarListaAmigosDisplay();
    // Obtém a instância atual do modal e a oculta
    const modalEl = document.getElementById('removeFriendModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
    showToast('info', `"${nomeRemovido}" removido.`, 'Amigo Removido');
    amigoIndexParaRemover = -1;
  }
}


// --- Atualização da Lista ---
function atualizarListaAmigosDisplay() {
  const listaAmigosUL = document.getElementById("listaAmigos");
  const listaVaziaMsg = document.getElementById("listaVazia");
  listaAmigosUL.innerHTML = "";

  if (listaAmigoSecreto.length === 0) {
    listaVaziaMsg.style.display = 'block';
  } else {
    listaVaziaMsg.style.display = 'none';
    listaAmigoSecreto.forEach((amigo, index) => {
      const listItem = criarListItemAmigo(amigo, index);
      listaAmigosUL.appendChild(listItem);
    });
  }
}

function criarListItemAmigo(amigo, index) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex flex-column";
  
  // Linha principal: nome do amigo
  const nomeElem = document.createElement("span");
  nomeElem.textContent = amigo.name;
  nomeElem.className = "fw-bold";
  listItem.appendChild(nomeElem);
  
  // Se houver preferência, exibe em fonte menor
  if (amigo.preference) {
    const prefElem = document.createElement("small");
    prefElem.textContent = "Preferência: " + amigo.preference;
    prefElem.className = "text-muted";
    listItem.appendChild(prefElem);
  }
  
  // Botões de ação
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "btn-group mt-2 align-self-end";
  const editButton = criarBotaoLista('editar', index);
  const removeButton = criarBotaoLista('remover', index);
  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(removeButton);
  listItem.appendChild(buttonGroup);

  return listItem;
}

function criarBotaoLista(acao, index) {
  const button = document.createElement("button");
  button.className = `btn btn-sm ${acao === 'editar' ? 'btn-secondary' : 'btn-danger'}`;
  if (acao === 'editar') {
    button.innerHTML = '<i class="bi bi-pencil-fill"></i> Editar';
    button.onclick = () => editarAmigo(index);
  } else if (acao === 'remover') {
    button.innerHTML = '<i class="bi bi-trash-fill"></i> Remover';
    button.onclick = () => removerAmigo(index);
  }
  return button;
}

// --- Sorteio de Amigo Secreto ---
function sortearAmigo() {
  if (listaAmigoSecreto.length < 2) {
    showToast('warning', 'Adicione pelo menos dois amigos para sortear.', 'Lista Insuficiente');
    return;
  }

  const dataInput = document.getElementById("sorteioDate").value;
  const listaEmbaralhada = embaralharLista([...listaAmigoSecreto]);
  let resultadoHTML = "";
  
  // Se data definida, exibe no resultado
  if (dataInput) {
    resultadoHTML += `<p class="mb-2">Data do Sorteio: ${dataInput}</p>`;
  }
  
  for (let i = 0; i < listaEmbaralhada.length; i++) {
    const remetente = listaEmbaralhada[i];
    const destinatario = listaEmbaralhada[(i + 1) % listaEmbaralhada.length];
    let linha = `${remetente.name} → ${destinatario.name}`;
    if (destinatario.preference) {
      linha += ` <small class="text-muted">(Preferência: ${destinatario.preference})</small>`;
    }
    resultadoHTML += linha + "<br>";
  }

  const resultadoDiv = document.getElementById("resultado");
  resultadoDiv.innerHTML = resultadoHTML;
  resultadoDiv.classList.add("show-result");
  showToast('success', 'Sorteio realizado! Confira os resultados.', 'Sorteio Concluído');
}

function embaralharLista(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- Resetar Lista ---
function resetarLista() {
  listaAmigoSecreto = [];
  salvarListaAmigos();
  atualizarListaAmigosDisplay();
  document.getElementById("resultado").classList.remove("show-result");
  document.getElementById("resultado").innerHTML = "";
  showToast('info', 'Lista de amigos resetada.', 'Lista Resetada');
}

// --- Copiar Resultado ---
function copyResultado() {
  const resultadoDiv = document.getElementById("resultado");
  if (!resultadoDiv.innerText) {
    showToast('warning', 'Não há resultado para copiar.', 'Atenção');
    return;
  }
  navigator.clipboard.writeText(resultadoDiv.innerText)
    .then(() => showToast('success', 'Resultado copiado para a área de transferência!', 'Copiado'))
    .catch(() => showToast('error', 'Erro ao copiar o resultado.', 'Erro'));
}

// --- Compartilhar via Email ---
function shareByEmail() {
  const resultadoDiv = document.getElementById("resultado");
  if (!resultadoDiv.innerText) {
    showToast('warning', 'Não há resultado para compartilhar.', 'Atenção');
    return;
  }
  const subject = encodeURIComponent("Resultado do Amigo Secreto");
  const body = encodeURIComponent(resultadoDiv.innerText);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

// --- Importação de Amigos via CSV ---
function handleFileSelect(event) {
  // Apenas lê o arquivo; a função importarAmigos() é acionada via botão
}

function importarAmigos() {
  const fileInput = document.getElementById("importFriends");
  const file = fileInput.files[0];
  if (!file) {
    showToast('warning', 'Selecione um arquivo CSV para importar.', 'Atenção');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split(/\r?\n/);
    let adicionados = 0;
    linhas.forEach(linha => {
      if (linha.trim()) {
        const [nome, pref] = linha.split(',').map(item => item.trim());
        if (nome && validarNomeAmigo(nome) && !listaAmigoSecreto.some(amigo => amigo.name.toLowerCase() === nome.toLowerCase())) {
          listaAmigoSecreto.push({ name: nome, preference: pref || "" });
          adicionados++;
        }
      }
    });
    if (adicionados > 0) {
      salvarListaAmigos();
      atualizarListaAmigosDisplay();
      showToast('success', `${adicionados} amigo(s) importado(s)!`, 'Importação Concluída');
    } else {
      showToast('info', 'Nenhum novo amigo foi importado.', 'Importação');
    }
    fileInput.value = "";
  };
  reader.readAsText(file);
}

// --- Notificações Toast ---
function showToast(type, message, title = 'Amigo Secreto') {
  const toastContainer = document.getElementById('liveToast');
  const toastTitleElem = toastContainer.querySelector('.toast-title');
  const toastMessageElem = toastContainer.querySelector('.toast-message');
  const toastIconElem = toastContainer.querySelector('.toast-icon');

  toastTitleElem.textContent = title;
  toastMessageElem.textContent = message;

  switch (type) {
    case 'success':
      toastIconElem.className = 'bi bi-check-circle-fill me-2 toast-icon text-success';
      break;
    case 'error':
      toastIconElem.className = 'bi bi-x-octagon-fill me-2 toast-icon text-danger';
      break;
    case 'warning':
      toastIconElem.className = 'bi bi-exclamation-triangle-fill me-2 toast-icon text-warning';
      break;
    case 'info':
    default:
      toastIconElem.className = 'bi bi-info-circle-fill me-2 toast-icon text-info';
      break;
  }
  new bootstrap.Toast(toastContainer).show();
}
