import { Component } from '@angular/core';
import {RegisterFormComponent} from '../../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  message: string = '';

}
