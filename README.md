# Amigo Secreto 🎉

Projeto desenvolvido como parte do curso **Praticando Lógica de Programação**, Alura ONE.  
Desafio: **Challenge Amigo Secreto**

## 📝 Descrição  
Este projeto simula o tradicional jogo de "Amigo Secreto". Além de realizar o sorteio aleatório, o sistema permite gerenciar a lista de participantes com funcionalidades completas de adição, edição, remoção e importação, mantendo os dados persistentes no navegador.

## 📦 Funcionalidades  
- **Adicionar Amigo:**  
  Permite incluir novos participantes, com validação para nomes (somente letras e espaços) e prevenção de duplicatas.

- **Listagem de Amigos:**  
  Exibe a lista atual de participantes, incluindo as preferências quando informadas, com suporte para atualização dinâmica da interface.

- **Editar Amigo:**  
  Permite modificar o nome e a preferência de um participante utilizando um modal interativo.

- **Remover Amigo:**  
  Possibilita a exclusão de um participante da lista após confirmação por modal.

- **Sorteio Aleatório:**  
  Realiza o sorteio dos participantes de forma embaralhada, gerando um par “amigo → amigo” (com opção de exibir a data do sorteio) e exibindo as preferências quando disponíveis.

- **Resetar Lista:**  
  Permite limpar toda a lista de participantes e reiniciar o jogo.

- **Importar Amigos via CSV:**  
  Possibilita importar uma lista de participantes a partir de um arquivo CSV, adicionando apenas os nomes válidos e não duplicados.

- **Copiar Resultado:**  
  Permite copiar o resultado do sorteio para a área de transferência, facilitando o compartilhamento.

- **Compartilhar via Email:**  
  Gera um link para compartilhar os resultados do sorteio diretamente por email.

- **Notificações Toast:**  
  Utiliza mensagens em estilo "toast" para informar o usuário sobre ações como adição, edição, remoção, erros e avisos, aprimorando a experiência interativa.

- **Persistência de Dados:**  
  Os dados dos participantes são armazenados no *localStorage*, garantindo que a lista seja preservada mesmo após recarregar a página.

## 🖥️ Tecnologias Utilizadas  
- **HTML & CSS:** Estrutura e estilização da interface.  
- **JavaScript:** Lógica de programação para gerenciamento da lista, sorteio, edição, remoção, importação e interações diversas.  
- **Bootstrap:** Para modais, tooltips, botões e notificações em estilo toast, proporcionando uma interface moderna e responsiva.

## 📜 Estrutura do Código  
- **Gerenciamento de Dados:**  
  - `carregarListaAmigos()` e `salvarListaAmigos()` cuidam da persistência dos dados via *localStorage*.
  
- **Manipulação da Lista de Amigos:**  
  - `adicionarAmigo()`, `editarAmigo()`, `confirmarEdicaoAmigo()`, `removerAmigo()` e `confirmarRemocaoAmigo()` gerenciam a criação, atualização e remoção dos participantes.
  - `atualizarListaAmigosDisplay()` e `criarListItemAmigo()` atualizam a exibição dinâmica da lista na interface.
  
- **Sorteio e Utilitários:**  
  - `sortearAmigo()` executa o sorteio aleatório utilizando a função auxiliar `embaralharLista()`.
  - `resetarLista()` limpa a lista de participantes para um novo jogo.
  - `copyResultado()` e `shareByEmail()` facilitam a cópia e o compartilhamento do resultado do sorteio.
  
- **Importação e Validação:**  
  - `handleFileSelect()` e `importarAmigos()` possibilitam a importação de dados via arquivo CSV.
  - `validarNomeAmigo()` assegura que os nomes inseridos sejam válidos (apenas letras e espaços) e não duplicados.
  
- **Interação com o Usuário:**  
  - `setupEventListeners()` configura os eventos dos botões e inputs.
  - `showToast()` exibe notificações de sucesso, erro, aviso ou informação para melhorar a experiência do usuário.

## 📌 Como Usar  
1. **Adicionar Participantes:**  
   Digite o nome (e opcionalmente a preferência) de um amigo no campo de entrada e clique em "Adicionar".  
   
2. **Editar ou Remover:**  
   Utilize os botões de ação (Editar ou Remover) ao lado de cada participante para modificar ou excluir um registro.  
   
3. **Realizar o Sorteio:**  
   Insira uma data (opcional) e clique em "Sortear" para gerar os pares do amigo secreto.  
   
4. **Copiar ou Compartilhar Resultado:**  
   Após o sorteio, use as opções "Copiar Resultado" ou "Compartilhar via Email" para distribuir os resultados.  
   
5. **Importar Amigos:**  
   Se desejar importar uma lista de amigos, selecione um arquivo CSV no campo de importação.  
   
6. **Resetar o Jogo:**  
   Clique em "Resetar Lista" para limpar os dados e iniciar uma nova rodada.

## 📅 Informações do Projeto  
- **Autor:** Raimundo Nonato de Sousa  
- **Aprimorado por:** Emanuel Lázaro Custódio Silva  
- **Local:** Pacujá/CE  
- **Data:** 16/02/2025
