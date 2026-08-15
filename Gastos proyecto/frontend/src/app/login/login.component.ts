import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GlowHorizonComponent } from '../shared/components/glow-horizon/glow-horizon.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, GlowHorizonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (result) => {
        this.loading = false;
        if (result.success) {
          if (result.token && result.user) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
          }
          this.router.navigate(['/welcome']);
        } else {
          this.errorMessage = result.message;
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'No se pudo conectar al servidor. Verifica que el backend este corriendo.';
      }
    });
  }
}