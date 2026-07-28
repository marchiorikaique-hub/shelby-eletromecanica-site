"use client";

import { useEffect, useState } from "react";

const services = [
  { n: "01", title: "Projetos de engenharia", tag: "ART • Média tensão", icon: "⌁" },
  { n: "02", title: "Cabines e subestações", tag: "Implantação • Retrofit", icon: "▱" },
  { n: "03", title: "Manutenção preventiva", tag: "Planos • Inspeções", icon: "⌕" },
  { n: "04", title: "Ensaios elétricos", tag: "Laudos • Instrumentação", icon: "∿" },
  { n: "05", title: "Relés de proteção", tag: "Ajustes • Seletividade", icon: "⌾" },
  { n: "06", title: "SPDA e aterramento", tag: "NBR 5419 • ART", icon: "ϟ" },
  { n: "07", title: "Termografia", tag: "Diagnóstico • Prevenção", icon: "◉" },
  { n: "08", title: "Eficiência energética", tag: "Medição • Otimização", icon: "↯" },
];

const standards = ["NR-10", "NR-35", "NBR 5410", "NBR 14039", "NBR 5419"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      setProgress(max ? scrollY / max : 0);
    };
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      reveal.disconnect();
    };
  }, []);

  return (
    <main>
      <div className="scroll-line" style={{ transform: `scaleX(${progress})` }} />
      <nav className="nav">
        <a className="brand" href="#inicio" aria-label="Shelby Eletromecânica">
          <img src="/assets/shelby-logo.png" alt="" />
          <span>SHELBY<small>ELETROMECÂNICA</small></span>
        </a>
        <button className="menu-toggle" aria-label="Abrir menu" onClick={() => setMenuOpen(!menuOpen)}>
          <i /><i />
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#empresa" onClick={() => setMenuOpen(false)}>A empresa</a>
          <a href="#servicos" onClick={() => setMenuOpen(false)}>Serviços</a>
          <a href="#seguranca" onClick={() => setMenuOpen(false)}>Segurança</a>
          <a className="nav-cta" href="#contato" onClick={() => setMenuOpen(false)}>Solicitar orçamento <b>↗</b></a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-noise" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="eyebrow"><span /> Energia com responsabilidade <span /></div>
        <div className="logo-stage" aria-label="Shelby Eletromecânica">
          <div className="electric-line left"><i /><i /><i /></div>
          <img className="hero-logo ghost" src="/assets/shelby-logo.png" alt="" />
          <div className="logo-slice slice-top"><img src="/assets/shelby-logo.png" alt="" /></div>
          <div className="logo-slice slice-mid"><img src="/assets/shelby-logo.png" alt="" /></div>
          <div className="logo-slice slice-bottom"><img src="/assets/shelby-logo.png" alt="Logo Shelby Eletromecânica" /></div>
          <div className="electric-line right"><i /><i /><i /></div>
        </div>
        <div className="hero-copy">
          <p>Engenharia elétrica, eletromecânica e média tensão para operações que não podem parar.</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#contato">Solicitar orçamento <span>↗</span></a>
            <a className="btn-link" href="#servicos"><i>↓</i> Conheça nossas soluções</a>
          </div>
        </div>
        <div className="hero-foot">
          <span><b>24H</b> Atendimento emergencial</span>
          <span className="scroll-hint">Role para explorar <i /></span>
          <span>Caieiras <b>SP</b></span>
        </div>
      </section>

      <section className="trust-strip" aria-label="Diferenciais">
        <div><b>01</b><span>Segurança<br />operacional</span></div>
        <div><b>02</b><span>Confiabilidade<br />técnica</span></div>
        <div><b>03</b><span>Redução de<br />custos</span></div>
        <div><b>04</b><span>Atendimento<br />especializado</span></div>
        <div><b>05</b><span>Conformidade<br />técnica</span></div>
      </section>

      <section className="intro section" id="empresa">
        <div className="section-index reveal">01 — A EMPRESA</div>
        <div className="intro-grid">
          <h2 className="reveal">Potência para<br />manter sua operação<br /><em>em movimento.</em></h2>
          <div className="intro-copy reveal">
            <p>A Shelby é especializada em engenharia elétrica, manutenção eletromecânica e soluções para sistemas de média e baixa tensão.</p>
            <p>Atuamos com segurança, confiabilidade operacional e conformidade com as normas técnicas — atendendo indústrias, comércios, condomínios e empresas de diversos segmentos.</p>
            <a href="#servicos" className="text-link">Conheça nossa estrutura <span>→</span></a>
          </div>
        </div>
        <div className="metrics reveal">
          <div><strong>24<sup>h</sup></strong><span>Prontos para<br />emergências</span></div>
          <div><strong>360°</strong><span>Soluções do projeto<br />à manutenção</span></div>
          <div><strong>100<sup>%</sup></strong><span>Compromisso com<br />normas e segurança</span></div>
        </div>
      </section>

      <section className="services section" id="servicos">
        <div className="section-head reveal">
          <div className="section-index">02 — SOLUÇÕES TÉCNICAS</div>
          <h2>Engenharia que antecipa.<br /><em>Manutenção que protege.</em></h2>
          <p>Do diagnóstico ao comissionamento, entregamos soluções completas para a continuidade e segurança da sua operação.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <a href="#contato" className="service-card reveal" key={service.n}>
              <div className="card-top"><span>{service.n}</span><i>{service.icon}</i></div>
              <div>
                <h3>{service.title}</h3>
                <p>{service.tag}</p>
              </div>
              <b>↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="safety" id="seguranca">
        <div className="safety-art">
          <div className="bolt">ϟ</div>
          <div className="rings" />
          <span className="vertical">CONFORMIDADE TÉCNICA • PROTEÇÃO • CONTINUIDADE</span>
        </div>
        <div className="safety-copy reveal">
          <div className="section-index">03 — SEGURANÇA EM PRIMEIRO LUGAR</div>
          <h2>Risco controlado.<br /><em>Operação protegida.</em></h2>
          <p>Cada projeto segue procedimentos rigorosos, documentação técnica e as principais normas do setor elétrico.</p>
          <div className="standard-list">
            {standards.map((standard) => <span key={standard}>{standard}</span>)}
          </div>
          <ul>
            <li><i>✓</i> Equipe especializada e qualificada</li>
            <li><i>✓</i> Emissão de ART e relatórios técnicos</li>
            <li><i>✓</i> Soluções personalizadas e sob medida</li>
          </ul>
        </div>
      </section>

      <section className="emergency">
        <div className="emergency-flare" />
        <div className="section-index">ATENDIMENTO EMERGENCIAL 24H</div>
        <h2>Seu sistema não pode parar.<br /><em>Nós também não.</em></h2>
        <p>Fale direto com nossa equipe técnica.</p>
        <a href="tel:+5511989283393" className="emergency-phone"><small>11</small> 98928-3393 <span>↗</span></a>
      </section>

      <footer id="contato">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/assets/shelby-logo.png" alt="Shelby Eletromecânica" />
            <p>Energia com segurança,<br />confiabilidade e excelência técnica.</p>
          </div>
          <div className="footer-contact">
            <span>FALE COM A SHELBY</span>
            <a href="tel:+5511989283393">(11) 98928-3393</a>
            <a href="mailto:josuel@shelbyeletromecanica.com.br">josuel@shelbyeletromecanica.com.br</a>
          </div>
          <div className="footer-address">
            <span>BASE OPERACIONAL</span>
            <p>Av. Aparecida, 465<br />Caieiras — SP</p>
            <a href="#inicio">Voltar ao topo ↑</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 SHELBY ELETROMECÂNICA</span>
          <span>ENGENHARIA ELÉTRICA • ELETROMECÂNICA • MÉDIA TENSÃO</span>
        </div>
      </footer>

      <a className="whatsapp" href="https://wa.me/5511989283393?text=Olá%20Shelby,%20gostaria%20de%20solicitar%20um%20orçamento." aria-label="Falar pelo WhatsApp">
        <span>WHATSAPP</span><b>↗</b>
      </a>
    </main>
  );
}
