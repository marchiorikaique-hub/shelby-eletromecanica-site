"use client";

import { CSSProperties, PointerEvent as RPointerEvent, useEffect, useRef, useState } from "react";

declare const __BASE_PATH__: string;

const WA = "5511989283393";
const wa = (t: string) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const WA_OLA = wa("Olá, Shelby! Vim pelo site e quero falar com a equipe.");

const reel = [
  { f: "subestacao-externa", t: "Subestação", n: "Operação real" },
  { f: "munck-noturno", t: "Rede aérea", n: "Plantão noturno" },
  { f: "transformador-cabine", t: "Transformador", n: "Cabine primária" },
];

const servicos = [
  { t: "Cabines e subestações", d: "Implantação, retrofit, ampliação e proteção da sua entrada de energia.", f: "cabines-prontas" },
  { t: "Manutenção preventiva e corretiva", d: "Rotina que antecipa falha e atendimento quando a falha já aconteceu.", f: "tecnico-cabine" },
  { t: "Ensaios, termografia e laudos", d: "Medição, teste e imagem térmica que comprovam o estado de cada equipamento.", f: "ensaio-transformador" },
  { t: "Relés, proteção e SPDA", d: "Seletividade ajustada e aterramento em dia, pra uma ocorrência não parar tudo.", f: "painel-comando" },
  { t: "Grupo gerador", d: "Instalação e revisão da energia de emergência, pronta na hora exata.", f: "gerador-manutencao" },
  { t: "Projetos com ART", d: "Da viabilidade ao executivo, com a documentação que a concessionária pede.", f: "ramal-entrada" },
];

const obras = [
  { f: "equipe-painel", t: "Equipe", n: "Painel elétrico" },
  { f: "transformador-tela", t: "Transformador", n: "Inspeção" },
  { f: "ensaio-painel", t: "Ensaio", n: "Instrumentação" },
  { f: "rede-aerea", t: "Rede aérea", n: "Poste" },
  { f: "disjuntor-mt", t: "Disjuntor de MT", n: "Manutenção" },
  { f: "dreno-oleo", t: "Transformador", n: "Coleta de óleo" },
];
const letreiro = ["Cabines primárias", "Subestações", "Média tensão", "Plantão 24h", "Ensaios e laudos", "Grupo gerador"];

function Zap() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ico">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" fill="currentColor" />
    </svg>
  );
}
function Seta() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="ico seta"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Raio() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="raio"><path d="M13.5 2 4.5 13.5h6L9.5 22l10-12.5h-6.2L13.5 2Z" fill="currentColor" /></svg>;
}

export default function ShelbyExperience() {
  const a = (p: string) => `${__BASE_PATH__}${p}`;
  const foto = (n: string) => a(`/assets/v2/${n}.webp`);
  const [menu, setMenu] = useState(false);
  const [ativa, setAtiva] = useState(0);
  const poeira = useRef<HTMLCanvasElement>(null);
  const palco = useRef<HTMLElement>(null);
  const vitrine = useRef<HTMLDivElement>(null);

  // poeira de luz subindo no palco
  useEffect(() => {
    const cv = poeira.current;
    if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const CORES = ["255,225,26", "155,92,255", "91,18,201", "241,238,248"];
    let w = 0, h = 0, raf = 0, vis = true, mx = 0, tx = 0;
    let pts: { x: number; y: number; r: number; v: number; a: number; z: number; c: string }[] = [];
    const medir = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height; cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: Math.round((w * h) / 9000) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + 0.3, v: Math.random() * 0.4 + 0.08,
        a: Math.random() * 0.6 + 0.15, z: Math.random() * 0.9 + 0.1, c: CORES[Math.floor(Math.random() * CORES.length)],
      }));
    };
    const quadro = () => {
      raf = 0;
      if (!vis) return;
      tx += (mx - tx) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.y -= p.v;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.beginPath(); ctx.arc(p.x + tx * p.z * 40, p.y, p.r, 0, 6.2832); ctx.fill();
      }
      raf = requestAnimationFrame(quadro);
    };
    const mover = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) raf = requestAnimationFrame(quadro); });
    medir(); io.observe(cv);
    addEventListener("resize", medir, { passive: true });
    addEventListener("pointermove", mover, { passive: true });
    raf = requestAnimationFrame(quadro);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", medir); removeEventListener("pointermove", mover); };
  }, []);

  // fotos girando no palco
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAtiva((i) => (i + 1) % reel.length), 3600);
    return () => clearInterval(id);
  }, []);

  // parallax do palco e revelação das seções
  useEffect(() => {
    const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = palco.current;
    let raf = 0;
    const rolar = () => {
      raf = 0;
      if (!el) return;
      const p = Math.min(1, Math.max(0, scrollY / (el.offsetHeight || 1)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(rolar); };
    if (!calmo) { addEventListener("scroll", onScroll, { passive: true }); rolar(); }
    if (!calmo) document.documentElement.classList.add("anima");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("dentro")), { threshold: 0.18 });
    document.querySelectorAll(".surge").forEach((n) => io.observe(n));
    const cta = document.querySelector(".palco-cta"), dock = document.querySelector(".dock");
    const ioDock = new IntersectionObserver(([e]) => dock?.classList.toggle("visivel", !e.isIntersecting && e.boundingClientRect.top < 0));
    if (cta) ioDock.observe(cta);
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); ioDock.disconnect(); };
  }, []);

  // vitrine arrastável com inércia
  const drag = useRef({ on: false, x: 0, s: 0, v: 0, t: 0, moved: false });
  const down = (e: RPointerEvent<HTMLDivElement>) => {
    const v = vitrine.current; if (!v || e.pointerType !== "mouse") return;
    drag.current = { on: true, x: e.clientX, s: v.scrollLeft, v: 0, t: performance.now(), moved: false };
    v.setPointerCapture(e.pointerId); v.classList.add("arrastando");
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const v = vitrine.current, d = drag.current; if (!v || !d.on) return;
    const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true;
    const now = performance.now(); const prev = v.scrollLeft;
    v.scrollLeft = d.s - dx; d.v = (v.scrollLeft - prev) / Math.max(1, now - d.t); d.t = now;
  };
  const up = () => {
    const v = vitrine.current, d = drag.current; if (!v || !d.on) return;
    d.on = false; v.classList.remove("arrastando");
    let vel = d.v * 16;
    const deslizar = () => { if (Math.abs(vel) < 0.4) return; v.scrollLeft += vel; vel *= 0.93; requestAnimationFrame(deslizar); };
    requestAnimationFrame(deslizar);
  };
  const passo = (dir: number) => vitrine.current?.scrollBy({ left: dir * Math.min(560, innerWidth * 0.8), behavior: "smooth" });

  return (
    <main>
      <header className="nav">
        <nav className="nav-inner" aria-label="Principal">
          <a className="marca" href="#inicio" aria-label="Shelby Eletromecânica, início">
            <img src={foto("caveira-mini")} alt="" width={48} height={41} />
            <span>Shelby<small>Eletromecânica</small></span>
          </a>
          <div id="menu" className={`nav-links ${menu ? "aberto" : ""}`}>
            <a href="#servicos" onClick={() => setMenu(false)}>Serviços</a>
            <a href="#obras" onClick={() => setMenu(false)}>Obras</a>
            <a href="#quem" onClick={() => setMenu(false)}>Quem faz</a>
          </div>
          <a className="btn btn-raio btn-nav" href={WA_OLA} target="_blank" rel="noopener noreferrer"><Zap />WhatsApp</a>
          <button className="nav-burger" aria-label={menu ? "Fechar menu" : "Abrir menu"} aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}><span /><span /></button>
        </nav>
      </header>

      <section className="palco" id="inicio" ref={palco} aria-label="Shelby Eletromecânica">
        <canvas className="poeira" ref={poeira} aria-hidden="true" />
        <div className="palco-pilares" aria-hidden="true">{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ "--i": i } as CSSProperties} />)}</div>
        <div className="letras" aria-hidden="true">
          <div className="letras-trilho">{[...letreiro, ...letreiro].map((t, i) => <span key={i}>{t}<Raio /></span>)}</div>
        </div>

        <div className="palco-grade">
          <div className="palco-texto">
            <h1>Energia que não para. <em>Nem a gente.</em></h1>
            <p className="palco-sub">Cabines primárias, subestações e quadros de média e baixa tensão. Do diagnóstico ao laudo, com a Shelby em campo.</p>
            <div className="palco-cta">
              <a className="btn btn-raio" href={WA_OLA} target="_blank" rel="noopener noreferrer"><Zap />Chamar no WhatsApp</a>
              <a className="btn btn-vidro" href="#servicos">Ver serviços<Seta /></a>
            </div>
            <p className="status"><i />Plantão 24h · Caieiras e Grande SP</p>
          </div>

          <div className="palco-centro" aria-hidden="true">
            <div className="pedestal"><b /><b /><b /></div>
            <span className="anel-varre" />
            <img className="palco-caveira" src={foto("caveira")} alt="" width={760} height={642} fetchPriority="high" />
          </div>

          <div className="reel" aria-label="Obras recentes">
            {reel.map((r, i) => {
              const rel = (i - ativa + reel.length) % reel.length;
              return (
                <figure key={r.f} className={`reel-foto pos-${Math.min(rel, 3)} ${rel === 0 ? "ativa" : ""}`} aria-hidden={rel !== 0}>
                  <img src={foto(r.f)} alt={rel === 0 ? `${r.t}, ${r.n.toLowerCase()}` : ""} loading={i < 2 ? "eager" : "lazy"} />
                  <figcaption><b>{r.t}</b><span>{r.n}</span></figcaption>
                </figure>
              );
            })}
          </div>
        </div>
        <div className="palco-chao" aria-hidden="true" />
      </section>

      <section className="faixa" aria-label="Diferenciais">
        <div className="faixa-trilho">
          {[0, 1].map((k) => (
            <p key={k} aria-hidden={k === 1}>
              <span>Mais de 10 anos em campo</span><Raio /><span>Média e baixa tensão</span><Raio /><span>ART e relatório técnico</span><Raio /><span>Plantão 24 horas</span><Raio /><span>Fotos reais de obra</span><Raio />
            </p>
          ))}
        </div>
      </section>

      <section className="servicos" id="servicos">
        <h2 className="surge">O que a Shelby faz</h2>
        <div className="bandas">
          {servicos.map((s, i) => (
            <a key={s.t} className={`banda surge tom-${i % 3}`} href={wa(`Olá, Shelby! Vim pelo site e preciso de: ${s.t}.`)} target="_blank" rel="noopener noreferrer">
              <div className="banda-texto">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="quero">Quero isso<Seta /></span>
              </div>
              <div className="banda-tela"><img src={foto(s.f)} alt="" loading="lazy" /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="obras" id="obras">
        <div className="obras-topo surge">
          <div>
            <h2>No campo, de verdade.</h2>
            <p>Registros das obras da equipe. Arraste pro lado.</p>
          </div>
          <div className="setas">
            <button type="button" aria-label="Fotos anteriores" onClick={() => passo(-1)}><Seta /></button>
            <button type="button" aria-label="Próximas fotos" onClick={() => passo(1)}><Seta /></button>
          </div>
        </div>
        <div className="vitrine" ref={vitrine} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} tabIndex={0} aria-label="Fotos das obras">
          {obras.map((o) => (
            <figure className="peca" key={o.f}>
              <img src={foto(o.f)} alt={`${o.t}, ${o.n.toLowerCase()}`} loading="lazy" draggable={false} />
              <figcaption><b>{o.t}</b><span>{o.n}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="quem" id="quem">
        <figure className="quem-foto surge">
          <img src={foto("cabo-media-tensao")} alt="Técnico da Shelby preparando cabo de média tensão" loading="lazy" />
        </figure>
        <div className="quem-texto surge">
          <h2>Você fala direto com quem faz.</h2>
          <p>A Shelby é do Josuel Souza, técnico em elétrica que está na obra. Sem central de atendimento, sem repasse.</p>
          <ul>
            <li><Raio />Emergência atendida a qualquer hora, dia ou noite.</li>
            <li><Raio />Execução documentada: ART, laudo e relatório fotográfico.</li>
            <li><Raio />Base em Caieiras, atendendo a Grande São Paulo.</li>
          </ul>
          <a className="btn btn-roxo" href={WA_OLA} target="_blank" rel="noopener noreferrer"><Zap />Falar com o Josuel</a>
        </div>
      </section>

      <section className="final" aria-label="Contato">
        <h2 className="surge">Seu sistema não pode parar. <em>Nós também não.</em></h2>
        <div className="final-cta surge">
          <a className="btn btn-raio btn-grande" href={wa("Olá, Shelby! Preciso de atendimento.")} target="_blank" rel="noopener noreferrer"><Zap />Chamar no WhatsApp</a>
          <a className="fone" href="tel:+5511989283393">(11) 98928-3393</a>
        </div>
        <blockquote className="versiculo">&ldquo;Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.&rdquo;<cite>Provérbios 16:3</cite></blockquote>
        <footer className="rodape">
          <div className="rodape-linha">
            <span>Av. Aparecida, 465 · Caieiras, SP</span>
            <a href="mailto:josuel@shelbyeletromecanica.com">josuel@shelbyeletromecanica.com</a>
            <a href={WA_OLA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <p className="gigante" aria-hidden="true">SHELBY</p>
        </footer>
      </section>

      <a className="dock" href={WA_OLA} target="_blank" rel="noopener noreferrer"><Zap />Chamar no WhatsApp</a>
    </main>
  );
}
