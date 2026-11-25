---
name: Shelby Eletromecânica
description: Palco de energia na mesma gramática do site da Marchiotech, em roxo com amarelo raio.
colors:
  noite: "#0b0718"
  noite-2: "#150d2e"
  roxo: "#5b12c9"
  roxo-fundo: "#2c0a66"
  roxo-luz: "#9b5cff"
  lilas: "#d9ccff"
  claro: "#f1eef8"
  claro-2: "#e4def3"
  raio: "#ffe11a"
  tinta: "#150d2e"
  tinta-2: "#4a3d6b"
typography:
  family: "Archivo variable (Google Fonts), wdth 62..125, wght 400..900"
  display: "wdth 82, weight 800, line-height 1.02, tracking -0.02em, sentence case"
  h1: "clamp(2.5rem, 1.4rem + 3.6vw, 4.6rem)"
  h2: "clamp(2.1rem, 1.3rem + 3vw, 3.6rem)"
  h3: "clamp(1.45rem, 1.1rem + 1.3vw, 2.2rem)"
  body: "1rem / 1.55"
  marquee: "wdth 75, weight 900, outline stroke, 4.5rem..10.5rem"
radius: { lg: 32px, md: 20px, pill: 99px }
---

# Shelby Eletromecânica: design system

## Overview
Site de uma página que vende atendimento elétrico de média e baixa tensão e leva o visitante ao WhatsApp (11) 98928-3393. A linguagem é a mesma do site da Marchiotech (pedido do Kaique em 25/11/2026): um palco escuro onde a caveira da marca sobe na luz, seguido de faixas de serviço coloridas e uma vitrine de obras reais. A cor é comprometida: roxo ocupa campos inteiros e o amarelo raio aparece só onde há ação.

## Colors
- **Noite `#0b0718`**: chão do palco e da vitrine de obras.
- **Roxo `#5b12c9`**: cor dominante. Faixas de serviço, fechamento da página e o brilho atrás da foto do "quem faz".
- **Roxo fundo `#2c0a66`**: terceira faixa de serviço e a palavra gigante SHELBY no rodapé.
- **Claro `#f1eef8`**: respiro, nas seções de serviços e de "quem faz".
- **Amarelo raio `#ffe11a`**: só em botão de WhatsApp, faixa corrida, raios decorativos, `em` dos títulos e foco. Nunca é fundo de texto corrido, com exceção da faixa corrida.
- Texto secundário sobre escuro em `#c9bfe8` ou `#d9ccff`, nunca cinza.

## Typography
Uma família só, Archivo variável. Títulos condensados (`wdth` 82) em peso 800, frases curtas em caixa normal. O letreiro do palco usa `wdth` 75, peso 900, só contorno.

## Layout
- Largura máxima 1280 a 1340px, respiro lateral `clamp(18px, 4vw, 56px)`.
- Palco em 3 colunas (texto, caveira, fotos). Abaixo de 1080px fica em 2 e abaixo de 760px empilha, com a caveira em cima.
- As faixas de serviço são um grid texto e foto que vira uma coluna no celular, com a foto em cima.
- O ritmo de seções segue a ordem noite, amarelo, claro, noite, claro, roxo.

## Motion
- **Palco:** pilares de luz entram com escala vertical escalonada, a poeira sobe num canvas (amarelo, lilás, roxo, branco) e segue o mouse, o letreiro corre em 46s, a caveira surge com clip-path de baixo pra cima e o anel amarelo varre o pedestal.
- **Fotos do palco:** giram a cada 3,6s, com profundidade 3D e zoom lento na foto ativa.
- **Parallax:** pela variável `--p` (0 a 1) ao rolar o palco.
- **Seções:** sobem com `.surge`, armado pela classe `anima` no html (sem JS tudo fica visível).
- **Interações:** a foto da faixa endireita no hover. A vitrine arrasta com inércia e também anda pelas setas.
- **Movimento reduzido:** desliga tudo.

## Components
- **Nav:** pílula de vidro fixa no topo, com caveira pequena, 3 âncoras e botão amarelo. No celular vira um menu sanfona.
- **Botões:**
  - `.btn-raio`: amarelo, ação principal;
  - `.btn-vidro`: secundário sobre escuro;
  - `.btn-roxo`: ação sobre claro.
- **Banda:** card de 32px de raio com brilho radial e foto inclinada (`rotateY -14deg`). A pílula "Quero isso" fica amarela no hover e abre o WhatsApp com o serviço já escrito.
- **Peça da vitrine:** foto 4:5 com legenda de título e nota.
- **Dock:** botão amarelo fixo no celular, que só aparece depois que o CTA do palco sai da tela.

## Image provenance
- `public/assets/v2/*.webp`: fotos reais de obra enviadas pela Shelby Eletromecânica, redimensionadas para WebP. Não são geradas por IA nem de banco de imagem.
- `caveira.webp` e `caveira-mini.webp`: o logo oficial (`public/assets/shelby-logo.png`) redimensionado.
- Cada arquivo tem um `.json` ao lado com a origem.
- `grupo-gerador` e `projeto-eletrico` foram retirados por parecerem foto de banco.

## Do's and Don'ts
- **Faça:**
  - cada foto num lugar só;
  - todo CTA leva ao WhatsApp;
  - caveira grande no topo, sempre.
- **Não faça:**
  - laranja, verde ou teal;
  - travessão ou " - " no texto;
  - rótulo pequeno em cima de título;
  - número de seção;
  - sombra dura deslocada;
  - foto que não seja obra real da Shelby;
  - inventar número, cliente ou depoimento.
