import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormAuthComponent, InputComponent } from '@app/core/components';
import { AuthFieldInput } from '@app/shared/interfaces';
import { MatchPassword, emailRegex, passwordRegex } from '@app/shared/utils';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormAuthComponent, InputComponent, RouterLink],
  template: `
    <div class="header-connection">
      <h1 class="header-connection-title">S'inscrire</h1>
      <p class="header-conection-paragraph">
        Créez-vous un compte pour commencer à faire votre collection de Sneakers
      </p>
    </div>
    <app-form-auth
      [formGroup]="registerForm"
      [userInput]="subscriberInputField"
      [actionForm]="'Inscription'"
    />
    <div class="footer-connection">
      <p>Déjà un compte ?</p>
      <a class="footer-connection-link" routerLink="/login">Connecter-vous</a>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: auto;
      gap: 2rem;

      .footer-connection {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        padding: 1rem;
        color: #828282;
        font-weight: 400;
        font-family: 'Inter', sans-serif;
        &-link {
          text-decoration: underline;
        }
      }
    }
  `,
})
export default class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  registerForm = this.fb.group(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      checkPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    },
    { validators: MatchPassword('password', 'checkPassword') },
  );

  subscriberInputField: AuthFieldInput[] = [
    {
      inputId: 'email-subscriber',
      labelFor: 'Email',
      inputType: 'email',
      formControlName: 'email',
    },
    {
      inputId: 'password-subscriber',
      labelFor: 'Mot de passe',
      inputType: 'password',
      formControlName: 'password',
    },
    {
      inputId: 'check-password-subscriber',
      labelFor: 'Confirmer Mot de passe',
      inputType: 'password',
      formControlName: 'checkPassword',
    },
  ];
}