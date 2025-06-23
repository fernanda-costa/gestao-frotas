import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.loginError = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email === 'admin@email.com' && password === '123456') {
        this.authService.login({ nome: "dmin", "tipo": 'ADMIN', token: "123" } as Usuario);
        this.router.navigate(['/admin']);
      } else if (email === 'motorista@email.com' && password === '123456') {
        this.authService.login({ nome: "dmin", "tipo": 'MOTORISTA', token: "123" } as Usuario);
        this.router.navigate(['/motorista']);
      }  
      
      else {
        this.loginError = 'E-mail ou senha inválidos.';
      }
    } else {
      this.loginError = 'Preencha todos os campos corretamente.';
    }
  }

}
