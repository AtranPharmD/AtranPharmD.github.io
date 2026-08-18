
(function(){
  var overlay = document.getElementById('lightboxOverlay');
  var frame = document.getElementById('lightboxFrame');
  var img = document.getElementById('lightboxImage');
  var closeBtn = document.getElementById('lightboxClose');
  var openNewBtn = document.getElementById('lightboxOpenNew');
  function isMobile(){
    return window.matchMedia('(max-width:760px)').matches || (('ontouchstart' in window) && navigator.maxTouchPoints > 0 && window.innerWidth <= 900);
  }
  function openLightbox(src){
    // Mobile/touch PDF viewers embedded in an iframe often can't be scrolled with a finger.
    // Open the PDF directly in a new tab instead, where the phone's native viewer handles scrolling and zoom.
    if(isMobile()){
      window.open(src, '_blank');
      return;
    }
    img.style.display = 'none';
    frame.style.display = 'block';
    frame.src = src + '#toolbar=0&navpanes=0&statusbar=0';
    openNewBtn.href = src;
    openNewBtn.classList.add('show');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function openImageLightbox(src){
    frame.style.display = 'none';
    frame.src = 'about:blank';
    img.style.display = 'block';
    img.src = src;
    openNewBtn.classList.remove('show');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    overlay.classList.remove('open');
    frame.src = 'about:blank';
    img.src = '';
    openNewBtn.classList.remove('show');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.project-thumb, .presentation-thumb').forEach(function(thumb){
    var pdfPath = thumb.getAttribute('data-pdf');
    var imgPath = thumb.getAttribute('data-img');
    if(pdfPath){
      thumb.addEventListener('click', function(){ openLightbox(pdfPath); });
    } else if(imgPath){
      thumb.addEventListener('click', function(){ openImageLightbox(imgPath); });
    }
  });
  document.querySelectorAll('.hero-cv-view').forEach(function(btn){
    var pdfPath = btn.getAttribute('data-pdf');
    if(!pdfPath) return;
    btn.addEventListener('click', function(e){ e.preventDefault(); openLightbox(pdfPath); });
  });
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function(e){ if(e.target === overlay) closeLightbox(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLightbox(); });
})();

;

(function(){
  document.querySelectorAll('.timeline-item').forEach(function(item){
    item.addEventListener('click', function(e){
      item.classList.toggle('open');
    });
  });
})();

;

(function(){
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if(!navToggle || !navLinks) return;
  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){ navToggle.checked = false; });
  });
  var navToggleLabel = document.querySelector('.nav-toggle-label');
  document.addEventListener('click', function(e){
    if(!navToggle.checked) return;
    var clickedToggle = e.target === navToggle || (navToggleLabel && navToggleLabel.contains(e.target));
    var clickedInsideMenu = navLinks.contains(e.target);
    if(!clickedToggle && !clickedInsideMenu){ navToggle.checked = false; }
  });
})();

;

(function(){
  var backToTop = document.getElementById('backToTop');
  if(backToTop){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 500){ backToTop.classList.add('visible'); }
      else{ backToTop.classList.remove('visible'); }
    });
    backToTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  var dots = document.querySelectorAll('.side-dot');
  if(dots.length){
    var sections = [];
    dots.forEach(function(dot){
      var id = dot.getAttribute('data-section');
      var el = document.getElementById(id);
      if(el){ sections.push({id:id, el:el, dot:dot}); }
    });
    var setActive = function(){
      var pos = window.scrollY + (window.innerHeight * 0.3);
      var current = sections[0];
      sections.forEach(function(s){
        if(s.el.offsetTop <= pos){ current = s; }
      });
      dots.forEach(function(dot){ dot.classList.remove('active'); });
      if(current){ current.dot.classList.add('active'); }
    };
    window.addEventListener('scroll', setActive);
    setActive();
  }
})();
