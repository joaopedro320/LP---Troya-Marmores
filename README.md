# LP Troya Marmoraria

Landing page da Troya Marmoraria (Conchal/SP), cliente QH4 Growth. Produto High Ticket Stones + Social Media Orbia Plano 1. Contrato de 23/10/2026 a 23/04/2027.

## Estrutura

```
lp-troya-marmoraria/
├── index.html          LP principal
├── obrigado.html       Página de obrigado (redireciona pro WhatsApp)
├── 404.html            Página de erro personalizada
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json         Cache dos assets e headers de segurança
├── README.md
├── TRACKING-QH4.md     Slots de GTM/Pixel e eventos
└── assets/
    ├── css/style.css
    ├── js/tracking.js  Configuração (WhatsApp, webhook, IDs)
    ├── js/main.js      Animações, vídeos, FAQ e formulário
    ├── img/            Fotos (webp), logo, ícones e imagem OG
    └── video/          2 vídeos curtos de obra (mp4 sem áudio)
```

## Como publicar na Vercel

1. Descompacte o zip.
2. Na Vercel: Add New > Project > arraste a pasta (ou suba num repositório e importe).
3. Framework Preset: **Other**. Sem build command. Output: raiz.
4. Deploy. O `404.html` e o `vercel.json` já são lidos automaticamente.
5. Em Settings > Domains, ligue o domínio do cliente.

## Pendências antes de publicar

- [ ] **Domínio**: o briefing não tem site. Usei `https://www.marmorariatroya.com.br` como provisório em canonical, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`. Trocar em todos se o domínio for outro (buscar por `marmorariatroya.com.br`).
- [ ] **GTM / Pixel / Google Ads**: colar nos slots (ver `TRACKING-QH4.md`).
- [ ] **Webhook do formulário**: se for usar Apps Script, colar a URL em `assets/js/tracking.js` (`webhookUrl`). Sem ela, o formulário manda tudo direto pro WhatsApp.
- [ ] **WhatsApp**: conferido com o briefing, (19) 97420-8114.
- [ ] **Instagram da QH4** no rodapé: link em `https://www.instagram.com/qh4growth/`. Conferir se é o @ certo.
- [x] **Fotos da fábrica**: trocadas pelas fotos enviadas pelo cliente (máquina CNC `maquina-cnc.webp` e barracão `barracao-troya.webp`).
- [ ] **Endereço completo**: não está no briefing. O JSON-LD tem só Conchal/SP. Quando tiver o endereço do barracão, completar `address` (e dá pra incluir o mapa).

## Fonte do conteúdo

Tudo veio do briefing do formulário, do resumo do contrato e da pasta do cliente. Nada inventado.

- 12 anos de mercado, fundada por Alisson e a esposa Viviane
- Conchal/SP; foco em Conchal, Limeira, Araras e Mogi Guaçu
- CNC, barracão novo com estoque, máquina automática de 45º, material importado de alto padrão
- Instalação própria como diferencial ("muitas não fazem")
- Do acabamento à instalação final
- Prioridade para cliente com urgência, adiantando parte do serviço na mesma semana
- Atendimento das 7h às 18h (o briefing não diz os dias, por isso não coloquei)
- Paleta preto e dourado, fundo mesclado, sem fonte pedida (Poppins + Inter, padrão QH4)
- Posicionamento marcado: alto luxo, acessível e sério/formal

**Fotos:** usei só as que parecem obra real da Troya (posts de 2021 em diante, com cenário de obra ou do barracão) e frames/trechos dos vídeos. Os posts de abril/2020 (banheiros e cozinhas com cara de foto de revista) ficaram de fora porque o briefing diz que o Instagram tem "imagens muito editadas" e não dá pra garantir que são obras dele. Se o Alisson confirmar, dá pra incluir no mosaico.

**Ficou de fora de propósito:** faturamento, ticket médio, taxa de conversão, valor do investimento nas máquinas e nota do Google (4,3 com 16 avaliações). Depoimentos: o briefing cita "cliente arquiteta" mas sem texto, então não tem seção de depoimentos. Quando chegar avaliação real, entra.

## Eventos de rastreamento

`whatsapp_click` (com `wa_local`), `form_start`, `generate_lead`, `thank_you_view`. Detalhes em `TRACKING-QH4.md`.

## Checklist de SEO

- [x] Title e meta description com cidade e nicho ("Marmoraria em Conchal")
- [x] H1 com "Marmoraria" e "perto de você"
- [x] JSON-LD `HomeAndConstructionBusiness` (cidades atendidas, CNPJ, Instagram) + `FAQPage`
- [x] Open Graph completo + Twitter Card (imagem 1200x630)
- [x] Canonical
- [x] `robots.txt` (bloqueia `obrigado.html`) e `sitemap.xml`
- [x] `site.webmanifest` + favicons
- [x] `width`/`height` em todas as imagens (CLS) e `preload` da imagem da hero
- [x] Imagens em webp, lazy load fora da primeira dobra, vídeos só carregam ao aparecer
- [x] Página 404 personalizada e página de obrigado com `noindex`
- [x] Botão de envio desabilitado até todos os campos obrigatórios estarem válidos
- [x] Botão flutuante de WhatsApp no canto direito
- [x] `prefers-reduced-motion` respeitado

Desenvolvido pro QH4 Growth.
