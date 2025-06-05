import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  profileMenuOpen = false;

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  cadastroAberto = false;

toggleCadastro() {
  this.cadastroAberto = !this.cadastroAberto;
}

navegarPara(destino: string) {
  if(destino == "Ruas") this.router.navigate(['/ruas']);
  if(destino == "Rotas") this.router.navigate(['/rotas']);
  if(destino == "Caminhao") this.router.navigate(['/caminhao']);
  if(destino == "PontosColeta") this.router.navigate(['/pontos-coleta']);
  console.log('Ir para:', destino);
}

logout(): void {
    alert('Usuário deslogado.');
    this.router.navigate(['/login']);
  }
}
