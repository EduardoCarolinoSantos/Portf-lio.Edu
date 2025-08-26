# Portfólio — Eduardo Carolino

Site pessoal focado em **automação**, **integrações (SOAP/REST)**, **web** e **DevOps**, com visual tech premium e CTA para contato direto por **WhatsApp** e **LinkedIn**.

> **Demo local**: basta abrir `index.html` ou servir a pasta em um servidor estático (ver [Como rodar localmente](#como-rodar-localmente)).

---

## ✨ Destaques

- **Design profissional**: dark theme com gradientes, glassmorphism, grid sutil e microinterações.
- **Seções completas**: Sobre, Tecnologias (com logos), Qualidades, Serviços, Cases, Resultados, Depoimentos, Portfólio e Contato.
- **CTA sempre visível**: botão **WhatsApp flutuante** (canto inferior direito).
- **Acessibilidade e SEO**: textos alternativos, OG tags, semântica básica e responsivo.
- **Leve e sem build**: HTML, CSS e JS puros, prontos para qualquer hospedagem estática.

---

## 🗂 Estrutura de pastas
/
├─ index.html
├─ README.md
├─ css/
│ └─ style.css
├─ js/
│ └─ main.js
└─ img/
├─ Eduardo.svg.jpg
├─ portfolio.png
├─ programa1.jpg
├─ Programa2.jpg
├─ programa4.jpg
├─ zabbix.png
├─ microsoft365.jpg
├─ whatsapp.png
└─ (outros logos/imagens do portfólio)

▶️ Como rodar localmente
Opção 1 — Abrir direto

Clique duas vezes em index.html (funciona, mas sem servidor local alguns recursos podem ser limitados).

Opção 2 — Servidor simples (recomendado)

Python 3

# macOS / Linux
python3 -m http.server 5173

# Windows (PowerShell)
py -m http.server 5173


Acesse: http://localhost:5173

Node (serve)

npx serve .