# ☁️ Guia de Configuração e Entrega — Azure Boards & Test Plans

> **Atenção à Regra de Compliance (Evita Penalidade de 10%):**  
> *"Entregue o link de acesso ao seu projeto na Azure, sendo que o professor precisa estar cadastrado com o perfil **Basic** na Organização onde o seu projeto está e precisa ter acesso **Administrador** no projeto."*

---

## 🛠️ Passo 1: Garantir Acesso do Professor na Organização e no Projeto

1. Acesse sua organização no Azure DevOps: `https://dev.azure.com/<SUA_ORGANIZACAO>`
2. No canto inferior esquerdo, clique em **Organization settings** (Configurações da Organização) -> **Users** (Usuários).
3. Clique em **Add users** (Adicionar usuários):
   * **Users:** Insira o e-mail institucional do professor da disciplina (`@fiap.com.br` ou o e-mail indicado pelo docente no Teams/Portal).
   * **Access level (Nível de acesso):** Selecione obrigatoriamente **Basic** (Não selecione *Stakeholder*, pois *Stakeholder* bloqueia visualização completa de Test Plans e Boards).
   * **Add to projects:** Marque o projeto **PetTrack**.
   * **Azure DevOps Groups:** Selecione **Project Administrators** (Administradores do Projeto).
   * Clique em **Add**.
4. Para confirmar que ele é **Administrador do Projeto**:
   * Entre no projeto **PetTrack** -> **Project settings** (canto inferior esquerdo) -> **Permissions** -> **Project Administrators** -> aba **Members** e verifique se o professor consta na lista.

---

## 📋 Passo 2: Alinhar Plano de Release e Sprints (Boards -> Sprints / Queries)

Os casos de teste precisam estar alinhados com o Plano de Release e tarefas das Sprints realizadas:
1. Vá em **Project settings** -> **Project configuration** -> **Iterations**.
2. Certifique-se de que a iteração `PetTrack\Sprint 4` existe e está ativa.
3. Em **Boards** -> **Work Items**, garanta que as *Features* / *User Stories* da Sprint 4 estão criadas:
   * **US-01:** Autenticação e Controle de Acesso por Perfil (Spring Security + BCrypt + Tela 403)
   * **US-02:** Gestão de Pacientes (Pets) Integrada a Procedures Oracle (`PKG_PETTRACK_CADASTRO`)
   * **US-03:** Fluxo de Negócio 1 — Monitoramento IoT de Coleiras e Alertas Clínicos em Tempo Real
   * **US-04:** Fluxo de Negócio 2 — Portal do Tutor e Controle de Adesão Medicamentosa
   * **US-05:** Fluxo de Negócio 3 — Geração e Histórico de Relatórios de Saúde Consolidados (`Health Report`)

---

## 📥 Passo 3: Importar os 10 Casos de Teste com 1 Clique (CSV)

Você pode importar todos os **10 Casos de Teste (CT-01 a CT-10)** já com Passos (*Step Action*), Dados de Entrada e Saídas Esperadas (*Step Expected*) diretamente do arquivo [`azure_test_cases_import.csv`](file:///C:/Users/Thiago/.gemini/antigravity/scratch/pettrack-qa/azure-boards/azure_test_cases_import.csv):

### Opção A: Via Azure Test Plans (Recomendado)
1. No menu lateral do Azure DevOps, acesse **Test Plans**.
2. Crie ou abra o plano de testes **`Plano de Testes de Sistema - Sprint 4 (PetTrack)`**.
3. Clique no ícone de **Importar Casos de Teste via CSV** (`Import test cases from CSV`) ou vá em **Boards -> Queries -> Import Work Items**.
4. Caso o seu Path do projeto tenha nome diferente de `PetTrack`, abra o arquivo `azure_test_cases_import.csv` num editor de texto e substitua `PetTrack` pelo nome exato do seu projeto na coluna `Area Path` e `Iteration Path`.
5. Selecione o arquivo `azure-boards/azure_test_cases_import.csv` e clique em **Import** -> **Save Items**.

### Opção B: Cadastro Manual Rápido no Azure Boards
Se a sua assinatura de estudante na Azure não exibir o menu *Test Plans* completo:
1. Vá em **Boards** -> **Work Items** -> **New Work Item** -> **Test Case** (ou *Task* / *Issue* vinculada à Sprint 4 caso o processo seja *Basic*).
2. Copie o Título, Objetivo, Dados de Entrada, Procedimento (Passos) e Dados de Saída da tabela em [`docs/PLANO_TESTES_MANUAIS.md`](file:///C:/Users/Thiago/.gemini/antigravity/scratch/pettrack-qa/docs/PLANO_TESTES_MANUAIS.md).
3. Vincule cada item à iteração **Sprint 4** (`Related Work` -> *Tested By* / *Parent*).
