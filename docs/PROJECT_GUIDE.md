# Guia do projeto — Future Imóveis

Este documento é a referência rápida para pessoas e assistentes de IA que mantêm esta aplicação. Leia-o antes de alterar conteúdo, ofertas, mídia ou conversão.

## O que é o site

Landing page mobile-first da **Future Imóveis** para vender lotes do **Condomínio Marbello**, em Paraipaba-CE, próximo à Praia da Lagoinha. A página é uma única rota (`/`) e conduz o visitante do contexto do empreendimento para o catálogo de lotes e, por fim, para uma conversa no WhatsApp.

Público principal: interessados em comprar lote no litoral do Ceará. Objetivo primário: gerar leads qualificados pelo WhatsApp; objetivo secundário: comunicar infraestrutura, escala regional e modelo de financiamento direto.

**Todo o conteúdo (textos, botões, fotos, vídeos e lotes) é editado pela cliente em `/admin`, não mais direto no código.** Veja a seção [Painel `/admin`](#painel-admin) abaixo.

## Stack e comandos

- Next.js 14 (App Router), React 18 e TypeScript estrito.
- Tailwind CSS para estilos e tokens visuais.
- Framer Motion para animações; Lenis para rolagem suave; Lucide para ícones.
- `zod` para validar os formulários do admin.
- Node.js 18.17 ou superior. Hospedado como processo Node persistente (`next start`), não serverless — por isso o conteúdo e os uploads podem ser gravados em disco.

```bash
npm run dev        # desenvolvimento
npm run typecheck  # validação TypeScript
npm run build      # build de produção
```

Não versionar `.env.local`, `node_modules`, `.next`, `data/store/` ou `public/uploads/` (conteúdo e mídia da cliente, gerados em runtime).

## Painel `/admin`

- Login único (usuário + senha) em `/admin/login`, protegido por `middleware.ts`. Credenciais iniciais vêm de `ADMIN_USERNAME`/`ADMIN_PASSWORD` no `.env.local`/ambiente do servidor; a cliente pode trocar a senha em `/admin/senha`.
- Conteúdo do site fica em `data/store/content.json` (criado automaticamente a partir de `lib/default-content.ts` na primeira execução). Mídia enviada pelo admin fica em `public/uploads/`.
- Cada seção pública tem uma tela equivalente no admin: `/admin/geral` (WhatsApp, CRECI, SEO), `/admin/hero`, `/admin/lotes` (+ `/admin/lotes/[id]` para fotos e detalhes de cada lote), `/admin/infraestrutura`, `/admin/condicoes`, `/admin/cta-final`.
- Textos que usam destaque em vermelho (título do Hero, por exemplo) aceitam `*palavra*` no formulário — vira `highlightWords` do componente `RevealText`.
- Se a cliente perder a senha: apague `data/store/auth.json` e reinicie o servidor para re-semear a partir das env vars.

## Mapa da aplicação

| Local | Responsabilidade |
| --- | --- |
| `app/layout.tsx` | Metadados globais (via `generateMetadata`, lê o conteúdo salvo), idioma `pt-BR`, tema inicial, CSS e rolagem suave. |
| `app/page.tsx` | Busca o conteúdo (`lib/content.ts`) e monta a ordem da landing page. |
| `app/globals.css` | Tokens CSS de cor, tema claro/escuro e estilos globais. |
| `app/admin/` | Painel administrativo: login, layout autenticado e uma rota por seção editável. |
| `components/layout/` | Elementos compartilhados de estrutura: header, logo, seletor de tema e Lenis. |
| `components/sections/` | Blocos da página pública — recebem o conteúdo via props, sem texto hardcoded. |
| `components/ui/lot-gallery.tsx` | Carrossel reutilizável dos cards de lote. |
| `components/admin/` | Peças reutilizáveis do painel: shell, campos de formulário, upload de imagem/vídeo, ações de lista (mover/excluir). |
| `lib/content-schema.ts` | Schemas `zod` + tipos de todo o conteúdo editável. |
| `lib/default-content.ts` | Conteúdo padrão (seed) usado na primeira execução. |
| `lib/content.ts` | Leitura/gravação do conteúdo do site. |
| `lib/store.ts` | Persistência em JSON (`data/store/`), com escrita atômica. |
| `lib/auth.ts` / `lib/session.ts` | Hash de senha e sessão do admin (cookie assinado). |
| `lib/uploads.ts` | Salvar/apagar arquivos em `public/uploads/`. |
| `lib/icons.ts` | Conjunto fixo de ícones selecionáveis no admin (infraestrutura). |
| `config/site.ts` | Helper `createWhatsAppLink`. |
| `public/brand/` | Logotipo público. |
| `public/media/` | Mídia original do projeto (vídeo/imagens de lançamento). |
| `public/uploads/` | Mídia enviada pela cliente via admin (fora do controle de versão). |
| `docs/design-system.md` | Referência do sistema visual. |
| `docs/wireframe-future-imoveis.md` | Discovery, wireframe e requisitos de conteúdo/SEO. |

## Jornada e seções

1. **Header** (`components/layout/site-header.tsx`): navegação por âncoras, tema e CTA geral de WhatsApp.
2. **Hero** (`components/sections/hero-section.tsx`, âncora `#inicio`): proposta do empreendimento e CTA para `#lotes`.
3. **Catálogo** (`components/sections/lots-catalog.tsx`, `#lotes`): vitrine de estoque. Cada botão cria mensagem específica do lote. Os cards se organizam automaticamente em linhas de 3 no desktop (grid CSS), qualquer quantidade de lotes.
4. **Infraestrutura** (`components/sections/infrastructure-section.tsx`, `#infraestrutura`): lazer e itens técnicos.
5. **Condições/prova** (`components/sections/proof-section.tsx`, `#condicoes`): escala regional e financiamento direto.
6. **CTA final** (`components/sections/final-cta-section.tsx`, `#escolher-lote`): retorno ao catálogo ou contato geral.

## Convenções de código

- Componentes de página ficam em `components/sections`; componentes de moldura em `components/layout`; componentes reutilizáveis e independentes em `components/ui`; peças do painel em `components/admin`.
- Seções públicas não têm mais texto/mídia hardcoded — tudo chega via props tipadas por `lib/content-schema.ts`. Ao adicionar um campo editável novo, atualize o schema, o `default-content.ts`, a seção pública, a action do admin e o formulário correspondente.
- Use `@/` nos imports internos.
- Componentes só devem ter `"use client"` se usarem estado, efeitos, eventos ou APIs do navegador.
- Respeite `prefers-reduced-motion`: os componentes animados existentes usam `useReducedMotion`.
- Formulários do admin usam Server Actions (`"use server"`) com validação `zod`; upload de imagem/vídeo usa `lib/uploads.ts` (tipo e tamanho validados) e nunca grava fora de `public/uploads/`.

## Checklist para alterações frequentes

### Atualizar conteúdo do site (textos, fotos, vídeos, lotes)

Feito pela cliente direto em `/admin`, sem precisar de deploy.

### Alterar a estrutura/design de uma seção (trabalho de código)

1. Ajuste o componente em `components/sections/`.
2. Se algum texto/mídia novo precisar ser editável, adicione o campo em `lib/content-schema.ts`, no seed (`lib/default-content.ts`) e no formulário/action do admin correspondente.
3. Execute `npm run typecheck` e `npm run build`.
4. Teste em `/admin` (salvar o formulário) e confira o reflexo em `/`.

### Antes de entregar uma mudança

1. Rode `npm run typecheck`.
2. Rode `npm run build`.
3. Confira desktop e mobile, modo claro e escuro, âncoras e CTAs.
4. Teste o login do admin, salvar cada seção e o upload de imagem/vídeo.
5. Não exponha variáveis de `.env.local` no cliente.
