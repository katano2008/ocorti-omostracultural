
/* ==========================================================
   QUIZ O CORTIÇO — 10 questões, feedback e histórico local
   Cada acerto: 100 pontos | Máximo: 1000 pontos

   Para editar as questões, altere apenas o array perguntas.
========================================================== */


/* ==========================================================
   1. PERGUNTAS DO QUIZ
========================================================== */

const perguntas = [
  {
    tema: "AUTOR",

    enunciado: "Quem escreveu o romance O Cortiço?",

    alternativas: [
      "Machado de Assis",
      "Aluísio Azevedo",
      "José de Alencar",
      "Lima Barreto"
    ],

    correta: 1,

    explicacao:
      "Aluísio Azevedo escreveu O Cortiço, uma das obras mais representativas do Naturalismo brasileiro."
  },

  {
    tema: "CONTEXTO HISTÓRICO",

    enunciado: "Em que ano O Cortiço foi publicado?",

    alternativas: [
      "1881",
      "1902",
      "1890",
      "1875"
    ],

    correta: 2,

    explicacao:
      "O romance foi publicado em 1890, no fim do século XIX, período de grandes mudanças sociais no Brasil."
  },

  {
    tema: "PERSONAGENS",

    enunciado:
      "Qual é o principal objetivo de João Romão ao longo da narrativa?",

    alternativas: [
      "Tornar-se escritor",
      "Viajar para Portugal",
      "Abandonar seu comércio",
      "Enriquecer e alcançar prestígio social"
    ],

    correta: 3,

    explicacao:
      "João Romão é movido pela ambição: acumula dinheiro e procura melhorar sua posição social, muitas vezes explorando outras pessoas."
  },

  {
    tema: "PERSONAGENS",

    enunciado:
      "O que melhor descreve a relação de Bertoleza com João Romão?",

    alternativas: [
      "Ela trabalha com ele e é explorada por ele",
      "Ela é proprietária do sobrado vizinho",
      "Ela é sua irmã e herdeira",
      "Ela administra uma escola no cortiço"
    ],

    correta: 0,

    explicacao:
      "Bertoleza trabalha e vive com João Romão, que a explora e a engana sobre sua condição de liberdade."
  },

  {
    tema: "PERSONAGENS",

    enunciado:
      "Qual personagem desperta a paixão de Jerônimo e altera sua vida?",

    alternativas: [
      "Pombinha",
      "Rita Baiana",
      "Bertoleza",
      "Dona Estela"
    ],

    correta: 1,

    explicacao:
      "Rita Baiana desperta a paixão de Jerônimo, cuja transformação é importante para a visão naturalista do romance."
  },

  {
    tema: "ENREDO",

    enunciado:
      "Quem é Jerônimo no início de sua participação na história?",

    alternativas: [
      "Um político brasileiro",
      "Um estudante de medicina",
      "Um trabalhador português",
      "Um empresário francês"
    ],

    correta: 2,

    explicacao:
      "Jerônimo é um trabalhador português. Ao conviver com o ambiente do cortiço, seu comportamento passa por mudanças."
  },

  {
    tema: "RELAÇÕES SOCIAIS",

    enunciado:
      "No romance, o sobrado de Miranda ajuda a destacar qual aspecto?",

    alternativas: [
      "A igualdade econômica entre os moradores",
      "A ausência de disputas por prestígio",
      "O isolamento total da vizinhança",
      "O contraste social e a rivalidade com João Romão"
    ],

    correta: 3,

    explicacao:
      "O sobrado de Miranda contrasta com o cortiço e ajuda a mostrar disputas por posição social e prestígio."
  },

  {
    tema: "MOVIMENTO LITERÁRIO",

    enunciado:
      "Qual característica está ligada ao Naturalismo presente em O Cortiço?",

    alternativas: [
      "A influência do ambiente sobre o comportamento humano",
      "A idealização de heróis perfeitos",
      "A valorização de aventuras medievais",
      "O predomínio de acontecimentos sobrenaturais"
    ],

    correta: 0,

    explicacao:
      "O Naturalismo enfatiza fatores como o meio social, as condições de vida e os impulsos humanos na construção das personagens."
  },

  {
    tema: "INTERPRETAÇÃO",

    enunciado:
      "Por que o cortiço pode ser entendido como um elemento central da narrativa?",

    alternativas: [
      "Porque aparece somente no final",
      "Porque a vida coletiva e o ambiente influenciam as personagens",
      "Porque é descrito como um palácio",
      "Porque não há conflitos entre os moradores"
    ],

    correta: 1,

    explicacao:
      "O próprio cortiço organiza grande parte das relações humanas da obra; a coletividade e o ambiente participam da construção do enredo."
  },

  {
    tema: "CRÍTICA SOCIAL",

    enunciado:
      "Qual problema social é criticado de maneira importante em O Cortiço?",

    alternativas: [
      "A falta de viagens internacionais",
      "A expansão do ensino universitário",
      "A exploração humana e a desigualdade social",
      "O uso de máquinas na agricultura"
    ],

    correta: 2,

    explicacao:
      "A obra evidencia exploração, desigualdades, preconceitos e disputas por dinheiro e poder na sociedade brasileira do século XIX."
  }
];


/* ==========================================================
   2. CONFIGURAÇÕES DO QUIZ
========================================================== */

// Valor de cada resposta correta
const PONTOS_POR_ACERTO = 100;

// Identificador utilizado para salvar o histórico
const CHAVE_HISTORICO = "mostraCulturalCorticoQuizV1";

// Facilita a seleção de elementos HTML pelo ID
const $ = (id) => document.getElementById(id);

// Variáveis de controle
let indiceAtual = 0;
let pontos = 0;
let respondeu = false;
let respostas = [];

// Telas utilizadas no quiz
const telas = [
  "tela-inicio",
  "tela-pergunta",
  "tela-resultado"
];


/* ==========================================================
   3. CONTROLE DAS TELAS
========================================================== */

function mostrarTela(id) {

  telas.forEach((tela) => {
    $(tela).hidden = (tela !== id);
  });

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}


/* ==========================================================
   4. ARMAZENAMENTO DAS PONTUAÇÕES
========================================================== */

// Recupera o histórico salvo no navegador
function lerHistorico() {

  try {

    const salvo = JSON.parse(
      localStorage.getItem(CHAVE_HISTORICO)
    );

    if (!salvo || !Array.isArray(salvo.tentativas)) {
      return [];
    }

    return salvo.tentativas.filter(item =>
      Number.isFinite(item.pontos) &&
      Number.isFinite(item.acertos)
    );

  } catch (erro) {

    return [];

  }

}


// Salva o resultado após finalizar o quiz
function guardarResultado() {

  const tentativas = lerHistorico();

  tentativas.push({
    pontos,
    acertos: pontos / PONTOS_POR_ACERTO,
    data: new Date().toISOString()
  });

  // Guarda até 30 resultados
  const atualizadas = tentativas.slice(-30);

  try {

    localStorage.setItem(
      CHAVE_HISTORICO,
      JSON.stringify({
        tentativas: atualizadas
      })
    );

    return atualizadas;

  } catch (erro) {

    return null;

  }

}


// Exibe o recorde na tela inicial
function mostrarRecordeInicial() {

  const historico = lerHistorico();
  const elemento = $("recorde-inicial");

  elemento.hidden = historico.length === 0;

  if (historico.length) {

    const recorde = Math.max(
      ...historico.map(t => t.pontos)
    );

    elemento.textContent =
      `Seu recorde neste navegador: ${recorde} / 1000 pontos`;

  }

}


/* ==========================================================
   5. INICIAR O QUIZ
========================================================== */

function iniciarQuiz() {

  // Reinicia os dados do jogador
  indiceAtual = 0;
  pontos = 0;
  respondeu = false;
  respostas = [];

  mostrarTela("tela-pergunta");

  exibirPergunta();

}


/* ==========================================================
   6. EXIBIR PERGUNTAS
========================================================== */

function exibirPergunta() {

  respondeu = false;

  const pergunta = perguntas[indiceAtual];

  // Número da questão
  $("texto-progresso").textContent =
    `QUESTÃO ${String(indiceAtual + 1).padStart(2, "0")}/${perguntas.length}`;

  // Pontuação atual
  $("pontos-atuais").textContent = String(pontos);

  // Barra de progresso
  $("progresso").setAttribute(
    "aria-valuenow",
    String(indiceAtual + 1)
  );

  $("progresso-preenchimento").style.width =
    `${((indiceAtual + 1) / perguntas.length) * 100}%`;

  // Informações da pergunta
  $("pergunta-tema").textContent = pergunta.tema;
  $("pergunta-titulo").textContent = pergunta.enunciado;

  // Esconde o feedback anterior
  $("feedback").hidden = true;
  $("feedback").className = "feedback";

  // Esconde o botão de avançar
  $("botao-proxima").hidden = true;

  // Texto do botão conforme a questão
  $("botao-proxima").innerHTML =
    indiceAtual === perguntas.length - 1
      ? 'Ver meu resultado <span aria-hidden="true">→</span>'
      : 'Próxima pergunta <span aria-hidden="true">→</span>';

  // Container das alternativas
  const alternativas = $("alternativas");

  // Remove as alternativas anteriores
  alternativas.replaceChildren();

  // Cria os botões das alternativas
  pergunta.alternativas.forEach((texto, indice) => {

    const botao = document.createElement("button");

    botao.type = "button";
    botao.className = "alternativa";

    // Letra A, B, C ou D
    const letra = document.createElement("span");

    letra.className = "letra";
    letra.textContent = String.fromCharCode(65 + indice);
    letra.setAttribute("aria-hidden", "true");

    // Texto da alternativa
    const nome = document.createElement("span");

    nome.textContent = texto;

    botao.append(letra, nome);

    // Evento de clique
    botao.addEventListener("click", () => {
      registrarResposta(indice);
    });

    alternativas.append(botao);

  });

  $("pergunta-titulo").focus({
    preventScroll: true
  });

}


/* ==========================================================
   7. REGISTRAR E CORRIGIR RESPOSTAS
========================================================== */

function registrarResposta(indiceEscolhido) {

  // Impede responder novamente
  if (respondeu) return;

  respondeu = true;

  const pergunta = perguntas[indiceAtual];

  // Verifica se acertou
  const acertou =
    indiceEscolhido === pergunta.correta;

  // Soma 100 pontos se a resposta estiver correta
  if (acertou) {
    pontos += PONTOS_POR_ACERTO;
  }

  // Salva a resposta
  respostas.push({
    indiceEscolhido,
    acertou
  });

  // Atualiza a pontuação exibida
  $("pontos-atuais").textContent = String(pontos);

  // Seleciona os botões das alternativas
  const botoes = $("alternativas").querySelectorAll("button");

  botoes.forEach((botao, indice) => {

    // Bloqueia todas as alternativas
    botao.disabled = true;

    // Destaca a alternativa correta
    if (indice === pergunta.correta) {

      botao.classList.add("correta");

    } else if (indice === indiceEscolhido) {

      // Destaca a alternativa incorreta escolhida
      botao.classList.add("errada");

    }

  });

  // Mostra o feedback
  const feedback = $("feedback");

  feedback.hidden = false;

  feedback.className =
    `feedback ${acertou ? "certo" : "erro"}`;

  // Mensagem de correção
  $("feedback-titulo").textContent = acertou
    ? "Resposta correta! +100 pontos"
    : `Resposta correta: ${pergunta.alternativas[pergunta.correta]}`;

  // Explicação da resposta
  $("feedback-texto").textContent = pergunta.explicacao;

  // Libera a próxima questão
  $("botao-proxima").hidden = false;

}


/* ==========================================================
   8. AVANÇAR PARA A PRÓXIMA PERGUNTA
========================================================== */

function avancar() {

  if (!respondeu) return;

  if (indiceAtual < perguntas.length - 1) {

    indiceAtual++;

    exibirPergunta();

  } else {

    finalizarQuiz();

  }

}


/* ==========================================================
   9. CLASSIFICAÇÃO DO JOGADOR
========================================================== */

function faixaDeDesempenho(acertos) {

  if (acertos <= 3) {

    return [
      "Continue explorando!",
      "Revisite o cortiço e descubra mais sobre o enredo e suas personagens."
    ];

  }

  if (acertos <= 6) {

    return [
      "Aprendiz do cortiço",
      "Você já conhece alguns aspectos importantes da obra. Continue investigando!"
    ];

  }

  if (acertos <= 8) {

    return [
      "Conhecedor do cortiço",
      "Muito bem! Você compreendeu boa parte dos personagens e dos temas do romance."
    ];

  }

  return [
    "Especialista em O Cortiço!",
    "Excelente! Você demonstrou grande conhecimento da obra de Aluísio Azevedo."
  ];

}


/* ==========================================================
   10. FINALIZAR O QUIZ
========================================================== */

function finalizarQuiz() {

  // Calcula os acertos
  const acertos = pontos / PONTOS_POR_ACERTO;

  // Obtém a classificação
  const [classificacao, mensagem] =
    faixaDeDesempenho(acertos);

  // Exibe a pontuação
  $("pontuacao-final").textContent = String(pontos);

  // Exibe acertos e porcentagem
  $("quantidade-acertos").textContent =
    `${acertos} de ${perguntas.length} respostas corretas (${acertos * 10}%)`;

  // Atualiza a barra do resultado
  $("barra-resultado-progresso").style.width =
    `${acertos * 10}%`;

  // Exibe classificação e mensagem
  $("classificacao").textContent = classificacao;
  $("mensagem-resultado").textContent = mensagem;

  // Salva o resultado
  const historico = guardarResultado();

  $("historico").hidden = !historico;

  if (historico) {

    // Melhor pontuação salva
    $("texto-recorde").textContent =
      `Recorde neste navegador: ${Math.max(...historico.map(t => t.pontos))} pontos`;

    // Quantidade de tentativas
    $("texto-tentativas").textContent =
      `Tentativas salvas: ${historico.length}`;

  }

  // Prepara a revisão das respostas
  preencherRevisao();

  // Abre a tela de resultado
  mostrarTela("tela-resultado");

  $("titulo-resultado").setAttribute(
    "tabindex",
    "-1"
  );

  $("titulo-resultado").focus({
    preventScroll: true
  });

}


/* ==========================================================
   11. REVISÃO DAS RESPOSTAS
========================================================== */

function preencherRevisao() {

  const lista = $("revisao-lista");

  lista.replaceChildren();

  respostas.forEach((resposta, indice) => {

    const pergunta = perguntas[indice];

    // Elemento expansível
    const detalhes = document.createElement("details");

    detalhes.className = "revisao-item";

    const resumo = document.createElement("summary");

    // Ícone de acerto ou erro
    const selo = document.createElement("span");

    selo.className =
      `revisao-selo ${resposta.acertou ? "ok" : "falha"}`;

    selo.textContent = resposta.acertou ? "✓" : "✕";

    selo.setAttribute(
      "aria-label",
      resposta.acertou ? "Acertou" : "Errou"
    );

    // Texto da pergunta
    const titulo = document.createElement("span");

    titulo.textContent =
      `${indice + 1}. ${pergunta.enunciado}`;

    resumo.append(selo, titulo);

    // Conteúdo da revisão
    const corpo = document.createElement("div");

    corpo.className = "revisao-detalhes";

    [
      `Sua resposta: ${pergunta.alternativas[resposta.indiceEscolhido]}`,

      `Resposta correta: ${pergunta.alternativas[pergunta.correta]}`,

      pergunta.explicacao

    ].forEach(texto => {

      const p = document.createElement("p");

      p.textContent = texto;

      corpo.append(p);

    });

    detalhes.append(resumo, corpo);

    lista.append(detalhes);

  });

}


/* ==========================================================
   12. EVENTOS DOS BOTÕES
========================================================== */

// Começar o quiz
$("botao-comecar").addEventListener(
  "click",
  iniciarQuiz
);

// Próxima pergunta
$("botao-proxima").addEventListener(
  "click",
  avancar
);

// Jogar novamente
$("botao-reiniciar").addEventListener(
  "click",
  iniciarQuiz
);

// Exibir recorde salvo ao carregar a página
mostrarRecordeInicial();
