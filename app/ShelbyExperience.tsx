"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

declare const __BASE_PATH__: string;

const method = [
  ["Entendemos o cenário", "Levantamento técnico, necessidade e grau de urgência."],
  ["Diagnosticamos com precisão", "Inspeções, ensaios, medições e análise de risco."],
  ["Executamos e documentamos", "Solução, comissionamento, ART e relatório técnico."],
];

const services = [
  { t: "Projetos de engenharia", tag: "ART • Média tensão", photo: "projeto-eletrico", copy: "Da viabilidade ao projeto executivo, com documentação para as concessionárias." },
  { t: "Cabines e subestações", tag: "Implantação • Retrofit", photo: "cabines-prontas", copy: "Modernização, ampliação e proteção da sua distribuição de energia." },
  { t: "Manutenção preventiva", tag: "Planos • Inspeções", photo: "tecnico-cabine", copy: "Rotinas técnicas que antecipam falhas e preservam a disponibilidade." },
  { t: "Ensaios elétricos", tag: "Laudos • Instrumentação", photo: "ensaio-transformador", copy: "Medições e testes que comprovam a integridade dos equipamentos." },
  { t: "Relés e proteção", tag: "Ajustes • Seletividade", photo: "painel-comando", copy: "Proteção coordenada para uma ocorrência não parar toda a operação." },
  { t: "SPDA e aterramento", tag: "Proteção • ART", photo: "rede-aerea", copy: "Inspeção, adequação e laudos para proteção contra descargas." },
  { t: "Termografia", tag: "Diagnóstico • Prevenção", photo: "transformador-tela", copy: "Enxergue aquecimentos anormais antes que eles causem uma parada." },
  { t: "Grupo gerador", tag: "Instalação • Manutenção", photo: "grupo-gerador", copy: "Energia de emergência revisada para funcionar na hora exata." },
  { t: "Eficiência energética", tag: "Medição • Otimização", photo: "disjuntor-mt", copy: "Análise técnica para transformar consumo em decisão operacional." },
];

const gallery = [
  { photo: "subestacao-externa", tag: "SUBESTAÇÃO", note: "Operação real" },
  { photo: "transformador-cabine", tag: "TRANSFORMADOR", note: "Cabine primária" },
  { photo: "cabo-media-tensao", tag: "MÉDIA TENSÃO", note: "Cabeamento" },
  { photo: "equipe-painel", tag: "EQUIPE", note: "Em campo" },
  { photo: "munck-noturno", tag: "REDE AÉREA", note: "Plantão noturno" },
  { photo: "dreno-oleo", tag: "GERADOR", note: "Manutenção" },
  { photo: "ensaio-painel", tag: "ENSAIO", note: "Instrumentação" },
  { photo: "ramal-entrada", tag: "RAMAL DE ENTRADA", note: "Ligação nova" },
  { photo: "gerador-manutencao", tag: "MOTOR", note: "Troca de filtros" },
];

type Brief = { service: string; urgency: string; installation: string; city: string; name: string; company: string; phone: string; detail: string };
const initialBrief: Brief = { service: "", urgency: "", installation: "", city: "", name: "", company: "", phone: "", detail: "" };

const GN = 5;
const flipAt = (g: boolean[]) => (out: boolean[], r: number, c: number) => { if (r >= 0 && r < GN && c >= 0 && c < GN) out[r * GN + c] = !out[r * GN + c]; };
function toggleCell(g: boolean[], i: number) {
  const out = [...g]; const r = Math.floor(i / GN), c = i % GN; const f = flipAt(g);
  f(out, r, c); f(out, r - 1, c); f(out, r + 1, c); f(out, r, c - 1); f(out, r, c + 1); return out;
}
function seedPanel() {
  let g = Array(GN * GN).fill(false);
  for (let k = 0; k < 8; k++) g = toggleCell(g, Math.floor(Math.random() * GN * GN));
  if (g.every((c) => !c)) g = toggleCell(g, Math.floor(Math.random() * GN * GN));
  return g;
}

function PanelGame() {
  const [grid, setGrid] = useState<boolean[]>(seedPanel);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);
  const won = grid.every((c) => !c);
  const click = (i: number) => { if (won) return; if (!started) setStarted(true); setGrid((g) => toggleCell(g, i)); setMoves((m) => m + 1); };
  const reset = () => { setGrid(seedPanel()); setMoves(0); setStarted(false); };
  const active = grid.filter(Boolean).length;
  return (
    <div className="panel-game">
      <div className="pg-head">
        <div className="pg-status" data-won={won}>{won ? "Quadro estabilizado" : active > 0 ? `${active} disjuntores em alarme` : "Pronto"}</div>
        <div className="pg-meta"><span>Jogadas <b>{moves}</b></span><button type="button" onClick={reset}>Reiniciar</button></div>
      </div>
      <div className="pg-grid" role="group" aria-label="Painel de disjuntores">
        {grid.map((on, i) => (
          <button key={i} type="button" className={`pg-cell ${on ? "on" : ""}`} aria-pressed={on} aria-label={`Disjuntor ${i + 1} ${on ? "em alarme" : "desarmado"}`} onClick={() => click(i)}>
            <i /><b>{on ? "ON" : "OFF"}</b>
          </button>
        ))}
        {won && (
          <div className="pg-win">
            <strong>Zerou os alarmes</strong>
            <p>{moves} jogadas. Na vida real, é a Shelby que desarma o risco antes dele virar parada.</p>
            <a className="pg-win-cta" href="#diagnostico">Chamar a Shelby</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShelbyExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [sent, setSent] = useState(false);
  const assetPrefix = __BASE_PATH__;
  const asset = (path: string) => `${assetPrefix}${path}`;
  const photo = (name: string) => asset(`/assets/site/${name}.jpg`);

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      const el = mainRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - innerHeight;
        el.style.setProperty("--sp", String(max ? scrollY / max : 0));
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    const hero = document.querySelector(".hero");
    const heroIdle = new IntersectionObserver(([e]) => hero?.classList.toggle("is-idle", !e.isIntersecting), { threshold: 0 });
    if (hero) heroIdle.observe(hero);
    apply(); addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); reveal.disconnect(); heroIdle.disconnect(); };
  }, []);

  const selectedService = useMemo(() => services.find((item) => item.t === brief.service)?.t || "", [brief.service]);
  const update = (key: keyof Brief, value: string) => setBrief((prev) => ({ ...prev, [key]: value }));
  const previous = () => setStep((current) => Math.max(current - 1, 1));
  const chooseService = (service: string) => { update("service", service); setStep(2); };
  const advanceFromLocation = () => { if (brief.urgency && brief.installation && brief.city.trim().length > 2) setStep(3); };
  const advanceFromContact = () => { if (brief.name.trim() && brief.phone.trim().length > 7) setStep(4); };
  const submitBrief = (event: FormEvent) => {
    event.preventDefault();
    if (step < 4) return;
    const e = encodeURIComponent;
    const text = `Olá, Shelby! Quero solicitar um orçamento.%0A%0A*Serviço:* ${e(brief.service)}%0A*Urgência:* ${e(brief.urgency)}%0A*Instalação:* ${e(brief.installation)}%0A*Cidade:* ${e(brief.city)}%0A*Nome:* ${e(brief.name)}%0A*Empresa:* ${e(brief.company || "Não informado")}%0A*Telefone:* ${e(brief.phone)}%0A*Detalhes:* ${e(brief.detail || "Não informado")}`;
    window.open(`https://wa.me/5511989283393?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main ref={mainRef}>
      <div className="scroll-line" />

      <nav className="nav">
        <a className="brand" href="#inicio" aria-label="Shelby Eletromecânica"><img src={asset("/assets/shelby-logo.png")} alt="" /><span>SHELBY<small>ELETROMECÂNICA</small></span></a>
        <button className="menu-toggle" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A empresa</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Soluções</a>
          <a href="#obras" onClick={() => setMenuOpen(false)}>Obras</a>
          <a href="#metodo" onClick={() => setMenuOpen(false)}>Método</a>
          <a className="nav-cta" href="#diagnostico" onClick={() => setMenuOpen(false)}>Orçamento</a>
        </div>
      </nav>

      <section className="hero" id="inicio" aria-label="Shelby Eletromecânica" style={{ "--hero": `url(${photo("grupo-gerador")})` } as React.CSSProperties}>
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-top"><span>Caieiras · São Paulo</span><span className="live"><i />Plantão ativo</span></div>
        <div className="hero-inner">
          <img className="hero-logo" src={asset("/assets/shelby-logo.png")} alt="Shelby Eletromecânica" />
          <p className="hero-kicker">Engenharia elétrica · Média e baixa tensão</p>
          <h1>Energia sob <br /><em>controle técnico.</em></h1>
          <p className="hero-sub">Projetos, manutenção e proteção elétrica para operações que não podem parar. Do laudo à execução, com documentação de verdade.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#diagnostico">Solicitar avaliação</a>
            <a className="btn btn-ghost" href="#servicos">Ver soluções</a>
          </div>
        </div>
        <div className="hero-foot"><span>Subestações</span><span>Proteção</span><span>Ensaios e laudos</span><span>Atendimento 24h</span></div>
      </section>

      <section className="strip" aria-label="Diferenciais">
        <div><b>+10</b><span>anos em campo</span></div>
        <div><b>MT/BT</b><span>média e baixa tensão</span></div>
        <div><b>ART</b><span>responsabilidade técnica</span></div>
        <div><b>24h</b><span>plantão emergencial</span></div>
      </section>

      <section className="intro section" id="empresa">
        <div className="intro-media reveal"><img src={photo("cabo-media-tensao")} alt="Técnico da Shelby preparando cabo de média tensão" loading="lazy" /><span className="tape">Operação real</span></div>
        <div className="intro-copy reveal">
          <div className="eyebrow">A empresa</div>
          <h2>Postura técnica para manter a sua operação <em>de pé.</em></h2>
          <p>A Shelby é especializada em engenharia elétrica, manutenção eletromecânica e soluções para sistemas de média e baixa tensão.</p>
          <p>Atuamos em campo, com método, agilidade e documentação, para dar segurança a quem decide e continuidade a quem opera.</p>
          <div className="principles"><span>Prontos para emergências</span><span>Do projeto à manutenção</span><span>Compromisso com a segurança</span></div>
        </div>
      </section>

      <section className="band"><p>INDÚSTRIAS <b>/</b> CONDOMÍNIOS <b>/</b> COMÉRCIOS <b>/</b> GALPÕES LOGÍSTICOS <b>/</b> INFRAESTRUTURA CRÍTICA <b>/</b> SUBESTAÇÕES</p></section>

      <section className="services section" id="servicos">
        <div className="section-head reveal">
          <div className="eyebrow">Soluções técnicas</div>
          <h2>Engenharia que antecipa. <em>Manutenção que protege.</em></h2>
          <p>Do projeto ao laudo, cobrimos o ciclo elétrico completo da sua operação.</p>
        </div>
        <div className="svc-grid">
          {services.map((s, i) => (
            <a className="svc reveal" href="#diagnostico" key={s.t} onClick={() => chooseService(s.t)}>
              <div className="svc-photo"><img src={photo(s.photo)} alt={s.t} loading="lazy" /><span className="svc-n">{String(i + 1).padStart(2, "0")}</span></div>
              <div className="svc-body"><span className="svc-tag">{s.tag}</span><h3>{s.t}</h3><p>{s.copy}</p><b className="svc-go">Solicitar avaliação</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className="gallery section" id="obras">
        <div className="section-head reveal">
          <div className="eyebrow">Obras em campo</div>
          <h2>Na prática, <em>com a Shelby.</em></h2>
          <p>Registros reais de projetos, manutenção e ensaios feitos pela equipe.</p>
        </div>
        <div className="wall reveal">
          {gallery.map((g) => (
            <figure className="shot" key={g.photo}>
              <img src={photo(g.photo)} alt={g.tag} loading="lazy" />
              <figcaption><span>{g.tag}</span><i>{g.note}</i></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="method section" id="metodo">
        <div className="method-head reveal">
          <div className="eyebrow">Método Shelby</div>
          <h2>Menos parada. <em>Mais previsibilidade.</em></h2>
          <p>Não é só executar. É entender a criticidade, priorizar o risco real e devolver uma solução documentada.</p>
        </div>
        <div className="steps">
          {method.map(([title, copy], i) => (
            <article className="step reveal" key={title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="evidence section">
        <div className="ev ev-photo reveal" style={{ "--ev": `url(${photo("transformador-tela")})` } as React.CSSProperties}>
          <span>Termografia</span><strong>Calor sob controle</strong><p>Mapeamento de aquecimentos anormais para agir antes da falha crítica.</p>
        </div>
        <div className="ev ev-quote reveal">
          <span>Proteção</span><h3>Uma ocorrência não precisa parar <em>toda a operação.</em></h3><p>Ajuste de relés e seletividade para isolar o problema e preservar o resto do sistema.</p>
        </div>
        <div className="ev ev-list reveal">
          <span>Documentação</span><ul><li>ART emitida</li><li>Laudo técnico</li><li>Relatório fotográfico</li><li>Plano de ação</li></ul>
        </div>
      </section>

      <section className="game section" id="jogo">
        <div className="game-copy reveal">
          <div className="eyebrow">Desafio elétrico</div>
          <h2>Quadro em alarme. <em>Desarme tudo.</em></h2>
          <p>Cada toque desarma um disjuntor e os vizinhos na cruz. Zere todos os alarmes do painel.</p>
          <p className="game-hint">Dica: pense na sequência, não no clique isolado. É assim que a gente trata risco de verdade.</p>
        </div>
        <div className="game-stage reveal"><PanelGame /></div>
      </section>

      <section className="safety section" id="seguranca">
        <div className="safety-media reveal"><img src={photo("equipe-painel")} alt="Equipe da Shelby trabalhando em painel elétrico" loading="lazy" /><span className="tape">Segurança em primeiro lugar</span></div>
        <div className="safety-copy reveal">
          <div className="eyebrow">Segurança</div>
          <h2>Risco controlado. <em>Operação protegida.</em></h2>
          <p>Cada serviço segue procedimentos rigorosos, documentação técnica e as normas aplicáveis ao seu cenário.</p>
          <div className="standard"><span>Procedimento técnico</span><span>Proteção operacional</span><span>Documentação rastreável</span></div>
          <ul className="checks"><li>Equipe especializada e qualificada</li><li>Emissão de ART e relatórios técnicos</li><li>Soluções sob medida para a sua planta</li></ul>
        </div>
      </section>

      <section className="diagnostic section" id="diagnostico">
        <div className="diag-head reveal">
          <div className="eyebrow">Atendimento direcionado</div>
          <h2>Conte o cenário. <em>A gente acelera o caminho.</em></h2>
          <p>Escolha o que precisa e a solicitação já chega com o contexto certo para a equipe.</p>
        </div>
        <form className="quote-form reveal" onSubmit={submitBrief}>
          <div className="quote-progress"><span>Qualificação de atendimento</span><b>{["Cenário", "Operação", "Contato", "Revisão"][step - 1]}</b><div><i style={{ transform: `scaleX(${step / 4})` }} /></div></div>
          {step === 1 && <fieldset><legend>Qual serviço você precisa?</legend><div className="option-grid">{services.map((s) => <button type="button" className={brief.service === s.t ? "selected" : ""} onClick={() => chooseService(s.t)} key={s.t}>{s.t}</button>)}</div><p className="form-guidance">Escolha uma solução para seguir.</p></fieldset>}
          {step === 2 && <fieldset><legend>Qual é a prioridade e o local?</legend><div className="form-split"><label>Urgência<select value={brief.urgency} onChange={(e) => update("urgency", e.target.value)} required><option value="">Selecione</option><option>Emergência agora</option><option>Esta semana</option><option>Planejado / orçamento</option></select></label><label>Tipo de instalação<select value={brief.installation} onChange={(e) => update("installation", e.target.value)} required><option value="">Selecione</option><option>Indústria</option><option>Condomínio</option><option>Comércio</option><option>Subestação / cabine primária</option><option>Outro</option></select></label></div><label>Cidade da operação<input value={brief.city} onChange={(e) => update("city", e.target.value)} onBlur={advanceFromLocation} placeholder="Ex.: Caieiras, SP" required /></label><div className="form-nav"><button type="button" onClick={previous}>Voltar</button><span>Ao preencher a cidade, você avança.</span></div></fieldset>}
          {step === 3 && <fieldset><legend>Com quem vamos falar?</legend><div className="form-split"><label>Seu nome<input value={brief.name} onChange={(e) => update("name", e.target.value)} placeholder="Nome e sobrenome" required /></label><label>Telefone / WhatsApp<input value={brief.phone} onChange={(e) => update("phone", e.target.value)} onBlur={advanceFromContact} placeholder="(11) 00000-0000" required /></label></div><label>Empresa<input value={brief.company} onChange={(e) => update("company", e.target.value)} placeholder="Nome da empresa (opcional)" /></label><label>O que está acontecendo?<textarea value={brief.detail} onChange={(e) => update("detail", e.target.value)} placeholder="Descreva o cenário, equipamento ou necessidade." /></label><div className="form-nav"><button type="button" onClick={previous}>Voltar</button><span>Ao informar o telefone, você avança.</span></div></fieldset>}
          {step === 4 && <fieldset className="brief-review"><legend>Seu atendimento está pronto para ser direcionado.</legend><div><span>Serviço</span><b>{selectedService}</b></div><div><span>Urgência</span><b>{brief.urgency}</b></div><div><span>Operação</span><b>{brief.installation} · {brief.city}</b></div><div><span>Contato</span><b>{brief.name} · {brief.phone}</b></div><div className="form-nav"><button type="button" onClick={previous}>Ajustar</button><button className="form-next" type="submit">Enviar no WhatsApp</button></div>{sent && <p className="sent-confirmation">O WhatsApp foi aberto com todas as informações do atendimento.</p>}</fieldset>}
        </form>
      </section>

      <section className="emergency" style={{ "--emg": `url(${photo("subestacao-externa")})` } as React.CSSProperties}>
        <div className="eyebrow">Atendimento emergencial</div>
        <h2>Seu sistema não pode parar. <em>Nós também não.</em></h2>
        <p>Fale direto com a nossa equipe técnica.</p>
        <a href="tel:+5511989283393" className="emergency-phone"><small>11</small> 98928-3393</a>
      </section>

      <section className="scripture"><p>&ldquo;Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.&rdquo;</p><span>Provérbios 16:3</span></section>

      <footer id="contato">
        <div className="footer-main">
          <div className="footer-brand"><img src={asset("/assets/shelby-logo.png")} alt="Shelby Eletromecânica" /><p>Energia com segurança, confiabilidade e excelência técnica.</p></div>
          <div className="footer-col"><span>Fale com a Shelby</span><a href="#diagnostico">Solicitar avaliação</a><a href="https://wa.me/5511989283393" target="_blank" rel="noopener noreferrer">WhatsApp (11) 98928-3393</a><a href="mailto:josuel@shelbyeletromecanica.com">josuel@shelbyeletromecanica.com</a></div>
          <div className="footer-col"><span>Base operacional</span><p>Av. Aparecida, 465<br />Caieiras, SP</p><a href="#inicio">Voltar ao topo</a></div>
        </div>
        <div className="footer-bottom"><span>Shelby Eletromecânica</span><span>Engenharia elétrica · Eletromecânica · Média tensão</span></div>
      </footer>
    </main>
  );
}
