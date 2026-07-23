// Portfólio — Eduardo C. Santos
document.addEventListener('DOMContentLoaded', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Garante que a página sempre abra no topo (reforça o script do <head>) */
    window.scrollTo(0, 0);

    /* Ano no rodapé */
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* Tema claro/escuro */
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        const root = document.documentElement;
        const sync = () => themeBtn.setAttribute('aria-pressed', String(root.getAttribute('data-theme') === 'light'));
        sync();
        themeBtn.addEventListener('click', () => {
            const light = root.getAttribute('data-theme') === 'light';
            if (light) root.removeAttribute('data-theme');
            else root.setAttribute('data-theme', 'light');
            try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) { }
            sync();
        });
    }

    /* i18n — tradução PT/EN sem dependências externas */
    const I18N = {
        'nav.about': 'About', 'nav.tech': 'Tech', 'nav.qualities': 'Strengths', 'nav.services': 'Services',
        'nav.cases': 'Cases', 'nav.results': 'Results', 'nav.portfolio': 'Portfolio', 'nav.contact': 'Contact',
        'nav.arch': 'Architecture', 'nav.api': 'API',
        'api.title': 'My profile, as a REST API',
        'api.lead': 'I specialize in REST — explore my data like you would any endpoint. Click and see the response.',
        'skip': 'Skip to content',
        'hero.status': 'Available for new projects', 'hero.cv': 'Download CV', 'hero.loc': 'Brazil · Remote',
        'hero.role': 'Software Engineer · Java & Spring Boot Specialist',
        'hero.sub': 'I build REST APIs, microservices and integrations with <strong>Java</strong> and <strong>Spring Boot</strong> — clean, testable and production-ready code.',
        'hero.cta1': 'View projects', 'hero.cta2': 'Get in touch',
        'hero.stat1': 'Specialty', 'hero.stat2': 'Framework', 'hero.stat3': 'APIs & Microservices',
        'about.title': 'About me',
        'about.lead': 'Backend in Java and Spring Boot, focused on security, performance and sustainable code.',
        'about.p': "I'm a <strong>Software Engineer</strong> specialized in <strong>Java</strong> and the <strong>Spring</strong> ecosystem. I design and build <strong>REST APIs</strong>, <strong>microservices</strong> and <strong>integrations</strong> between legacy and modern systems — always with automated tests, best practices and continuous deployment.",
        'about.b1': 'REST APIs and SOAP/REST integrations with Spring Boot.',
        'about.b2': 'Scalable microservices architecture.',
        'about.b3': 'Persistence with JPA/Hibernate and SQL.',
        'about.b4': 'Automated testing (JUnit and Mockito).',
        'about.b5': 'Clean Code, SOLID and design patterns.',
        'about.b6': 'CI/CD, Docker and cloud deployment (AWS).',
        'about.b7': 'Observability and structured logging.',
        'about.b8': 'Integration between legacy and modern systems.',
        'about.b9': 'Clear documentation and handoff.',
        'about.b10': 'Continuous evolution with proven quality.',
        'about.cta1': 'Get in touch', 'about.cta2': 'See services',
        'tech.title': 'Technologies',
        'tech.lead': 'My focus is the Java ecosystem, backed by modern backend infrastructure.',
        'tech.g1': 'Core Java & Spring', 'tech.g2': 'APIs, Data & Infrastructure',
        'arch.title': 'Architecture & how I work',
        'arch.lead': 'How I structure a production-ready Spring Boot backend — layered, testable and observable.',
        'arch.n1': 'Client / Front-end', 'arch.n1s': 'Web · Mobile · Integrations',
        'arch.n2': 'API Layer', 'arch.n2s': 'Controllers · DTOs · Validation',
        'arch.n3': 'Service Layer', 'arch.n3s': 'Business rules · Transactions',
        'arch.n4': 'Repository Layer', 'arch.n4s': 'Spring Data JPA · Hibernate',
        'arch.n5': 'Database', 'arch.n5s': 'PostgreSQL · MySQL',
        'arch.cross': 'Cross-cutting concerns',
        'arch.c1': 'Security — Spring Security + JWT', 'arch.c2': 'Testing — JUnit + Mockito',
        'arch.c3': 'Packaging — Docker', 'arch.c4': 'CI/CD — Jenkins · GitHub Actions',
        'arch.c5': 'Observability — logs & metrics',
        'qual.title': 'Strengths', 'qual.lead': 'What you can expect when I take on a project.',
        'qual.h1': 'Results-driven', 'qual.p1': 'I deliver fast, measurable value.',
        'qual.h2': 'Clean code & standards', 'qual.p2': 'Readable and testable code.',
        'qual.h3': 'Docs & handoff', 'qual.p3': 'Clear playbooks and guides.',
        'qual.h4': 'Operational security', 'qual.p4': 'Logs, alerts and monitoring.',
        'qual.h5': 'User experience', 'qual.p5': 'Fast, accessible interfaces.',
        'qual.h6': 'Partnership', 'qual.p6': 'Direct and transparent communication.',
        'serv.title': 'Services',
        'serv.h1': 'APIs & Microservices', 'serv.p1': 'Robust REST APIs and microservices with Spring Boot.',
        'serv.h2': 'System Integrations', 'serv.p2': 'SOAP/REST integrations between legacy and modern systems.',
        'serv.h3': 'Scalable Backend & CI/CD', 'serv.p3': 'Docker, Kubernetes, pipelines and secure cloud deployment.',
        'cases.title': 'Cases', 'cases.lead': 'Real projects with gains in productivity and predictability.',
        'cases.h1': 'Consultas', 'cases.p1': 'Query portal with a Java/Spring Boot backend and REST API for self-service access.',
        'cases.h2': 'Q&A Center', 'cases.p2': 'Backend for virtual assemblies with individual chats, orchestrated by REST services.',
        'cases.h3': 'Institutional Calendar', 'cases.p3': 'Scheduling service with integrations (Outlook and Teams) via APIs.',
        'res.title': 'Results in numbers', 'res.lead': 'Direct impact on performance, reliability and quality.',
        'res.l1': 'Reduction in API response time', 'res.l2': 'Fewer production failures',
        'res.l3': 'Requests processed/day', 'res.l4': 'Monitored services',
        'test.title': 'Testimonials',
        'test.q1': '“Solid Java backend and impeccable documentation.”', 'test.f1': '— Tech Lead',
        'test.q2': '“APIs and integrations delivered with quality and zero fuss.”', 'test.f2': '— Product Manager',
        'test.q3': '“Testable code that’s easy to evolve. Deployments without surprises.”', 'test.f3': '— IT Manager',
        'port.title': 'Portfolio', 'port.lead': 'A few projects I built with Java and Spring Boot.',
        'port.p1': 'Virtual assembly platform with individual chats and a real-time question flow.',
        'port.p2': 'Self-service portal exposing queries via REST API, with quick access at your fingertips.',
        'port.p3': 'Scheduling service with integrations for Outlook and Teams via APIs.',
        'port.link': 'View project', 'tag.integr': 'Integrations',
        'contact.title': 'Get in touch', 'contact.ph': 'Your email', 'contact.btn': 'Send by Email',
        'contact.linkedin': 'Connect on LinkedIn',
        'footer.role': 'Software Engineer', 'footer.rights': 'All rights reserved.',
        'wa.label': "Let's talk"
    };
    const I18N_TITLE = { pt: document.title, en: 'Eduardo C. Santos — Software Engineer' };
    const WA_MSG = {
        pt: 'Olá, Eduardo! Vi seu portfólio de Engenheiro de Software e gostaria de conversar sobre uma oportunidade.',
        en: "Hi Eduardo! I came across your Software Engineer portfolio and I'd like to talk about an opportunity."
    };
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    const CV_FILE = {
        pt: '/cv/curriculo_eduardo_carolino_santos_pt.pdf',
        en: '/cv/resume_eduardo_carolino_santos_en.pdf'
    };
    const cvLink = document.getElementById('cv-link');
    const txtNodes = document.querySelectorAll('[data-i18n]');
    const htmlNodes = document.querySelectorAll('[data-i18n-html]');
    const phNodes = document.querySelectorAll('[data-i18n-ph]');
    // Guarda os originais em português
    txtNodes.forEach(el => el.dataset.ptText = el.textContent);
    htmlNodes.forEach(el => el.dataset.ptHtml = el.innerHTML);
    phNodes.forEach(el => el.dataset.ptPh = el.getAttribute('placeholder'));

    const setLang = (lang) => {
        const en = lang === 'en';
        txtNodes.forEach(el => {
            const k = el.dataset.i18n;
            el.textContent = en && I18N[k] != null ? I18N[k] : el.dataset.ptText;
        });
        htmlNodes.forEach(el => {
            const k = el.dataset.i18nHtml;
            el.innerHTML = en && I18N[k] != null ? I18N[k] : el.dataset.ptHtml;
        });
        phNodes.forEach(el => {
            const k = el.dataset.i18nPh;
            el.setAttribute('placeholder', en && I18N[k] != null ? I18N[k] : el.dataset.ptPh);
        });
        document.documentElement.lang = en ? 'en' : 'pt-br';
        document.title = en ? I18N_TITLE.en : I18N_TITLE.pt;
        const waText = encodeURIComponent(en ? WA_MSG.en : WA_MSG.pt);
        waLinks.forEach(a => { a.href = a.href.split('?')[0] + '?text=' + waText; });
        if (cvLink) cvLink.href = en ? CV_FILE.en : CV_FILE.pt;
        document.querySelectorAll('.lang-btn').forEach(b => {
            const active = b.dataset.lang === lang;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', String(active));
        });
        try { localStorage.setItem('lang', lang); } catch (e) { }
    };

    let savedLang = 'pt';
    try { savedLang = localStorage.getItem('lang') || 'pt'; } catch (e) { }
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.addEventListener('click', () => setLang(b.dataset.lang));
    });
    if (savedLang === 'en') setLang('en');
    else setLang('pt');

    /* Code card do hero — Java digitado em tempo real */
    const typeCode = document.getElementById('type-code');
    const typeFile = document.getElementById('type-file');
    if (typeCode) {
        const SNIPPETS = [
            {
                file: 'DevController.java',
                code: '@RestController\n@RequestMapping("/api/v1")\npublic class DevController {\n\n    @GetMapping("/eduardo")\n    public Dev perfil() {\n        return service.buscarPerfil();\n    }\n}'
            },
            {
                file: 'DevService.java',
                code: '@Service\npublic class DevService {\n\n    public Dev buscarPerfil() {\n        return Dev.builder()\n            .nome("Eduardo C. Santos")\n            .stack(List.of("Java", "Spring Boot"))\n            .build();\n    }\n}'
            },
            {
                file: 'DevControllerTest.java',
                code: '@Test\nvoid deveRetornarPerfil() {\n    Dev dev = service.buscarPerfil();\n\n    assertThat(dev.getNome())\n        .isEqualTo("Eduardo C. Santos");\n}'
            }
        ];
        const RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(@[A-Za-z_]\w*)|\b(public|private|protected|class|interface|return|new|void|final|static|import|package|extends|implements|if|else|for|while|true|false|null|this|throws|throw|try|catch)\b|\b([A-Z][A-Za-z0-9_]*)\b|\b(\d+(?:\.\d+)?[fLdD]?)\b|([a-z_]\w*)(?=\s*\()/g;
        const CLS = [null, 'cc', 'cs', 'ca', 'ck', 'ct', 'cn', 'cm'];
        const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const tokenize = (code) => {
            const toks = []; let last = 0, m;
            RE.lastIndex = 0;
            while ((m = RE.exec(code))) {
                if (m.index > last) toks.push({ t: code.slice(last, m.index), c: null });
                let cls = null;
                for (let g = 1; g < m.length; g++) { if (m[g] != null) { cls = CLS[g]; break; } }
                toks.push({ t: m[0], c: cls });
                last = m.index + m[0].length;
                if (m[0].length === 0) RE.lastIndex++;
            }
            if (last < code.length) toks.push({ t: code.slice(last), c: null });
            return toks;
        };
        const render = (toks, n, cursor) => {
            let html = '', count = 0;
            for (const tok of toks) {
                if (count >= n) break;
                const take = Math.min(tok.t.length, n - count);
                const part = esc(tok.t.slice(0, take));
                html += tok.c ? '<span class="' + tok.c + '">' + part + '</span>' : part;
                count += take;
            }
            return html + (cursor ? '<span class="type-cursor"></span>' : '');
        };

        let si = 0, toks = tokenize(SNIPPETS[0].code), pos = 0, typing = true;
        typeFile.textContent = SNIPPETS[0].file;

        if (prefersReduced) {
            typeCode.innerHTML = render(toks, SNIPPETS[0].code.length, false);
        } else {
            const tick = () => {
                if (typing) {
                    pos++;
                    typeCode.innerHTML = render(toks, pos, true);
                    if (pos >= SNIPPETS[si].code.length) { typing = false; setTimeout(tick, 1900); return; }
                    setTimeout(tick, 20 + Math.random() * 34);
                } else {
                    pos -= 3;
                    if (pos <= 0) {
                        pos = 0;
                        si = (si + 1) % SNIPPETS.length;
                        toks = tokenize(SNIPPETS[si].code);
                        typeFile.textContent = SNIPPETS[si].file;
                        typing = true;
                        typeCode.innerHTML = render(toks, 0, true);
                        setTimeout(tick, 420);
                        return;
                    }
                    typeCode.innerHTML = render(toks, pos, true);
                    setTimeout(tick, 11);
                }
            };
            tick();
        }
    }

    /* API Explorer — o portfólio como uma API REST */
    const apiResp = document.getElementById('api-response');
    if (apiResp) {
        const API_DATA = {
            perfil: {
                nome: 'Eduardo C. Santos',
                cargo: 'Engenheiro de Software',
                foco: ['APIs REST', 'Microsserviços', 'Integrações'],
                localizacao: 'Brasil',
                remoto: true,
                disponivel: true,
                idiomas: ['pt-BR', 'en']
            },
            skills: {
                core: ['Java', 'Spring', 'Spring Boot', 'Hibernate/JPA', 'Maven', 'Gradle', 'JUnit'],
                dados: ['PostgreSQL', 'MySQL'],
                infra: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Linux', 'Git']
            },
            projetos: [
                { nome: 'Central de Dúvidas', stack: ['Java', 'Spring Boot', 'REST', 'MySQL'], url: 'https://duvidas.jaime.com.br/' },
                { nome: 'Consultas', stack: ['Java', 'Spring Boot', 'JPA', 'REST'], url: 'https://consultas.jaime.com.br/' },
                { nome: 'Calendário Institucional', stack: ['Java', 'Spring Boot', 'REST'], url: 'https://calendario.jaime.com.br/' }
            ],
            contato: {
                linkedin: 'linkedin.com/in/eduardo-carolino-santos',
                github: 'github.com/EduardoCarolinoSantos',
                whatsapp: '+55 11 99662-7759'
            }
        };
        const highlightJSON = (obj) => {
            let json = JSON.stringify(obj, null, 2)
                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (m) => {
                let cls = 'jn';
                if (/^"/.test(m)) cls = /:$/.test(m) ? 'jk' : 'js';
                else if (/true|false/.test(m)) cls = 'jb';
                else if (/null/.test(m)) cls = 'jnull';
                return '<span class="' + cls + '">' + m + '</span>';
            });
        };
        const urlEl = document.getElementById('api-url');
        const statusEl = document.getElementById('api-status');
        const eps = document.querySelectorAll('.api-ep');
        let timer = null;
        const call = (ep) => {
            eps.forEach(b => {
                const active = b.dataset.ep === ep;
                b.classList.toggle('is-active', active);
                b.setAttribute('aria-selected', String(active));
            });
            urlEl.textContent = '/api/v1/' + ep;
            statusEl.textContent = '···';
            statusEl.className = 'api-status is-loading';
            apiResp.classList.remove('is-in');
            clearTimeout(timer);
            timer = setTimeout(() => {
                apiResp.innerHTML = highlightJSON(API_DATA[ep]);
                statusEl.textContent = '200 OK';
                statusEl.className = 'api-status is-ok';
                apiResp.classList.add('is-in');
            }, prefersReduced ? 0 : 360);
        };
        eps.forEach(b => b.addEventListener('click', () => call(b.dataset.ep)));
        call('perfil');
    }

    /* Barra de progresso de leitura */
    const bar = document.getElementById('scroll-progress');
    if (bar) {
        const onScroll = () => {
            const h = document.documentElement;
            const max = h.scrollHeight - h.clientHeight;
            bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
    }

    /* Menu mobile (hambúrguer) */
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (toggle && menu) {
        const closeMenu = () => {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
        };
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        });
        // Fecha ao clicar num link ou apertar Esc
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    }

    /* Contador de resultados (dispara ao entrar na viewport) */
    const metrics = document.querySelectorAll('.metric__value');
    if ('IntersectionObserver' in window && metrics.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target;
                const target = parseInt(el.dataset.target || '0', 10);
                const suffix = el.dataset.suffix || '';
                if (prefersReduced) { el.textContent = target + suffix; io.unobserve(el); return; }
                let cur = 0, steps = 32, inc = Math.max(1, Math.round(target / steps)), i = 0;
                const tick = () => {
                    cur += inc; i++;
                    if (cur > target || i >= steps) cur = target;
                    el.textContent = cur + suffix;
                    if (cur < target) requestAnimationFrame(tick);
                };
                tick();
                io.unobserve(el);
            });
        }, { threshold: 0.4 });
        metrics.forEach(el => io.observe(el));
    }

    /* Reveal ao rolar */
    const revealSelectors = 'section > h2, .section-lead, .about, .api-console, .tech, .quality, .cards article, .case, .metric, .quote, .project, .arch-node, .arch__cross, #contact form, .contact-social';
    document.querySelectorAll(revealSelectors).forEach(el => el.classList.add('reveal'));
    const revealables = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealables.length && !prefersReduced) {
        const ro = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealables.forEach(el => ro.observe(el));
    } else {
        revealables.forEach(el => el.classList.add('is-visible'));
    }

    /* Formulário de contato via fetch (sem reload) */
    const form = document.getElementById('contact-form');
    const status = form && form.querySelector('.form-status');
    if (form && status) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.textContent;
            btn.disabled = true;
            btn.textContent = 'Enviando…';
            status.className = 'form-status';
            status.textContent = '';
            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });
                if (res.ok) {
                    form.reset();
                    status.classList.add('is-ok');
                    status.textContent = 'Mensagem enviada! Retorno em breve. 🚀';
                } else {
                    throw new Error('falha');
                }
            } catch (_) {
                status.classList.add('is-err');
                status.textContent = 'Não foi possível enviar. Tente pelo WhatsApp ou LinkedIn.';
            } finally {
                btn.disabled = false;
                btn.textContent = original;
            }
        });
    }

    /* Scrollspy: destaca o link da seção visível */
    const navLinks = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
    const sections = navLinks
        .map(a => document.querySelector(a.getAttribute('href')))
        .filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const id = e.target.getAttribute('id');
                navLinks.forEach(a => {
                    const active = a.getAttribute('href') === '#' + id;
                    a.classList.toggle('is-active', active);
                    if (active) a.setAttribute('aria-current', 'true');
                    else a.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
        sections.forEach(s => spy.observe(s));
    }
});
