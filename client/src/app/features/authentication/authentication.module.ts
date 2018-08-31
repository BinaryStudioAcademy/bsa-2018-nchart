import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '@app/features/authentication/login-form/login-form.component';
import { RegisterFormComponent } from '@app/features/authentication/register-form/register-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, SharedModule, ReactiveFormsModule],
	exports: [LoginFormComponent, RegisterFormComponent],
	declarations: [LoginFormComponent, RegisterFormComponent]
})
export class AuthenticationModule {}
