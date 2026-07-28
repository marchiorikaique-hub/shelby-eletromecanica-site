"use client";

import { FormEvent, useEffect, useMemo, useState, type CSSProperties } from "react";
import { VoltageField } from "./VoltageField";

const services = [
  { n: "01", title: "Projetos de engenharia", tag: "ART • Média tensão", icon: "⌁", copy: "Da viabilidade ao projeto executivo, com documentação para concessionárias." },
  { n: "02", title: "Cabines e subestações", tag: "Implantação • Retrofit", icon: "▱", copy: "Soluções para modernizar, ampliar e proteger sua distribuição de energia." },
  { n: "03", title: "Manutenção preventiva", tag: "Planos • Inspeções", icon: "⌕", copy: "Rotinas técnicas que antecipam falhas e preservam disponibilidade." },
  { n: "04", title: "Ensaios elétricos", tag: "Laudos • Instrumentação", icon: "∿", copy: "Medições e testes que comprovam a integridade dos equipamentos." },
  { n: "05", title: "Relés de proteção", tag: "Ajustes • Seletividade", icon: "⌾", copy: "Proteção coordenada para que uma ocorrência não pare toda a operação." },
  { n: "06", title: "SPDA e aterramento", tag: "NBR 5419 • ART", icon: "ϟ", copy: "Inspeção, adequação e laudos para proteção contra descargas." },
  { n: "07", title: "Termografia", tag: "Diagnóstico • Prevenção", icon: "◉", copy: "Enxergue aquecimentos anormais antes que eles causem uma parada." },
  { n: "08", title: "Eficiência energética", tag: "Medição • Otimização", icon: "↯", copy: "Análise técnica para transformar consumo em decisão operacional." },
];

const standards = ["NR-10", "NR-35", "NBR 5410", "NBR 14039", "NBR 5419"];
const process = [
  ["01", "Entendemos o cenário", "Levantamento técnico, necessidade e grau de urgência."],
  ["02", "Diagnosticamos com precisão", "Inspeções, ensaios, medições e análise de risco."],
  ["03", "Executamos e documentamos", "Solução, comissionamento, ART e relatório técnico."],
];

type Brief = { service: string; urgency: string; installation: string; city: string; name: string; company: string; phone: string; detail: string };
const initialBrief: Brief = { service: "", urgency: "", installation: "", city: "", name: "", company: "", phone: "", detail: "" };

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? scrollY / max : 0);
    };
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    onScroll(); addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); reveal.disconnect(); };
  }, []);

  const selectedService = useMemo(() => services.find((item) => item.title === brief.service)?.title || "", [brief.service]);
  const update = (key: keyof Brief, value: string) => setBrief((prev) => ({ ...prev, [key]: value }));
  const next = () => setStep((current) => Math.min(current + 1, 4));
  const previous = () => setStep((current) => Math.max(current - 1, 1));
  const submitBrief = (event: FormEvent) => {
    event.preventDefault();
    const text = `Olá, Shelby! Quero solicitar um orçamento.%0A%0A*Serviço:* ${brief.service}%0A*Urgência:* ${brief.urgency}%0A*Instalação:* ${brief.installation}%0A*Cidade:* ${brief.city}%0A*Nome:* ${brief.name}%0A*Empresa:* ${brief.company || "Não informado"}%0A*Telefone:* ${brief.phone}%0A*Detalhes:* ${brief.detail || "Não informado"}`;
    window.open(`https://wa.me/5511989283393?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main style={{ "--scroll-progress": progress } as CSSProperties}>
      <div className="scroll-line" style={{ transform: `scaleX(${progress})` }} />
      <nav className="nav">
        <a className="brand" href="#inicio" aria-label="Shelby Eletromecânica"><img src="/assets/shelby-logo.png" alt="" /><span>SHELBY<small>ELETROMECÂNICA</small></span></a>
        <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A empresa</a><a href="#servicos" onClick={() => setMenuOpen(false)}>Soluções</a><a href="#metodo" onClick={() => setMenuOpen(false)}>Método</a><a href="#seguranca" onClick={() => setMenuOpen(false)}>Segurança</a>
          <a className="nav-cta" href="#diagnostico" onClick={() => setMenuOpen(false)}>Diagnóstico técnico <b>↗</b></a>
        </div>
      </nav>

      <section className="hero hero-immersive" id="inicio">
        <VoltageField />
        <div className="hero-noise" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-topline"><span>CAIEIRAS • SÃO PAULO</span><span>ENGENHARIA EM CAMPO</span><span>ATENDIMENTO 24H</span></div>
        <div className="hero-logo-wrap" aria-label="Shelby Eletromecânica">
          <span className="logo-coordinate c1">00° 00&apos; 00&quot; S</span><span className="logo-coordinate c2">ENERGIA / 03</span>
          <div className="logo-aura" /><img className="hero-logo-preserved" src="/assets/shelby-logo.png" alt="Logo Shelby Eletromecânica" />
          <span className="logo-ring ring-a" /><span className="logo-ring ring-b" />
        </div>
        <div className="hero-copy immersive-copy">
          <p><b>Potência crítica.</b> Engenharia, manutenção e proteção para operações que não podem parar.</p>
          <div className="hero-actions"><a className="btn-primary" href="#diagnostico">Começar diagnóstico <span>↗</span></a><a className="btn-link" href="#servicos"><i>↓</i> Explorar soluções</a></div>
        </div>
        <div className="hero-foot"><span><b>24H</b> Emergência elétrica</span><span className="scroll-hint">Desça e mova o cursor <i /></span><span>SCROLL PARA ATIVAR O CAMPO</span></div>
      </section>

      <section className="trust-strip" aria-label="Diferenciais"><div><b>01</b><span>Segurança<br />operacional</span></div><div><b>02</b><span>Confiabilidade<br />técnica</span></div><div><b>03</b><span>Redução de<br />custos</span></div><div><b>04</b><span>Atendimento<br />especializado</span></div><div><b>05</b><span>Conformidade<br />técnica</span></div></section>

      <section className="intro section" id="empresa">
        <div className="section-index reveal">01 — A EMPRESA</div>
        <div className="intro-grid"><h2 className="reveal">Potência para<br />manter sua operação<br /><em>em movimento.</em></h2><div className="intro-copy reveal"><p>A Shelby é especializada em engenharia elétrica, manutenção eletromecânica e soluções para sistemas de média e baixa tensão.</p><p>Atuamos em campo, com postura técnica, agilidade e documentação para dar segurança a quem decide e continuidade a quem opera.</p><a href="#metodo" className="text-link">Ver como a Shelby atua <span>→</span></a></div></div>
        <div className="metrics reveal"><div><strong>24<sup>h</sup></strong><span>Prontos para<br />emergências</span></div><div><strong>360°</strong><span>Soluções do projeto<br />à manutenção</span></div><div><strong>100<sup>%</sup></strong><span>Compromisso com<br />normas e segurança</span></div></div>
      </section>

      <section className="operations-band"><p>INDÚSTRIAS <b>×</b> CONDOMÍNIOS <b>×</b> COMÉRCIOS <b>×</b> GALPÕES LOGÍSTICOS <b>×</b> INFRAESTRUTURA CRÍTICA</p></section>

      <section className="services section" id="servicos">
        <div className="section-head reveal"><div className="section-index">02 — SOLUÇÕES TÉCNICAS</div><h2>Engenharia que antecipa.<br /><em>Manutenção que protege.</em></h2><p>Da análise inicial à entrega do laudo, cada etapa é pensada para aumentar disponibilidade e reduzir risco.</p></div>
        <div className="service-grid">{services.map((service) => <a href="#diagnostico" className="service-card reveal" key={service.n} onClick={() => update("service", service.title)}><div className="card-top"><span>{service.n}</span><i>{service.icon}</i></div><div><h3>{service.title}</h3><p>{service.tag}</p><small>{service.copy}</small></div><b>↗</b></a>)}</div>
      </section>

      <section className="method section" id="metodo">
        <div className="method-intro reveal"><div className="section-index">03 — MÉTODO SHELBY</div><h2>Menos parada.<br /><em>Mais previsibilidade.</em></h2><p>Não é só executar: é entender a criticidade, priorizar o que traz risco real e devolver uma solução tecnicamente documentada.</p></div>
        <div className="process-list">{process.map(([number, title, copy]) => <article className="process-item reveal" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i>↗</i></article>)}</div>
      </section>

      <section className="evidence section"><div className="evidence-card evidence-dark reveal"><span>TERMOGRAFIA</span><strong>∆ 81°</strong><p>Mapeamento de aquecimentos anormais para agir antes de uma falha crítica.</p><i>CAMPO DE LEITURA ATIVO</i></div><div className="evidence-card evidence-light reveal"><span>PROTEÇÃO</span><h3>Uma ocorrência<br />não precisa parar<br /><em>toda a operação.</em></h3><p>Ajuste de relés e seletividade para isolar o problema e preservar o restante do sistema.</p></div><div className="evidence-card evidence-line reveal"><span>DOCUMENTAÇÃO</span><ul><li>ART emitida</li><li>Laudo técnico</li><li>Relatório fotográfico</li><li>Plano de ação</li></ul></div></section>

      <section className="safety" id="seguranca"><div className="safety-art"><div className="bolt">ϟ</div><div className="rings" /><span className="vertical">CONFORMIDADE TÉCNICA • PROTEÇÃO • CONTINUIDADE</span></div><div className="safety-copy reveal"><div className="section-index">04 — SEGURANÇA EM PRIMEIRO LUGAR</div><h2>Risco controlado.<br /><em>Operação protegida.</em></h2><p>Cada projeto segue procedimentos rigorosos, documentação técnica e as principais normas do setor elétrico.</p><div className="standard-list">{standards.map((standard) => <span key={standard}>{standard}</span>)}</div><ul><li><i>✓</i> Equipe especializada e qualificada</li><li><i>✓</i> Emissão de ART e relatórios técnicos</li><li><i>✓</i> Soluções personalizadas e sob medida</li></ul></div></section>

      <section className="diagnostic" id="diagnostico">
        <div className="diagnostic-head reveal"><div className="section-index">05 — DIAGNÓSTICO TÉCNICO</div><h2>Conte o cenário.<br /><em>A gente acelera o caminho.</em></h2><p>Em poucos passos, sua solicitação chega à equipe com contexto suficiente para direcionar o atendimento.</p></div>
        <form className="quote-form reveal" onSubmit={submitBrief}>
          <div className="quote-progress"><span>QUALIFICAÇÃO DE ATENDIMENTO</span><b>0{step} <i>/ 04</i></b><div><i style={{ width: `${step * 25}%` }} /></div></div>
          {step === 1 && <fieldset><legend>Qual serviço você precisa?</legend><div className="option-grid">{services.map((service) => <button type="button" className={brief.service === service.title ? "selected" : ""} onClick={() => update("service", service.title)} key={service.n}><span>{service.n}</span>{service.title}</button>)}</div><button type="button" className="form-next" onClick={next} disabled={!brief.service}>Continuar <b>→</b></button></fieldset>}
          {step === 2 && <fieldset><legend>Qual é a prioridade e o local?</legend><div className="form-split"><label>Urgência<select value={brief.urgency} onChange={(event) => update("urgency", event.target.value)} required><option value="">Selecione</option><option>Emergência — agora</option><option>Esta semana</option><option>Planejado / orçamento</option></select></label><label>Tipo de instalação<select value={brief.installation} onChange={(event) => update("installation", event.target.value)} required><option value="">Selecione</option><option>Indústria</option><option>Condomínio</option><option>Comércio</option><option>Subestação / cabine primária</option><option>Outro</option></select></label></div><label>Cidade da operação<input value={brief.city} onChange={(event) => update("city", event.target.value)} placeholder="Ex.: Caieiras, SP" required /></label><div className="form-nav"><button type="button" onClick={previous}>← Voltar</button><button type="button" className="form-next" onClick={next} disabled={!brief.urgency || !brief.installation || !brief.city}>Continuar <b>→</b></button></div></fieldset>}
          {step === 3 && <fieldset><legend>Com quem vamos falar?</legend><div className="form-split"><label>Seu nome<input value={brief.name} onChange={(event) => update("name", event.target.value)} placeholder="Nome e sobrenome" required /></label><label>Telefone / WhatsApp<input value={brief.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(11) 00000-0000" required /></label></div><label>Empresa <input value={brief.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa (opcional)" /></label><label>O que está acontecendo? <textarea value={brief.detail} onChange={(event) => update("detail", event.target.value)} placeholder="Descreva o cenário, equipamento ou necessidade." /></label><div className="form-nav"><button type="button" onClick={previous}>← Voltar</button><button type="button" className="form-next" onClick={next} disabled={!brief.name || !brief.phone}>Revisar pedido <b>→</b></button></div></fieldset>}
          {step === 4 && <fieldset className="brief-review"><legend>Seu atendimento está pronto para ser direcionado.</legend><div><span>SERVIÇO</span><b>{selectedService}</b></div><div><span>URGENCIA</span><b>{brief.urgency}</b></div><div><span>OPERAÇÃO</span><b>{brief.installation} — {brief.city}</b></div><div><span>CONTATO</span><b>{brief.name} — {brief.phone}</b></div><div className="form-nav"><button type="button" onClick={previous}>← Ajustar</button><button className="form-next" type="submit">Enviar no WhatsApp <b>↗</b></button></div>{sent && <p className="sent-confirmation">O WhatsApp foi aberto com todas as informações do atendimento.</p>}</fieldset>}
        </form>
      </section>

      <section className="emergency"><div className="emergency-flare" /><div className="section-index">ATENDIMENTO EMERGENCIAL 24H</div><h2>Seu sistema não pode parar.<br /><em>Nós também não.</em></h2><p>Fale direto com nossa equipe técnica.</p><a href="tel:+5511989283393" className="emergency-phone"><small>11</small> 98928-3393 <span>↗</span></a></section>

      <footer id="contato"><div className="footer-main"><div className="footer-brand"><img src="/assets/shelby-logo.png" alt="Shelby Eletromecânica" /><p>Energia com segurança,<br />confiabilidade e excelência técnica.</p></div><div className="footer-contact"><span>FALE COM A SHELBY</span><a href="tel:+5511989283393">(11) 98928-3393</a><a href="mailto:josuel@shelbyeletromecanica.com.br">josuel@shelbyeletromecanica.com.br</a></div><div className="footer-address"><span>BASE OPERACIONAL</span><p>Av. Aparecida, 465<br />Caieiras — SP</p><a href="#inicio">Voltar ao topo ↑</a></div></div><div className="footer-bottom"><span>© 2026 SHELBY ELETROMECÂNICA</span><span>ENGENHARIA ELÉTRICA • ELETROMECÂNICA • MÉDIA TENSÃO</span></div></footer>
      <a className="whatsapp" href="#diagnostico" aria-label="Fazer diagnóstico técnico"><span>DIAGNÓSTICO</span><b>↗</b></a>
    </main>
  );
}
