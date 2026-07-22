# Guia do projeto — Future Imóveis

Este documento é a referência rápida para pessoas e assistentes de IA que mantêm esta aplicação. Leia-o antes de alterar conteúdo, ofertas, mídia ou conversão.

## O que é o site

Landing page mobile-first da **Future Imóveis** para vender lotes do **Condomínio Marbello**, em Paraipaba-CE, próximo à Praia da Lagoinha. A página é uma única rota (`/`) e conduz o visitante do contexto do empreendimento para o catálogo de lotes e, por fim, para uma conversa no WhatsApp.

Público principal: interessados em comprar lote no litoral do Ceará. Objetivo primário: gerar leads qualificados pelo WhatsApp; objetivo secundário: comunicar infraestrutura, escala regional e modelo de financiamento direto.

## Stack e comandos

- Next.js 14 (App Router), React 18 e TypeScript estrito.
- Tailwind CSS para estilos e tokens visuais.
- Framer Motion para animações; Lenis para rolagem suave; Lucide para ícones.
- Node.js 18.17 ou superior.

```bash
npm run dev        # desenvolvimento
npm run typecheck  # validação TypeScript
npm run build      # build de produção
```

Não versionar `.env.local`, `node_modules`, `.next` ou arquivos de build.

## Mapa da aplicação

| Local | Responsabilidade |
| --- | --- |
| `app/layout.tsx` | Metadados globais, idioma `pt-BR`, tema inicial, CSS e rolagem suave. |
| `app/page.tsx` | Ordem da landing page. |
| `app/globals.css` | Tokens CSS de cor, tema claro/escuro e estilos globais. |
| `components/layout/` | Elementos compartilhados de estrutura: header, logo, seletor de tema e Lenis. |
| `components/sections/` | Blocos da página: hero, catálogo, infraestrutura, prova/condições e CTA final. |
| `components/ui/lot-gallery.tsx` | Carrossel reutilizável dos cards de lote. |
| `data/lots.ts` | Fonte única do estoque exibido e das galerias dos lotes. |
| `config/site.ts` | Dados institucionais e geração de links do WhatsApp. |
| `lib/utils.ts` | Utilitário `cn` para composição de classes. |
| `public/brand/` | Logotipo público. |
| `public/media/` | Vídeo e imagens servidos diretamente pelo Next.js. |
| `docs/design-system.md` | Referência do sistema visual. |
| `docs/wireframe-future-imoveis.md` | Discovery, wireframe e requisitos de conteúdo/SEO. |

## Jornada e seções

1. **Header** (`components/layout/site-header.tsx`): navegação por âncoras, tema e CTA geral de WhatsApp.
2. **Hero** (`components/sections/hero-section.tsx`, âncora `#inicio`): proposta do Marbello e CTA para `#lotes`.
3. **Catálogo** (`components/sections/lots-catalog.tsx`, `#lotes`): vitrine de estoque. Cada botão cria mensagem específica do lote.
4. **Infraestrutura** (`components/sections/infrastructure-section.tsx`, `#infraestrutura`): lazer e itens técnicos.
5. **Condições/prova** (`components/sections/proof-section.tsx`, `#condicoes`): escala regional e financiamento direto.
6. **CTA final** (`components/sections/final-cta-section.tsx`, `#escolher-lote`): retorno ao catálogo ou contato geral.

## Onde mudar cada informação de negócio

| Informação | Arquivo | Observação |
| --- | --- | --- |
| Número do WhatsApp, domínio, CRECI e nome do projeto | `config/site.ts` | Use dígitos no número, com DDI/DDD. Todos os novos links devem usar `createWhatsAppLink`. |
| Lotes, preço, parcelas, destaque, disponibilidade e benefício | `data/lots.ts` | Atualizar sempre que o estoque comercial mudar. `status` aceita textos livres; “Últimas unidades” ganha destaque vermelho. |
| Fotos dos lotes | `data/lots.ts` + `public/media/lotes/` | Cadastre a URL pública iniciada por `/media/...`; mantenha `alt` descritivo. |
| Vídeo de fundo | `components/sections/hero-section.tsx` e `final-cta-section.tsx` | Hoje ambos usam o mesmo arquivo em `public/media/hero/`. Trocar os dois se a campanha exigir outro vídeo. |
| Imagens de infraestrutura | `components/sections/infrastructure-section.tsx` | Os caminhos esperados ficam em `public/media/infraestrutura/`. |
| Copy, CTAs e eventos de conversão | Componentes em `components/sections/` e `components/layout/site-header.tsx` | Preserve `data-conversion-event` ou atualize a instrumentação em conjunto. |
| SEO (title, description e Open Graph) | `app/layout.tsx` | O `h1` está no Hero; títulos das seções usam `h2`. |
| Cores, tema e tipografia | `app/globals.css` e `tailwind.config.ts` | Prefira tokens (`bg-paper`, `text-ink`, `text-red`) a valores novos. |

## Convenções de código

- Componentes de página ficam em `components/sections`; componentes de moldura em `components/layout`; componentes reutilizáveis e independentes em `components/ui`.
- Dados editáveis devem sair do JSX e ir para `data/`; configurações globais ficam em `config/`.
- Use `@/` nos imports internos.
- Componentes só devem ter `"use client"` se usarem estado, efeitos, eventos ou APIs do navegador.
- Respeite `prefers-reduced-motion`: os componentes animados existentes usam `useReducedMotion`.
- Para mídia nova, use nomes de arquivo simples (minúsculas, hífens, sem emoji/aspas) e WebP para imagens quando possível.

## Pendências conhecidas antes de publicar

- O WhatsApp em `config/site.ts` é um número de placeholder e precisa ser substituído pelo contato comercial real.
- As imagens de infraestrutura referenciadas ainda não existem em `public/media/infraestrutura/`; o componente exibe fallback visual enquanto isso.
- As imagens em `public/media/lotes/placeholders/` são temporárias. Substitua por imagens reais e atualize `data/lots.ts`.
- O menu possui a âncora `#faq`, mas não há seção de FAQ implementada. Remova o item ou implemente a seção antes da publicação.
- Os valores, disponibilidade e afirmações comerciais são conteúdo de campanha: validar com a equipe comercial antes de colocar o site em produção.

## Checklist para alterações frequentes

### Atualizar estoque

1. Edite `data/lots.ts`.
2. Confira preço, parcela, status e mensagem gerada para cada lote.
3. Execute `npm run typecheck` e `npm run build`.
4. Teste os CTAs em tela mobile e confirme a abertura do WhatsApp.

### Adicionar uma imagem ou vídeo

1. Coloque o arquivo na categoria adequada dentro de `public/media/`.
2. Use nome sem caracteres especiais (por exemplo, `vista-lote-14.webp`).
3. Atualize a referência no dado/componente correspondente e escreva `alt` que descreva a imagem e o local.
4. Verifique carregamento, fallback e contraste de texto sobre a mídia.

### Antes de entregar uma mudança

1. Rode `npm run typecheck`.
2. Rode `npm run build`.
3. Confira desktop e mobile, modo claro e escuro, âncoras e CTAs.
4. Não exponha variáveis de `.env.local` no cliente.
