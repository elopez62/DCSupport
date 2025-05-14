import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AuthService } from '../auth.service'; // Reemplaza con tu servicio de autenticación
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true, // Marca el componente como standalone
  imports: [FormsModule, CommonModule, RouterModule], // Agrega FormsModule y CommonModule a los imports
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        // Manejar la respuesta exitosa (por ejemplo, guardar el token y redirigir)
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/dashboard']); // Redirigir al dashboard
      },
      error: (error) => {
        this.errorMessage = error.error?.message;

        this.credentials.email='';
        this.credentials.password='';

        setTimeout(() => {
          this.errorMessage= '';
        }, 3000);
      }
    });
  }
}