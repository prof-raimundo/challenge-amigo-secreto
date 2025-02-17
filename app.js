/* 
 O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
 Aqui você deverá desenvolver a lógica para resolver o problema.
 
 Curso: Praticando Logica de programação
 Desafio: Challenge Amigo Secreto
 Projeto: challenge-amigo-secreto.
  
 Autor: Raimundo Nonato de Sousa.
 Local:	Pacujá/CE.
 Data:	16/02/2025.
 
 */

// Declaração da lista
let listaAmigoSecreto = [];

// Função para adicionar um amigo
function adicionarAmigo() {
	
	// Pega o valor do campo input
    let nomeAmigo = document.getElementById("amigo").value;
	
	// Verifica se o campo de entrada não está vazio
    if (nomeAmigo.trim() !== "") {
		
		// Adiciona o nome à lista
        listaAmigoSecreto.push(nomeAmigo);
		
		// Limpa o campo de entrada
        document.getElementById("amigo").value = "";
		
		// Cria um novo elemento <li> para a lista de amigos
        let novoItem = document.createElement("li");
        novoItem.textContent = nomeAmigo;
		
		// Adiciona o novo <li> à <ul> com id "listaAmigos"
        document.getElementById("listaAmigos").appendChild(novoItem);

    } else {
		
		// Exibe um alerta se o campo estiver vazio
        alert("Por favor, digite um nome.");
    }
}

//Função para recarregar a página
function recarregarPagina(){
	
    window.location.reload();
	
} 

//Função para sortear um amigo aleatoriamente
function sortearAmigo() {

	//Verifica se a lista está vazia
    if (listaAmigoSecreto.length === 0) {
        alert("A lista está vazia! Adicione amigos antes de sortear.");
        return;
    }

    //Sorteia um índice aleatório da lista
    let indiceSorteado = Math.floor(Math.random() * listaAmigoSecreto.length);
    alert("Seu amigo secreto é: " + listaAmigoSecreto[indiceSorteado]);

	//Recarrega a página para iniciar uma nova lista
    recarregarPagina();
   
}
