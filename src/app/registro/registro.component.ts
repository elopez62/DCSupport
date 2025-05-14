import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  userData = {
    nombre: '',
    email: '',
    password: '',
    rol_id: null
  };
  
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  get passwordMismatch(): boolean {
    return this.userData.password !== this.confirmPassword;
  }

  register() {
    if (this.passwordMismatch) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.successMessage = 'Registro exitoso. Por favor, inicia sesión.';

        // Redirige después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.message;
        
        // Limpia solo el campo de email
        this.userData.email = '';

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}
