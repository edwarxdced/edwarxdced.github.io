/* Edwar Cedeño · Static portfolio · No trackers, no backend, no dependencies. */
(() => {
  'use strict';
  document.documentElement.classList.add('js-enabled');

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = 'edwarcedeno1994@gmail.com';
  const routes = ['home', 'whoami', 'projects', 'skills', 'security', 'experience', 'contact'];
  const commands = {
    home: ['cd ~/portfolio/home', 'whoami', 'Edwar Cedeño · Backend + AI Integrations'],
    whoami: ['cd ~/portfolio/whoami', 'cat about.md', '7+ years · Backend / Full Stack'],
    projects: ['cd ~/portfolio/projects', 'ls -la selected-work/', '3 case studies loaded'],
    skills: ['cd ~/portfolio/skills', 'tree -L 2 ./skills', 'Backend · Cloud · Data · AI / Quality'],
    security: ['cd ~/portfolio/security', 'cat engineering-philosophy.md', 'Security mindset loaded'],
    experience: ['cd ~/portfolio/experience', 'cat /var/log/career.log', '3 career entries loaded'],
    contact: ['cd ~/portfolio/contact', './contact.sh', 'email contact ready']
  };
  const projects = {
    letterbucket: {
      route: 'letterbucket', title: { es: 'Monetización y suscripciones SaaS', en: 'SaaS monetization and subscriptions' },
      context: { es: 'LetterBucket · Backend Developer · Mar 2026 a Jul 2026', en: 'LetterBucket · Backend Developer · Mar 2026 to Jul 2026' },
      points: {
        es: ['Diseño del módulo de monetización con Stripe Connect: planes, pagos multimoneda, checkout, Billing Portal y webhooks.', 'Implementación de reglas de visibilidad y control de acceso del paywall, según suscripción.', 'Autenticación de suscriptores mediante registro, inicio de sesión, magic links y códigos OTP.', 'Detección y corrección de incidencias de producción relacionadas con URLs, errores 404 y regresiones.'],
        en: ['Designed the Stripe Connect monetization module including plans, multicurrency payments, checkout, Billing Portal and webhooks.', 'Implemented subscription-aware paywall access and visibility rules.', 'Built subscriber authentication with signup, login, magic links and OTP codes.', 'Identified and fixed production issues involving URLs, 404 errors and regressions.']
      }, tags: ['Stripe Connect', 'Billing Portal', 'Webhooks', 'OTP']
    },
    creed: {
      route: 'creed-and-bear', title: { es: 'Arquitectura backend para fintech', en: 'Backend architecture for fintech' },
      context: { es: 'Creed & Bear LLC · Backend Developer · Sep 2022 a Oct 2025', en: 'Creed & Bear LLC · Backend Developer · Sep 2022 to Oct 2025' },
      points: {
        es: ['Liderazgo de un equipo backend de 5 a 10 desarrolladores, con revisiones de código y mentoría.', 'Diseño de microservicios Python con Docker para despliegues reproducibles.', 'Construcción y mantenimiento de APIs REST con Django, FastAPI y Flask.', 'Pipelines CI/CD en Bitbucket y monitoreo y alertas mediante Grafana.'],
        en: ['Led a backend team of 5 to 10 developers, including code reviews and mentorship.', 'Designed Python microservices using Docker for reproducible deployments.', 'Built and maintained REST APIs with Django, FastAPI and Flask.', 'Implemented Bitbucket CI/CD pipelines and Grafana monitoring and alerts.']
      }, tags: ['Python', 'Django', 'FastAPI', 'Flask', 'Docker', 'Grafana']
    },
    athmos: {
      route: 'athmos', title: { es: 'Integraciones, automatización y ETL', en: 'Integrations, automation and ETL' },
      context: { es: 'Athmos SAS · Full Stack Developer · Ago 2018 a Oct 2022', en: 'Athmos SAS · Full Stack Developer · Aug 2018 to Oct 2022' },
      points: {
        es: ['Aplicaciones web con Vue.js, React y Laravel con arquitecturas modulares.', 'Automatización de extracción e integración de datos mediante Python y web scraping.', 'Diseño y documentación de APIs REST para integrar sistemas propios y de terceros.', 'Pruebas unitarias y E2E con unittest y Selenium.'],
        en: ['Built modular web applications using Vue.js, React and Laravel.', 'Automated data collection and integration using Python and web scraping.', 'Designed and documented REST APIs for internal and third-party systems.', 'Added unit and end-to-end tests using unittest and Selenium.']
      }, tags: ['Python', 'REST', 'Vue.js', 'React', 'Laravel', 'Selenium']
    }
  };

  const strings = {
    es: {
      'nav.home':'Inicio','nav.about':'Sobre mí','nav.projects':'Proyectos','nav.skills':'Stack','nav.security':'Seguridad','nav.experience':'Experiencia','nav.contact':'Contacto',
      'hero.eyebrow':'BACKEND-FOCUSED SOFTWARE ENGINEER','hero.joke':'No soy un endpoint. <strong>Pero siempre respondo tus solicitudes.</strong>',
      'hero.description':'Construyo APIs, microservicios, integraciones con IA y agentes que funcionan más allá del entorno de desarrollo. Python, Node.js, infraestructura cloud y una sana obsesión por la calidad.',
      'hero.projects':'Explorar proyectos','hero.contact':'Hablemos','hero.find':'ENCUÉNTRAME EN','hero.status':'Perfil cargado correctamente','hero.location':'Remoto · Venezuela','common.scroll':'SCROLL PARA EXPLORAR',
      'about.title':'Código limpio.<br><span class="gradient-text">Sistemas sólidos.</span>',
      'about.lead':'Soy Edwar Cedeño, desarrollador Full Stack con enfoque en backend y más de 7 años construyendo productos reales.',
      'about.body':'He trabajado en fintech, trading, plataformas SaaS e integraciones. Me gusta entender el sistema completo, detectar problemas antes de que escalen y construir soluciones que el equipo pueda mantener.',
      'about.cv':'↓ Descargar currículum','about.stat1':'años de experiencia','about.stat2':'devs liderados','about.stat3':'colaboración global',
      'projects.title':'Trabajo <span class="gradient-text">seleccionado.</span>','projects.lead':'Casos reales de mi experiencia profesional, no repositorios inventados.',
      'projects.case':'Caso real','projects.details':'Explorar caso','projects.p1title':'Monetización SaaS','projects.p1desc':'Stripe Connect, pagos multimoneda, paywall, autenticación OTP y magic links.',
      'projects.p2title':'Backend para fintech','projects.p2desc':'Microservicios Python, APIs REST, Docker, CI/CD y observabilidad con Grafana.',
      'projects.p3title':'Integraciones y ETL','projects.p3desc':'Integración de APIs, extracción de datos automatizada y aplicaciones web modulares.',
      'projects.note':'Algunos trabajos son propietarios; se muestran responsabilidades y tecnologías documentadas en mi experiencia.',
      'skills.title':'Mi stack <span class="gradient-text">tecnológico.</span>','skills.lead':'Lo que utilizo para desarrollar, desplegar, integrar y mantener software.',
      'security.title':'Construir es bueno.<br><span class="gradient-text">Entender es mejor.</span>',
      'security.lead':'Un backend confiable no empieza en el deploy, sino en las decisiones que tomas antes.',
      'security.body':'Revisión de código, validación de entradas, flujos de autenticación, monitoreo y análisis de errores forman parte de cómo abordo el desarrollo. Me interesa especialmente la lógica de negocio y la seguridad de las APIs.',
      'security.disclaimer':'Demostración visual, no representa una auditoría real ni un escaneo de este sitio.',
      'experience.title':'Experiencia <span class="gradient-text">en producción.</span>','experience.lead':'Equipos, responsabilidades y sistemas reales.',
      'experience.letter':'Diseño e implementación de monetización con Stripe Connect, Billing Portal, webhooks, paywall y autenticación de suscriptores. Resolución de incidencias críticas en producción.',
      'experience.creed':'Liderazgo de un equipo de 5 a 10 desarrolladores. Desarrollo de microservicios y APIs Python; automatización de CI/CD con Bitbucket y monitoreo con Grafana.',
      'experience.athmos':'Aplicaciones con Vue.js, React y Laravel; automatización de extracción de datos en Python, integración de APIs y pruebas unitarias/E2E con unittest y Selenium.',
      'contact.title':'¿Tienes un problema interesante?<br><span class="gradient-text">Hablemos.</span>',
      'contact.lead':'Disponible para conversar sobre desarrollo backend, arquitectura, integraciones y oportunidades de trabajo.',
      'contact.emailLabel':'CORREO DE CONTACTO','contact.send':'Enviar email','contact.copy':'Copiar correo','contact.networks':'REDES PROFESIONALES',
      'contact.cv':'↓ Descargar CV (PDF)','contact.ready':'Listo para el próximo reto','dialog.work':'Trabajo realizado','dialog.contact':'Consultar sobre un proyecto similar',
      'activity.caption':'Simulación de navegación · No es una sesión SSH real', 'copied':'✓ Correo copiado al portapapeles', 'copyError':'Selecciona el correo y cópialo manualmente'
    },
    en: {
      'nav.home':'Home','nav.about':'About','nav.projects':'Projects','nav.skills':'Stack','nav.security':'Security','nav.experience':'Experience','nav.contact':'Contact',
      'hero.eyebrow':'BACKEND-FOCUSED SOFTWARE ENGINEER','hero.joke':'I’m not an endpoint. <strong>But I always respond to your requests.</strong>',
      'hero.description':'I build APIs, microservices and integrations that work beyond development. Python, Node.js, cloud infrastructure and a healthy obsession with quality.',
      'hero.projects':'Explore work','hero.contact':'Get in touch','hero.find':'FIND ME ON','hero.status':'Profile loaded successfully','hero.location':'Remote · Venezuela','common.scroll':'SCROLL TO EXPLORE',
      'about.title':'Clean code.<br><span class="gradient-text">Solid systems.</span>',
      'about.lead':'I’m Edwar Cedeño, a backend-focused Full Stack Developer with over 7 years of experience building real products.',
      'about.body':'I’ve worked across fintech, trading, SaaS and integrations. I like understanding the complete system, finding problems before they grow, and building solutions that teams can maintain.',
      'about.cv':'↓ Download résumé','about.stat1':'years of experience','about.stat2':'engineers led','about.stat3':'global collaboration',
      'projects.title':'Selected <span class="gradient-text">work.</span>','projects.lead':'Real-world cases from my career, not invented repositories.',
      'projects.case':'Real work','projects.details':'Explore case','projects.p1title':'SaaS monetization','projects.p1desc':'Stripe Connect, multicurrency payments, paywall access, OTP and magic links.',
      'projects.p2title':'Fintech backend','projects.p2desc':'Python microservices, REST APIs, Docker, CI/CD and Grafana observability.',
      'projects.p3title':'Integrations and ETL','projects.p3desc':'API integrations, automated data extraction and modular web applications.',
      'projects.note':'Some work is proprietary; responsibilities and technologies are based on my professional experience.',
      'skills.title':'My <span class="gradient-text">tech stack.</span>','skills.lead':'Tools I use to build, deploy, integrate and maintain software.',
      'security.title':'Building is good.<br><span class="gradient-text">Understanding is better.</span>',
      'security.lead':'A reliable backend begins with good decisions, long before deployment.',
      'security.body':'Code review, input validation, authentication flows, monitoring and error analysis are part of my development approach. I’m especially interested in business logic and API security.',
      'security.disclaimer':'Visual illustration only; this is not an actual audit or security scan of this site.',
      'experience.title':'Production <span class="gradient-text">experience.</span>','experience.lead':'Real teams, responsibilities and systems.',
      'experience.letter':'Built Stripe Connect monetization, Billing Portal, webhooks, paywall and subscriber authentication. Resolved high-impact production issues.',
      'experience.creed':'Led a team of 5 to 10 backend engineers. Built Python microservices and APIs, automated Bitbucket CI/CD, and implemented Grafana monitoring.',
      'experience.athmos':'Built applications with Vue.js, React and Laravel; automated data extraction with Python, integrated APIs, and added unittest/Selenium tests.',
      'contact.title':'Have an interesting problem?<br><span class="gradient-text">Let’s talk.</span>',
      'contact.lead':'Open to discussing backend development, architecture, integrations and work opportunities.',
      'contact.emailLabel':'CONTACT EMAIL','contact.send':'Send email','contact.copy':'Copy email','contact.networks':'PROFESSIONAL NETWORKS',
      'contact.cv':'↓ Download CV (PDF)','contact.ready':'Ready for the next challenge','dialog.work':'What I worked on','dialog.contact':'Discuss a similar project',
      'activity.caption':'Navigation simulation · Not a real SSH session','copied':'✓ Email copied to clipboard','copyError':'Select the email and copy it manually'
    }
  };

  let lang = 'es';
  let activeRoute = 'home';
  let activeProject = null;
  try { const saved = localStorage.getItem('edwar-portfolio-lang'); if (saved === 'en') lang = 'en'; } catch (_) {}

  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = next;
    $$('#language').forEach(b => { b.textContent = next === 'es' ? 'EN' : 'ES'; b.title = next === 'es' ? 'Switch to English' : 'Cambiar a español'; });
    $$('[data-t]').forEach(el => {
      const value = strings[next][el.dataset.t];
      if (value !== undefined) el.innerHTML = value;
    });
    if (activeProject) renderProject(activeProject);
    try { localStorage.setItem('edwar-portfolio-lang',next); } catch (_) {}
  }
  $('#language').addEventListener('click', () => setLanguage(lang === 'es' ? 'en' : 'es'));
  setLanguage(lang);
  $('#year').textContent = String(new Date().getFullYear());

  function referrerLabel() {
    if (!document.referrer) return 'direct / unknown';
    try { return new URL(document.referrer).hostname || 'unknown'; } catch (_) { return 'unknown'; }
  }
  const logContainer = $('#activity-lines');
  const lineBuffer = [];
  function addLog(value, type='note') {
    lineBuffer.push({value,type});
    if (lineBuffer.length > 5) lineBuffer.shift();
    logContainer.replaceChildren();
    lineBuffer.forEach(log => {
      const el = document.createElement('div');
      el.className = `activity__line ${log.type}`;
      el.textContent = log.value;
      el.title = log.value;
      logContainer.append(el);
    });
  }
  addLog('[VISITOR] frontend session initialized','ok');
  addLog(`[SOURCE] ${referrerLabel()}`,'note');
  addLog('[READY] portfolio interface loaded','ok');
  function activateSection(route, force=false) {
    if (!routes.includes(route) || (!force && route === activeRoute)) return;
    activeRoute = route;
    $$('.nav__link').forEach(el => {
      const current = el.dataset.sectionLink === route;
      el.classList.toggle('active',current);
      if (current) el.setAttribute('aria-current','location'); else el.removeAttribute('aria-current');
    });
    $('#activity-route').textContent = `~/${route}`;
    $('#activity-pwd').textContent = `~/${route}`;
    addLog(`$ ${commands[route][0]}`,'cmd');
    setTimeout(() => addLog(`$ ${commands[route][1]}`,'cmd'),110);
    setTimeout(() => addLog(`[OK] ${commands[route][2]}`,'ok'),225);
  }
  $$('.nav__link').forEach(link => link.addEventListener('click', () => {
    $('.nav').classList.remove('is-open');
    $('#menu-toggle').setAttribute('aria-expanded','false');
  }));
  $('#menu-toggle').addEventListener('click', () => {
    const opened = $('.nav').classList.toggle('is-open');
    $('#menu-toggle').setAttribute('aria-expanded', String(opened));
  });
  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') { $('.nav').classList.remove('is-open'); $('#menu-toggle').setAttribute('aria-expanded','false'); }
  });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold:.10, rootMargin:'0px 0px -8% 0px' });
  $$('.reveal').forEach(el => revealObserver.observe(el));
  // Navigation uses the center of the screen, not the scroll direction, for stable active sections.
  let scrollPending=false;
  function updateScroll() {
    scrollPending=false;
    const center = window.scrollY + window.innerHeight * .51;
    let selected='home', distance=Infinity;
    $$('main > section').forEach(sec => {
      const middle = sec.offsetTop + sec.offsetHeight/2;
      const d=Math.abs(center-middle);
      if(d<distance) {distance=d;selected=sec.id;}
    });
    activateSection(selected);
    const max = document.documentElement.scrollHeight-window.innerHeight;
    $('#progress').style.width = (max ? Math.max(0, Math.min(100, 100*window.scrollY/max)) : 0)+'%';
  }
  window.addEventListener('scroll', () => { if(!scrollPending){ scrollPending=true;requestAnimationFrame(updateScroll); } }, {passive:true});
  window.addEventListener('resize', updateScroll, {passive:true});
  updateScroll();
  if(location.hash && routes.includes(location.hash.slice(1))){ activateSection(location.hash.slice(1),true); }

  const activity=$('#activity');
  const mobileActivity = window.matchMedia('(max-width: 690px)');
  function syncMobileLogs() {
    if (mobileActivity.matches) {
      activity.classList.add('is-collapsed');
      $('#activity-toggle').setAttribute('aria-expanded', 'false');
    }
  }
  syncMobileLogs();
  if (mobileActivity.addEventListener) mobileActivity.addEventListener('change', syncMobileLogs);
  else if (mobileActivity.addListener) mobileActivity.addListener(syncMobileLogs);
  $('#activity-toggle').addEventListener('click', () => {
    const collapsed=activity.classList.toggle('is-collapsed');
    $('#activity-toggle').setAttribute('aria-expanded', String(!collapsed));
  });

  function renderProject(key) {
    const p=projects[key];if(!p)return;
    activeProject=key;
    $('#dialog-route').textContent=p.route;
    $('#dialog-title').textContent=p.title[lang];
    $('#dialog-context').textContent=p.context[lang];
    $('#dialog-points').replaceChildren();
    p.points[lang].forEach(point=>{const li=document.createElement('li');li.textContent=point;$('#dialog-points').append(li)});
    $('#dialog-tags').replaceChildren();
    p.tags.forEach(tag=>{const el=document.createElement('span');el.textContent=tag;$('#dialog-tags').append(el)});
  }
  $$('[data-project]').forEach(button=>button.addEventListener('click', () => {
    renderProject(button.dataset.project);
    $('#project-dialog').showModal();
    addLog(`$ cat projects/${projects[activeProject].route}/README.md`,'cmd');
  }));
  $('#close-dialog').addEventListener('click',()=>$('#project-dialog').close());
  $('#project-dialog').addEventListener('click', ev => { if(ev.target===$('#project-dialog')) $('#project-dialog').close(); });
  $('#dialog-contact').addEventListener('click',()=>$('#project-dialog').close());
  $('#project-dialog').addEventListener('close',()=>{activeProject=null});

  $('#copy-email').addEventListener('click', async () => {
    let copied=false;
    try {if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(EMAIL);copied=true;}} catch (_) {}
    if(!copied) {
      const temp=document.createElement('textarea'); temp.value=EMAIL;temp.style.position='fixed';temp.style.opacity='0';document.body.append(temp);temp.select();
      try {copied=document.execCommand('copy');} catch (_) {} temp.remove();
    }
    $('#copy-feedback').textContent = strings[lang][copied?'copied':'copyError'];
    if(copied) addLog('[OK] contact email copied','ok');
  });

  // Lightweight Matrix background, decorative only. Animation stops when hidden/reduced.
  function setupMatrix() {
    const canvas=$('#matrix');
    if(reducedMotion || !canvas.getContext){canvas.style.display='none';return;}
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    let w=0,h=0,drops=[],columns=0,last=0;
    const chars='010101011001〈〉{}01';
    function resize(){const ratio=Math.min(window.devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*ratio;canvas.height=h*ratio;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(ratio,0,0,ratio,0,0);columns=Math.ceil(w/19);drops=Array.from({length:columns},()=>Math.floor(Math.random()*-(h/18)));ctx.fillStyle='#071014';ctx.fillRect(0,0,w,h);}
    resize();window.addEventListener('resize',resize,{passive:true});
    function frame(t){requestAnimationFrame(frame);if(document.hidden || t-last<92)return;last=t;ctx.fillStyle='rgba(7,16,20,.085)';ctx.fillRect(0,0,w,h);ctx.font='11px monospace';for(let i=0;i<columns;i++){if(Math.random()>.69)continue;const y=drops[i]*18;ctx.fillStyle=Math.random()>.93?'rgba(78,241,181,.34)':'rgba(0,159,131,.18)';ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*19,y);if(y>h && Math.random()>.975)drops[i]=-Math.floor(Math.random()*20);else drops[i]++;}}
    requestAnimationFrame(frame);
  }
  setupMatrix();

  // Intro is only a visual simulation of the interface, never a real SSH session.
  const boot=$('#boot');
  if(reducedMotion){boot.classList.add('is-done');$('.hero .reveal').classList.add('is-visible');}
  else {
    const steps=[`[VISITOR] source: ${referrerLabel()}`,'[200] GET /portfolio/home','[OK] loading developer profile','[READY] experience unlocked'];
    steps.forEach((line,i)=>setTimeout(()=>{const el=document.createElement('div');el.className='boot__log'+(i===3?' ok':'');el.textContent=line;$('#boot-lines').append(el);},200+i*295));
    setTimeout(()=>{boot.classList.add('is-done');$('.hero .reveal').classList.add('is-visible');},1550);
    setTimeout(()=>boot.remove(),2300);
  }
})();
