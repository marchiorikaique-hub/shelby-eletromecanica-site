"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { VoltageField } from "./VoltageField";

declare const __BASE_PATH__: string;

const process = [
  ["Entendemos o cenário", "Levantamento técnico, necessidade e grau de urgência."],
  ["Diagnosticamos com precisão", "Inspeções, ensaios, medições e análise de risco."],
  ["Executamos e documentamos", "Solução, comissionamento, ART e relatório técnico."],
];
const services = [
  { title: "Projetos de engenharia", tag: "ART • Média tensão", icon: "⌁", copy: "Da viabilidade ao projeto executivo, com documentação para concessionárias." },
  { title: "Cabines e subestações", tag: "Implantação • Retrofit", icon: "▱", copy: "Soluções para modernizar, ampliar e proteger sua distribuição de energia." },
  { title: "Manutenção preventiva", tag: "Planos • Inspeções", icon: "⌕", copy: "Rotinas técnicas que antecipam falhas e preservam disponibilidade." },
  { title: "Ensaios elétricos", tag: "Laudos • Instrumentação", icon: "∿", copy: "Medições e testes que comprovam a integridade dos equipamentos." },
  { title: "Relés de proteção", tag: "Ajustes • Seletividade", icon: "⌾", copy: "Proteção coordenada para que uma ocorrência não pare toda a operação." },
  { title: "SPDA e aterramento", tag: "Proteção • ART", icon: "ϟ", copy: "Inspeção, adequação e laudos para proteção contra descargas." },
  { title: "Termografia", tag: "Diagnóstico • Prevenção", icon: "◉", copy: "Enxergue aquecimentos anormais antes que eles causem uma parada." },
  { title: "Eficiência energética", tag: "Medição • Otimização", icon: "◔", copy: "Análise técnica para transformar consumo em decisão operacional." },
];

type Brief = { service: string; urgency: string; installation: string; city: string; name: string; company: string; phone: string; detail: string };
const initialBrief: Brief = { service: "", urgency: "", installation: "", city: "", name: "", company: "", phone: "", detail: "" };

export default function ShelbyExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useState<Brief>(initialBrief);
  const [sent, setSent] = useState(false);
  const assetPrefix = __BASE_PATH__;
  const asset = (path: string) => `${assetPrefix}${path}`;

  useEffect(() => {
    let ticking = false;
    const apply = () => {
      const el = mainRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - innerHeight;
        el.style.setProperty("--sp", String(max ? scrollY / max : 0));
        el.style.setProperty("--scene", String(Math.min(scrollY / (innerHeight * 1.15), 1)));
      }
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    // Pause the hero's WebGL field and CSS animations once it scrolls off screen.
    const hero = document.querySelector(".hero");
    const heroIdle = new IntersectionObserver(
      ([e]) => hero?.classList.toggle("is-idle", !e.isIntersecting),
      { threshold: 0 }
    );
    if (hero) heroIdle.observe(hero);
    apply(); addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); reveal.disconnect(); heroIdle.disconnect(); };
  }, []);

  const selectedService = useMemo(() => services.find((item) => item.title === brief.service)?.title || "", [brief.service]);
  const update = (key: keyof Brief, value: string) => setBrief((prev) => ({ ...prev, [key]: value }));
  const previous = () => setStep((current) => Math.max(current - 1, 1));
  const chooseService = (service: string) => { update("service", service); setStep(2); };
  const advanceFromLocation = () => { if (brief.urgency && brief.installation && brief.city.trim().length > 2) setStep(3); };
  const advanceFromContact = () => { if (brief.name.trim() && brief.phone.trim().length > 7) setStep(4); };
  const submitBrief = (event: FormEvent) => {
    event.preventDefault();
    const text = `Olá, Shelby! Quero solicitar um orçamento.%0A%0A*Serviço:* ${brief.service}%0A*Urgência:* ${brief.urgency}%0A*Instalação:* ${brief.installation}%0A*Cidade:* ${brief.city}%0A*Nome:* ${brief.name}%0A*Empresa:* ${brief.company || "Não informado"}%0A*Telefone:* ${brief.phone}%0A*Detalhes:* ${brief.detail || "Não informado"}`;
    window.open(`https://wa.me/5511989283393?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main ref={mainRef}>
      <div className="scroll-line" />
      <nav className="nav">
        <a className="brand" href="#inicio" aria-label="Shelby Eletromecânica"><img src={asset("/assets/shelby-logo.png")} alt="" /><span>SHELBY<small>ELETROMECÂNICA</small></span></a>
        <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A empresa</a><a href="#servicos" onClick={() => setMenuOpen(false)}>Soluções</a><a href="#metodo" onClick={() => setMenuOpen(false)}>Método</a><a href="#seguranca" onClick={() => setMenuOpen(false)}>Segurança</a>
          <a className="nav-cta" href="#diagnostico" onClick={() => setMenuOpen(false)}>Diagnóstico técnico</a>
        </div>
      </nav>

      <section className="hero hero-immersive" id="inicio">
        <VoltageField />
        <div className="hero-noise" /><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
        <div className="hero-topline"><span>CAIEIRAS • SÃO PAULO</span><span>ENGENHARIA EM CAMPO</span><span>PLANTÃO EMERGENCIAL</span></div>
        <div className="transformer-stage" aria-hidden="true">
          <img className="transformer transformer-left" src={asset("/assets/transformer-left.png")} alt="" />
          <img className="transformer transformer-right" src={asset("/assets/transformer-right.png")} alt="" />
          <div className="electric-arc arc-left"><i /><i /><i /></div>
          <div className="electric-arc arc-right"><i /><i /><i /></div>
          <div className="electric-flash" />
        </div>
        <div className="hero-logo-wrap" aria-label="Shelby Eletromecânica">
          <span className="logo-coordinate c1">CAMPO ENERGIZADO</span><span className="logo-coordinate c2">ENERGIA EM MOVIMENTO</span>
          <div className="logo-aura" /><img className="hero-logo-preserved" src={asset("/assets/shelby-logo.png")} alt="Logo Shelby Eletromecânica" /><img className="hero-logo-head" src={asset("/assets/shelby-logo.png")} alt="" aria-hidden="true" />
          <span className="logo-ring ring-a" /><span className="logo-ring ring-b" />
        </div>
        <div className="hero-copy immersive-copy">
          <p><b>Potência crítica.</b> Engenharia, manutenção e proteção para operações que não podem parar.</p>
          <div className="hero-actions"><a className="btn-primary" href="#servicos">Explorar soluções</a><a className="btn-link" href="#diagnostico">Solicitar avaliação</a></div>
        </div>
        <div className="hero-foot"><span>Emergência elétrica</span><span className="scroll-hint">Desça e mova o cursor <i /></span><span>SCROLL PARA ATIVAR O CAMPO</span></div>
      </section>

      <section className="trust-strip" aria-label="Diferenciais"><div><span>Segurança<br />operacional</span></div><div><span>Confiabilidade<br />técnica</span></div><div><span>Redução de<br />custos</span></div><div><span>Atendimento<br />especializado</span></div><div><span>Conformidade<br />técnica</span></div></section>

      <section className="intro section" id="empresa">
        <div className="section-index reveal">A EMPRESA</div>
        <div className="intro-grid"><h2 className="reveal">Potência para<br />manter sua operação<br /><em>em movimento.</em></h2><div className="intro-copy reveal"><p>A Shelby é especializada em engenharia elétrica, manutenção eletromecânica e soluções para sistemas de média e baixa tensão.</p><p>Atuamos em campo, com postura técnica, agilidade e documentação para dar segurança a quem decide e continuidade a quem opera.</p><a href="#metodo" className="text-link">Ver como a Shelby atua</a></div></div>
        <div className="principles reveal"><span>Prontos para emergências</span><span>Soluções do projeto à manutenção</span><span>Compromisso com segurança</span></div>
      </section>

      <section className="operations-band"><p>INDÚSTRIAS <b>×</b> CONDOMÍNIOS <b>×</b> COMÉRCIOS <b>×</b> GALPÕES LOGÍSTICOS <b>×</b> INFRAESTRUTURA CRÍTICA</p></section>

      <section className="services section" id="servicos">
        <div className="section-head reveal"><div className="section-index">SOLUÇÕES TÉCNICAS</div><h2>Engenharia que antecipa.<br /><em>Manutenção que protege.</em></h2><p>Passe o cursor sobre cada placa para revelar a solução em campo.</p></div>
        <div className="plate-yard">{services.map((service) => <a href="#diagnostico" className="warning-plate reveal" key={service.title} onClick={() => chooseService(service.title)}><div className="plate-inner"><div className="plate-face plate-front"><i>{service.icon}</i><span>ÁREA TÉCNICA</span><h3>{service.title}</h3><b>VIRAR PLACA</b></div><div className="plate-face plate-back"><span>{service.tag}</span><p>{service.copy}</p><b>Solicitar avaliação</b></div></div></a>)}</div>
      </section>

      <section className="method section" id="metodo">
        <div className="method-intro reveal"><div className="section-index">MÉTODO SHELBY</div><h2>Menos parada.<br /><em>Mais previsibilidade.</em></h2><p>Não é só executar: é entender a criticidade, priorizar o que traz risco real e devolver uma solução tecnicamente documentada.</p></div>
        <div className="process-list">{process.map(([title, copy], i) => <article className="process-item reveal" key={title}><span>◈</span><div><h3>{title}</h3><p>{copy}</p></div><b className="process-step">{String(i + 1).padStart(2, "0")}</b></article>)}</div>
      </section>

      <section className="evidence section"><div className="evidence-card evidence-dark reveal"><span>TERMOGRAFIA</span><strong>CALOR<br />SOB CONTROLE</strong><p>Mapeamento de aquecimentos anormais para agir antes de uma falha crítica.</p><i>CAMPO DE LEITURA ATIVO</i></div><div className="evidence-card evidence-light reveal"><span>PROTEÇÃO</span><h3>Uma ocorrência<br />não precisa parar<br /><em>toda a operação.</em></h3><p>Ajuste de relés e seletividade para isolar o problema e preservar o restante do sistema.</p></div><div className="evidence-card evidence-line reveal"><span>DOCUMENTAÇÃO</span><ul><li>ART emitida</li><li>Laudo técnico</li><li>Relatório fotográfico</li><li>Plano de ação</li></ul></div></section>

      <section className="field-gallery section" id="obras"><div className="gallery-head reveal"><div className="section-index">OBRAS EM CAMPO</div><h2>Na prática,<br /><em>com a Shelby.</em></h2><p>Projetos, manutenção e ensaios registrados pela equipe em campo.</p></div><div className="photo-wall reveal"><div className="photo-slot slot-wide"><img className="work-photo" src={asset("/assets/obras/obra-06.jpg")} alt="Transformador atendido pela Shelby" /><span>TRANSFORMADOR EM CAMPO</span><i>OPERAÇÃO REAL</i></div><div className="photo-slot"><img className="work-photo" src={asset("/assets/obras/obra-04.jpg")} alt="Equipe trabalhando em painel elétrico" /><span>EQUIPE EM CAMPO</span><i>MANUTENÇÃO</i></div><div className="photo-slot"><img className="work-photo" src={asset("/assets/obras/obra-03.jpg")} alt="Ensaio em painel elétrico" /><span>ENSAIO ELÉTRICO</span><i>PRECISÃO</i></div><div className="photo-slot"><img className="work-photo" src={asset("/assets/obras/obra-05.jpg")} alt="Subestação elétrica" /><span>SUBESTAÇÃO</span><i>PROTEÇÃO</i></div><div className="photo-slot slot-tall"><img className="work-photo" src={asset("/assets/obras/obra-07.jpg")} alt="Técnico realizando diagnóstico" /><span>DIAGNÓSTICO</span><i>CAMPO</i></div></div></section>

      <section className="safety" id="seguranca"><div className="safety-art interactive-core"><div className="core-radiation"><i /><i /><i /><i /></div><div className="core-seal">ATIVAR</div><span className="vertical">CONFORMIDADE TÉCNICA • PROTEÇÃO • CONTINUIDADE</span></div><div className="safety-copy reveal"><div className="section-index">SEGURANÇA EM PRIMEIRO LUGAR</div><h2>Risco controlado.<br /><em>Operação protegida.</em></h2><p>Cada projeto segue procedimentos rigorosos, documentação técnica e normas aplicáveis ao seu cenário. Passe o cursor no núcleo ao lado.</p><div className="standard-list"><span>Procedimento técnico</span><span>Proteção operacional</span><span>Documentação rastreável</span></div><ul><li><i>✓</i> Equipe especializada e qualificada</li><li><i>✓</i> Emissão de ART e relatórios técnicos</li><li><i>✓</i> Soluções personalizadas e sob medida</li></ul></div></section>

      <section className="diagnostic" id="diagnostico">
        <div className="diagnostic-head reveal"><div className="section-index">ATENDIMENTO DIRECIONADO</div><h2>Conte o cenário.<br /><em>A gente acelera o caminho.</em></h2><p>Escolha o que precisa e a solicitação já chega com o contexto certo para a equipe.</p></div>
        <form className="quote-form reveal" onSubmit={submitBrief}>
          <div className="quote-progress"><span>QUALIFICAÇÃO DE ATENDIMENTO</span><b>{["Cenário", "Operação", "Contato", "Revisão"][step - 1]}</b><div><i style={{ width: `${step * 25}%` }} /></div></div>
          {step === 1 && <fieldset><legend>Qual serviço você precisa?</legend><div className="option-grid">{services.map((service) => <button type="button" className={brief.service === service.title ? "selected" : ""} onClick={() => chooseService(service.title)} key={service.title}>{service.title}</button>)}</div><p className="form-guidance">Escolha uma solução para seguir.</p></fieldset>}
          {step === 2 && <fieldset><legend>Qual é a prioridade e o local?</legend><div className="form-split"><label>Urgência<select value={brief.urgency} onChange={(event) => update("urgency", event.target.value)} required><option value="">Selecione</option><option>Emergência agora</option><option>Esta semana</option><option>Planejado / orçamento</option></select></label><label>Tipo de instalação<select value={brief.installation} onChange={(event) => update("installation", event.target.value)} required><option value="">Selecione</option><option>Indústria</option><option>Condomínio</option><option>Comércio</option><option>Subestação / cabine primária</option><option>Outro</option></select></label></div><label>Cidade da operação<input value={brief.city} onChange={(event) => update("city", event.target.value)} onBlur={advanceFromLocation} placeholder="Ex.: Caieiras, SP" required /></label><div className="form-nav"><button type="button" onClick={previous}>Voltar</button><span>Ao preencher a cidade, você avança.</span></div></fieldset>}
          {step === 3 && <fieldset><legend>Com quem vamos falar?</legend><div className="form-split"><label>Seu nome<input value={brief.name} onChange={(event) => update("name", event.target.value)} placeholder="Nome e sobrenome" required /></label><label>Telefone / WhatsApp<input value={brief.phone} onChange={(event) => update("phone", event.target.value)} onBlur={advanceFromContact} placeholder="(11) 00000-0000" required /></label></div><label>Empresa <input value={brief.company} onChange={(event) => update("company", event.target.value)} placeholder="Nome da empresa (opcional)" /></label><label>O que está acontecendo? <textarea value={brief.detail} onChange={(event) => update("detail", event.target.value)} placeholder="Descreva o cenário, equipamento ou necessidade." /></label><div className="form-nav"><button type="button" onClick={previous}>Voltar</button><span>Ao informar o telefone, você avança.</span></div></fieldset>}
          {step === 4 && <fieldset className="brief-review"><legend>Seu atendimento está pronto para ser direcionado.</legend><div><span>SERVIÇO</span><b>{selectedService}</b></div><div><span>URGENCIA</span><b>{brief.urgency}</b></div><div><span>OPERAÇÃO</span><b>{brief.installation} · {brief.city}</b></div><div><span>CONTATO</span><b>{brief.name} · {brief.phone}</b></div><div className="form-nav"><button type="button" onClick={previous}>Ajustar</button><button className="form-next" type="submit">Enviar no WhatsApp</button></div>{sent && <p className="sent-confirmation">O WhatsApp foi aberto com todas as informações do atendimento.</p>}</fieldset>}
        </form>
      </section>

      <section className="emergency"><div className="emergency-flare" /><div className="section-index">ATENDIMENTO EMERGENCIAL</div><h2>Seu sistema não pode parar.<br /><em>Nós também não.</em></h2><p>Fale direto com nossa equipe técnica.</p><a href="tel:+5511989283393" className="emergency-phone"><small>11</small> 98928-3393</a></section>

      <section className="scripture"><p>&ldquo;Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos.&rdquo;</p><span>Provérbios 16:3</span></section>

      <footer id="contato"><div className="footer-main"><div className="footer-brand"><img src={asset("/assets/shelby-logo.png")} alt="Shelby Eletromecânica" /><p>Energia com segurança,<br />confiabilidade e excelência técnica.</p></div><div className="footer-contact"><span>FALE COM A SHELBY</span><a href="#diagnostico">Solicitar avaliação</a><a href="mailto:josuel@shelbyeletromecanica.com">josuel@shelbyeletromecanica.com</a></div><div className="footer-address"><span>BASE OPERACIONAL</span><p>Av. Aparecida, 465<br />Caieiras, SP</p><a href="#inicio">Voltar ao topo</a></div></div><div className="footer-bottom"><span>SHELBY ELETROMECÂNICA</span><span>ENGENHARIA ELÉTRICA • ELETROMECÂNICA • MÉDIA TENSÃO</span></div></footer>
    </main>
  );
}
