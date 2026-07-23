# Plano de mensuração

O `dataLayer` é a fonte canônica. Todo evento contém `event`, `page_path`,
`page_location` e `event_timestamp`, além dos parâmetros específicos abaixo.

| Evento | Quando dispara | Parâmetros principais |
| --- | --- | --- |
| `page_view` | carregamento da página pública | `page_title`, `referrer` |
| `scroll_depth` | uma vez em 25, 50, 75, 90 e 100% | `percent_scrolled` |
| `section_view` | seção ocupa ao menos 50% da viewport | `section_id` |
| `button_click` | clique genérico em link ou botão | texto, tipo, seção e URL |
| `navigation_click` | menu principal | texto, seção e URL |
| `view_lots` | CTA que leva ao catálogo | `cta_location` |
| `gallery_view` | troca de imagem de um lote | lote, índice, total, rótulo e interação |
| `generate_lead` | saída para WhatsApp | lote (quando houver), URL e posição do CTA |

## Configuração

Os IDs ficam em **Admin → Rastreamento**. Campos vazios não carregam scripts.
É possível usar GTM ou as integrações diretas. Se GA4/Google Ads forem
configurados dentro do GTM, os mesmos IDs não devem ser repetidos nos campos
diretos, evitando contagem duplicada.

No GTM, use acionadores de **Evento personalizado** com os nomes da tabela. As
variáveis podem ser lidas diretamente das chaves do `dataLayer`.

## Exemplo

```js
{
  event: "generate_lead",
  lot_id: "lot-2",
  lot_name: "Lote 06 — Quadra D",
  cta_location: "lot_card",
  link_url: "https://wa.me/...",
  page_path: "/"
}
```
