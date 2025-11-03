import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class DominioElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoNome(): Locator {
    return this.page.locator('#contatoNome');
  }

  getCampoEmail(): Locator {
    return this.page.locator('#contatoEmail');
  }

  getCampoTelefone(): Locator {
    return this.page.locator('#contatoFone');
  }

  getCampoEstado(): Locator {
    return this.page.locator('#contatoCidade');
  }

  getCampoCidade(): Locator {
    return this.page.locator('#compraCobrancaCidade');
  }

  getCheckClienteSim(): Locator {
    return this.page.locator('#clienteS');
  }

  getCheckClienteNao(): Locator {
    return this.page.locator('#clienteN');
  }

  getJaSouCliente(): Locator {
    return this.page.locator('#ja_sou_cliente');
  }

  getNaoSouCliente(): Locator {
    return this.page.locator('#nao_sou_cliente');
  }

  getCampoMensagem(): Locator {
    return this.page.locator('#msgContato');
  }

  getBotaoEnviar(): Locator {
    return this.page.locator('#btnContato');
  }
}
