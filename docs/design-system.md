# Future Imóveis — Design System

Manual de marca da **Future Imóveis CE** (CRECI 18705 J, Fortaleza/CE).

**Este arquivo é a fonte da verdade de marca para qualquer coisa gerada neste
repositório** — páginas, seções, prompts de imagem/vídeo (ex.: `skills/scroll-world`),
peças de anúncio. Antes de gerar arte, copy ou UI para a Future Imóveis, leia este
documento e use os tokens abaixo em vez de inventar cores, fontes ou tom novos.

Referência visual completa (paleta lado a lado, tipografia, componentes):
o artefato publicado em `https://claude.ai/code/artifact/a4fb18bf-e924-425a-822b-b59e69504853`.

---

## 1. Marca

O símbolo é composto por três fachadas contidas por uma órbita elíptica: a torre
central (neutra) e duas torres vermelhas nas laterais.

**Regra de contraste (a parte mais importante deste documento):** a torre central
e a órbita **trocam de cor com o fundo**.

| Contexto             | Torre central + órbita | Torres laterais |
|-----------------------|------------------------|------------------|
| Sobre fundo claro      | Grafite `#4B4D54`      | Vermelho `#D5272C` |
| Sobre fundo escuro     | Branco `#F2F0EA`        | Vermelho `#D5272C` (ou `#E8484D` se o fundo escuro for parte de uma UI em dark mode — ver §2) |

O vermelho das torres laterais **nunca muda de tom por causa do fundo** — é a
única cor fixa do símbolo. Isso é mostrado no artefato na seção 01 (dois lockups
lado a lado, um sobre fundo claro e um sobre fundo escuro).

- **Área de proteção:** espaço livre ao redor da órbita equivalente à altura da
  torre central. Nada — texto, borda, foto de imóvel — invade essa margem.
- **Tamanho mínimo:** 28px de altura em tela (favicon/ícone de app usa só o
  símbolo, sem o texto). 15mm em impresso; abaixo de 20mm, use o símbolo isolado.
- **Nunca:** inclinar, distorcer/achatar, recolorir a palavra "FUTURE" fora do
  vermelho de marca, ou aplicar sombra/brilho decorativo.
- **Lockup:** "FUTURE" (vermelho, caixa alta, Sora 800) + "imóveis CE" (cor
  neutra da marca, Sora 700, minúsculas com tracking) + "CRECI 18705 J" (legenda
  pequena, tom apagado).

---

## 2. Cor

Paleta enxuta derivada do símbolo — sem tons decorativos adicionais. **Light e
dark mode não são o mesmo conjunto invertido por opacidade**: cada token foi
recalibrado (vermelho mais claro no dark, superfícies com um degrau de elevação,
preto nunca puro) para manter contraste e evitar o efeito "tela invertida".

### Tokens — light mode (padrão)

| Token | Hex | Uso |
|---|---|---|
| `--red` | `#D5272C` | CTAs, preços, tag "Lançamento", estado ativo |
| `--red-deep` | `#A81E22` | Hover/active do vermelho — nunca em repouso |
| `--graphite` | `#4B4D54` | Texto secundário, ícones, estrutura de navegação |
| `--graphite-soft` | `#7B7D84` | Legendas, metadados, texto de apoio |
| `--ink` | `#1B1B1A` | Texto principal |
| `--ink-soft` | `#58595E` | Texto de apoio sobre fundo claro |
| `--paper` | `#F2F3EF` | Fundo padrão de página — o "papel" da marca |
| `--surface` | `#FFFFFF` | Fundo de cards e formulários sobre o papel |
| `--stone` | `#CBC9C0` | Bordas, divisores, campos desabilitados |
| `--stone-soft` | `#E4E2DA` | Preenchimentos sutis |
| `--mark-neutral` | `#4B4D54` | Torre central + órbita da logo (ver §1) |
| `--mark-window` | `#FFFFFF` | "Janelas" recortadas nas torres da logo |

### Tokens — dark mode

| Token | Hex | Uso |
|---|---|---|
| `--red` | `#E8484D` | Clareado para manter contraste AA sobre fundo escuro |
| `--red-deep` | `#FF7377` | Hover/active — mais claro que o repouso, não mais escuro |
| `--graphite` | `#A9ABB2` | Texto secundário e ícones sobre fundo escuro |
| `--graphite-soft` | `#86878E` | Legendas e metadados sobre fundo escuro |
| `--ink` | `#F1F0EA` | Texto principal — quase branco, nunca `#FFFFFF` puro |
| `--ink-soft` | `#B7B6B0` | Texto de apoio sobre fundo escuro |
| `--paper` | `#18191A` | Fundo de página — preto levemente frio, nunca puro |
| `--surface` | `#201F21` | Fundo de cards — um degrau acima do papel |
| `--stone` | `#3B3B3D` | Bordas e divisores sobre fundo escuro |
| `--stone-soft` | `#29292B` | Preenchimentos sutis |
| `--mark-neutral` | `#F2F0EA` | Torre central + órbita da logo (ver §1) |
| `--mark-window` | `#1B1B1A` | "Janelas" recortadas nas torres da logo |

### Como aplicar o tema

Defina os tokens como custom properties em `:root`, redefina-os em
`@media (prefers-color-scheme: dark)` **e** em `:root[data-theme="dark"]` /
`:root[data-theme="light"]` (para um toggle manual sobrepor a preferência do
SO nos dois sentidos). Nunca aplique cor diretamente dentro do media query —
sempre através dos tokens, para o toggle manual funcionar.

```css
:root{
  --red:#D5272C; --red-deep:#A81E22; --graphite:#4B4D54; --graphite-soft:#7B7D84;
  --ink:#1B1B1A; --ink-soft:#58595E; --paper:#F2F3EF; --surface:#FFFFFF;
  --stone:#CBC9C0; --stone-soft:#E4E2DA; --mark-neutral:#4B4D54; --mark-window:#FFFFFF;
}
@media (prefers-color-scheme: dark){
  :root{
    --red:#E8484D; --red-deep:#FF7377; --graphite:#A9ABB2; --graphite-soft:#86878E;
    --ink:#F1F0EA; --ink-soft:#B7B6B0; --paper:#18191A; --surface:#201F21;
    --stone:#3B3B3D; --stone-soft:#29292B; --mark-neutral:#F2F0EA; --mark-window:#1B1B1A;
  }
}
:root[data-theme="dark"]{ /* mesmos valores do bloco dark acima */ }
:root[data-theme="light"]{ /* mesmos valores do bloco :root acima */ }
```

### Proporção de uso — 70 / 24 / 6

Papel+ink neutro domina (~70%), grafite estrutura a UI (~24%), vermelho é
escasso por definição (~6%). Uma tela típica tem no máximo três elementos
vermelhos — normalmente um CTA e uma tag de destaque. Se o vermelho aparece em
toda a página, ele deixa de significar "aja aqui".

---

## 3. Tipografia

- **Display — Sora, pesos 700/800:** títulos (H1–H3), rótulos de botão, tags,
  preços, navegação. Sempre em caixa alta com leve tracking.
- **Corpo — fonte padrão do sistema** (`-apple-system, "Segoe UI", Roboto,
  Helvetica, Arial, sans-serif`): parágrafos, descrições de imóvel, formulários.
  Peso regular, sem caixa alta. Escolhida por legibilidade em listagens longas,
  não por decoração.
- **Números tabulares:** preços, metragem e código CRECI usam
  `font-variant-numeric: tabular-nums` para alinhar em coluna nas listas.

Escala: H1 52px/800, H2 34px/800, H3 22px/700, Label 13px/700 (caixa alta),
Body 16px/400.

---

## 4. Voz & tom

Future fala como um corretor bem preparado: direto, informativo, sem
adjetivo vazio. Ceará tem sotaque — a marca não precisa forçar um.

1. **Fato antes de adjetivo.** "3 quartos, varanda gourmet, 200m da praia" em
   vez de "apartamento incrível, não perca!".
2. **Ação nomeada.** Botões dizem o que acontece a seguir: "Falar com
   corretor", nunca "Clique aqui".
3. **Local, não genérico.** Bairro, referência real e distância de Fortaleza
   em vez de "localização privilegiada".

---

## 5. Componentes

Peças-padrão do portal e dos anúncios — a implementação de referência (HTML/CSS
completo, com light e dark mode lado a lado) está no artefato publicado.

- **Navbar:** logo à esquerda, links (Comprar / Alugar / Lançamentos / Anuncie)
  ao centro-direita, CTA primário à direita.
- **Busca:** abas "Comprar" / "Alugar" (aba ativa sublinhada em vermelho) +
  campos de localização/tipo/faixa de preço + botão de busca vermelho sólido.
- **Tags de status:** `Lançamento` (fundo vermelho), `Pronto pra morar` (fundo
  ink), `Aluguel` (contorno, transparente), `Venda` (fundo stone-soft).
- **Card de imóvel:** foto 4:3 com tag de status e favorito sobrepostos, preço
  em Sora 800 com números tabulares, tipo/specs, localização com borda superior
  sutil separando do resto do card.
- **Botões:** primário (fundo vermelho), secundário (contorno ink), ghost
  (texto grafite, vira vermelho no hover).

---

## 6. Layout & grid

- Grid de 12 colunas, gutter 8px, container travado em 1180px.
- Escala de espaçamento: XS 8 · S 16 · M 28 · L 48 · XL 88 (px).
- Breakpoints: mobile `<520px` (1 col de cards) · tablet `520–900px` (2 col) ·
  desktop `900–1180px` (3 col) · wide `>1180px` (4 col, container travado).

---

## 7. Motivo gráfico — a órbita

O arco elíptico do símbolo é o único elemento gráfico livre da marca: pode
aparecer como divisor de seção, fundo de hero ou moldura, sempre em traço fino
e uso comedido. **No máximo uma órbita por tela** — é uma assinatura, não um
padrão decorativo repetível.

---

## 8. Aplicação de referência

O hero de abertura do portal combina: corte diagonal vermelho/escuro (inspirado
na referência "Rent Area"), órbita de fundo, navbar com o lockup em sua versão
dark (torre central branca) e CTA vermelho primário. Ver seção 08 do artefato
publicado para o mockup completo.

---

*Atualizado em julho de 2026. Qualquer skill ou script deste repositório que
gere página, imagem ou vídeo para a Future Imóveis deve usar os tokens e
regras acima como brand kit — não propor paleta ou tipografia próprias.*
