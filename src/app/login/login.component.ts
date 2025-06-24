import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // <-- Faltaba este import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule // <-- Y aquí en el array
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario = '';
  password = '';
  error = '';

  onSubmit() {
    if (this.usuario === 'admin' && this.password === 'admin') {
      this.error = '';
      localStorage.setItem('logueado', 'true');
      window.location.href = '/dashboard';  // O usar un router si configuras routing
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  }
}