# Wireframe — Site One Page Condomínio Marbello (Future Imóveis)
### Etapa 2: Arquitetura da Jornada
**Uso:** documento de handoff para prototipagem visual (Claude Design)
**Base:** discovery de jornadas + benchmark de 10 referências (etapa 1)
**Estrutura:** AIDA (Atenção → Interesse → Desejo → Ação)

---

## Ajuste de comunicação (importante — lido antes do restante do documento)

**A página não é um site institucional de "conheça o condomínio" — é um catálogo de vendas.** O objetivo primário é vender lotes específicos, não apenas gerar um lead genérico para "receber uma tabela depois". Isso muda três coisas na comunicação em relação à primeira versão deste wireframe:

1. **O catálogo de lotes deixa de ser um bloco de apoio e passa a ser o centro da página.** Por isso ele sobe de posição — de sub-bloco (S2.5) para seção própria, logo após o Hero.
2. **A linguagem de CTA muda de "receber informação" para "escolher e comprar".** Trocamos convites passivos ("quero receber a tabela de preços") por convites de ação direta ("ver lotes disponíveis", "escolher meu lote", "garantir meu lote").
3. **A prova institucional e financeira (grupo Marbello, condições de pagamento) deixa de ser o que convence o usuário a "considerar" o projeto e passa a ser o que remove a última objeção antes da compra** — ela vem depois do catálogo, não antes.

O funil AIDA continua o mesmo, mas a ordem de exposição das seções muda: o usuário vê o produto real (os lotes) antes da narrativa de infraestrutura genérica.

---

## Como usar este documento

Cada seção abaixo descreve: **objetivo da seção**, **layout/grid**, **elementos e hierarquia**, **conteúdo/copy de referência** (placeholder, não final) e **notas de comportamento** (scroll, interação, responsivo). Isso é wireframe de conteúdo e estrutura — não é definição final de UI visual (cores, tipografia, imagens finais ficam para a etapa de identidade visual aplicada).

**Convenção de nomenclatura de blocos:** `S1` a `S5` = as cinco seções macro. `S1.1`, `S1.2` = sub-blocos dentro de cada seção.

---

## Visão geral da página (fluxo vertical único)

```
┌─────────────────────────────────────┐
│ S1 — ATENÇÃO (Hero)                  │  ← acima da dobra
├─────────────────────────────────────┤
│ S2 — CATÁLOGO DE LOTES (vitrine)     │  ← agora é o núcleo da página
├─────────────────────────────────────┤
│ S3 — INTERESSE (Produto/Infra)       │
├─────────────────────────────────────┤
│ S4 — DESEJO (Grupo/Prova/Financeiro) │
├─────────────────────────────────────┤
│ S5 — AÇÃO (Fechamento final)         │
├─────────────────────────────────────┤
│ S6 — CONTEÚDO SEO (FAQ + texto local)│  ← novo, abaixo da conversão
├─────────────────────────────────────┤
│ Rodapé institucional (CRECI/CNPJ)    │
└─────────────────────────────────────┘
          [Botão flutuante WhatsApp — fixo em todas as seções]
```

**Regra estrutural:** sem menu de navegação fixo, sem links de saída. Scroll único, guiado, sem rota de fuga (referência: padrão Wix de alta conversão).

---

## S1 — ATENÇÃO (Hero Section)

**Objetivo:** decidir em segundos que este não é "mais um loteamento genérico" — e sinalizar imediatamente que existe estoque real disponível para compra agora.

**Layout:**
- Full-bleed, 100vh no desktop / 100vh no mobile com corte seguro para não cortar o CTA
- Vídeo de fundo (drone) com overlay de gradiente escuro na base para legibilidade do texto
- Grid: conteúdo centralizado ou alinhado à esquerda (definir na prototipagem), CTA sempre visível sem scroll

**Elementos (ordem de hierarquia visual):**
1. **S1.1 — Selo de credibilidade** (topo, discreto, mas legível): "Grupo com mais de 8 loteamentos entregues no Ceará"
2. **S1.2 — Headline principal** (maior peso visual da página):
   > "Seu lote na Praia da Lagoinha está disponível agora."
3. **S1.3 — Sub-headline** (peso secundário):
   > "Condomínio Marbello: lazer completo, financiamento direto sem burocracia. Escolha o seu lote e fale com um corretor hoje mesmo."
4. **S1.4 — CTA principal** (âncora de rolagem para o catálogo, não formulário de captura):
   - Botão de alto contraste: **"Ver Lotes Disponíveis"** → rola diretamente para S2 (catálogo)
5. **S1.5 — Vídeo de fundo**: drone aéreo Lagoinha + condomínio, mostrando proximidade real com o mar

**Notas de comportamento:**
- O CTA do Hero não coleta dados — ele leva direto à vitrine de produto (S2). Captura de contato acontece no momento da escolha do lote, não antes.
- Mobile: vídeo pode ser substituído por imagem estática otimizada (WebP) se pesar demais; priorizar carregamento do CTA antes do vídeo

---

## S2 — CATÁLOGO DE LOTES DISPONÍVEIS

**Objetivo:** esta é a seção central da página. O usuário não está "conhecendo um conceito" — está escolhendo um produto específico para comprar. Tudo aqui deve comunicar disponibilidade real, urgência honesta (estoque limitado de fato) e caminho direto de compra.

**Layout:**
- Bloco em formato de grade/vitrine (grid de cards) — o usuário deve conseguir comparar lotes lado a lado, como um catálogo de e-commerce
- Desktop: grade de 3-4 colunas | Mobile: 1-2 colunas com scroll vertical
- Filtro simples opcional no topo (ex: por metragem ou faixa de preço), sem obrigatoriedade — não pode virar fricção
- Título de seção: **"Lotes Disponíveis"**, com subtítulo de reforço: **"Escolha o seu e fale direto com o corretor responsável"**

**Elementos de cada card de lote:**
1. **Identificação do lote** (ex: "Lote 14 — Quadra B")
2. **Metragem** (ex: 200 m²) — dado técnico, sempre em primeiro plano
3. **Preço ou faixa de parcela** — exibição pública recomendada nesta versão, já que o objetivo é venda direta e comparação imediata (a exibir "consulte condições" só se a Future Imóveis não autorizar valores públicos)
4. **Selo de status**: Disponível / Reservado / Últimas unidades
5. **Linha de benefício embutido** (curta, 1 linha, complementar aos dados técnicos — não substitui nenhum dado acima): ex. "a 2 min do mar" / "de esquina, maior frente" / "próximo à área de lazer". O comprador de lote quer primeiro os números — metragem, preço, status — e decide comparando dado técnico; o benefício entra como reforço rápido, não como troca de informação
6. **CTA do card**: botão **"Quero este lote"**

**Comportamento de clique (regra de negócio):**
- Ao clicar no CTA do card, o usuário é redirecionado diretamente para o WhatsApp do corretor responsável
- A mensagem vem **pré-preenchida automaticamente**, substituindo `X` pelo identificador daquele lote específico:
  > "Vim pelo site e gostaria de saber mais sobre o lote X"
- Tecnicamente isso é resolvido com um link `https://wa.me/<numero>?text=<mensagem codificada em URL>` único por card — cada lote tem seu próprio link gerado dinamicamente a partir do identificador do lote
- Esse clique deve disparar um evento de conversão individual (ex: `Lead_Lote_14`) para rastrear qual lote gera mais interesse — reforça a diretriz técnica de rastreabilidade já definida no discovery

**Notas de comportamento:**
- Esta é a seção de maior prioridade de carregamento depois do Hero — não deve depender de scroll excessivo para aparecer
- Se o inventário de lotes for grande, considerar paginação ou "ver mais" em vez de carregar todos de uma vez (peso de página)
- Cards sem imagem de planta/mapa do lote são aceitáveis nesta fase; se houver planta de implantação do loteamento, uma versão simplificada dela pode servir de fundo visual do bloco todo (mapa clicável), como evolução futura — não obrigatório para o wireframe inicial

---

## S3 — INTERESSE (Produto e Infraestrutura)

**Objetivo:** depois que o usuário já viu o catálogo (e possivelmente já escolheu um lote de interesse), esta seção sustenta a decisão — prova que o entorno do lote escolhido é de qualidade, não apenas o terreno em si.

> **Atualização (material enviado pela cliente — apresentação Emiliano Luiz Arquitetura, 2023):** esta seção deixa de depender de renders genéricos de referência — já existem renders 3D reais e específicos do Condomínio Marbello para praticamente todos os pontos abaixo. Isso resolve, para esta seção, o ponto em aberto do discovery ("confirmar quais ativos de mídia já existem"). Os elementos abaixo foram ajustados para refletir o que está confirmado no projeto.

**Layout:**
- Grid de galeria dinâmica (2-3 colunas desktop, 1 coluna mobile, carrossel horizontal)
- Alternância entre bloco de imagem e bloco de texto explicativo (não empilhar todo texto de um lado)

**Elementos:**
1. **S3.1 — Bloco de lazer coletivo** (galeria com renders 3D reais do projeto):
   - Piscina adulta retangular + banheira/spa circular, com deck em pedra
   - Playground infantil (balanço) integrado ao paisagismo
   - Quadra de beach tennis fechada (tela alta, piso de areia)
   - Quadra poliesportiva / campo de futebol society (grama sintética, traves e cesta de basquete, cercada com tela alta)
   - Duas áreas gourmet cobertas, com churrasqueira e mesas — espaço de convivência coberto (substitui o "salão de festas" genérico da versão anterior; o projeto real tem edículas gourmet abertas, não um salão fechado)
   - Cada imagem com legenda curta (1 linha, não parágrafo)
2. **S3.2 — Bloco de diferenciais técnicos** (formato ícone + texto curto, não parágrafo corrido):
   - Portaria com controle de acesso (guarita, cancela, portão) — reforça o selo de segurança já usado no Hero
   - Estacionamento de visitantes com vagas demarcadas
   - Paisagismo extenso com árvores de grande porte já especificadas em projeto (ipês floridos, amarelo e roxo) — não é promessa vaga de "área verde", é projeto paisagístico real
   - Vias internas e calçamento em bloquete/pedra
   - Muramento perimetral completo
   - Iluminação e abastecimento de água (manter como diretriz técnica geral, ainda não confirmado visualmente no material recebido)
3. **S3.3 — Bloco de validação ambiental**:
   - Selo/ícone de licenciamento aprovado
   - Texto curto: planejamento georreferenciado + assessoria ambiental especializada

**Notas de comportamento:**
- Esta seção é a mais "racional" da página — priorizar clareza sobre densidade de texto
- Ícones devem ser interativos/hover no desktop (expandem info), estáticos no mobile
- Como já existem renders reais, priorizar essas imagens sobre qualquer banco de imagem genérico — reforça a diretriz de "prova, não promessa" que sustenta toda a página
- Considerar substituir a imagem estática do Hero (S1.5, quando o vídeo de drone não estiver disponível) por um dos renders aéreos gerais do condomínio já existentes, que mostram a extensão do loteamento e a proximidade com a via principal

---

## S4 — DESEJO (Força do Grupo, Prova Social, Financeiro)

**Objetivo:** neutralizar a última objeção antes da compra — financeira e jurídica — e elevar a percepção de valor do lote que o usuário já está considerando.

**Layout:**
- Seção dividida em 3 blocos empilhados, cada um com abertura visual distinta (não repetir o mesmo padrão de grid de S3)

**Elementos:**
1. **S4.1 — Bloco institucional do megaprojeto (Aldeias da Lagoinha)**:
   - Números como destaque visual (não em parágrafo): US$ 100 milhões / 12 km de orla / 1.000 hectares
   - Texto de conexão: "O Condomínio Marbello está dentro da região de maior vetor de crescimento do litoral oeste"
2. **S4.2 — Bloco financeiro**:
   - Destaque visual do valor de parcela (abaixo de R$ 600/mês)
   - "Financiamento direto pela construtora, sem burocracia bancária"
3. **S4.3 — Prova social**:
   - Depoimentos (texto e/ou vídeo) de clientes de empreendimentos anteriores
   - Formato carrossel ou cards, com foto + nome + frase curta (evitar texto longo)

**Notas de comportamento:**
- Os números do megaprojeto devem ter peso tipográfico forte — esse é o bloco de "prova de escala"
- Depoimentos em vídeo (se existirem) priorizados sobre texto puro

---

## S5 — AÇÃO (Fechamento Final)

**Objetivo:** fechar a venda de quem chegou até aqui sem ter clicado em nenhum lote específico ainda. Sem alternativa de rota — só o catálogo (voltar para S2) ou o WhatsApp direto.

**Layout:**
- Seção mais compacta da página, alto contraste, centrada
- Sem elementos decorativos concorrendo com o CTA

**Elementos:**
1. **S5.1 — Gatilho de escassez** (real, não genérico):
   > "Restam apenas [N] lotes com condições de pré-lançamento"
2. **S5.2 — CTA com hierarquia clara** (ambos os caminhos terminam no mesmo lugar — falar com o corretor — então a decisão do usuário deve ser simples, não uma escolha aberta entre duas opções de peso igual):
   - Botão primário (destaque visual forte): **"Ver Lotes Disponíveis"** → âncora de volta para S2
   - Link secundário (discreto, texto/underline, sem peso de botão): "prefere falar direto com um corretor? clique aqui" → WhatsApp geral, sem lote específico pré-preenchido
3. **S5.3 — Reforço de confiança final** (opcional, linha única): selo institucional repetido

**Notas de comportamento:**
- Este é o único ponto da página, junto com o catálogo, onde urgência é aceitável — em nenhuma outra seção usar tom de pressão
- A hierarquia visual entre os dois caminhos existe só para reduzir hesitação no momento da decisão — o link secundário continua funcional e visível, apenas não compete em peso com o CTA principal

---

## Camada de Interação — Animações e Efeitos de Rolagem

**Regra geral:** cada efeito precisa ter uma função dentro da jornada AIDA — chamar atenção, guiar o olhar, ou comunicar que uma ação é possível. Nada aqui é decorativo por decoração; se um efeito não reforça atenção, interesse, desejo ou ação, ele não entra.

| Seção | Efeito | Função na jornada |
|---|---|---|
| **S1 — Hero** | Fade-in suave do texto e CTA ao carregar a página (não no scroll — no load) | Dá peso à entrada sem atrasar a leitura da headline |
| **S1 — Hero** | Parallax leve no vídeo/imagem de fundo (o fundo se move mais devagar que o texto ao rolar) | Sensação de profundidade — reforça "estar lá", na Lagoinha |
| **S1 → S2** | Indicador de scroll discreto (seta com leve bounce) | Sinaliza que existe mais conteúdo abaixo — reduz abandono na primeira dobra |
| **S1.4 → S2** | Scroll suave (smooth-scroll) ao clicar em "Ver Lotes Disponíveis" | Cumpre a promessa do CTA de forma imediata e fluida, sem salto brusco de página |
| **S2 — Catálogo** | Reveal on scroll dos cards (fade + slide-up), em sequência (staggered), não todos de uma vez | Dá ritmo à vitrine sem parecer uma lista estática de dados |
| **S2 — Catálogo** | Micro-interação em hover/toque: leve elevação do card (sombra) + destaque no CTA | Sinaliza clicabilidade — comunica "isso é interativo, não é só imagem" |
| **S2 — Catálogo** | Se houver filtro, transição suave (fade) nos cards que somem/aparecem ao filtrar | Evita corte seco que quebra a sensação de vitrine contínua |
| **S3 — Interesse** | Parallax leve nas imagens da galeria de infraestrutura | Profundidade visual nos renders reais sem pesar a página |
| **S3 — Interesse** | Ícones dos diferenciais técnicos com entrada sutil (fade + leve escala) ao entrarem na tela | Guia o olhar de item em item, sem exigir leitura forçada de bloco de texto |
| **S4 — Desejo** | Contagem numérica animada (count-up) nos números do megaprojeto — US$ 100 milhões / 12 km / 1.000 hectares "sobem" até o valor final quando a seção entra na tela | Transforma dado estático em momento de impacto — reforça a "prova de escala" no instante exato em que o usuário mais precisa dela |
| **S4 — Desejo** | Depoimentos em carrossel com transição suave, autoplay pausável ao interagir | Mantém a seção viva sem exigir clique constante do usuário |
| **S5 — Ação** | Pulsação sutil e lenta no botão CTA primário (nunca piscante ou agressiva) | Chama atenção no momento de decisão final sem parecer desesperado |
| **Botão flutuante WhatsApp** | Aparece com fade/slide só depois que o usuário rola além do Hero | Evita competir com o CTA principal na primeira dobra — surge quando já faz sentido |
| **Página inteira (opcional)** | Barra de progresso fina no topo, mostrando o quanto falta de scroll | Reduz abandono em página longa — orienta sem poluir |

**Diretrizes técnicas para a camada de animação (carry-over das regras de performance do discovery):**
- Usar apenas propriedades CSS aceleradas por GPU (`transform`, `opacity`) — nunca animar `width`, `height`, `top`/`left`, que forçam reflow e prejudicam o Core Web Vitals já definido como prioridade
- Scroll-reveal deve ser implementado com `Intersection Observer`, não com listeners de scroll pesados
- Respeitar `prefers-reduced-motion` do sistema do usuário — quem desativa animação no dispositivo não deve ver nenhuma
- Testar todas as animações em dispositivo mobile real antes de aprovar — o que parece leve no desktop pode travar em conexão 4G comum
- Nenhuma animação pode atrasar a exibição do CTA do Hero (S1.4) ou do primeiro card do catálogo (S2) — eles precisam estar prontos para clique o quanto antes

---



- Fixo no canto inferior direito, visível em **todas** as seções (S1 a S5)
- Ação: abre fluxo direto com corretor responsável pela tabela do Marbello (mensagem genérica, sem lote pré-definido)
- Não deve sobrepor os cards de lote (S2) ao rolar em mobile — validar zona de exclusão

---

## S6 — CONTEÚDO SEO (abaixo da conversão)

**Objetivo:** o site é intencionalmente enxuto em texto para converter rápido — mas isso deixa o Google sem material suficiente para entender e ranquear a página para quem está pesquisando "lotes no Ceará" e variações. Esta seção resolve isso sem atrapalhar a jornada de conversão: fica **abaixo** de S5, depois que quem queria agir já agiu. Quem chega até aqui via busca orgânica encontra o contexto que o Google precisa indexar; quem já converteu simplesmente não precisa rolar até lá.

**Por que isso importa agora:** o discovery já apontou que o mercado de loteamentos no Ceará está em alta (62% mais unidades vendidas, 79% mais VGV) — isso significa mais gente pesquisando "lote na praia CE", "loteamento Paraipaba" e termos parecidos. Uma página sem conteúdo indexável perde esse tráfego para concorrentes que têm blog ou mais texto — mesmo tendo um produto melhor.

**Layout:**
- Bloco de texto corrido + FAQ em acordeão (accordion) — mantém a página curta visualmente mesmo com mais texto (perguntas fechadas por padrão, abrem ao clicar)
- Sem imagens pesadas aqui — é a seção de menor prioridade de carregamento visual, mas de conteúdo indexável

**Elementos:**
1. **S6.1 — Bloco de contexto local** (2-3 parágrafos curtos, não um só bloco denso):
   - Sobre a região: Paraipaba, litoral oeste do Ceará, Praia da Lagoinha — por que essa área está em expansão
   - Sobre o grupo: Future Imóveis / Grupo Marbello, mais de 8 loteamentos entregues
   - Sobre o modelo de aquisição: financiamento direto, sem burocracia bancária
   - Este texto deve usar naturalmente os termos de busca prioritários (ver lista abaixo) — sem forçar repetição, só escrever de forma que as perguntas reais das pessoas apareçam respondidas
2. **S6.2 — FAQ (Perguntas Frequentes)**, formato acordeão, 6-8 perguntas reais de quem pesquisa antes de comprar lote:
   - "Como funciona o financiamento de um lote no Condomínio Marbello?"
   - "O Condomínio Marbello fica a quantos minutos da praia?"
   - "É preciso análise de crédito bancária para comprar um lote?"
   - "Quais documentos preciso para adquirir um lote?"
   - "O loteamento tem escritura individualizada por lote?"
   - "Quais infraestruturas já estão prontas no condomínio?"
   - (demais perguntas a validar com o time comercial da Future Imóveis — são eles que sabem as dúvidas reais que mais aparecem no WhatsApp)
3. **S6.3 — Nota de área/localização** com endereço, referências de acesso (CE-162) e, se possível, mapa incorporado

**Termos de busca prioritários** (usar naturalmente no texto de S6, na headline, nos `alt` de imagem e nos metadados — não empilhar todos, distribuir):
- "lotes em Paraipaba CE"
- "lotes na Praia da Lagoinha"
- "loteamento litoral oeste Ceará"
- "comprar lote na praia Ceará"
- "condomínio fechado Paraipaba"
- "financiamento de lote sem banco Ceará"

**Notas técnicas de SEO (além dos dados estruturados já definidos no discovery):**
- **Hierarquia de headings correta:** a headline do Hero (S1.2) deve ser a `H1` única da página. Os títulos de cada seção (S2 "Lotes Disponíveis", S3, S4, S6) devem ser `H2`. Sub-blocos, `H3`. Isso não é opcional — é o que o Google usa pra entender a estrutura da página inteira.
- **Alt text descritivo em toda imagem/render:** cada imagem da galeria (S3) e cada foto de card de lote (S2) precisa de `alt` descritivo e natural (ex: `"Quadra de beach tennis do Condomínio Marbello em Paraipaba, Ceará"`), não `"imagem1.jpg"` nem texto genérico
- **Meta title e meta description únicos da página**, com os termos prioritários — sugestão de rascunho:
  - Title: "Lotes à Venda em Paraipaba-CE — Condomínio Marbello, Praia da Lagoinha"
  - Description: "Lotes disponíveis a 2 minutos do mar na Praia da Lagoinha. Financiamento direto, sem burocracia bancária. Veja o catálogo e fale com um corretor."
- **FAQPage schema (dados estruturados)**: o bloco S6.2 deve ser marcado com o schema `FAQPage`, além do `RealEstateAgent`/`LandDevelopment` já definido no discovery — isso dá chance de aparecer em rich snippets do Google, direto na busca
- **Conteúdo precisa existir no HTML renderizado no servidor, não só depois do JavaScript rodar.** Isso é crítico dado que a página agora tem uma camada de animações (reveal on scroll, fade-in): o texto de S6 e os headings de todas as seções não podem depender de scroll ou interação do usuário pra existir no DOM — o crawler do Google precisa encontrar o conteúdo pronto, mesmo que ele apareça visualmente só depois de um efeito

---

## Rodapé institucional

- CNPJ, CRECI, localização física da sede (Ceará)
- Estrutura de dados: marcação `RealEstateAgent` / `LandDevelopment` deve estar associada a esse bloco (requisito técnico de SEO local, não visual, mas a informação precisa estar disponível na página)

---

## Diretrizes técnicas que afetam o wireframe (carry-over do discovery)

| Diretriz | Impacto no wireframe |
|---|---|
| Mobile-first (80%+ do tráfego) | Toda seção deve funcionar em coluna única sem perda de hierarquia |
| Formatos WebP | Blocos de galeria (S2, S3.1) devem prever fallback leve |
| Sem menu de navegação | Não incluir header fixo com links — só logo, sem interação |
| Eventos de conversão (Meta Pixel/GA) | Cada CTA (S1.4, S5.2, botão WhatsApp geral, e cada card de lote em S2) precisa ser um elemento clicável único e rastreável — não agrupar múltiplos CTAs num único botão |
| Links de WhatsApp dinâmicos por lote (S2) | Cada card precisa gerar seu próprio link `wa.me` com o identificador do lote embutido na mensagem — isso é lógica de template, não texto fixo, e deve ser considerado na estrutura de dados dos lotes desde a prototipagem |
| Catálogo como núcleo da página | S2 precisa ser tratado como o componente de maior prioridade de engenharia — carregamento rápido, dados estruturados por lote (id, metragem, preço, status), não apenas imagens estáticas |
| Conteúdo SEO indexável (S6) | Texto, headings e FAQ não podem depender de JavaScript/scroll para existir no HTML — precisam estar prontos no server-render, mesmo com a camada de animação ativa |

---

## Prompt de handoff sugerido para o Claude Design

> "Crie um protótipo de site one page imobiliário, mobile-first, com foco em catálogo de vendas direta (não site institucional). Estrutura em scroll único com animações leves e funcionais: Hero com vídeo/imagem de fundo (render aéreo real do condomínio), parallax sutil, fade-in no carregamento, e CTA único com scroll suave até o catálogo; seção de vitrine de lotes disponíveis em grid de cards com reveal on scroll escalonado, micro-interação de hover/toque, e um card (identificação do lote, metragem, preço/parcela, selo de status, linha curta de benefício como 'a 2 min do mar', botão 'Quero este lote' que abre WhatsApp com mensagem pré-preenchida citando o número do lote); seção de galeria de infraestrutura real do condomínio (piscina com deck, quadra de beach tennis, quadra poliesportiva, área gourmet coberta, portaria com controle de acesso, paisagismo com ipês) com ícones de diferenciais técnicos e parallax leve; seção de prova institucional com números em contagem animada (count-up) e depoimentos em carrossel; seção final de fechamento com gatilho de escassez real, CTA com hierarquia clara (botão primário com pulsação sutil 'Ver Lotes Disponíveis' e link secundário discreto para falar direto com corretor); bloco de conteúdo SEO abaixo da conversão com texto local (Paraipaba, Praia da Lagoinha, litoral oeste do Ceará) e FAQ em acordeão. Botão flutuante de WhatsApp fixo, com entrada em fade/slide após o Hero. Paleta sóbria (azul-escuro, tons terrosos, dourado sutil), sem menu de navegação, hierarquia de headings correta (H1 único no Hero), animações leves e performáticas (transform/opacity, sem prejudicar Core Web Vitals), conteúdo textual presente no HTML renderizado (não dependente de JS), foco total nos CTAs e na vitrine de lotes."

---

*Wireframe de estrutura e conteúdo — a definição final de UI (grid exato, tipografia, cores aplicadas) acontece na prototipagem em Claude Design.*
