import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import { siteContent } from './siteContent';
import { projects } from './data/projects';
import { aiProjects } from './data/aiProjects';
import { testimonials } from './data/testimonials';
import { experience } from './data/experience';
import './styles.css';

function Projects() {
  const [visible, setVisible] = useState(8);
  return <>
    <div className="pg">
    {projects.slice(0, visible).map((project, index) => (
      <a className="pj new" style={{'--k': (index % 4)} as CSSProperties}
        href={`https://${project.domain}/`} target="_blank" rel="noopener" key={project.domain}>
        <div className={`shot${project.screenshot ? ' ok' : ''}`} data-d={project.domain}>
          {project.screenshot ? <img src={project.screenshot} alt={`Captura del sitio ${project.name}`} loading="lazy" /> : <span>Captura real pendiente</span>}
        </div>
        <div className="pm"><h3>{project.name}</h3>{project.description && <p>{project.description}</p>}
          <span className="lk">Ver proyecto <svg className="i"><use href="#ar" /></svg></span>
        </div>
      </a>
    ))}
    </div>
    <div className="more">
      {visible < projects.length && <button className="btn o" type="button" onClick={() => setVisible(v => Math.min(v + 4, projects.length))}>Revelar más proyectos</button>}
      
    </div>
  </>;
}

function AIProjects() {
  return <div className="pg ai-pg">
    {aiProjects.map((project, index) => (
      <a className="pj ai-pj new" style={{'--k': (index % 4)} as CSSProperties}
        href={project.link} target="_blank" rel="noopener noreferrer" key={project.name}>
        <div className="shot ok">
          <img src={project.image} alt={`Vista previa de ${project.name}`} loading="lazy" />
        </div>
        <div className="pm">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <span className="lk">Ver prototipo <svg className="i"><use href="#ar" /></svg></span>
        </div>
      </a>
    ))}
  </div>;
}

function Experience() {
  return <>
    {experience.map((item, index) => <div className="rv" key={`${item.company}-${item.period}`}>
      <time>{item.period}</time><div><h3 className={index === experience.length - 1 ? 'cur' : ''}>{item.company}</h3><p>{item.position}</p></div>
    </div>)}
  </>;
}

function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const perPage = () => window.innerWidth <= 700 ? 1 : 2;
  const pages = Math.ceil(testimonials.length / perPage());
  const go = (next: number) => {
    const count = Math.ceil(testimonials.length / perPage());
    const index = (next + count) % count;
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.tm');
    const gap = parseFloat(getComputedStyle(el).columnGap || '0');
    el.scrollTo({ left: index * ((card?.offsetWidth || 0) + gap) * perPage(), behavior: 'smooth' });
    setPage(index);
  };
  useEffect(() => {
    const id = window.setInterval(() => go(page + 1), 6000);
    return () => window.clearInterval(id);
  }, [page]);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const card = el.querySelector<HTMLElement>('.tm');
      if (card) setPage(Math.round(el.scrollLeft / ((card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')) * perPage())));
    };
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, []);
  return <>
    <div className="ts">
      <button className="cb" type="button" aria-label="Testimonios anteriores" onClick={() => go(page - 1)}><svg className="i"><use href="#cl" /></svg></button>
      <div className="tg" id="testimonials-track" ref={track} tabIndex={0}>
        {testimonials.map(t => <figure className="tm" key={t.name}>
          <blockquote>{t.quote}</blockquote>
          <figcaption><span className="av" aria-hidden="true">{t.initials}</span><div><b>{t.name}</b><small>{t.role}</small></div></figcaption>
        </figure>)}
      </div>
      <button className="cb" type="button" aria-label="Testimonios siguientes" onClick={() => go(page + 1)}><svg className="i"><use href="#cr" /></svg></button>
    </div>
    <div className="tc">
      <div className="dots">{Array.from({length: pages}, (_, i) => <button key={i} className={i === page ? 'on' : ''} aria-label={`Ir al grupo ${i+1} de testimonios`} aria-current={i === page ? 'true' : 'false'} onClick={() => go(i)} />)}</div>
    </div>
  </>;
}

function App() {
  const content = siteContent
    .replace(
      '<a class="btn" href="#" data-pdf="es">',
      '<a class="btn" href="https://drive.google.com/file/d/1MJjtTNQmSGJ4srJIcNHcw6TJZkkqQGl8/view?usp=sharing" target="_blank" rel="noopener noreferrer">',
    )
    .replace(
      '<a class="btn o" href="#" data-pdf="en" lang="en">',
      '<a class="btn o" href="https://drive.google.com/file/d/1mArSTmIUdkvKp0uK1vBwv0sKyNgq4ute/view?usp=sharing" target="_blank" rel="noopener noreferrer" lang="en">',
    )
    .replace(
    '<section id="experiencia"',
    '<section id="proyectos-ai" class="alt"><div class="c"><h2 class="rv">Diseño basado en AI</h2><p class="sub rv">Proyectos de Figma potenciados con Inteligencia Artificial.</p><div id="ai-projects-root"></div></div></section><section id="experiencia"',
    );

  useEffect(() => {
    const html = document.documentElement;
    const header = document.querySelector('header');
    const menuButton = document.querySelector<HTMLElement>('.bg');
    const closeButton = document.querySelector<HTMLElement>('.x');
    const close = () => { html.classList.remove('mo'); menuButton?.setAttribute('aria-expanded', 'false'); };
    const open = () => { html.classList.add('mo'); menuButton?.setAttribute('aria-expanded', 'true'); closeButton?.focus(); };
    menuButton?.addEventListener('click', open);
    document.querySelectorAll('[data-c]').forEach(el => el.addEventListener('click', close));
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    const scroll = () => header?.classList.toggle('s', window.scrollY > 8);
    document.addEventListener('keydown', key);
    window.addEventListener('scroll', scroll, { passive: true });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.rv').forEach(el => observer.observe(el));
    return () => {
      menuButton?.removeEventListener('click', open);
      document.removeEventListener('keydown', key);
      window.removeEventListener('scroll', scroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const roots = [
      ['projects-root', <Projects />],
      ['ai-projects-root', <AIProjects />],
      ['experience-root', <Experience />],
      ['testimonials-root', <Testimonials />],
    ] as const;
    const mounted = roots.map(([id, node]) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const root = createRoot(element);
      root.render(node);
      return root;
    });
    return () => mounted.forEach(root => root?.unmount());
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default App;
