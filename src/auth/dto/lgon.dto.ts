export class LoginDto {
  readonly email: string;
  readonly password: string;
  readonly role: string; // Puede ser 'admin' o 'user'
}
