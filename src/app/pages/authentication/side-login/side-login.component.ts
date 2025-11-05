import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { AppAuthBrandingComponent } from '../../../layouts/full/vertical/sidebar/auth-branding.component';
import { Credentials } from 'src/app/entities/Credentials';
import { User } from 'src/app/entities/User';
import { AuthenticationService } from 'src/app/services/auth.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  options = this.settings.getOptions();

  constructor(private router: Router,
    private settings: CoreService,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private authService: AuthenticationService,) { }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/monitoreo']);
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      // password: ['123456', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.initForm()
  }

  loginForm: UntypedFormGroup;
  public credentials: Credentials;
  hidePass = true;

  public correoUsuario: string = '';
  public textLogin: string = 'Iniciar Sesión';
  public loading: boolean = false;
  onSubmit() {
    this.loading = true;
    this.textLogin = 'Cargando...';
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    // this.loading = true;
    this.credentials = this.loginForm.value;

    this.auth
      .authenticate(this.credentials)
      .pipe(
        catchError((error) => {
          this.loading = false;
          this.textLogin = 'Iniciar Sesión';
          Swal.fire({
            icon: 'error',
            title: '¡Ops!',
            text: 'Ocurrió un error al procesar tu solicitud.',
            confirmButtonText: 'Confirmar',
            background: '#141a21',
            color: '#ffffff',
          });

          return throwError(() => '');
        })
      )
      .subscribe((result: User) => {
        this.auth.setData(result);

        this.router.navigate(['/monitoreo']);

        Swal.fire({
          icon: 'success',
          title: '¡Operación Exitosa!',
          text: 'Todo salió bien.',
          confirmButtonText: 'Confirmar',
          background: '#141a21',
          color: '#ffffff',
        });


        this.loading = false;
        this.textLogin = 'Iniciar Sesión';
      });
  }

  onSubmits() {
    // console.log(this.form.value);
    this.router.navigate(['/monitoreo']);
  }
}
