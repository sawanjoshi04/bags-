const initExtreme = () => {
    const grain = document.createElement('div'); grain.className = 'noise-overlay';
    document.body.appendChild(grain);

    const pre = document.createElement('div'); pre.className = 'preloader';
    pre.innerHTML = `<div class="preloader-brand" style="opacity:1">AURELIA<span>.</span></div><div class="preloader-progress"><div class="preloader-bar" id="pBar"></div></div>`;
    document.body.appendChild(pre);
    document.body.style.overflow = 'hidden'; window.scrollTo(0, 0);

    let prog = 0; const bar = document.getElementById('pBar');
    const load = setInterval(() => {
        prog += Math.random() * 25;
        if (prog > 100) prog = 100;
        bar.style.width = `${prog}%`;
        if (prog === 100) {
            clearInterval(load);
            setTimeout(() => {
                pre.classList.add('hidden'); document.body.style.overflow = '';
                document.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('active'), i * 100));
                setTimeout(() => pre.remove(), 1200);
            }, 500);
        }
    }, 100);

    // Underwater Environment Hook
    const waterFilter = document.createElement('div');
    waterFilter.className = 'underwater-filter';
    document.body.appendChild(waterFilter);

    // Optimized Spawners (Lower frequency, higher efficiency)
    const particleFrag = document.createDocumentFragment();

    // Bubble Spawner
    setInterval(() => {
        const b = document.createElement('div');
        b.className = 'underwater-bubble';
        const size = Math.random() * 20 + 5;
        b.style.width = `${size}px`; b.style.height = `${size}px`;
        b.style.left = `${Math.random() * 100}vw`;
        b.style.animationDuration = `${Math.random() * 5 + 5}s`;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 10000);
    }, 800);

    // Real Fashion Model Runway Animation
    const modelContainer = document.createElement('div');
    modelContainer.className = 'real-model-container';
    modelContainer.innerHTML = `
        <video autoplay muted loop playsinline class="real-model-video">
            <source src="https://cdn.pixabay.com/video/2016/09/21/5174-183427188_large.mp4" type="video/mp4">
        </video>
        <div class="model-overlay"></div>
    `;
    document.body.appendChild(modelContainer);

    // Extreme Gold Particles
    setInterval(() => {
        if (document.hidden) return;
        const p = document.createElement('div');
        p.className = 'extreme-particle';
        p.style.left = `${Math.random() * 100}vw`;
        const dur = Math.random() * 3 + 4;
        p.style.animationDuration = `${dur}s`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000);
    }, 600);

    // Lux Light Flare
    setInterval(() => {
        if (document.hidden) return;
        const f = document.createElement('div');
        f.className = 'light-flare';
        f.style.left = `${Math.random() * 100}vw`;
        f.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(f);
        setTimeout(() => f.remove(), 3000);
    }, 4000);

    return () => {
        document.querySelectorAll('.btn, .nav-link').forEach(m => {
            m.classList.add('magnetic');
            m.addEventListener('mousemove', function (e) {
                const p = this.getBoundingClientRect();
                const x = e.clientX - p.left - p.width / 2;
                const y = e.clientY - p.top - p.height / 2;
                requestAnimationFrame(() => {
                    this.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0) scale(1.1)`;
                });
            });
            m.addEventListener('mouseleave', function () {
                requestAnimationFrame(() => {
                    this.style.transform = 'translate3d(0,0,0) scale(1)';
                });
            });
        });
    };
};

document.addEventListener('DOMContentLoaded', () => {
    const bindEvents = initExtreme();

    const nav = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
        const sy = window.scrollY;

        // Navbar
        if (nav) {
            if (sy > 50) {
                nav.classList.add('scrolled');
                nav.style.background = 'rgba(5,5,5,0.95)';
            } else {
                nav.classList.remove('scrolled');
                nav.style.background = 'rgba(5,5,5,0.75)';
            }
        }

        // Reveal Elements
        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('active');
            }
        });

        // Parallax & Hero
        const heroBg = document.querySelectorAll('.hero-bg img, .page-header');
        const heroTx = document.querySelector('.hero-content, .page-header .container');
        if (sy < window.innerHeight) {
            heroBg.forEach(bg => {
                bg.style.transform = `scale(1.15) translate3d(0, ${sy * 0.4}px, 0) rotate(${sy * 0.005}deg)`;
                bg.style.opacity = 1 - (sy / 1200);
            });
            if (heroTx) {
                heroTx.style.transform = `translate3d(0, ${sy * 0.3}px, 0)`;
                heroTx.style.opacity = 1 - (sy / 600);
            }
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true });

    // Menu logic
    const mBtn = document.getElementById('menuBtn'), nL = document.getElementById('navLinks');
    if (mBtn && nL) mBtn.addEventListener('click', () => nL.classList.toggle('active'));

    // Grid hydration (if applicable)
    const grid = document.getElementById('productGrid');
    if (grid && grid.children.length === 0) {
        const prod = [
            { n: "The Nocturne Tote", p: "$3,250", i: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2030" },
            { n: "Aura Evening Clutch", p: "$1,890", i: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1974" },
            { n: "Celeste Crossbody", p: "$2,450", i: "https://images.unsplash.com/photo-1594223402434-601e35d2dbe5?q=80&w=1973" },
            { n: "Monogram Weekender", p: "$4,100", i: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2669" }
        ];
        prod.forEach((p, i) => {
            const c = document.createElement('div');
            c.className = 'product-card reveal tilt-on-hover moon-gravity';
            c.style.transitionDelay = `${(i % 4) * 0.1}s`;
            c.innerHTML = `<div class="product-image-container"><img src="${p.i}" alt="${p.n}" class="product-img"><button class="add-to-cart">Add to Cart</button></div><h3>${p.n}</h3><p>${p.p}</p>`;
            grid.appendChild(c);
        });
    }

    // 3D Tilt Optimization
    document.querySelectorAll('.collection-card, .tilt-on-hover, .store-card').forEach(c => {
        c.style.transformStyle = 'preserve-3d';
        let tiltTicking = false;

        c.addEventListener('mousemove', e => {
            if (tiltTicking) return;
            tiltTicking = true;
            requestAnimationFrame(() => {
                const r = c.getBoundingClientRect();
                const x = e.clientX - r.left, y = e.clientY - r.top;
                const rx = ((y - r.height / 2) / (r.height / 2)) * -10;
                const ry = ((x - r.width / 2) / (r.width / 2)) * 10;
                c.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.05, 1.05, 1.05)`;
                tiltTicking = false;
            });
        });

        c.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                c.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
            });
        });
    });

    bindEvents();
});
