/* ==========================================================================
   [QH4 SLOT 7] CONFIGURAÇÃO DE RASTREAMENTO E CONTATO
   Edite só este bloco. Ele é carregado em index.html, obrigado.html e 404.html.
   Detalhes completos em TRACKING-QH4.md
   ========================================================================== */
window.QH4_CONFIG = {
  cliente: 'Troya Marmoraria',

  // WhatsApp que recebe os leads (só números, com 55 + DDD)
  whatsapp: '5519974208114',

  // Mensagem padrão dos botões de WhatsApp
  mensagemPadrao: 'Olá! Vim pelo site da Troya Marmoraria e quero um orçamento.',

  // Frase adicionada ao final de TODAS as mensagens de WhatsApp (botões e formulário)
  sufixoMensagem: '(Não apague essa mensagem para ter atendimento prioritário)',

  // Mensagem enviada depois do formulário quando existe webhook (padrão QH4)
  mensagemPosFormulario: 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.',

  // URL do Google Apps Script (webhook do formulário).
  // Vazio = o formulário monta a mensagem completa e manda direto pro WhatsApp.
  // Preenchido = envia pro Apps Script, abre obrigado.html e redireciona pro WhatsApp.
  webhookUrl: '',

  // Tempo (ms) na página de obrigado antes de abrir o WhatsApp
  redirectDelay: 3500,

  // Rótulos de conversão (preencher quando usar gtag direto, sem GTM)
  googleAdsId: '',          // ex.: 'AW-1234567890'
  googleAdsLeadLabel: '',   // ex.: 'AbCdEfGhIjk'
  metaPixelId: ''           // ex.: '123456789012345'
};

/* ==========================================================================
   Eventos padronizados QH4 (dataLayer)
   whatsapp_click (wa_local) | form_start | generate_lead | thank_you_view
   ========================================================================== */
window.dataLayer = window.dataLayer || [];
window.qh4Track = function (event, params) {
  var payload = Object.assign({ event: event, cliente: window.QH4_CONFIG.cliente }, params || {});
  window.dataLayer.push(payload);

  // Disparos diretos opcionais (só funcionam se gtag/fbq estiverem nos slots 3 e 4)
  try {
    if (event === 'generate_lead' || event === 'thank_you_view') {
      var c = window.QH4_CONFIG;
      if (typeof window.gtag === 'function' && c.googleAdsId && c.googleAdsLeadLabel) {
        window.gtag('event', 'conversion', { send_to: c.googleAdsId + '/' + c.googleAdsLeadLabel });
      }
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');
    }
    if (event === 'whatsapp_click' && typeof window.fbq === 'function') {
      window.fbq('track', 'Contact');
    }
  } catch (e) { /* rastreamento nunca pode travar a página */ }
};

window.qh4WaLink = function (texto) {
  var c = window.QH4_CONFIG;
  var msg = texto || c.mensagemPadrao;
  if (c.sufixoMensagem) msg += '\n\n' + c.sufixoMensagem;
  return 'https://wa.me/' + c.whatsapp + '?text=' + encodeURIComponent(msg);
};

/* Liga todos os links com data-wa (href + evento com o local do clique) */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', window.qh4WaLink(el.getAttribute('data-wa-msg')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    el.addEventListener('click', function () {
      window.qh4Track('whatsapp_click', { wa_local: el.getAttribute('data-wa') });
    });
  });
});
