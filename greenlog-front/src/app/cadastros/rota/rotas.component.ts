import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Rota } from './rotas.model';
import { RotasService } from './rotas.service';

@Component({
  selector: 'app-rotas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rotas.component.html',
  styleUrls: ['./rotas.component.css']
})
export class RotasComponent implements OnInit {
  caminhao = '';
  data: string = new Date().toISOString().slice(0, 10);
  origem = '';
  destino = '';
  idEditando: number | null = null;

  rotas: Rota[] = [];

  //implementar o termo de busca
  mostrarModal = false;
  termoBusca = '';
  caminhoes = null;

  constructor(private rotasService: RotasService) {}

  // ================== Ciclo de vida ==================
  ngOnInit(): void {
    this.listar();
  }

  // ================== CRUD ==================
listar() {
    this.rotasService.getRotas().subscribe((data) => {
      this.rotas = data;
    });
  }

  salvar(): void {
    const rota = new Rota(this.caminhao, new Date(this.data).toISOString(), this.origem, this.destino);

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
    console.log(id);
    if (id === undefined) return;
    this.caminhao = rota.caminhao;
    this.data = rota.data.slice(0, 10);
    this.origem = rota.origem;
    this.destino = rota.destino;
    this.idEditando = id
  }

  excluir(id: number | undefined) {
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
    this.data = new Date().toISOString().slice(0, 10);
    this.origem = '';
    this.destino = '';
    this.idEditando = null;
  }

  // =============== Modal helpers ===================
  abrirModal(): void { this.mostrarModal = true; }
  fecharModal(): void { this.mostrarModal = false; }
  selecionarCaminhao(c: { placa: string; residuo: string }): void {
    this.caminhao = `${c.placa} (${c.residuo})`;
    this.fecharModal();
  }
}
