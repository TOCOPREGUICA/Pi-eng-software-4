import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rota } from './rotas.model';
import { RotasService } from './rotas.service';
import { TopbarComponent } from '../../padronizacao/menu/topbar/topbar.component';
import { SidebarComponent } from '../../padronizacao/menu/sidebar/sidebar.component';
import { ModalCaminhaoComponent } from '../../padronizacao/modal/modal-caminhao/modal-caminhao.component';
import { Caminhao } from '../caminhao/caminhao.service';

@Component({
  selector: 'app-rotas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TopbarComponent,
    SidebarComponent,
    ModalCaminhaoComponent 
  ],
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {

  selectedCaminhao: Caminhao | null = null;
  caminhao = '';
  data: string = new Date().toISOString().slice(0, 10);
  origem = '';
  destino = '';
  idEditando: number | null = null;

  rotas: Rota[] = [];

  mostrarModal = false;
  termoBusca = '';
  caminhoes: any[] = []; 

  constructor(private rotasService: RotasService) {}

  // ================== Ciclo de vida ==================
  ngOnInit(): void {
    this.listar();
    this.buscarCaminhoes();
  }

  // ================== CRUD ==================
  listar(): void {
    this.rotasService.getRotas().subscribe((data) => {
      this.rotas = data;
    });
  }

  salvar(): void {
  if (!this.selectedCaminhao) {
    alert('Selecione um caminhão!');
    return;
  }

  const rota = new Rota(this.selectedCaminhao, new Date(this.data).toISOString(), this.origem, this.destino);

  if (this.idEditando !== null) {
    this.rotasService.atualizarRotas(this.idEditando, rota).subscribe(() => {
      alert('Rota atualizada com sucesso!');
      this.limparCampos();
      this.listar();
    });
  } else {
    this.rotasService.adicionarRotas(rota).subscribe(() => {
      alert('Rota salva com sucesso!');
      this.limparCampos();
      this.listar();
    });
  }
}

  editar(rota: Rota, id: number | undefined): void {
  if (id === undefined) return;
  this.selectedCaminhao = rota.caminhao;
  this.caminhao = `${rota.caminhao.placa} (${rota.caminhao.residuos})`;
  this.data = rota.data.slice(0, 10);
  this.origem = rota.origem;
  this.destino = rota.destino;
  this.idEditando = id;
}

  excluir(id: number | undefined): void {
    if (id === undefined) return;
    if (confirm('Tem certeza que deseja excluir esta Rota?')) {
      this.rotasService.excluirRotas(id).subscribe(() => {
        alert('Rota excluída com sucesso!');
        this.listar();
      });
    }
  }

  // ================== Utilitários ==================
  limparCampos(): void {
  this.caminhao = '';
  this.selectedCaminhao = null;
  this.data = new Date().toISOString().slice(0, 10);
  this.origem = '';
  this.destino = '';
  this.idEditando = null;
  this.fecharModal();
}

  // =============== Modal helpers ===================
  abrirModal(): void {
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  selecionarCaminhao(c: Caminhao): void {
  this.selectedCaminhao = c;
  this.caminhao = `${c.placa} (${c.residuos})`; // apenas visual
  this.fecharModal();
  }

  // =============== Simula busca de caminhões ============
  buscarCaminhoes(): void {
    // Exemplo de mock, substitua por chamada a serviço real se houver
    this.caminhoes = [];
  }
}
