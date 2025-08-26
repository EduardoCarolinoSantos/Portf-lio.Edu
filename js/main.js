// Rodapé + animação de counters
document.addEventListener('DOMContentLoaded', () => {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    const els = document.querySelectorAll('.metric__value');
    if (!('IntersectionObserver' in window) || els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.target || '0', 10);
            const suffix = el.dataset.suffix || '';
            let cur = 0, steps = 32, inc = Math.max(1, Math.round(target / steps)), i = 0;

            const tick = () => {
                cur += inc; i++;
                if (cur > target || i >= steps) { cur = target; }
                el.textContent = cur + suffix;
                if (cur < target) requestAnimationFrame(tick);
            };
            tick();
            io.unobserve(el);
        });
    }, { threshold: 0.4 });

    els.forEach(el => io.observe(el));
});
