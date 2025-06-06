import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Bairros } from '../modal-cadastro-bairros/cadastro.bairros.model';
import { CadastroBairrosService } from '../modal-cadastro-bairros/cadastro.bairros.service';

@Component({
  selector: 'app-modal-bairros',
  imports: [CommonModule , FormsModule],
  templateUrl: './modal-bairros.component.html',
  styleUrl: './modal-bairros.component.css'
})
export class ModalBairrosComponent {
  @Input() mostrarBairros: boolean = false;
  @Input() termoBuscaBairros: string = '';
  @Output() termoBuscaBairrosChange = new EventEmitter<string>();

  @Output() selecionar = new EventEmitter<Bairros>();
  @Output() fechar = new EventEmitter<void>();
  @Input() bairrosSelecionadaId: number | null = null;

  bairros: Bairros[] = [];
  bairrosFiltadros: Bairros[] = [];


  constructor(private cadastrobairrosService: CadastroBairrosService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mostrarBairros'] && this.mostrarBairros) {
      this.buscarBairros();
    }
  }

  buscarBairros() {
    this.cadastrobairrosService.getBairros().subscribe((data) => {
      this.bairros = data;
      this.aplicarFiltro();
    });
  }


  onTermoBuscaChange(valor: string) {
    this.termoBuscaBairros = valor;
    this.termoBuscaBairrosChange.emit(valor);
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
  const termo = this.termoBuscaBairros?.toLowerCase() ?? '';

  this.bairrosFiltadros = this.bairros.filter(b =>
    (this.bairrosSelecionadaId == null || b.id !== this.bairrosSelecionadaId) &&
    (
      b.id?.toString().includes(termo) ||
      b.nome?.toLowerCase().includes(termo)
    )
  );
}

  onSelecionar(b: Bairros) {
    this.selecionar.emit(b);
  }

  onFechar() {
    this.fechar.emit();
  }

}
