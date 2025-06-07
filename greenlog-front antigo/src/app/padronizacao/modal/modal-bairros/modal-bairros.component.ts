  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { Bairro } from '../../../cadastros/bairros/bairro.model';
  import { BairroService } from '../../../cadastros/bairros/bairro.service'; 

  @Component({
    selector: 'app-modal-bairros',
    standalone: true, 
    imports: [CommonModule], 
    templateUrl: './modal-bairros.component.html',
  })
  export class ModalBairrosComponent implements OnInit {

    @Input() visivel: boolean = false;
    @Output() fechado = new EventEmitter<void>();
    @Output() bairroSelecionado = new EventEmitter<{ id: number, nome: string }>();

    bairros: Bairro[] = [];
    
    // Injete o BairroService
    constructor(private bairroService: BairroService) {}

    ngOnInit(): void {
      this.carregarBairros();
    }

    carregarBairros(): void {
      this.bairroService.getBairros().subscribe({
        next: (data) => {
          this.bairros = data;
        },
        error: (err) => {
          console.error('Erro ao carregar bairros', err);
          alert('Não foi possível carregar a lista de bairros.');
        }
      });
    }

  selecionar(bairro: Bairro): void {
    this.bairroSelecionado.emit({ id: bairro.id!, nome: bairro.nome });
  }

  fechar(): void {
    this.fechado.emit();
  }
}