(function () {
  'use strict';
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header sólido ao rolar */
  var topo = document.querySelector('.topo');
  function onScroll() {
    if (topo) topo.classList.toggle('is-solid', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Parallax leve na foto da hero */
  var heroImg = document.querySelector('.hero .laje__img img');
  if (heroImg && !reduz) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        heroImg.style.transform = 'translate3d(0,' + (y * -0.08) + 'px,0)';
        tick = false;
      });
    }, { passive: true });
  }

  /* Scroll reveal */
  var els = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    els.forEach(function (el, i) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = d + 'ms';
      io.observe(el);
    });
  } else {
    els.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Vídeos das obras: tocam só quando aparecem na tela */
  var videos = document.querySelectorAll('video[data-autoplay]');
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduz) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.35 });
    videos.forEach(function (v) { vio.observe(v); });
  }

  /* FAQ: abre um por vez */
  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Formulário ---------- */
  var form = document.getElementById('form-orcamento');
  if (!form) return;
  var btn = form.querySelector('button[type="submit"]');
  var tel = form.querySelector('#f-whatsapp');
  var comecou = false;

  tel.addEventListener('input', function () {
    var n = tel.value.replace(/\D/g, '').slice(0, 11);
    var out = n;
    if (n.length > 2) out = '(' + n.slice(0, 2) + ') ' + n.slice(2);
    if (n.length > 7) out = '(' + n.slice(0, 2) + ') ' + n.slice(2, 7) + '-' + n.slice(7);
    tel.value = out;
  });

  function valida() { btn.disabled = !form.checkValidity(); }
  ['input', 'change'].forEach(function (ev) {
    form.addEventListener(ev, function (e) {
      if (!comecou) { comecou = true; window.qh4Track('form_start', { form_id: 'orcamento' }); }
      var t = e.target;
      if (t && t.matches && t.matches('input, select') && t.dataset.tocado) t.classList.toggle('is-invalid', !t.checkValidity());
      valida();
    });
  });
  form.querySelectorAll('input, select').forEach(function (el) {
    el.addEventListener('blur', function () {
      el.dataset.tocado = '1';
      el.classList.toggle('is-invalid', !el.checkValidity());
    });
  });
  valida();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var c = window.QH4_CONFIG;
    var dados = {
      nome: form.nome.value.trim(),
      whatsapp: form.whatsapp.value.trim(),
      cidade: form.cidade.value,
      ambiente: form.ambiente.value,
      momento: form.momento.value,
      detalhes: form.detalhes.value.trim(),
      origem: location.href,
      data: new Date().toLocaleString('pt-BR')
    };
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Enviando...';
    window.qh4Track('generate_lead', { form_id: 'orcamento', cidade: dados.cidade, ambiente: dados.ambiente, momento: dados.momento });

    if (c.webhookUrl) {
      var body = new URLSearchParams(dados);
      fetch(c.webhookUrl, { method: 'POST', mode: 'no-cors', body: body })
        .catch(function () {})
        .finally(function () {
          try { sessionStorage.setItem('troya_lead', '1'); } catch (err) {}
          location.href = 'obrigado.html';
        });
      return;
    }

    var msg = 'Olá! Quero um orçamento com a Troya Marmoraria.\n\n' +
      '*Nome:* ' + dados.nome + '\n' +
      '*WhatsApp:* ' + dados.whatsapp + '\n' +
      '*Cidade:* ' + dados.cidade + '\n' +
      '*Ambiente:* ' + dados.ambiente + '\n' +
      '*Momento da obra:* ' + dados.momento +
      (dados.detalhes ? '\n*Detalhes:* ' + dados.detalhes : '');
    location.href = window.qh4WaLink(msg);
    setTimeout(function () {
      btn.querySelector('span').textContent = 'Pedir orçamento pelo WhatsApp';
      valida();
    }, 2500);
  });
})();
