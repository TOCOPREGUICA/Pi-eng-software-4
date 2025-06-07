import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bairro } from '../../../cadastrar/bairro/bairro.model';
import { BairroService } from '../../../cadastrar/bairro/bairro.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-bairros',
  standalone: true, 
  imports: [CommonModule,FormsModule], 
  templateUrl: './modal-bairro.component.html',
})
export class ModalBairrosComponent implements OnInit {

  @Input() visivel: boolean = false;
  @Output() fechado = new EventEmitter<void>();
  @Output() bairroSelecionado = new EventEmitter<Bairro>();

  bairros: Bairro[] = [];
  termoPesquisa: string = '';
  bairrosFiltrados: Bairro[] = [];

  constructor(private bairroService: BairroService) {}

  ngOnInit() {
    this.bairrosFiltrados = [...this.bairros]; // inicia com todos
  }

  filtrarBairros(): void {
    const termo = this.termoPesquisa.trim().toLowerCase();
    this.bairrosFiltrados = this.bairros.filter(b =>
      b.nome.toLowerCase().includes(termo)
    );
  }

  carregarBairros(): void {
    this.bairroService.listar().subscribe({
      next: (data) => {
        this.bairros = data;
      },
      error: (err) => {
        console.error('Erro ao carregar bairros', err);
        alert('Não foi possível carregar a lista de bairros.');
      }
    });
  }

  selecionar(bairro: Bairro) {
    this.bairroSelecionado.emit(bairro);
  }

  fechar(): void {
    this.fechado.emit();
  }
}