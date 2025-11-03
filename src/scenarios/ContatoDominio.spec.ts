import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import DominioPage from '../support/pages/DominioPage';
import { ai } from '@zerostep/playwright';

test.describe('Testes funcionais no site da Dominio Sistemas', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let dominioPage: DominioPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.dominio')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    dominioPage = new DominioPage(page);
    await page.goto(BASE_URL);
  });

  test('Validar funcionalidade de formulário Fale Conosco', async () => {
    await dominioPage.preencherCamposValidos();
    await dominioPage.enviarFormulario();
    await dominioPage.validarEnvio();
  });

  test('Não deve enviar com campo obrigatório "Nome" vazio', async () => {
    await dominioPage.preencherCampoNomeVazio();
    await dominioPage.enviarFormulario();
    await dominioPage.validarCampoVazio();
  });

  test('Não deve enviar com campo "E-mail" inválido usando zerostep', async ({
    page
  }) => {
    await page.goto('https://www.dominiosistemas.com.br/contato/');

    const aiArgs = { page, test };
    await ai('fill "E-mail*" with "email invalido"', aiArgs);
    await ai('click the "ENVIAR" button', aiArgs);
    await dominioPage.validarEmailInvalido();
  });
});
