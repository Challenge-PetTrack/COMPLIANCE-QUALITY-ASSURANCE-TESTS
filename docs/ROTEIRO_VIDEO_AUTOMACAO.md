# 🎬 Guia e Roteiro de Vídeo — Automação com Selenium IDE (Parte B - Peso 20%)

> **Requisito Oficial da Disciplina:**  
> *"Utilize um software de automação para validar o seu sistema. Pode ser usada automação Record & Playback com **Selenium IDE**... Faça ao menos 4 casos de testes automatizados para a sua aplicação e mostre as evidências da preparação dos testes com um vídeo, mostrando a **configuração**, **execução** e **resultados** dos testes — peso (20%)."*

---

## 🛠️ 1. Como Abrir o Projeto no Selenium IDE (1 minuto)

1. **Instale a extensão Selenium IDE** no seu navegador (Google Chrome ou Microsoft Edge):
   * Chrome Web Store: busque por **Selenium IDE** e clique em *Usar no Chrome*.
2. **Inicie o sistema Java (`JAVA-ADVANCED`):**
   Abra um terminal PowerShell na pasta `C:\Users\Thiago\.gemini\antigravity\scratch\pettrack-qa\JAVA-ADVANCED\pettrack` e execute:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
   *(Aguarde aparecer `Started PetTrackApplication` na porta `8080`)*.
3. **Carregue o arquivo `.side` pronto:**
   * Clique no ícone do **Selenium IDE** na barra de extensões do navegador.
   * Na tela inicial, clique em **"Open an existing project"**.
   * Selecione o arquivo:
     👉 `C:\Users\Thiago\.gemini\antigravity\scratch\pettrack-qa\automation\selenium-ide\PetTrack-Automation-Suite.side`

---

## 🧪 2. Os 5 Casos de Teste Configurados no Projeto `.side`

A suíte **`Suíte Principal - PetTrack Sprint 4 (5 Casos de Teste)`** foi desenhada para ser **100% auto-suficiente** (o `CT-AUTO-02` já cadastra o Pet `Apollo QA` que é utilizado nos testes seguintes de IoT, não exigindo pré-cadastros manuais nem API Python externa ligada):

| Ordem | Nome no Selenium IDE | O que ele faz automaticamente na tela | Asserção Final (`Result`) |
| :---: | :--- | :--- | :--- |
| **1** | `CT-AUTO-01: Autenticação de Tutor e Bloqueio RBAC na Área Admin (/403)` | Faz login com `ana.silva@icloud.com` / `tutor123`, valida a entrada em *Meus Pets* e tenta abrir `/admin/pets`. | `assertText` = `"403 - Acesso Negado"` |
| **2** | `CT-AUTO-02: Login Admin e Cadastro de Novo Pet via Procedure Oracle` | Faz login com `admin@pettrack.com` / `admin123`, abre `/admin/pets/novo`, preenche `Apollo QA` (`Cão`, `Pastor Alemão`, `Macho`, `4.0` anos, `28.50` kg) e salva via `PRC_INSERT_PET`. | `assertElementPresent` = `//td[contains(.,'Apollo QA')]` |
| **3** | `CT-AUTO-03: Validação de Campos Obrigatórios no Cadastro de Pet (Bean Validation)` | Abre `/admin/pets/novo`, deixa `Nome` e `Espécie` em branco e tenta salvar. | `assertElementPresent` = `#nome.is-invalid` e `#especie.is-invalid` |
| **4** | `CT-AUTO-04: Fluxo 1 - Simulador de Telemetria IoT com Detecção de Febre Crítica (40.2°C)` | Abre `/admin/telemetria`, seleciona o pet, clica no preset **Cenário de Febre (40.2°C)** (`assertValue` = `40.2` e `35`) e processa o fluxo IoT. | `assertElementPresent` = `ALERTA DE FEBRE GERADO:` e `65.0 / 100` |
| **5** | `CT-AUTO-05: Fluxo 1 - Simulador de Telemetria IoT com Detecção de Sedentarismo (10 ativ)` | Abre `/admin/telemetria`, seleciona o pet, clica no preset **Cenário Sedentarismo (10 ativ)** (`assertValue` = `38` e `10`), processa o fluxo e confere no Dashboard Admin. | `assertElementPresent` = `ALERTA DE SEDENTARISMO GERADO:`, `80.0 / 100` e `Alertas Clínicos Ativos` |

---

## 🎥 3. Roteiro Exato para Gravar o Seu Vídeo (3 a 4 minutos)

Organize sua tela com o **navegador à esquerda** e a **janela do Selenium IDE à direita** para que o professor veja tudo acontecendo simultaneamente:

### 🔹 Parte 1: Mostrando a Configuração (0:00 – 1:00)
1. Mostre brevemente o **Azure Boards** com os Casos de Teste manuais cadastrados e o repositório GitHub na branch **`develop`**.
2. Foque na janela do **Selenium IDE**:
   * Mostre a URL base configurada (`http://localhost:8080`).
   * No menu lateral esquerdo do Selenium IDE, alterne a visualização para **Test Suites** ou **Tests** e clique rapidamente em cada um dos 5 testes (`CT-AUTO-01` até `CT-AUTO-05`) para mostrar a tabela de comandos (`Command`, `Target`, `Value`) preenchida com os dados controlados e os comentários explicativos.

### 🔹 Parte 2: Mostrando a Execução (1:00 – 2:30)
1. Se quiser que o vídeo fique bem visível e didático, clique no ícone do **relógio (Test execution speed)** no topo do Selenium IDE e deixe a velocidade um pouco abaixo do máximo (*Fast* -> *Medium*).
2. Clique no botão **"Run all tests in suite"** (ícone `▶▶` no topo esquerdo).
3. Narre rapidamente enquanto o Selenium IDE controla o navegador sozinho:
   * *"No Teste 1, ele autentica como Tutor e tenta acessar a rota administrativa, validando o bloqueio 403 do Spring Security."*
   * *"No Teste 2, ele autentica como Admin e cadastra o paciente Apollo QA acionando a procedure PL/SQL no Oracle."*
   * *"No Teste 3, ele valida o bloqueio de campos obrigatórios via Bean Validation."*
   * *"Nos Testes 4 e 5, ele injeta telemetria da coleira IoT para febre crítica (40.2°C) e sedentarismo (10 pontos), validando os alertas automáticos e o recálculo do Health Score para 65 e 80 pontos."*

### 🔹 Parte 3: Mostrando os Resultados (2:30 – 3:00)
1. Ao terminar a execução, aponte para:
   * Os **5 ícones verdes com check (`✔`)** ao lado de cada caso de teste no painel esquerdo do Selenium IDE.
   * O contador **`Runs: 5 | Failures: 0`** logo acima da lista.
   * A aba **Log** na parte inferior do Selenium IDE exibindo todas as linhas em verde (`... completed successfully`).
