# 🐾 PetTrack — Compliance, Quality Assurance & Tests

> **FIAP Challenge 2026 · Clyvo Vet · 2TDS**  
> Moisés Waidemann · Gabriel Sbrana · Thiago Rodrigues

---

## 📋 Sobre esta entrega

Esta entrega corresponde à disciplina **Compliance, Quality Assurance & Tests** do Challenge FIAP 2026 em parceria com a **Clyvo Vet**. O objetivo é definir e apresentar a solução PetTrack por meio de um pitch estruturado e da modelagem arquitetural no padrão TOGAF/Archi, além de estabelecer critérios de qualidade, riscos e métricas de sucesso.

**Valor total:** 100 pontos (Pitch: 40 pts · Qualidade/Riscos/Métricas: 20 pts · TOGAF/Archi: 40 pts)

---

## 🚨 Problema identificado

A jornada de saúde animal no Brasil é episódica e reativa: o tutor só leva o pet ao veterinário em situações de urgência, sem manter vínculo contínuo com a clínica. Isso gera baixa fidelidade de ambos os lados — a clínica perde recorrência, o tutor perde a referência de cuidado e o pet tem sua saúde comprometida pela falta de prevenção.

Agravando o problema, não existe histórico clínico centralizado do animal. Cada consulta começa do zero — sem acesso a diagnósticos anteriores, medicamentos usados, histórico vacinal ou exames passados. O veterinário fica sem base para tomar decisões com segurança, aumentando o risco de erros e diagnósticos tardios.

Esse é um problema sistêmico do mercado pet brasileiro — R$68 bilhões em 2024, 168 milhões de pets — onde a digitalização ainda é incipiente e a ausência de dados longitudinais prejudica tanto a saúde do animal quanto a sustentabilidade do negócio veterinário.

---

## 💡 Solução — PetTrack

O **PetTrack** é o sistema operacional da saúde contínua do pet. Transforma a jornada de episódica e reativa para contínua, preventiva e inteligente, conectando tutor, pet e clínica em uma única plataforma.

### Objetivos

- Criar um **Health Score longitudinal** (0–100) que evolui com o histórico clínico do pet
- Engajar o tutor de forma contínua via alertas proativos antes dos problemas acontecerem
- Fornecer ao veterinário um histórico completo e estruturado do animal em cada consulta
- Aumentar a recorrência e o LTV das clínicas parceiras via modelo B2B2C

### Funcionalidades principais

| Categoria | Funcionalidade |
|---|---|
| Preventivo | Calendário vacinal, alertas de vermífugo, check-ups por fase de vida |
| Terapêutico | Adesão medicamentosa, acompanhamento pós-operatório, alertas de retorno |
| Inteligência | Health Score 0–100, risco preditivo, recomendações personalizadas por raça |
| Bem-estar | Análise corporal por foto (BCS 1–9) via visão computacional |
| IoT | Monitoramento de atividade e temperatura via collar ESP32 |
| Clínica | Dashboard com KPIs, CRM de pacientes, painel de alertas de risco |

### Requisitos atendidos

- **REQ-01** Health Score Longitudinal — score dinâmico por histórico, comportamento e IoT
- **REQ-02** Alertas Proativos — push app + WhatsApp como canal fallback
- **REQ-03** App Mobile — React Native + Expo (iOS e Android)
- **REQ-04** Painel Clínico — dashboard com KPIs, alertas e CRM
- **REQ-05** BCS por Foto — análise corporal via Claude Vision API
- **REQ-06** IoT Collar — ESP32 Wokwi + MQTT TLS + HiveMQ
- **REQ-07** API REST — Java Spring Boot com Swagger
- **REQ-08** Oracle DB em 3FN — 13 tabelas + PL/SQL

---

## 📊 Benchmarking competitivo

| Funcionalidade | PetTrack | Petlove Saúde | VetSmart | Petpass |
|---|:---:|:---:|:---:|:---:|
| Health Score Longitudinal | ✅ | ❌ | ❌ | ❌ |
| IA Preditiva | ✅ | ❌ | ❌ | ❌ |
| Histórico Clínico Completo | ✅ | ❌ | Parcial | ❌ |
| Painel para Clínica | ✅ | ✅ | ✅ | ❌ |
| Visão Computacional (BCS) | ✅ | ❌ | ❌ | ❌ |
| Alertas Proativos | ✅ | Parcial | ❌ | ✅ |
| Modelo B2B2C | ✅ | ❌ | ✅ | ❌ |
| IoT / Collar | ✅ | ❌ | ❌ | ❌ |

### Diferenciais competitivos

- **Health Score único no mercado** — indicador longitudinal 0–100 que nenhum concorrente oferece
- **IA preditiva, não reativa** — identifica risco de abandono antes de acontecer
- **Modelo B2B2C escalável** — clínica paga, tutor usa; distribuição de baixo custo de aquisição
- **Visão computacional acessível** — BCS por foto disponível para qualquer tutor via smartphone
- **Dados como ativo estratégico** — longitudinalidade gera base única de saúde animal

---

## ✅ Critérios de Qualidade

| Dimensão | Critério |
|---|---|
| **Performance** | Tempo de resposta da API < 500ms · Análise BCS < 10s |
| **Segurança** | HTTPS em todas as rotas · MQTT com TLS · Fotos não persistidas após análise |
| **Usabilidade** | Onboarding do tutor em menos de 3 minutos · NPS ≥ 55 |
| **Disponibilidade** | Uptime ≥ 99,5% (Azure SLA) |
| **Manutenibilidade** | Separação em camadas (Mobile / API / Banco / IA) · Documentação Swagger |

---

## ⚠️ Principais Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Baixa adesão do tutor ao app | Alto — sem engajamento o health score não evolui | WhatsApp como canal fallback para alertas críticos |
| Dependência da Claude Vision API | Médio — indisponibilidade da API paralisa o BCS | Fallback para modelo local TensorFlow + OpenCV |
| Latência MQTT em regiões remotas | Médio — dados do collar chegam atrasados | Buffer local no ESP32 para envio assíncrono |
| Adoção lenta por clínicas | Alto — sem clínicas, sem usuários | Plano Starter a R$297/mês com baixo atrito de entrada |
| Perda de dados do Oracle FIAP | Alto — banco externo sem backup gerenciado pelo grupo | Scripts de seed e PL/SQL documentados para recriação |

---

## 📈 Métricas de Sucesso

| Métrica | Meta |
|---|---|
| Retenção de tutores em 90 dias | ≥ 65% |
| LTV por pet vs clínica sem plataforma | +40% |
| Adesão vacinal monitorada | ≥ 78% |
| NPS do tutor | ≥ 55 |
| Health Score accuracy | ≥ 82% |
| Adesão medicamentosa | ≥ 72% |
| Redução do intervalo médio entre consultas | -35% |

---

## 🗺️ Roadmap

### Sprint 1 + 2 — 1º Semestre 2026 (entrega: 24/05)

- [x] API REST completa (CRUD de pets, tutores, clínicas, eventos, protocolos)
- [x] Modelagem Oracle DB em 3FN + PL/SQL procedures
- [x] App mobile com 5 telas navegáveis (React Native + Expo)
- [x] Deploy Azure VM + Docker Compose
- [x] Protótipo IoT (ESP32 Wokwi + MQTT TLS + Node-RED)
- [x] Protótipo BCS por foto (Python FastAPI + Claude Vision)
- [x] Pitch completo com TOGAF/Archi

### Sprint 3 + 4 — 2º Semestre 2026

- [ ] Health Score Engine completo
- [ ] Dashboard web para clínicas (React/Next.js)
- [ ] Integração WhatsApp Business API
- [ ] CRM inteligente com segmentação de tutores
- [ ] Modelo de visão computacional real (TensorFlow treinado)
- [ ] Testes automatizados e documentação final

---

## 🏗️ Arquitetura TOGAF

A arquitetura foi modelada no padrão **TOGAF/ArchiMate 3.1** com 4 visões:

| Visão | Foco | Elementos |
|---|---|---|
| Architecture Vision | Perspectiva estratégica e requisitos | Stakeholders, Drivers, Goals, Requirements, Principles |
| Business Architecture | Mudança no processo da Clyvo Vet | Business Actors, Processes, Functions, Events, Objects |
| Application Architecture | Componentes de software e comunicações | Application Components, Services, Data Objects |
| Technology Architecture | Infraestrutura e stack tecnológica | Nodes, Devices, System Software, Tech Services, Networks |

O arquivo `.archimate` com o modelo completo (193 elementos, 4 views com layout visual) está incluído no `.zip` de entrega.

---

## 💰 Modelo de Negócio

| Plano | Preço | Público-alvo | Benefícios |
|---|---|---|---|
| Starter | R$ 297/mês | Clínicas pequenas | Até 200 pets · Alertas automáticos · Calendário vacinal |
| Pro | R$ 597/mês | Clínicas médias e grandes | Pets ilimitados · IA preditiva · CRM · BCS por foto |
| Enterprise | Custom | Redes e hospitais | Multi-unidade · API de integração · Produto de dados |

**Receitas adicionais:** revenue share em agendamentos · marketplace pet · dados anonimizados (B2B2D)

---

## 📦 Entregáveis desta disciplina

```
QA_PetTrack.zip
├── pitch.pdf              → Slides completos do projeto (12 slides)
├── togaf.pdf              → Documento de referência TOGAF com as 4 visões
├── PetTrack.archimate     → Arquivo para importar direto no Archi
└── integrantes.txt        → Nome e RM dos integrantes
```

---

## 👥 Integrantes

Nome | RM
--- | ---
Thiago Rodrigues da Mota | 563650
Moisés Waidemann Molinillo Júnior | 563719
Gabriel Sbrana Campos | 565849
Richard Freitas | 566127


> **Turma:** 2TDS · **Semestre:** 1º Semestre 2026 · **Parceiro:** Clyvo Vet
