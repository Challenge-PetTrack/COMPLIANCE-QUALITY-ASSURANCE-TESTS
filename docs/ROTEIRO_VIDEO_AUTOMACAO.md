# 🎬 Roteiro de Gravação do Vídeo — Automação de Testes (Parte B - Peso 20%)

> **Requisito Oficial da Disciplina:**  
> *"Faça ao menos 4 casos de testes automatizados para a sua aplicação e mostre as evidências da preparação dos testes com um vídeo, mostrando a **configuração**, **execução** e **resultados** dos testes — peso (20%)."*

---

## ⚙️ Preparação Antes de Gravar (2 minutos)

1. **Iniciar a aplicação Java (`JAVA-ADVANCED`):**
   Abra um terminal PowerShell na pasta `JAVA-ADVANCED/pettrack` e rode:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
   Aguarde aparecer `Started PetTrackApplication in ... seconds` na porta `8080`.

2. **Escolher a ferramenta que você mostrará no vídeo (ou mostrar ambas):**
   * **Opção 1 — Selenium IDE (Interface Gráfica do Usuário - Record & Playback):**
     * Instale a extensão oficial **Selenium IDE** no Chrome ou Edge.
     * Abra o Selenium IDE -> clique em **"Open an existing project"** -> selecione o arquivo:
       `automation/selenium-ide/PetTrack-Automation-Suite.side`
   * **Opção 2 — Postman (Automação de Testes de Integração e API):**
     * Abra o **Postman** -> clique em **Import** -> selecione os dois arquivos em `automation/postman/`:
       * `PetTrack-API-Tests.postman_collection.json`
       * `PetTrack-Local.postman_environment.json`
     * No canto superior direito do Postman, selecione o Environment **"PetTrack - Ambiente Local (Sprint 4)"**.
   * **Opção 3 — JMeter (Desempenho e Estresse):**
     * Abra o Apache JMeter -> **File -> Open** -> `automation/jmeter/PetTrack-Performance-Stress.jmx`.

---

## 🎥 Roteiro Passo a Passo do Vídeo (Duração sugerida: 3 a 5 minutos)

### ⏱️ Bloco 1: Apresentação e Azure Boards (0:00 – 0:45)
1. Mostre rapidamente o repositório no GitHub na branch **`develop`** contendo o link do Azure Boards e o link do vídeo.
2. Mostre a aba do **Azure Boards / Test Plans** com os Casos de Teste planejados (`CT-01` a `CT-10`), destacando os dados controlados de entrada e saída e que o professor está cadastrado como **Basic** na Organização e **Project Administrator** no projeto.

### ⏱️ Bloco 2: Configuração dos Testes Automatizados (0:45 – 1:45)
1. **No Selenium IDE:**
   * Mostre a suíte **`Suíte Principal - PetTrack Sprint 4 (5 Casos de Teste)`** aberta.
   * Clique sobre cada um dos casos de teste na lateral esquerda (`CT-AUTO-01` a `CT-AUTO-05`) para mostrar os comandos configurados (`open`, `type`, `select`, `click`, `assertText`, `assertElementPresent`) e os dados controlados (`admin@pettrack.com`, `Apollo QA`, temperatura `40.2`, etc.).
2. **No Postman:**
   * Mostre a Collection **`PetTrack - Suite de Automação de Testes de Integração e Sistema (Sprint 4)`** e a aba **Scripts -> Post-response (Tests)** com as asserções `pm.test(...)`.

### ⏱️ Bloco 3: Execução em Tempo Real e Resultados (1:45 – 3:30)
1. **Executando no Selenium IDE:**
   * Clique no botão **"Run all tests in suite"** (ícone de Play `▶▶`).
   * Deixe a tela dividida mostrando o navegador executando sozinho:
     1. Login da Tutora e bloqueio `403 - Acesso Negado` ao tentar acessar `/admin/pets`.
     2. Login do Admin e preenchimento automático do cadastro do Pet `Apollo QA` via procedure Oracle.
     3. Injeção da telemetria IoT com preset de febre (`40.2°C`) e cálculo do Health Score (`65.0 / 100`).
     4. Registro de dose esquecida (`Não Tomou`) no Portal do Tutor gerando alerta clínico.
     5. Acesso e geração do Health Report consolidado (`/relatorios/pets/1`).
   * Ao finalizar, destaque o painel lateral do Selenium IDE com **todos os testes verdes (`Passed`)** e o log inferior sem erros.
2. **Executando no Postman Collection Runner (Bônus / Integração):**
   * Clique nos três pontinhos da Collection -> **Run collection** -> **Run PetTrack...**.
   * Mostre o sumário final do **Collection Runner** com todas as asserções (`CT-API-01` a `CT-API-06`) passando com **0 falhas**.

---

## 📤 Pós-Gravação
1. Suba o vídeo no **YouTube** (como *Não listado* ou *Público*).
2. Atualize o link do vídeo no arquivo `README.md` na branch `develop` e faça `git push origin develop`.
