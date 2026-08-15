function openMenu() {
  $('#menu').addClass('show');
  $('#menuBackdrop').addClass('show');
  $('.menu-toggle').attr('aria-expanded', 'true');
  $('body').addClass('nav-open');
}

function closeMenu() {
  $('#menu').removeClass('show');
  $('#menuBackdrop').removeClass('show');
  $('.menu-toggle').attr('aria-expanded', 'false');
  $('body').removeClass('nav-open');
}

function toggleMenu() {
  if ($('#menu').hasClass('show')) {
    closeMenu();
  } else {
    openMenu();
  }
}

$(function () {
  $(document).on('click', function (event) {
    const $menu = $('#menu');
    const $button = $('.menu-toggle');
    const clickedOutside =
      !$menu.is(event.target) && $menu.has(event.target).length === 0 &&
      !$button.is(event.target) && $button.has(event.target).length === 0;

    if (clickedOutside && $menu.hasClass('show')) {
      closeMenu();
    }
  });

  $('#menuBackdrop').on('click', closeMenu);

  $('#menu a').on('click', closeMenu);

  // Modais (contato e feedback)
  const $body = $('body');
  const $modals = $('.modal-overlay');

  function openModal($modal) {
    $modal.addClass('show').attr('aria-hidden', 'false');
    $body.addClass('modal-open');
  }

  function closeModal($modal) {
    $modal.removeClass('show').attr('aria-hidden', 'true');
    $body.removeClass('modal-open');
  }

  const $contactModal = $('#contactModal');
  const $feedbackModal = $('#feedbackModal');

  $('#open-contact-modal').on('click', function () {
    openModal($contactModal);
  });
  $('#closeContactModal').on('click', function () {
    closeModal($contactModal);
  });
  $('#closeFeedbackModal, #feedbackOk').on('click', function () {
    closeModal($feedbackModal);
  });

  $modals.on('click', function (e) {
    if (e.target === this) closeModal($(this));
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
      if ($('#menu').hasClass('show')) closeMenu();
      $modals.filter('.show').each(function () {
        closeModal($(this));
      });
    }
  });

  function showFeedback(icon, titulo, texto) {
    $('#feedbackIcon').text(icon);
    $('#feedbackModalTitle').text(titulo);
    $('#feedbackText').text(texto);
    openModal($feedbackModal);
  }

  // Formulário de contato
  const $form = $('#contactModal form');
  if ($form.length) {
    $form.on('submit', function (e) {
      e.preventDefault();

      const dados = {
        nome: $form.find('[name="nome"]').val(),
        email: $form.find('[name="email"]').val(),
        conteudo: $form.find('[name="mensagem"]').val()
      };

      $.ajax({
        url: 'save_message.php',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dados)
      })
        .done(function (resultado) {
          $form.trigger('reset');
          closeModal($contactModal);
          showFeedback('✅', 'Mensagem enviada!', resultado.mensagem);
        })
        .fail(function () {
          closeModal($contactModal);
          showFeedback('⚠️', 'Ops, algo deu errado', 'Não foi possível enviar sua mensagem. Tente novamente.');
        });
    });
  }

  // Revela seções e cards de habilidades ao rolar a página
  const $reveals = $('#sobre, #habilidades, #contato, .skill-card');
  $reveals.addClass('reveal');

  function checkReveal() {
    const windowBottom = $(window).scrollTop() + $(window).height();

    $reveals.each(function () {
      const $el = $(this);
      if ($el.hasClass('is-visible')) return;

      const elTop = $el.offset().top + 60;
      if (windowBottom > elTop) {
        $el.addClass('is-visible');
      }
    });
  }

  $(window).on('scroll resize', checkReveal);
  checkReveal();

  // Efeito de digitação no nome do hero
  const $typewriter = $('#typewriterName');
  if ($typewriter.length) {
    const fullText = $typewriter.text();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      $typewriter.text(fullText);
    } else {
      $typewriter.text('');
      let i = 0;

      setTimeout(function typeNextChar() {
        i += 1;
        $typewriter.text(fullText.slice(0, i));
        if (i < fullText.length) {
          setTimeout(typeNextChar, 90);
        }
      }, 400);
    }
  }
});

let currentFontSizeRem = 1.0;

function changeFontSize(step) {
  const $content = $('#sobre');
  if (!$content.length) return;

  currentFontSizeRem += step;

  if (currentFontSizeRem < 0.8) currentFontSizeRem = 0.8;
  if (currentFontSizeRem > 2.5) currentFontSizeRem = 2.5;

  $content.css('font-size', `${currentFontSizeRem}rem`);
}

function resetFontSize() {
  const $content = $('#sobre');
  if (!$content.length) return;

  currentFontSizeRem = 1.0;
  $content.css('font-size', '1rem');
}
