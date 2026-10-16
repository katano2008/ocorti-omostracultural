/* =====================================================
   EXPLORAR O CORTIÇO — interações do cenário e personagens
   Edite os textos nos objetos abaixo sem alterar o HTML.
===================================================== */

const locais = {
  comercio: {
    categoria: 'AMBIÇÃO E EXPLORAÇÃO',
    titulo: 'O comércio de João Romão',
    descricao: 'O comerciante português João Romão acumula riqueza com seu trabalho, seus negócios e a exploração de outras pessoas. Sua ambição é uma força importante no desenvolvimento do enredo.',
    reflexao: 'Que consequências a busca por riqueza tem para Bertoleza e para os moradores?'
  },
  patio: {
    categoria: 'VIDA COLETIVA',
    titulo: 'O pátio do cortiço',
    descricao: 'O pátio simboliza a convivência intensa entre os moradores. Ali, o cotidiano coletivo envolve trabalho, festas, desentendimentos e vínculos humanos. O próprio ambiente ganha destaque na narrativa.',
    reflexao: 'Como a vida em comunidade interfere nas atitudes das personagens?'
  },
  lavadouro: {
    categoria: 'TRABALHO E SOBREVIVÊNCIA',
    titulo: 'O lavadouro',
    descricao: 'O trabalho das lavadeiras faz parte do cotidiano da habitação. A representação das atividades domésticas e do trabalho ajuda a revelar as condições materiais e sociais dos moradores.',
    reflexao: 'O que o romance mostra sobre trabalho, desigualdade e sobrevivência?'
  },
  sobrado: {
    categoria: 'CLASSES E PRESTÍGIO',
    titulo: 'O sobrado de Miranda',
    descricao: 'Vizinho de João Romão, Miranda vive em um sobrado que contrasta com a habitação coletiva. A rivalidade entre os dois expõe o desejo de ascensão social e de reconhecimento.',
    reflexao: 'Por que ter dinheiro e conquistar status não significam exatamente a mesma coisa?'
  }
};

const personagens = [
  { nome: 'João Romão', tema: 'AMBIÇÃO', descricao: 'Comerciante português e dono do cortiço. Sua ambição e exploração de Bertoleza revelam tensões entre riqueza, poder e desigualdade.' },
  { nome: 'Bertoleza', tema: 'EXPLORAÇÃO', descricao: 'Mulher negra escravizada, enganada por João Romão sobre sua alforria. Sua história é uma das críticas mais duras da obra à exploração e à violência da escravidão.' },
  { nome: 'Rita Baiana', tema: 'PERSONAGEM E AMBIENTE', descricao: 'Moradora do cortiço, é uma figura marcante na narrativa. Sua relação com Jerônimo participa da transformação do comportamento dele.' },
  { nome: 'Jerônimo', tema: 'TRANSFORMAÇÃO', descricao: 'Trabalhador português inicialmente disciplinado, tem seus hábitos modificados ao longo da convivência com o meio e pela paixão por Rita Baiana.' },
  { nome: 'Miranda', tema: 'STATUS SOCIAL', descricao: 'Comerciante português que vive no sobrado vizinho. Sua relação com João Romão evidencia rivalidades econômicas e aspirações sociais.' },
  { nome: 'Pombinha', tema: 'CONVENÇÕES SOCIAIS', descricao: 'Jovem cuja trajetória expõe expectativas sociais relacionadas às mulheres e as transformações que ocorrem na vida dos moradores.' }
];

const visitas = new Set();
const botoesLocais = document.querySelectorAll('[data-local]');

function selecionarLocal(id, rolar = false) {
  const local = locais[id];
  if (!local) return;
  visitas.add(id);
  document.getElementById('local-categoria').textContent = local.categoria;
  document.getElementById('local-titulo').textContent = local.titulo;
  document.getElementById('local-texto').textContent = local.descricao;
  document.getElementById('local-reflexao').textContent = local.reflexao;
  document.getElementById('local-contador').textContent = `${visitas.size} de 4 locais visitados`;

  botoesLocais.forEach(botao => {
    const ativo = botao.dataset.local === id;
    botao.classList.toggle('ativo', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
  });
  // No celular, o painel fica abaixo do cenário; leve o visitante até ele.
  if (rolar && window.matchMedia('(max-width: 760px)').matches) {
    document.getElementById('painel-local').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

botoesLocais.forEach(botao => {
  botao.addEventListener('click', () => selecionarLocal(botao.dataset.local, true));
});
selecionarLocal('patio');

const grade = document.getElementById('grade-personagens');
function selecionarPersonagem(indice) {
  const personagem = personagens[indice];
  if (!personagem) return;
  document.getElementById('personagem-tema').textContent = personagem.tema;
  document.getElementById('personagem-nome').textContent = personagem.nome;
  document.getElementById('personagem-descricao').textContent = personagem.descricao;
  grade.querySelectorAll('button').forEach((botao, i) => {
    const ativo = i === indice;
    botao.classList.toggle('ativo', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
  });
  if (window.matchMedia('(max-width: 760px)').matches && indice !== 0) {
    document.getElementById('personagem-detalhe').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

personagens.forEach((personagem, i) => {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'personagem-card';
  botao.setAttribute('aria-pressed', 'false');
  const nome = document.createElement('span');
  nome.textContent = personagem.nome;
  const tema = document.createElement('small');
  tema.textContent = personagem.tema;
  botao.append(nome, tema);
  botao.addEventListener('click', () => selecionarPersonagem(i));
  grade.append(botao);
});
selecionarPersonagem(0);
