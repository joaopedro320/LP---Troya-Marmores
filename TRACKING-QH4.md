# Rastreamento QH4 | Troya Marmoraria

Os slots são iguais em `index.html`, `obrigado.html` e `404.html`. Procure por `[QH4 SLOT` no código.

| Slot | Onde fica | O que colar |
|---|---|---|
| 1 | `<head>`, no topo | Script do Google Tag Manager |
| 2 | `<head>` | Verificações de domínio (Meta, Search Console) |
| 3 | `<head>` | Meta Pixel direto, **só se não usar GTM** |
| 4 | `<head>` | gtag.js do Google Ads / GA4 direto, **só se não usar GTM** |
| 5 | logo após `<body>` | `<noscript>` do GTM |
| 6 | antes de `</body>` | Scripts de terceiros (Clarity, Hotjar, chat) |
| 7 | `assets/js/tracking.js` | Configuração: WhatsApp, webhook, IDs e rótulos de conversão |
| 8 | `obrigado.html`, script final | Conversão da página de obrigado (snippet extra, se precisar) |

## Configuração (slot 7)

Arquivo `assets/js/tracking.js`, objeto `window.QH4_CONFIG`:

- `whatsapp`: `5519974208114` (número do briefing)
- `webhookUrl`: URL do Google Apps Script. **Hoje está vazio.**
  - Vazio: o formulário monta a mensagem com todos os campos e abre o WhatsApp direto.
  - Preenchido: envia os dados pro Apps Script (POST `application/x-www-form-urlencoded`), abre `obrigado.html` e redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- `redirectDelay`: tempo na página de obrigado antes de abrir o WhatsApp (3,5 s)
- `googleAdsId`, `googleAdsLeadLabel`, `metaPixelId`: só para uso sem GTM

Campos enviados pro webhook: `nome`, `whatsapp`, `cidade`, `ambiente`, `momento`, `detalhes`, `origem`, `data`.

## Eventos no dataLayer

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | Clique em qualquer botão de WhatsApp | `wa_local`: `header`, `hero`, `faq`, `orcamento`, `rodape`, `flutuante`, `obrigado`, `404` |
| `form_start` | Primeira interação com o formulário | `form_id: orcamento` |
| `generate_lead` | Envio válido do formulário | `form_id`, `cidade`, `ambiente`, `momento` |
| `thank_you_view` | Carregamento de `obrigado.html` | `veio_do_form` (true/false) |

Todos levam `cliente: Troya Marmoraria`.

## Sugestão de configuração no GTM

- Conversão principal Google Ads: `generate_lead` (ou `thank_you_view`, se usar webhook)
- Conversão secundária: `whatsapp_click`
- Meta: `Lead` em `generate_lead`, `Contact` em `whatsapp_click`

Sem GTM, com gtag e Pixel nos slots 3 e 4, o `tracking.js` já dispara `conversion` (Google Ads) e `Lead`/`Contact` (Meta) sozinho.
