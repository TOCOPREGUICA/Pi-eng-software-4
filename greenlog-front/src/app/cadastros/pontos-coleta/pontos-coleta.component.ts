import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PontoColeta } from './ponto-coleta.model';
import { PontoColetaService } from './ponto-coleta.service';
import { TopbarComponent } from "../../padronizacao/menu/topbar/topbar.component";
import { SidebarComponent } from "../../padronizacao/menu/sidebar/sidebar.component";
import { BairrosComponent } from '../../padronizacao/modal/modal-cadastro-bairros/cadastro.bairros.component';
import { Bairros } from '../../padronizacao/modal/modal-cadastro-bairros/cadastro.bairros.model';
import { ModalBairrosComponent } from "../../padronizacao/modal/modal-bairros/modal-bairros.component";

@Component({
  selector: 'app-pontos-coleta',
  standalone: true,
  imports: [CommonModule, FormsModule, TopbarComponent, SidebarComponent, BairrosComponent, ModalBairrosComponent],
  templateUrl: './pontos-coleta.component.html',
  styleUrls: ['./pontos-coleta.component.css']
})
export class PontosColetaComponent implements OnInit {

  pontosColeta: PontoColeta[] = [];
  pontoColetaAtual: PontoColeta = this.getCleanPontoColeta();
  idEditando: number | null = null;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  opcoesTiposResiduos: string[] = ['Plástico', 'Papel', 'Metal', 'Orgânico'];
  tiposResiduosSelecionados: { [key: string]: boolean } = {};
  termoBuscaBairros: any;
  mostrarBairros: boolean = false;

  constructor(
    private pontoColetaService: PontoColetaService
  ) {}

  ngOnInit(): void {
    this.carregarPontosColeta();
    this.resetTiposResiduosSelecionados();
  }

  private getCleanPontoColeta(): PontoColeta {
    return {
      bairro: null,
      nome: '',
      responsavel: '',
      telefoneResponsavel: '',
      emailResponsavel: '',
      endereco: '',
      horarioFuncionamento: '',
      tiposResiduosAceitos: []
    };
  }

  private resetTiposResiduosSelecionados(): void {
    this.tiposResiduosSelecionados = {};
    this.opcoesTiposResiduos.forEach(tipo => this.tiposResiduosSelecionados[tipo] = false);
  }

  private atualizarTiposSelecionadosComBaseNoModelo(): void {
    this.resetTiposResiduosSelecionados();
    if (this.pontoColetaAtual?.tiposResiduosAceitos) {
      this.pontoColetaAtual.tiposResiduosAceitos.forEach(tipoAceito => {
        if (this.opcoesTiposResiduos.includes(tipoAceito)) {
          this.tiposResiduosSelecionados[tipoAceito] = true;
        }
      });
    }
  }

  onTipoResiduoChange(tipo: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.tiposResiduosSelecionados[tipo] = isChecked;
    this.pontoColetaAtual.tiposResiduosAceitos = this.opcoesTiposResiduos
      .filter(t => this.tiposResiduosSelecionados[t]);
  }

  carregarPontosColeta(): void {
    this.pontoColetaService.getPontosColeta().subscribe({
      next: (data) => this.pontosColeta = data,
      error: (err) => this.mostrarErro(err.message)
    });
  }

  onSubmit(form: NgForm): void {
    this.limparMensagens();

    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (form.invalid || !this.validarEmail(this.pontoColetaAtual.emailResponsavel ?? '')) {
      this.mostrarErro("Preencha todos os campos obrigatórios corretamente. Verifique se o e-mail está válido.");
      return;
    }

    this.pontoColetaAtual.tiposResiduosAceitos = this.opcoesTiposResiduos
      .filter(t => this.tiposResiduosSelecionados[t]);

    if (this.pontoColetaAtual.tiposResiduosAceitos.length === 0) {
      this.mostrarErro("Selecione pelo menos um tipo de resíduo.");
      return;
    }

    if (this.pontoColetaAtual.bairro === null || this.pontoColetaAtual.bairro === undefined) {
      this.mostrarErro("Selecione um bairro.");
      return;
    }

    const dadosParaSalvar: PontoColeta = { ...this.pontoColetaAtual };
    if (this.idEditando === null && dadosParaSalvar.id === undefined) {
      delete dadosParaSalvar.id;
    }

    if (this.idEditando !== null) {
      this.pontoColetaService.atualizarPontoColeta(this.idEditando, dadosParaSalvar).subscribe({
        next: (response) => {
          this.mostrarSucesso(`Ponto de coleta "${response.nome}" atualizado com sucesso!`);
          this.finalizarEdicao(form);
        },
        error: (err) => this.mostrarErro(err.message)
      });
    } else {
      this.pontoColetaService.adicionarPontoColeta(dadosParaSalvar).subscribe({
        next: (response) => {
          this.mostrarSucesso(`Ponto de coleta "${response.nome}" salvo com sucesso!`);
          this.finalizarEdicao(form);
        },
        error: (err) => this.mostrarErro(err.message)
      });
    }
  }

  editarPontoColeta(ponto: PontoColeta): void {
    if (ponto.id === undefined) {
      this.mostrarErro("ID do ponto de coleta não encontrado para edição.");
      return;
    }
    this.limparMensagens();
    this.idEditando = ponto.id;
    this.pontoColetaAtual = JSON.parse(JSON.stringify(ponto));
    this.atualizarTiposSelecionadosComBaseNoModelo();
  }

  excluirPontoColeta(id: number | undefined): void {
    if (id === undefined) {
      this.mostrarErro("ID do ponto de coleta não encontrado para exclusão.");
      return;
    }
    this.limparMensagens();
    if (confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      this.pontoColetaService.excluirPontoColeta(id).subscribe({
        next: () => {
          this.mostrarSucesso('Ponto de coleta excluído com sucesso!');
          this.carregarPontosColeta();
          if (this.idEditando === id) {
            this.finalizarEdicao();
          }
        },
        error: (err) => this.mostrarErro(err.message)
      });
    }
  }

  finalizarEdicao(form?: NgForm): void {
    this.pontoColetaAtual = this.getCleanPontoColeta();
    this.idEditando = null;
    this.resetTiposResiduosSelecionados();
    if (form) {
      form.resetForm(this.getCleanPontoColeta());
    }
    this.carregarPontosColeta();
  }

  limparMensagens(): void {
    this.mensagemErro = '';
    this.mensagemSucesso = '';
  }

  mostrarErro(msg: string): void {
    this.mensagemErro = msg;
    this.mensagemSucesso = '';
  }

  mostrarSucesso(msg: string): void {
    this.mensagemSucesso = msg;
    this.mensagemErro = '';
  }

  validarEmail(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  selectedBairros: Bairros | null = null;
  mostrarModalBairros = false;

  abrirBairros(): void {
    this.mostrarModalBairros = true;
  }

  fecharBairros(): void {
    this.mostrarModalBairros = false;
  }

  abrirModalBairros(): void {
    this.mostrarBairros = true;
  }

  fecharModalBairros(): void {
    this.mostrarBairros = false;
  }

  selecionarBairros(b: Bairros): void {
    this.selectedBairros = b;
    this.pontoColetaAtual.bairro = b;
    this.fecharModalBairros();
  }
  
}
