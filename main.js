$(function () {

  /* PHOTO: show image if src is set, else show HK initials */
  var $img = $('#profileImg');
  var $initials = $('#photoInitials');
  function checkPhoto() {
    var src = $img.attr('src');
    if (src && src.trim() !== '') {
      $img.on('load', function () {
        $(this).addClass('loaded');
        $initials.hide();
      }).on('error', function () {
        $(this).removeClass('loaded');
        $initials.show();
      });
      if ($img[0].complete && $img[0].naturalWidth > 0) {
        $img.addClass('loaded');
        $initials.hide();
      }
    } else {
      $img.removeClass('loaded');
      $initials.show();
    }
  }
  checkPhoto();

  /* TYPED ANIMATION */
  var words = ['WordPress Sites', 'Laravel Applications', 'AI Automations', 'Custom Plugins', 'REST APIs', 'Real Solutions'];
  var wi = 0, ci = 0, deleting = false;
  var $el = $('#typed-el');
  function type() {
    var word = words[wi];
    if (!deleting) {
      $el.text(word.slice(0, ++ci));
      if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
      setTimeout(type, 85);
    } else {
      $el.text(word.slice(0, --ci));
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 350); return; }
      setTimeout(type, 55);
    }
  }
  type();

  /* HAMBURGER */
  var sidebarOpen = false;
  function openSidebar() {
    sidebarOpen = true;
    $('.hamburger').addClass('open');
    $('.sidebar').addClass('open');
    $('.overlay').addClass('show');
    $('body').css('overflow', 'hidden');
  }
  function closeSidebar() {
    sidebarOpen = false;
    $('.hamburger').removeClass('open');
    $('.sidebar').removeClass('open');
    $('.overlay').removeClass('show');
    $('body').css('overflow', '');
  }

  $('.hamburger').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    sidebarOpen ? closeSidebar() : openSidebar();
  });

  /* Close sidebar when overlay clicked */
  $('.overlay').on('click', function (e) {
    e.preventDefault();
    closeSidebar();
  });

  /* ACTIVE NAV ON SCROLL */
  var $sections = $('section[id]');
  $(window).on('scroll.nav', function () {
    var scrollY = $(this).scrollTop();
    $sections.each(function () {
      var top = $(this).offset().top - 120;
      var bottom = top + $(this).outerHeight();
      if (scrollY >= top && scrollY < bottom) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + this.id + '"]').addClass('active');
      }
    });
  });

  /* SMOOTH NAV CLICK — close sidebar FIRST, then scroll */
  $(document).on('click', '.nav-link', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if (!target || target === '#') return;

    /* On mobile: close sidebar first, then scroll after transition */
    if ($(window).width() < 900) {
      closeSidebar();
      setTimeout(function () {
        var $t = $(target);
        if ($t.length) {
          $('html,body').animate({ scrollTop: $t.offset().top - 20 }, 500, 'swing');
        }
      }, 320); /* wait for sidebar slide-out transition (300ms) */
    } else {
      var $t = $(target);
      if ($t.length) {
        $('html,body').animate({ scrollTop: $t.offset().top - 20 }, 500, 'swing');
      }
    }
  });

  /* SCROLL REVEAL */
  function checkReveal() {
    var wh = $(window).height();
    var st = $(window).scrollTop();
    $('.reveal, .reveal-l').each(function () {
      if ($(this).offset().top < st + wh - 60) {
        $(this).addClass('show');
      }
    });
  }
  $(window).on('scroll.reveal resize', checkReveal);
  checkReveal();

  /* SKILL BARS */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var $f = $(e.target);
          $f.css('width', $f.data('w') + '%');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    $('.sk-fill').each(function () { io.observe(this); });
  } else {
    $('.sk-fill').each(function () { $(this).css('width', $(this).data('w') + '%'); });
  }

  /* PARTICLES */
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: '#7c3aed' },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.05 } },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 140, color: '#7c3aed', opacity: 0.15, width: 1 },
        move: { enable: true, speed: 0.8, random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  /* REACT: Other Tech Badges */
  if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
    var SkillBadges = function (props) {
      return React.createElement('div', { className: 'badges' },
        props.items.map(function (item, i) {
          return React.createElement('span', { className: 'badge', key: i }, item);
        })
      );
    };
    var skillsData = ['AI Automation', 'Git / GitHub', 'Postman', 'VS Code', 'Python', 'Java', 'C', 'Flutter', 'OOPs', 'MVC', 'CRUD', 'Responsive Design'];
    var mountEl = document.getElementById('react-badges-mount');
    if (mountEl) {
      ReactDOM.render(React.createElement(SkillBadges, { items: skillsData }), mountEl);
    }
  }

  /* CONTACT FORM — jQuery AJAX simulation */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var fname = $('#fname').val().trim();
    var femail = $('#femail').val().trim();
    var fmessage = $('#fmessage').val().trim();

    if (!fname || !femail || !fmessage) {
      $('#fname, #femail, #fmessage').each(function () {
        if (!$(this).val().trim()) {
          $(this).css('border-color', '#ef4444');
        }
      });
      return;
    }

    var $btn = $('.btn-submit');
    $btn.html('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...').prop('disabled', true);

    /* Simulated AJAX send — replace with real endpoint if needed */
    $.ajax({
      url: 'https://httpbin.org/post',
      method: 'POST',
      data: { name: fname, email: femail, message: fmessage },
      timeout: 5000
    }).always(function () {
      $btn.html('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><polyline points="20 6 9 17 4 12"/></svg> Message sent!').css('background', '#10b981');
      $('#formSuccess').fadeIn();
      $('#contactForm input, #contactForm textarea').val('').css('border-color', '');
      setTimeout(function () {
        $btn.html('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send message').css('background', '').prop('disabled', false);
        $('#formSuccess').fadeOut();
      }, 4000);
    });
  });
$(function () {

  /* ── PHOTO ── */
  var $img = $('#profileImg');
  var $initials = $('#photoInitials');
  if ($img.attr('src') && $img.attr('src').trim() !== '') {
    $img[0].onload = function () { $img.addClass('loaded'); $initials.hide(); };
    $img[0].onerror = function () { $initials.show(); };
    if ($img[0].complete && $img[0].naturalWidth > 0) { $img.addClass('loaded'); $initials.hide(); }
  } else {
    $initials.show();
  }

  /* ── TYPED ── */
  var words = ['WordPress Sites','Laravel Applications','AI Automations','Custom Plugins','REST APIs','Real Solutions'];
  var wi = 0, ci = 0, del = false;
  function type() {
    var w = words[wi];
    if (!del) {
      $('#typed-el').text(w.slice(0, ++ci));
      if (ci === w.length) { del = true; setTimeout(type, 1800); return; }
      setTimeout(type, 85);
    } else {
      $('#typed-el').text(w.slice(0, --ci));
      if (ci === 0) { del = false; wi = (wi+1) % words.length; setTimeout(type, 350); return; }
      setTimeout(type, 55);
    }
  }
  type();

  /* ── SIDEBAR OPEN/CLOSE ── */
  function openSidebar() {
    $('.hamburger').addClass('open');
    $('.sidebar').addClass('open');
    $('.overlay').addClass('show');
    $('body').addClass('no-scroll');
  }
  function closeSidebar() {
    $('.hamburger').removeClass('open');
    $('.sidebar').removeClass('open');
    $('.overlay').removeClass('show');
    $('body').removeClass('no-scroll');
  }

  $('.hamburger').on('click', function (e) {
    e.stopPropagation();
    $('.sidebar').hasClass('open') ? closeSidebar() : openSidebar();
  });

  $('.overlay').on('click', function () { closeSidebar(); });

  /* ── NAV LINKS ── */
  // Direct click on each nav link — no delegation issues
  $('.nav-link').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var href = $(this).attr('href');
    var $target = $(href);
    if (!$target.length) return;

    var scrollTo = $target.offset().top - 20;

    if ($('.sidebar').hasClass('open')) {
      // Close sidebar first, then scroll after animation finishes
      closeSidebar();
      setTimeout(function () {
        $('html, body').stop(true).animate({ scrollTop: scrollTo }, 600);
      }, 350);
    } else {
      $('html, body').stop(true).animate({ scrollTop: scrollTo }, 600);
    }
  });

  /* ── ACTIVE NAV ON SCROLL ── */
  $(window).on('scroll', function () {
    var st = $(this).scrollTop();
    $('section[id]').each(function () {
      var top = $(this).offset().top - 150;
      var bot = top + $(this).outerHeight();
      if (st >= top && st < bot) {
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#' + this.id + '"]').addClass('active');
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  function reveal() {
    var st = $(window).scrollTop(), wh = $(window).height();
    $('.reveal, .reveal-l').each(function () {
      if ($(this).offset().top < st + wh - 60) $(this).addClass('show');
    });
  }
  $(window).on('scroll resize', reveal);
  reveal();

  /* ── SKILL BARS ── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          $(e.target).css('width', $(e.target).data('w') + '%');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    $('.sk-fill').each(function () { io.observe(this); });
  } else {
    $('.sk-fill').each(function () { $(this).css('width', $(this).data('w') + '%'); });
  }

  /* ── PARTICLES ── */
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50, density: { enable: true, value_area: 900 } },
        color: { value: '#7c3aed' },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 140, color: '#7c3aed', opacity: 0.12, width: 1 },
        move: { enable: true, speed: 0.7, random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.3 } }, push: { particles_nb: 3 } }
      },
      retina_detect: true
    });
  }

  /* ── REACT BADGES ── */
  if (typeof React !== 'undefined' && typeof ReactDOM !== 'undefined') {
    var el = document.getElementById('react-badges-mount');
    if (el) {
      var items = ['AI Automation','Git / GitHub','Postman','VS Code','Python','Java','C','Flutter','OOPs','MVC','CRUD','Responsive Design'];
      ReactDOM.render(
        React.createElement('div', { className: 'badges' },
          items.map(function (item, i) {
            return React.createElement('span', { className: 'badge', key: i }, item);
          })
        ), el
      );
    }
  }

  /* ── CONTACT FORM ── */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var ok = true;
    $('#fname, #femail, #fmessage').each(function () {
      if (!$(this).val().trim()) { $(this).css('border-color','#ef4444'); ok = false; }
    });
    if (!ok) return;

    var $btn = $('.btn-submit');
    $btn.text('Sending...').prop('disabled', true);

    setTimeout(function () {
      $btn.text('Message sent! ✓').css('background','#10b981');
      $('#formSuccess').fadeIn();
      $('#contactForm input, #contactForm textarea').val('').css('border-color','');
      setTimeout(function () {
        $btn.text('Send message').css('background','').prop('disabled', false);
        $('#formSuccess').fadeOut();
      }, 4000);
    }, 1000);
  });

  $('input, textarea').on('input', function () { $(this).css('border-color',''); });

});

  /* Reset input red border on type */
  $('input, textarea').on('input', function () {
    $(this).css('border-color', '');
  });

});
