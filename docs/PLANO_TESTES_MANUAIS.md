# 📋 Plano de Testes Manuais de Sistema — PetTrack (Sprint 4)

> **Disciplina:** Compliance, Quality Assurance & Tests — 4º Sprint  
> **Projeto Alvo:** [PetTrack — JAVA-ADVANCED](https://github.com/Challenge-PetTrack/JAVA-ADVANCED)  
> **Nível de Teste:** Teste de Sistema (Validação Funcional End-to-End, Segurança, Procedures Oracle e Fluxos de Negócio)  
> **Plataforma de Gestão:** Azure DevOps (Azure Boards / Test Plans)

---

## 🎯 1. Visão Geral e Controle de Variáveis (Dados Controlados)

Em conformidade com as exigências de **Compliance & QA**, todos os casos de teste trabalham com **dados controlados**, predefinindo rigorosamente os valores de variáveis para *Input* (Entrada) e *Output Esperado* (Saída), alinhados ao Plano de Release e às tarefas realizadas na **Sprint 4** (`Flyway V1..V5`, `Spring Security`, `PKG_PETTRACK_*`, `TelemetriaCollarFluxoService`, `AdesaoMedicamentoFluxoService` e `HealthReportService`).

### 🔧 Variáveis de Ambiente e Massa de Dados Predefinida

| Variável | Valor Controlado Predefinido | Origem / Referência no Sistema |
| :--- | :--- | :--- |
| `${BASE_URL}` | `http://localhost:8080` | Servidor Spring Boot 3.5.5 (Java 21) |
| `${ORACLE_DSN}` | `jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL` | Banco Oracle FIAP (Migrations Flyway `V1` a `V5`) |
| `${ADMIN_EMAIL}` | `admin@pettrack.com` | `DataInitializer.java` / `TB_USUARIO` (`ROLE_ADMIN`) |
| `${ADMIN_SENHA}` | `admin123` | `DataInitializer.java` (Hash BCrypt) |
| `${VET_EMAIL}` | `vet@pettrack.com` | `DataInitializer.java` / `TB_USUARIO` (`ROLE_VET`) |
| `${VET_SENHA}` | `vet123` | `DataInitializer.java` (Hash BCrypt) |
| `${TUTOR_EMAIL}` | `ana.silva@icloud.com` | `DataInitializer.java` / `TB_USUARIO` (`ROLE_TUTOR`, `ID_TUTOR = 1`) |
| `${TUTOR_SENHA}` | `tutor123` | `DataInitializer.java` (Hash BCrypt) |
| `${TUTOR_ID_PADRAO}` | `1` (`Ana Paula Silva`) | `V3__inserir_dados_iniciais.sql` (`TB_TUTOR`) |
| `${CLINICA_ID_PADRAO}` | `1` (`VetLife Clínica Veterinária`) | `V3__inserir_dados_iniciais.sql` (`TB_CLINICA`) |

---

## 📊 2. Lista de Testes Planejados e Seus Objetivos (Peso: 20%)

A tabela abaixo relaciona todos os **10 Casos de Teste (CT-01 a CT-10)** planejados para cobrir 100% das funcionalidades principais do sistema PetTrack na Sprint 4, vinculados às respectivas *Features* e *User Stories* do Plano de Release no Azure Boards:

| ID do Teste | Título do Caso de Teste | Módulo / Funcionalidade Principal | Sprint / Tarefa Relacionada | Prioridade | Objetivo do Teste |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **CT-01** | Autenticação de Administrador e Redirecionamento de Perfil | Spring Security (`/login` -> `/admin/dashboard`) | Sprint 4 — Segurança & Controle de Acesso | Alta (1) | Validar se um usuário com perfil `ROLE_ADMIN` consegue autenticar com credenciais válidas e é redirecionado automaticamente para o painel clínico administrativo com os KPIs carregados. |
| **CT-02** | Bloqueio de Segurança RBAC (Tutor tentando acessar Área Admin) | Spring Security (`/admin/**` -> `/403`) | Sprint 4 — Segurança & Controle de Acesso | Alta (1) | Verificar se o controle de acesso baseado em papéis (RBAC) bloqueia imediatamente um usuário de perfil `ROLE_TUTOR` ao tentar acessar rotas exclusivas de administradores/veterinários, exibindo a página customizada `403 - Acesso Negado`. |
| **CT-03** | Cadastro de Novo Pet Integrado à Procedure Oracle | Gestão de Pets + Oracle PL/SQL (`PRC_INSERT_PET`) | Sprint 4 — Procedures Oracle & CRUD Web | Alta (1) | Validar o cadastro completo de um novo paciente via formulário web (`/admin/pets/novo`), garantindo que a gravação acione a procedure empacotada `PKG_PETTRACK_CADASTRO.PRC_INSERT_PET` e persista o registro em `TB_PET`. |
| **CT-04** | Validação de Campos Obrigatórios no Cadastro de Pet (Teste Negativo) | Bean Validation (`Pet.java` / `AdminWebController`) | Sprint 4 — Validação de Interface Web | Média (2) | Verificar se o sistema impede o envio de formulário de cadastro de Pet com campos obrigatórios vazios (`nome`, `especie`, `sexo`) e exibe feedback visual imediato sem gerar exceção 500. |
| **CT-05** | Simulador IoT — Cenário de Febre Crítica e Disparo de Alerta | Fluxo de Negócio 1 (`TelemetriaCollarFluxoService`) | Sprint 4 — Fluxo IoT & Alertas Clínicos | Alta (1) | Validar se a ingestão de telemetria com temperatura crítica (`>= 39.5°C`) registra a leitura na `TB_COLLAR_LEITURA`, gera um alerta do tipo `FEBRE`, envia notificação `URGENTE` ao tutor e reduz o Health Score em `35.0` pontos (`65.0 / 100`). |
| **CT-06** | Simulador IoT — Cenário de Sedentarismo e Recálculo de Score | Fluxo de Negócio 1 (`TelemetriaCollarFluxoService`) | Sprint 4 — Fluxo IoT & Alertas Clínicos | Alta (1) | Validar se a ingestão de telemetria com atividade física severamente baixa (`< 20.0` pontos) gera alerta de `SEDENTARISMO`, notificação de `ALERTA` ao tutor e reduz o Health Score em `20.0` pontos (`80.0 / 100`). |
| **CT-07** | Adesão Medicamentosa — Confirmação de Dose Administrada (`S`) | Fluxo de Negócio 2 (`AdesaoMedicamentoFluxoService`) | Sprint 4 — Portal do Tutor & Medicamentos | Alta (1) | Validar se o registro diário de medicamento como administrado (`tomou = S`) pelo tutor persiste em `TB_ADESAO_MEDICAMENTO`, recalcula em tempo real a taxa percentual de adesão (`%`) e não dispara alerta clínico. |
| **CT-08** | Adesão Medicamentosa — Dose Esquecida (`N`) e Alerta Veterinário | Fluxo de Negócio 2 (`AdesaoMedicamentoFluxoService`) | Sprint 4 — Portal do Tutor & Medicamentos | Alta (1) | Validar se o registro de dose não administrada (`tomou = N`) gera automaticamente um alerta clínico do tipo `ADESAO` na `TB_ALERTA` e uma notificação `URGENTE` na `TB_NOTIFICACAO` para acompanhamento veterinário. |
| **CT-09** | Geração e Persistência de Relatório Consolidado de Saúde (Health Report) | Fluxo de Negócio 3 (`HealthReportWebController` / `TB_HEALTH_REPORT`) | Sprint 4 — Health Report Consolidado & IA | Alta (1) | Validar a consolidação de contexto (IoT 24h, BCS, eventos clínicos, medicamentos, vacinas e clima) e a geração/armazenamento de um novo relatório de saúde estruturado com UUID único em `TB_HEALTH_REPORT`. |
| **CT-10** | Exportação JSON e Relatório de Subtotais via Packages Oracle | API REST + Oracle PL/SQL (`PKG_PETTRACK_CONSULTA`) | Sprint 4 — Procedures Oracle de Consulta | Média (2) | Validar os endpoints `/pet/exportar-json` (`PRC_LISTAR_PETS_JSON`) e `/pet/relatorio-atividades` (`PRC_RELATORIO_SUBTOTAIS_MANUAL`) garantindo retorno estruturado diretamente das procedures PL/SQL. |

---

## 🧪 3. Detalhamento dos Casos de Teste: Entradas (20%), Saídas (20%) e Procedimentos (20%)

---

### 🔹 CT-01: Autenticação de Administrador e Redirecionamento de Perfil
* **Objetivo:** Validar a autenticação via formulário Spring Security com hash BCrypt para o perfil `ROLE_ADMIN` e o roteamento pós-login via `/dashboard` para `/admin/dashboard`.
* **Pré-condições:** Aplicação rodando em `http://localhost:8080`; migrações Flyway `V1` a `V5` e `DataInitializer` executados.
* **Dados de Entrada Controlados (Input):**
  * `URL Inicial`: `http://localhost:8080/login`
  * `email`: `"admin@pettrack.com"`
  * `senha`: `"admin123"`
* **Procedimento de Teste (Passos Aplicados):**
  1. Abrir o navegador e acessar a URL `http://localhost:8080/login`.
  2. No campo **E-mail** (`id="email"`), digitar exatamente `admin@pettrack.com`.
  3. No campo **Senha** (`id="senha"`), digitar exatamente `admin123`.
  4. Clicar no botão **"Entrar"** (`button[type="submit"]`).
  5. Observar a URL de destino após o redirecionamento e os elementos renderizados na tela.
* **Dados de Saída Esperados (Output):**
  * `HTTP Status`: `302 Found` seguido de `200 OK` na rota final.
  * `URL Final`: `http://localhost:8080/admin/dashboard`
  * `Título / Cabeçalho da Página`: `"Painel Veterinário & Clínico"`
  * `Elementos Visíveis`: Cards de KPIs (`TOTAL DE PETS`, `TUTORES CADASTRADOS`, `CLÍNICAS PARCEIRAS`, `ALERTAS PENDENTES`) e botões `"Simulador Telemetria IoT"` e `"Novo Paciente (Pet)"`.
  * `Cookie de Sessão`: `JSESSIONID` criado e ativo.

---

### 🔹 CT-02: Bloqueio de Segurança RBAC (Tutor tentando acessar Área Admin)
* **Objetivo:** Garantir que um usuário autenticado com perfil `ROLE_TUTOR` seja impedido pelo `SecurityFilterChain` de acessar qualquer rota sob `/admin/**` e visualize a tela de erro `403`.
* **Pré-condições:** Aplicação rodando em `http://localhost:8080`; nenhum usuário logado na sessão atual.
* **Dados de Entrada Controlados (Input):**
  * `URL de Login`: `http://localhost:8080/login`
  * `email`: `"ana.silva@icloud.com"`
  * `senha`: `"tutor123"`
  * `URL Restrita Tentada`: `http://localhost:8080/admin/pets`
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/login`.
  2. Preencher `email` com `ana.silva@icloud.com` e `senha` com `tutor123`, e clicar em **"Entrar"**.
  3. Verificar que o login direcionou para `http://localhost:8080/portal-tutor/dashboard`.
  4. Na barra de endereços do navegador, digitar `http://localhost:8080/admin/pets` e pressionar `Enter`.
  5. Verificar a tela de bloqueio apresentada pelo sistema.
* **Dados de Saída Esperados (Output):**
  * `HTTP Status / Forward`: Acesso bloqueado com exibição da view `error/403.html`.
  * `Título Principal Visível`: `"403 - Acesso Negado"`
  * `Mensagem de Sistema`: `"Você não tem permissão para acessar este recurso. Esta área é restrita a perfis autorizados pelo sistema Spring Security."`
  * `Dados de Auditoria em Tela`:
    * `Usuário Logado`: `ana.silva@icloud.com`
    * `Seu Perfil Atual`: `ROLE_TUTOR`

---

### 🔹 CT-03: Cadastro de Novo Pet Integrado à Procedure Oracle (`PRC_INSERT_PET`)
* **Objetivo:** Validar o fluxo completo de cadastro de um paciente na interface administrativa e sua persistência no banco Oracle através da procedure `PKG_PETTRACK_CADASTRO.PRC_INSERT_PET`.
* **Pré-condições:** Usuário logado como Administrador (`admin@pettrack.com` / `admin123`); tutor `ID=1` (`Ana Paula Silva`) e clínica `ID=1` (`VetLife Clínica Veterinária`) cadastrados.
* **Dados de Entrada Controlados (Input):**
  * `Rota do Formulário`: `http://localhost:8080/admin/pets/novo`
  * `nome`: `"Apollo QA"`
  * `especie`: `"Cão"`
  * `raca`: `"Pastor Alemão"`
  * `sexo`: `"M"` (Macho)
  * `idade`: `4.0`
  * `peso`: `28.50`
  * `tutor.id`: `1` (`Ana Paula Silva (ana.silva@icloud.com)`)
  * `clinica.id`: `1` (`VetLife Clínica Veterinária`)
* **Procedimento de Teste (Passos Aplicados):**
  1. Autenticado como Admin, acessar `http://localhost:8080/admin/pets` e clicar no botão **"Cadastrar Novo Pet"** (`/admin/pets/novo`).
  2. Preencher o campo **Nome do Pet** (`id="nome"`) com `Apollo QA`.
  3. Preencher o campo **Espécie** (`id="especie"`) com `Cão`.
  4. Preencher o campo **Raça** (`id="raca"`) com `Pastor Alemão`.
  5. Selecionar no campo **Sexo** (`id="sexo"`) a opção `Macho` (`value="M"`).
  6. Preencher o campo **Idade (anos)** (`id="idade"`) com `4.0`.
  7. Preencher o campo **Peso (kg)** (`id="peso"`) com `28.50`.
  8. Selecionar no campo **Tutor Responsável** (`id="tutor"`) a opção `Ana Paula Silva (ana.silva@icloud.com)`.
  9. Selecionar no campo **Clínica Veterinária** (`id="clinica"`) a opção `VetLife Clínica Veterinária`.
  10. Clicar no botão **"Salvar Paciente"**.
* **Dados de Saída Esperados (Output):**
  * `Redirecionamento`: `http://localhost:8080/admin/pets`
  * `Banner de Alerta (Flash Attribute)`: `"Pet 'Apollo QA' cadastrado/atualizado com sucesso!"`
  * `Linha na Tabela de Pacientes`:
    * `Nome do Pet`: `Apollo QA`
    * `Espécie / Raça`: `Cão` / `Pastor Alemão`
    * `Sexo`: Badge `Macho`
    * `Idade / Peso`: `4.0 anos` / `28.5 kg`
    * `Tutor Responsável`: `Ana Paula Silva`
    * `Clínica`: `VetLife Clínica Veterinária`

---

### 🔹 CT-04: Validação de Campos Obrigatórios no Cadastro de Pet (Teste Negativo)
* **Objetivo:** Validar se o Bean Validation (`@Valid`) barra submissões inválidas no cadastro de Pet e mantém o usuário no formulário exibindo os erros de validação por campo.
* **Pré-condições:** Usuário logado como Administrador (`admin@pettrack.com` / `admin123`).
* **Dados de Entrada Controlados (Input):**
  * `Rota do Formulário`: `http://localhost:8080/admin/pets/novo`
  * `nome`: `""` (Vazio)
  * `especie`: `""` (Vazio)
  * `raca`: `"SRD"`
  * `sexo`: `""` (Não selecionado)
  * `idade`: `-2.0` (Valor negativo inválido)
  * `peso`: `-5.0` (Valor negativo inválido)
  * `tutor.id`: `1`
  * `clinica.id`: `1`
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/admin/pets/novo`.
  2. Deixar os campos **Nome do Pet**, **Espécie** e **Sexo** em branco.
  3. Informar `-2.0` em **Idade** e `-5.0` em **Peso**.
  4. Selecionar o Tutor `1` e a Clínica `1`.
  5. Clicar no botão **"Salvar Paciente"**.
* **Dados de Saída Esperados (Output):**
  * `URL Permanece em`: `http://localhost:8080/admin/pets/salvar` (renderizando a view `admin/pet-form`).
  * `Estilo Visual`: Campos inválidos recebem a classe Bootstrap `is-invalid` (borda vermelha).
  * `Mensagens de Erro Visíveis`: Mensagens de obrigatoriedade do Jakarta Validation exibidas nos blocos `<div class="invalid-feedback">` e nenhum registro inválido inserido na `TB_PET`.

---

### 🔹 CT-05: Simulador IoT — Cenário de Febre Crítica e Disparo de Alerta
* **Objetivo:** Validar a regra de negócio do **Fluxo 1 (`TelemetriaCollarFluxoService`)** quando a coleira inteligente envia temperatura `>= 39.5°C` e atividade normal (`>= 20.0`).
* **Pré-condições:** Usuário logado como Administrador ou Veterinário; pelo menos 1 Pet cadastrado (ex: `idPet = 1` ou `Apollo QA`).
* **Dados de Entrada Controlados (Input):**
  * `Rota`: `http://localhost:8080/admin/telemetria`
  * `idPet`: `1`
  * `topicoMqtt`: `"pettrack/collar/cenario-teste"`
  * `temperatura`: `40.2` (°C)
  * `atividade`: `35.0` (pontos)
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/admin/telemetria`.
  2. Clicar no botão de preset **"Cenário de Febre (40.2°C)"** (ou preencher manualmente `temperatura = 40.2`, `atividade = 35` e `topicoMqtt = pettrack/collar/cenario-teste`).
  3. No seletor **Paciente (Pet)** (`id="idPet"`), selecionar o Pet de ID `1`.
  4. Clicar no botão **"Processar Fluxo IoT"**.
  5. Verificar o card de resultado renderizado abaixo do formulário e consultar o Painel Admin (`/admin/dashboard`).
* **Dados de Saída Esperados (Output):**
  * `Banner Superior`: `"Telemetria processada com sucesso no fluxo automatizado!"`
  * `Card de Resultado Clínico`:
    * `TEMPERATURA / ATIVIDADE`: `40.2 °C / 35.0`
    * `NOVO HEALTH SCORE`: `65.0 / 100` (cálculo controlado: `100.0 - 35.0 = 65.0`)
    * `Alerta em Tela`: `"ALERTA DE FEBRE GERADO: Temperatura de 40.2°C disparou notificação de urgência e penalizou o Health Score."`
  * `Efeitos Persistidos no Banco`:
    * Registro criado em `TB_ALERTA` com `TP_ALERTA = 'FEBRE'`, `VL_REF = 40.2`, `ST_RESOLVIDO = 'N'`.
    * Registro criado em `TB_NOTIFICACAO` com `TP_NOTIFICACAO = 'URGENTE'` e título `"Alerta de Febre: <NomePet>"`.
    * Registro criado em `TB_SCORE_HISTORICO` com `VL_SCORE = 65.0` e observação `"Score recalculado após detecção de febre"`.

---

### 🔹 CT-06: Simulador IoT — Cenário de Sedentarismo e Recálculo de Score
* **Objetivo:** Validar a regra de negócio do **Fluxo 1 (`TelemetriaCollarFluxoService`)** quando a coleira envia temperatura normal (`< 39.5°C`), porém nível de atividade física crítico (`< 20.0`).
* **Pré-condições:** Usuário logado como Administrador ou Veterinário; Pet `idPet = 1` disponível.
* **Dados de Entrada Controlados (Input):**
  * `Rota`: `http://localhost:8080/admin/telemetria`
  * `idPet`: `1`
  * `topicoMqtt`: `"pettrack/collar/cenario-teste"`
  * `temperatura`: `38.0` (°C)
  * `atividade`: `10.0` (pontos)
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/admin/telemetria`.
  2. Clicar no botão de preset **"Cenário Sedentarismo (10 ativ)"** (que preenche `temperatura = 38.0`, `atividade = 10` e `topicoMqtt = pettrack/collar/cenario-teste`).
  3. Selecionar o Pet de ID `1` no campo **Paciente (Pet)**.
  4. Clicar em **"Processar Fluxo IoT"**.
* **Dados de Saída Esperados (Output):**
  * `TEMPERATURA / ATIVIDADE`: `38.0 °C / 10.0`
  * `NOVO HEALTH SCORE`: `80.0 / 100` (cálculo controlado: `100.0 - 20.0 = 80.0`)
  * `Alerta em Tela`: `"ALERTA DE SEDENTARISMO GERADO: Nível de atividade física abaixo do esperado. Notificação enviada ao tutor."`
  * `Efeitos Persistidos no Banco`:
    * Registro em `TB_ALERTA` com `TP_ALERTA = 'SEDENTARISMO'`, `VL_REF = 10.0`, `ST_RESOLVIDO = 'N'`.
    * Registro em `TB_NOTIFICACAO` com `TP_NOTIFICACAO = 'ALERTA'` e título `"Baixa Atividade: <NomePet>"`.
    * Registro em `TB_SCORE_HISTORICO` com `VL_SCORE = 80.0` e observação `"Score recalculado após baixa atividade"`.

---

### 🔹 CT-07: Adesão Medicamentosa — Confirmação de Dose Administrada (`S`)
* **Objetivo:** Validar o **Fluxo 2 (`AdesaoMedicamentoFluxoService`)** quando o tutor confirma que administrou a dose do medicamento no prazo (`tomou = S`).
* **Pré-condições:** Usuário logado como Tutor (`ana.silva@icloud.com` / `tutor123`); medicamento ativo cadastrado (ex: `idMedicamento = 1`).
* **Dados de Entrada Controlados (Input):**
  * `Rota`: `http://localhost:8080/portal-tutor/medicamentos`
  * `idMedicamento`: `1`
  * `dataDose`: `"2026-10-29"`
  * `tomou`: `"S"` (`Sim, Administrado`)
  * `observacao`: `"Administrado junto com a ração da manhã sem rejeição."`
* **Procedimento de Teste (Passos Aplicados):**
  1. Autenticar como Tutor (`ana.silva@icloud.com` / `tutor123`) e clicar em **"Confirmar Doses de Hoje"** (`/portal-tutor/medicamentos`).
  2. No campo **Medicamento Prescrito** (`id="idMedicamento"`), selecionar o primeiro medicamento listado (`ID = 1`).
  3. No campo **Data da Administração** (`id="dataDose"`), informar `2026-10-29`.
  4. Selecionar a opção **"Sim, Administrado"** (`id="tomouSim"`, `value="S"`).
  5. No campo **Observações / Reações** (`id="observacao"`), digitar `Administrado junto com a ração da manhã sem rejeição.`.
  6. Clicar no botão **"Confirmar Registro"**.
* **Dados de Saída Esperados (Output):**
  * `Redirecionamento`: `http://localhost:8080/portal-tutor/medicamentos`
  * `Banner de Sucesso`: `"Dose confirmada com sucesso! Taxa de adesão atualizada: <X>%."` (ex: `100.0%` se todas as doses do medicamento foram tomadas).
  * `Tabela de Histórico Recente de Doses`: Nova linha contendo data `2026-10-29`, badge verde `Administrado` e a observação informada.
  * `Alerta Gerado`: `false` (nenhum alerta clínico disparado).

---

### 🔹 CT-08: Adesão Medicamentosa — Dose Esquecida (`N`) e Alerta Veterinário
* **Objetivo:** Validar o disparo automático de alerta clínico (`ADESAO`) e notificação urgente quando o tutor registra que a dose não foi administrada (`tomou = N`).
* **Pré-condições:** Usuário logado como Tutor (`ana.silva@icloud.com` / `tutor123`); medicamento ativo `idMedicamento = 1`.
* **Dados de Entrada Controlados (Input):**
  * `Rota`: `http://localhost:8080/portal-tutor/medicamentos`
  * `idMedicamento`: `1`
  * `dataDose`: `"2026-10-29"`
  * `tomou`: `"N"` (`Não / Esquecido`)
  * `observacao`: `"Tutor esqueceu de administrar no horário noturno."`
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/portal-tutor/medicamentos`.
  2. Selecionar o medicamento `ID = 1`.
  3. Informar a data `2026-10-29`.
  4. Marcar o botão **"Não / Esquecido"** (`id="tomouNao"`, `value="N"`).
  5. Preencher a observação com `Tutor esqueceu de administrar no horário noturno.`.
  6. Clicar em **"Confirmar Registro"**.
* **Dados de Saída Esperados (Output):**
  * `Redirecionamento`: `http://localhost:8080/portal-tutor/medicamentos`
  * `Banner de Alerta`: `"Dose registrada como não administrada. Alerta veterinário gerado automaticamente."`
  * `Tabela de Histórico Recente de Doses`: Nova linha com badge vermelho `Não Tomou` e observação `"Tutor esqueceu de administrar no horário noturno."`.
  * `Efeitos Persistidos no Banco`:
    * Registro em `TB_ALERTA` com `TP_ALERTA = 'ADESAO'` e `ST_RESOLVIDO = 'N'`.
    * Registro em `TB_NOTIFICACAO` com `TP_NOTIFICACAO = 'URGENTE'` e título `"Atraso de Medicamento: <NomePet>"`.

---

### 🔹 CT-09: Geração e Persistência de Relatório Consolidado de Saúde (Health Report)
* **Objetivo:** Validar o **Fluxo 3 (Health Report Consolidado)** na rota `/relatorios/pets/{idPet}`, garantindo envio com proteção CSRF, bloqueio contra duplo clique, geração do relatório e exibição do detalhe com fontes de dados.
* **Pré-condições:** Usuário autenticado (Admin, Vet ou Tutor vinculado ao pet `idPet = 1`).
* **Dados de Entrada Controlados (Input):**
  * `Rota Inicial`: `http://localhost:8080/relatorios/pets/1`
  * `Ação`: Submissão `POST /relatorios/pets/1/gerar` (com token `_csrf` válido da sessão)
* **Procedimento de Teste (Passos Aplicados):**
  1. Acessar `http://localhost:8080/relatorios/pets/1`.
  2. Verificar a listagem paginada de relatórios anteriores do pet.
  3. Clicar no botão **"Gerar novo relatório"**.
  4. Observar que o botão muda imediatamente para o estado desabilitado com o texto `"Gerando relatório…"`.
  5. Aguardar o redirecionamento automático para a tela de detalhes do relatório recém-gerado (`/relatorios/pets/1/{idGeracao}`).
  6. Expandir a seção **"Dados usados nesta análise"** para inspecionar o snapshot do contexto consolidado.
* **Dados de Saída Esperados (Output):**
  * `URL de Destino`: `http://localhost:8080/relatorios/pets/1/<UUID-36-caracteres>`
  * `Mensagem de Confirmação`: `"Relatório gerado e salvo no histórico."`
  * `Estrutura do Relatório`: 4 seções principais (`article h2`), aviso legal/clínico, identificação da fonte geradora e painel expansível `"Dados usados nesta análise"`.
  * `Persistência`: Novo registro gravado em `TB_HEALTH_REPORT` com `ID_GERACAO` (UUID), `ID_PET = 1` e JSON completo do relatório e do contexto.

---

### 🔹 CT-10: Exportação JSON e Relatório de Subtotais via Packages Oracle
* **Objetivo:** Validar a execução das procedures empacotadas da **Sprint 4** (`PKG_PETTRACK_CONSULTA.PRC_LISTAR_PETS_JSON` e `PKG_PETTRACK_CONSULTA.PRC_RELATORIO_SUBTOTAIS_MANUAL`) expostas pelo `PetController`.
* **Pré-condições:** Usuário autenticado com perfil `ROLE_ADMIN` ou `ROLE_VET`.
* **Dados de Entrada Controlados (Input):**
  * `Endpoint 1`: `GET http://localhost:8080/pet/exportar-json?especie=Cão`
  * `Endpoint 2`: `GET http://localhost:8080/pet/relatorio-atividades`
* **Procedimento de Teste (Passos Aplicados):**
  1. Com sessão autenticada de Administrador (`admin@pettrack.com`), requisitar `GET http://localhost:8080/pet/exportar-json?especie=Cão`.
  2. Inspecionar o cabeçalho `Content-Disposition` e o payload JSON retornado.
  3. Em seguida, requisitar `GET http://localhost:8080/pet/relatorio-atividades`.
  4. Inspecionar o texto plano retornado com os subtotais consolidados pela procedure manual PL/SQL.
* **Dados de Saída Esperados (Output):**
  * **Para `/pet/exportar-json`:**
    * `HTTP Status`: `200 OK`
    * `Content-Type`: `application/json`
    * `Content-Disposition`: `attachment; filename="pets.json"`
    * `Body`: Array JSON válido contendo os pets filtrados pela espécie `"Cão"` e seus respectivos tutores/clínicas.
  * **Para `/pet/relatorio-atividades`:**
    * `HTTP Status`: `200 OK`
    * `Content-Type`: `text/plain;charset=UTF-8`
    * `Body`: Relatório textual contendo as linhas de detalhe, subtotais por pet/tipo de evento e total geral calculado pela procedure `PRC_RELATORIO_SUBTOTAIS_MANUAL`.
