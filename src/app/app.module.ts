import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LotLelangHomeComponent } from './components/lot-lelang-home/lot-lelang-home.component';
import { LotLelangDetailComponent } from './components/lot-lelang-detail/lot-lelang-detail.component';
import { LotLelangEditComponent } from './components/lot-lelang-edit/lot-lelang-edit.component';
import { LotLelangTambahComponent } from './components/lot-lelang-tambah/lot-lelang-tambah.component';
import { FaqHomeComponent } from './components/faq-home/faq-home.component';
import { FaqTambahComponent } from './components/faq-tambah/faq-tambah.component';
import { FaqEditComponent } from './components/faq-edit/faq-edit.component';
import { SdkHomeComponent } from './components/sdk-home/sdk-home.component';
import { SdkTambahComponent } from './components/sdk-tambah/sdk-tambah.component';
import { SdkEditComponent } from './components/sdk-edit/sdk-edit.component';
import { OperatorHomeComponent } from './components/operator-home/operator-home.component';
import { OperatorTambahComponent } from './components/operator-tambah/operator-tambah.component';
import { OperatorEditComponent } from './components/operator-edit/operator-edit.component';
import { ValidasiBerkasHomeComponent } from './components/validasi-berkas-home/validasi-berkas-home.component';
import { PenjualHomeComponent } from './components/penjual-home/penjual-home.component';
import { PenjualTambahComponent } from './components/penjual-tambah/penjual-tambah.component';
import { PenjualEditComponent } from './components/penjual-edit/penjual-edit.component';
import { CabangPenjualHomeComponent } from './components/cabang-penjual-home/cabang-penjual-home.component';
import { CabangPenjualTambahComponent } from './components/cabang-penjual-tambah/cabang-penjual-tambah.component';
import { CabangPenjualEditComponent } from './components/cabang-penjual-edit/cabang-penjual-edit.component';
import { PenyelenggaraHomeComponent } from './components/penyelenggara-home/penyelenggara-home.component';
import { PenyelenggaraTambahComponent } from './components/penyelenggara-tambah/penyelenggara-tambah.component';
import { PenyelenggaraEditComponent } from './components/penyelenggara-edit/penyelenggara-edit.component';
import { GantiPasswordComponent } from './components/ganti-password/ganti-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AkunPenjualHomeComponent } from './components/akun-penjual-home/akun-penjual-home.component';
import { AkunPenjualTambahComponent } from './components/akun-penjual-tambah/akun-penjual-tambah.component';
import { AkunPenjualEditComponent } from './components/akun-penjual-edit/akun-penjual-edit.component';
import { ValidasiBerkasCekComponent } from './components/validasi-berkas-cek/validasi-berkas-cek.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxCurrencyModule } from 'ngx-currency';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    LotLelangHomeComponent,
    LotLelangDetailComponent,
    LotLelangEditComponent,
    LotLelangTambahComponent,
    FaqHomeComponent,
    FaqTambahComponent,
    FaqEditComponent,
    SdkHomeComponent,
    SdkTambahComponent,
    SdkEditComponent,
    OperatorHomeComponent,
    OperatorTambahComponent,
    OperatorEditComponent,
    ValidasiBerkasHomeComponent,
    PenjualHomeComponent,
    PenjualTambahComponent,
    PenjualEditComponent,
    CabangPenjualHomeComponent,
    CabangPenjualTambahComponent,
    CabangPenjualEditComponent,
    PenyelenggaraHomeComponent,
    PenyelenggaraTambahComponent,
    PenyelenggaraEditComponent,
    GantiPasswordComponent,
    AkunPenjualHomeComponent,
    AkunPenjualTambahComponent,
    AkunPenjualEditComponent,
    ValidasiBerkasCekComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCommonModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    NgxCurrencyModule,
  ],
  providers: [authInterceptorProviders, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
