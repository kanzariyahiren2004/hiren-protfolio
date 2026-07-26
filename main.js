$(function () {

  /* ── PHOTO ── */
  var src = $('#profileImg').attr('src');
  if (src && src.trim() !== '') {
    $('#profileImg').on('load', function(){ $(this).addClass('loaded'); $('#photoInitials').hide(); });
    if ($('#profileImg')[0].complete) { $('#profileImg').addClass('loaded'); $('#photoInitials').hide(); }
  }

  /* ── TYPED ── */
  var words = ['WordPress Sites','Laravel Applications','AI Automations','Custom Plugins','REST APIs','Real Solutions'];
  var wi=0, ci=0, del=false;
  function type(){
    var w=words[wi];
    if(!del){ $('#typed-el').text(w.slice(0,++ci)); if(ci===w.length){del=true;setTimeout(type,1800);return;} setTimeout(type,85); }
    else{ $('#typed-el').text(w.slice(0,--ci)); if(ci===0){del=false;wi=(wi+1)%words.length;setTimeout(type,350);return;} setTimeout(type,55); }
  }
  type();

  /* ── HAMBURGER ── */
  $('.hamburger').on('click', function(e){
    e.stopPropagation();
    var isOpen = $('.sidebar').hasClass('open');
    if(isOpen){
      $('.sidebar').removeClass('open');
      $('.hamburger').removeClass('open');
      $('body').removeClass('no-scroll');
    } else {
      $('.sidebar').addClass('open');
      $('.hamburger').addClass('open');
      $('body').addClass('no-scroll');
    }
  });

  /* Close sidebar when clicking OUTSIDE sidebar (on main content) */
  $(document).on('click', function(e){
    if( $('.sidebar').hasClass('open') &&
        !$(e.target).closest('.sidebar').length &&
        !$(e.target).closest('.hamburger').length ){
      $('.sidebar').removeClass('open');
      $('.hamburger').removeClass('open');
      $('body').removeClass('no-scroll');
    }
  });

  /* ── NAV LINKS — plain direct scroll ── */
  $('.nav-link').each(function(){
    $(this).on('click', function(e){
      e.preventDefault();
      e.stopPropagation();
      var id = $(this).attr('href');
      var $sec = $(id);
      if(!$sec.length) return;

      /* Close sidebar */
      $('.sidebar').removeClass('open');
      $('.hamburger').removeClass('open');
      $('body').removeClass('no-scroll');

      /* Scroll after sidebar closes */
      setTimeout(function(){
        var top = $sec.offset().top - 10;
        $('html,body').animate({scrollTop: top}, 500);
      }, 320);
    });
  });

  /* ── ACTIVE NAV ── */
  $(window).on('scroll', function(){
    var st = $(this).scrollTop();
    $('section[id]').each(function(){
      var top = $(this).offset().top - 160;
      var bot = top + $(this).outerHeight();
      if(st >= top && st < bot){
        $('.nav-link').removeClass('active');
        $('.nav-link[href="#'+this.id+'"]').addClass('active');
      }
    });
  });

  /* ── SCROLL REVEAL ── */
  function doReveal(){
    var st=$(window).scrollTop(), wh=$(window).height();
    $('.reveal,.reveal-l').each(function(){
      if($(this).offset().top < st+wh-60) $(this).addClass('show');
    });
  }
  $(window).on('scroll resize', doReveal);
  doReveal();

  /* ── SKILL BARS ── */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ $(e.target).css('width',$(e.target).data('w')+'%'); io.unobserve(e.target); }
      });
    },{threshold:0.3});
    $('.sk-fill').each(function(){io.observe(this);});
  } else {
    $('.sk-fill').each(function(){$(this).css('width',$(this).data('w')+'%');});
  }

  /* ── PARTICLES ── */
  if(typeof particlesJS!=='undefined'){
    particlesJS('particles-js',{
      particles:{
        number:{value:50,density:{enable:true,value_area:900}},
        color:{value:'#7c3aed'},shape:{type:'circle'},
        opacity:{value:0.3,random:true},size:{value:2,random:true},
        line_linked:{enable:true,distance:140,color:'#7c3aed',opacity:0.12,width:1},
        move:{enable:true,speed:0.7,random:true,out_mode:'out'}
      },
      interactivity:{
        detect_on:'canvas',
        events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'}},
        modes:{grab:{distance:140,line_linked:{opacity:0.3}},push:{particles_nb:3}}
      },
      retina_detect:true
    });
  }

  /* ── REACT BADGES ── */
  if(typeof React!=='undefined' && typeof ReactDOM!=='undefined'){
    var el=document.getElementById('react-badges-mount');
    if(el){
      var items=['AI Automation','Git / GitHub','Postman','VS Code','Python','Java','C','Flutter','OOPs','MVC','CRUD','Responsive Design'];
      ReactDOM.render(React.createElement('div',{className:'badges'},
        items.map(function(item,i){return React.createElement('span',{className:'badge',key:i},item);})),el);
    }
  }

  /* ── CONTACT FORM ── */
  $('#contactForm').on('submit',function(e){
    e.preventDefault();
    var ok=true;
    $('#fname,#femail,#fmessage').each(function(){
      if(!$(this).val().trim()){$(this).css('border-color','#ef4444');ok=false;}
    });
    if(!ok) return;
    var $btn=$('.btn-submit');
    $btn.text('Sending...').prop('disabled',true);
    setTimeout(function(){
      $btn.text('Sent ✓').css('background','#10b981');
      $('#formSuccess').fadeIn();
      $('#contactForm input,#contactForm textarea').val('').css('border-color','');
      setTimeout(function(){$btn.text('Send message').css('background','').prop('disabled',false);$('#formSuccess').fadeOut();},4000);
    },1000);
  });
  $('input,textarea').on('input',function(){$(this).css('border-color','');});

});
