# 🐾 PetTrack — Compliance, Quality Assurance & Tests (Sprint 4)

> **FIAP Challenge 2026 · 2º Ano ADS (Turma 2TDS Fevereiro)**  
> **Disciplina:** Compliance, Quality Assurance & Tests — **4º Sprint**  
> **Repositório Base (Java Advanced):** [https://github.com/Challenge-PetTrack/JAVA-ADVANCED](https://github.com/Challenge-PetTrack/JAVA-ADVANCED)  
> **Parceiro de Negócio:** Clyvo Vet  
> **Branch Oficial de Entrega:** `develop`

---

## 👥 Integrantes do Grupo

| Nome Completo | RM |
| :--- | :--- |
| **Gabriel Sbrana Campos** | RM 565849 |
| **Moisés Waidemann** | RM 563719 |
| **Thiago Rodrigues da Mota** | RM 563650 |
| **Richard Freitas** | RM 566127 |

---

## 🔗 Links Oficiais de Entrega (Sprint 4)

> [!IMPORTANT]
> **Links Obrigatórios para Correção (Branch `develop`):**
> * 📋 **Link de Acesso ao Projeto no AZURE BOARDS / TEST PLANS:**  
>   👉 **[INSIRA_AQUI_O_LINK_DO_SEU_PROJETO_NO_AZURE_DEVOPS]** *(Ex: `https://dev.azure.com/Challenge-PetTrack/PetTrack` — Professor cadastrado com perfil **Basic** na Organização e **Project Administrator** no Projeto)*
> * 🎥 **Link do Vídeo de Demonstração da Automação de Testes (Configuração, Execução e Resultados):**  
>   👉 **[INSIRA_AQUI_O_LINK_DO_VIDEO_DE_AUTOMACAO]** *(YouTube / Loom demonstrando os casos de teste automatizados em execução)*
> * 💻 **Repositório da Aplicação Alvo (Java Advanced - Spring Boot 3.5.5 + Thymeleaf + Oracle):**  
>   👉 [https://github.com/Challenge-PetTrack/JAVA-ADVANCED](https://github.com/Challenge-PetTrack/JAVA-ADVANCED)

---

## 📂 Estrutura do Repositório de QA & Automação

```text
├── README.md                                              # Documento principal de entrega (Branch develop)
├── azure-boards/
│   └── azure_test_cases_import.csv                        # Arquivo CSV pronto para importação direta no Azure Boards / Test Plans
├── docs/
│   ├── PLANO_TESTES_MANUAIS.md                            # Parte A Completa: Objetivos, Entradas, Saídas e Procedimentos (CT-01 a CT-10)
│   ├── GUIA_CONFIGURACAO_AZURE_BOARDS.md                  # Passo a passo para permissões do professor (Basic + Admin) e importação
│   └── ROTEIRO_VIDEO_AUTOMACAO.md                         # Roteiro detalhado para gravação do vídeo da Parte B
└── automation/
    ├── selenium-ide/
    │   └── PetTrack-Automation-Suite.side                 # Projeto Record & Playback Selenium IDE (5 Casos de Teste E2E Web)
    ├── postman/
    │   ├── PetTrack-API-Tests.postman_collection.json     # Coleção Postman com 6 Casos de Teste Automatizados e scripts pm.test()
    │   └── PetTrack-Local.postman_environment.json        # Variáveis de ambiente controladas para o Postman Runner / Newman
    ├── jmeter/
    │   └── PetTrack-Performance-Stress.jmx                # Plano de Testes de Integração, Desempenho e Estresse no Apache JMeter
    └── playwright/
        └── pettrack-e2e-suite.cjs                         # Script automatizado Node.js/Playwright com gravação de vídeo e screenshots
```

---

## 🧪 PARTE A — Teste Manual de Software (Validação no Nível de Sistema)

O plano completo de testes manuais com **dados estritamente controlados** (variáveis predefinidas para *Input* e *Output Esperado*), alinhado ao Plano de Release e às tarefas da Sprint 4, encontra-se detalhado em [`docs/PLANO_TESTES_MANUAIS.md`](docs/PLANO_TESTES_MANUAIS.md) e pronto para importação no Azure Boards em [`azure-boards/azure_test_cases_import.csv`](azure-boards/azure_test_cases_import.csv).

### 📌 Resumo da Matriz de Testes Manuais Planejados (`CT-01` a `CT-10`)

| ID | Caso de Teste | Funcionalidade Coberta | Dados de Entrada Controlados (Input) | Dados de Saída Esperados (Output) |
| :--- | :--- | :--- | :--- | :--- |
| **CT-01** | Autenticação de Administrador e Redirecionamento | Spring Security (`/login` -> `/admin/dashboard`) | `email="admin@pettrack.com"`, `senha="admin123"` | Redirecionamento `302 -> 200 OK` para `/admin/dashboard`; exibe `"Painel Veterinário & Clínico"` e 4 cards de KPIs. |
| **CT-02** | Bloqueio de Segurança RBAC (Tutor em Rota Admin) | Spring Security (`/admin/pets` -> `/403`) | Login: `email="ana.silva@icloud.com"`, `senha="tutor123"`; Acesso a `/admin/pets` | Acesso bloqueado com exibição de `"403 - Acesso Negado"` e perfil atual `ROLE_TUTOR`. |
| **CT-03** | Cadastro de Novo Pet via Procedure Oracle | `AdminWebController` + `PKG_PETTRACK_CADASTRO.PRC_INSERT_PET` | `nome="Apollo QA"`, `especie="Cão"`, `raca="Pastor Alemão"`, `sexo="M"`, `idade=4.0`, `peso=28.50`, `tutor.id=1`, `clinica.id=1` | Redireciona para `/admin/pets`; banner `"Pet 'Apollo QA' cadastrado/atualizado com sucesso!"`; registro gravado em `TB_PET`. |
| **CT-04** | Validação de Campos Obrigatórios no Cadastro de Pet | Bean Validation (`@Valid Pet`) | `nome=""`, `especie=""`, `sexo=""`, `idade=-2.0`, `peso=-5.0` | Permanece no formulário sem erro 500; campos recebem classe `.is-invalid` e mensagens de obrigatoriedade. |
| **CT-05** | Simulador IoT — Cenário de Febre Crítica | Fluxo 1 (`TelemetriaCollarFluxoService`) | `idPet=1`, `temperatura=40.2`, `atividade=35.0`, `topicoMqtt="pettrack/collar/cenario-teste"` | Exibe `"ALERTA DE FEBRE GERADO"`, recalcula Health Score para `65.0 / 100` (`100 - 35`) e persiste alerta `FEBRE` + notificação `URGENTE`. |
| **CT-06** | Simulador IoT — Cenário de Sedentarismo | Fluxo 1 (`TelemetriaCollarFluxoService`) | `idPet=1`, `temperatura=38.0`, `atividade=10.0`, `topicoMqtt="pettrack/collar/cenario-teste"` | Exibe `"ALERTA DE SEDENTARISMO GERADO"`, recalcula Health Score para `80.0 / 100` (`100 - 20`) e persiste alerta `SEDENTARISMO`. |
| **CT-07** | Adesão Medicamentosa — Dose Administrada (`S`) | Fluxo 2 (`AdesaoMedicamentoFluxoService`) | `idMedicamento=1`, `dataDose="2026-10-29"`, `tomou="S"`, `observacao="Administrado junto com a ração da manhã sem rejeição."` | Mensagem `"Dose confirmada com sucesso! Taxa de adesão atualizada: <X>%."`; badge verde `Administrado` no histórico; sem alerta. |
| **CT-08** | Adesão Medicamentosa — Dose Esquecida (`N`) | Fluxo 2 (`AdesaoMedicamentoFluxoService`) | `idMedicamento=1`, `dataDose="2026-10-29"`, `tomou="N"`, `observacao="Tutor esqueceu de administrar no horário noturno."` | Mensagem `"Dose registrada como não administrada. Alerta veterinário gerado automaticamente."`; badge vermelho `Não Tomou` e alerta `ADESAO`. |
| **CT-09** | Geração e Persistência de Health Report Consolidado | Fluxo 3 (`HealthReportService` / `TB_HEALTH_REPORT`) | `idPet=1`, `POST /relatorios/pets/1/gerar` com token `_csrf` | Botão muda para `"Gerando relatório…"`; redireciona para `/relatorios/pets/1/{UUID}`; exibe `"Relatório gerado e salvo no histórico."` e 4 seções. |
| **CT-10** | Exportação JSON e Relatório de Subtotais Oracle | `PKG_PETTRACK_CONSULTA` (`/pet/exportar-json` e `/pet/relatorio-atividades`) | `GET /pet/exportar-json?especie=Cão` e `GET /pet/relatorio-atividades` | Retorna `200 OK` com anexo `pets.json` e relatório textual `text/plain` de subtotais calculados em PL/SQL. |

---

## 🤖 PARTE B — Automação de Testes (Interface Web, API REST e Desempenho)

Como o ecossistema **PetTrack (`JAVA-ADVANCED`)** possui tanto **telas de interface de usuário (Thymeleaf + Bootstrap 5)** quanto **APIs REST e serviços integrados ao Oracle**, foram desenvolvidas suítes completas nas ferramentas recomendadas pela disciplina:

### 1️⃣ Automação Record & Playback (Interface de Usuário) — Selenium IDE
* **Arquivo do Projeto:** [`automation/selenium-ide/PetTrack-Automation-Suite.side`](automation/selenium-ide/PetTrack-Automation-Suite.side)
* **Casos de Teste Automatizados Incluídos (5 Casos E2E auto-suficientes):**
  1. `CT-AUTO-01`: Autenticação de Tutor (`ana.silva@icloud.com`) e validação de bloqueio RBAC na Área Admin (`/admin/pets` -> `403 - Acesso Negado`).
  2. `CT-AUTO-02`: Autenticação de Administrador (`admin@pettrack.com`) e cadastro completo do paciente `Apollo QA` integrado à procedure Oracle `PKG_PETTRACK_CADASTRO.PRC_INSERT_PET`.
  3. `CT-AUTO-03`: Validação de Campos Obrigatórios (Bean Validation) no formulário de Cadastro de Pet (`#nome.is-invalid` e `#especie.is-invalid`).
  4. `CT-AUTO-04`: Fluxo 1 — Simulador de Telemetria IoT com injeção do preset controlado de Febre Crítica (`40.2°C` / `35` ativ) e asserção do alerta clínico e Health Score (`65.0 / 100`).
  5. `CT-AUTO-05`: Fluxo 1 — Simulador de Telemetria IoT com injeção do preset controlado de Sedentarismo (`38.0°C` / `10` ativ), asserção do Health Score (`80.0 / 100`) e verificação no painel `Alertas Clínicos Ativos`.

### 2️⃣ Automação de Testes de Integração e API — Postman / Newman
* **Coleção:** [`automation/postman/PetTrack-API-Tests.postman_collection.json`](automation/postman/PetTrack-API-Tests.postman_collection.json)
* **Ambiente:** [`automation/postman/PetTrack-Local.postman_environment.json`](automation/postman/PetTrack-Local.postman_environment.json)
* **Casos de Teste Automatizados com Scripts `pm.test()` (6 Casos / 10 Requisições):**
  1. `CT-API-01`: Login de Tutor e validação de bloqueio de segurança `403` em `/admin/pets`.
  2. `CT-API-02`: Login de Administrador e listagem de pacientes `GET /pet/todos` validando contrato JSON.
  3. `CT-API-03`: Inserção de novo Pet via `POST /pet/novo` (`201 Created`) + Teste Negativo de Bean Validation (`400 Bad Request`).
  4. `CT-API-04`: Ingestão de leitura crítica da coleira `POST /collar/novo` (`40.2°C`) e consulta filtrada de hipertermia `GET /collar/temperatura?idPet=1&temperatura=39.5`.
  5. `CT-API-05`: Execução das procedures Oracle da Sprint 4 via `GET /pet/exportar-json` e `GET /pet/relatorio-atividades`.
  6. `CT-API-06`: Consolidação do contexto de saúde do pet via `GET /health-context/pets/1`.

### 3️⃣ Automação de Testes de Desempenho e Estresse — Apache JMeter
* **Plano JMeter:** [`automation/jmeter/PetTrack-Performance-Stress.jmx`](automation/jmeter/PetTrack-Performance-Stress.jmx)
* **Configuração de Carga:** Grupo de Threads com `10 usuários simultâneos`, *Ramp-up* de `5 segundos` e `5 iterações` (totalizando `200 requisições`), validando tempo de resposta, *throughput* e asserções HTTP nos endpoints `/pet/todos`, `/clinica/todos`, `/alerta/todos` e `POST /collar/novo`.

---

## ▶️ Como Executar os Testes Automatizados

1. **Inicie a aplicação Java (`JAVA-ADVANCED`):**
   ```powershell
   cd JAVA-ADVANCED/pettrack
   .\mvnw.cmd spring-boot:run
   ```
2. **No Selenium IDE:** Abra a extensão no navegador -> *Open an existing project* -> selecione `automation/selenium-ide/PetTrack-Automation-Suite.side` -> clique em **Run all tests in suite**.
3. **No Postman (ou via CLI com Newman):** Importe a Collection e o Environment da pasta `automation/postman/` e execute pelo **Collection Runner** (ou rode `npx newman run automation/postman/PetTrack-API-Tests.postman_collection.json -e automation/postman/PetTrack-Local.postman_environment.json`).
4. **No Apache JMeter:** Abra o arquivo `automation/jmeter/PetTrack-Performance-Stress.jmx` e clique em **Start** (`Ctrl + R`).
