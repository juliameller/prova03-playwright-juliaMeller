import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import DominioElements from '../elements/DominioElements';
import BasePage from './BasePage';

export default class DominioPage extends BasePage {
  readonly dominioElements: DominioElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.dominioElements = new DominioElements(page);
  }

  async preencherCamposValidos(): Promise<void> {
    await this.dominioElements.getCampoNome().fill(faker.person.firstName());
    await this.dominioElements.getCampoEmail().fill(faker.internet.email());
    await this.dominioElements.getCampoTelefone().fill(faker.phone.number());
    await this.dominioElements.getCampoEstado().selectOption('Santa Catarina');
    await this.dominioElements.getCampoCidade().selectOption('CRICIUMA');
    await this.dominioElements.getCheckClienteNao().click();
    await this.dominioElements.getNaoSouCliente().selectOption('Outros');
    await this.dominioElements.getCampoMensagem().fill(faker.lorem.words(2));
  }

  async preencherCampoNomeVazio(): Promise<void> {
    await this.dominioElements.getCampoEmail().fill(faker.internet.email());
    await this.dominioElements.getCampoTelefone().fill(faker.phone.number());
    await this.dominioElements.getCampoEstado().selectOption('Santa Catarina');
    await this.dominioElements.getCampoCidade().selectOption('CRICIUMA');
    await this.dominioElements.getCheckClienteNao().click();
    await this.dominioElements.getNaoSouCliente().selectOption('Outros');
    await this.dominioElements.getCampoMensagem().fill(faker.lorem.words(2));
  }

  async enviarFormulario(): Promise<void> {
    await this.dominioElements.getBotaoEnviar().click();
  }

  async validarCampoVazio(): Promise<void> {
    const errorMessage = await this.page.locator('#contatoNome-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Campo obrigatório.');
  }

  async validarEmailInvalido(): Promise<void> {
    const errorMessage = await this.page.locator('#contatoEmail-error');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Por favor, forneça um endereço de email válido.'
    );
  }

  async validarEnvio(): Promise<void> {
    await this.page.waitForURL('**/obrigado/', { timeout: 10000 });
    await expect(this.page).toHaveURL(
      'https://www.dominiosistemas.com.br/obrigado/'
    );
  }
}
