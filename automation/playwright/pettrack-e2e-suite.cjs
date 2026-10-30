const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const BASE_URL = process.env.PETTRACK_URL || 'http://localhost:8080';
const EVIDENCIAS_DIR = path.join(__dirname, '..', 'evidencias');

fs.mkdirSync(EVIDENCIAS_DIR, { recursive: true });

(async () => {
    console.log('===================================================================');
    console.log(' 🐾 PETTRACK - SUITE DE AUTOMAÇÃO DE TESTES DE SISTEMA (SPRINT 4)');
    console.log(` 🌐 URL Alvo: ${BASE_URL}`);
    console.log('===================================================================\n');

    const browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true',
        slowMo: 400
    });

    const resultados = [];

    try {
        const context = await browser.newContext({
            viewport: { width: 1366, height: 900 },
            recordVideo: { dir: EVIDENCIAS_DIR, size: { width: 1366, height: 900 } }
        });
        const page = await context.newPage();
        page.setDefaultTimeout(15000);

        // =========================================================================
        // CASO DE TESTE 1: Autenticação de Tutor e Bloqueio RBAC na Área Admin (/403)
        // =========================================================================
        console.log('▶️ [CT-AUTO-01] Executando: Autenticação de Tutor e Bloqueio RBAC (/403)...');
        await page.goto(`${BASE_URL}/login`);
        await page.fill('#email', 'ana.silva@icloud.com');
        await page.fill('#senha', 'tutor123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/portal-tutor/dashboard');
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '01-tutor-dashboard.png'), fullPage: true });

        await page.goto(`${BASE_URL}/admin/pets`);
        const titulo403 = await page.locator('h2.fw-bold').innerText();
        assert.match(titulo403, /403 - Acesso Negado/);
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '02-bloqueio-rbac-403.png'), fullPage: true });
        resultados.push({ caso: 'CT-AUTO-01', status: 'PASSOU', detalhe: 'RBAC bloqueou ROLE_TUTOR em /admin/pets exibindo 403.' });
        console.log('   ✅ [CT-AUTO-01] APROVADO!\n');

        // =========================================================================
        // CASO DE TESTE 2: Login Admin e Cadastro de Novo Pet via Procedure Oracle
        // =========================================================================
        console.log('▶️ [CT-AUTO-02] Executando: Login Admin e Cadastro de Pet (PRC_INSERT_PET)...');
        await page.goto(`${BASE_URL}/login`);
        await page.fill('#email', 'admin@pettrack.com');
        await page.fill('#senha', 'admin123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/admin/dashboard');
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '03-admin-dashboard.png'), fullPage: true });

        await page.goto(`${BASE_URL}/admin/pets/novo`);
        await page.fill('#nome', 'Apollo QA');
        await page.fill('#especie', 'Cão');
        await page.fill('#raca', 'Pastor Alemão');
        await page.selectOption('#sexo', 'M');
        await page.fill('#idade', '4.0');
        await page.fill('#peso', '28.50');
        await page.selectOption('#tutor', { index: 1 });
        await page.selectOption('#clinica', { index: 1 });
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '04-cadastro-pet-form.png'), fullPage: true });

        await page.click('button[type="submit"]');
        await page.waitForURL('**/admin/pets');
        const tabelaTexto = await page.locator('table').innerText();
        assert.match(tabelaTexto, /Apollo QA/);
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '05-pet-cadastrado-lista.png'), fullPage: true });
        resultados.push({ caso: 'CT-AUTO-02', status: 'PASSOU', detalhe: 'Pet Apollo QA inserido via PKG_PETTRACK_CADASTRO.PRC_INSERT_PET.' });
        console.log('   ✅ [CT-AUTO-02] APROVADO!\n');

        // =========================================================================
        // CASO DE TESTE 3: Simulador de Telemetria IoT - Detecção de Febre (40.2°C)
        // =========================================================================
        console.log('▶️ [CT-AUTO-03] Executando: Simulador IoT - Detecção de Febre Crítica (40.2°C)...');
        await page.goto(`${BASE_URL}/admin/telemetria`);
        await page.selectOption('#idPet', { index: 1 });
        await page.click('button.btn-outline-danger'); // Preset Cenário de Febre (40.2°C / 35 ativ)
        assert.equal(await page.inputValue('#temperatura'), '40.2');
        await page.click('button.btn-warning[type="submit"]');

        const cardResultado = await page.locator('main').innerText();
        assert.match(cardResultado, /ALERTA DE FEBRE GERADO/);
        assert.match(cardResultado, /65\.0 \/ 100/);
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '06-simulador-iot-febre.png'), fullPage: true });
        resultados.push({ caso: 'CT-AUTO-03', status: 'PASSOU', detalhe: 'Febre 40.2°C detectada, alerta gerado e Health Score recalculado para 65.0 / 100.' });
        console.log('   ✅ [CT-AUTO-03] APROVADO!\n');

        // =========================================================================
        // CASO DE TESTE 4: Portal do Tutor - Registro de Dose Esquecida e Alerta
        // =========================================================================
        console.log('▶️ [CT-AUTO-04] Executando: Adesão Medicamentosa - Dose Esquecida (tomou=N)...');
        await page.goto(`${BASE_URL}/login`);
        await page.fill('#email', 'ana.silva@icloud.com');
        await page.fill('#senha', 'tutor123');
        await page.click('button[type="submit"]');
        await page.waitForURL('**/portal-tutor/dashboard');

        await page.goto(`${BASE_URL}/portal-tutor/medicamentos`);
        await page.selectOption('#idMedicamento', { index: 1 });
        await page.click('label[for="tomouNao"]');
        await page.fill('#observacao', 'Dose não administrada - Teste Automatizado E2E');
        await page.click('button.btn-success[type="submit"]');

        const textoMedicamentos = await page.locator('main').innerText();
        assert.match(textoMedicamentos, /Não Tomou/);
        await page.screenshot({ path: path.join(EVIDENCIAS_DIR, '07-adesao-medicamento-alerta.png'), fullPage: true });
        resultados.push({ caso: 'CT-AUTO-04', status: 'PASSOU', detalhe: 'Omissão de dose registrada com geração automática de alerta veterinário.' });
        console.log('   ✅ [CT-AUTO-04] APROVADO!\n');

        await context.close();
        fs.writeFileSync(path.join(EVIDENCIAS_DIR, 'relatorio-execucao.json'), JSON.stringify({
            dataExecucao: new Date().toISOString(),
            urlAlvo: BASE_URL,
            totalCasos: resultados.length,
            aprovados: resultados.length,
            resultados
        }, null, 2));

        console.log('===================================================================');
        console.log(' 🏆 TODOS OS 4 CASOS DE TESTE AUTOMATIZADOS PASSARAM COM SUCESSO!');
        console.log(` 📂 Evidências e vídeo salvos em: ${EVIDENCIAS_DIR}`);
        console.log('===================================================================');
    } finally {
        await browser.close();
    }
})().catch(err => {
    console.error('❌ Falha na execução da suíte automatizada:', err);
    process.exitCode = 1;
});
