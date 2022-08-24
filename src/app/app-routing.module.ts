import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AkunPenjualEditComponent } from './components/akun-penjual-edit/akun-penjual-edit.component';
import { AkunPenjualHomeComponent } from './components/akun-penjual-home/akun-penjual-home.component';
import { AkunPenjualTambahComponent } from './components/akun-penjual-tambah/akun-penjual-tambah.component';
import { CabangPenjualEditComponent } from './components/cabang-penjual-edit/cabang-penjual-edit.component';
import { CabangPenjualHomeComponent } from './components/cabang-penjual-home/cabang-penjual-home.component';
import { CabangPenjualTambahComponent } from './components/cabang-penjual-tambah/cabang-penjual-tambah.component';
import { FaqEditComponent } from './components/faq-edit/faq-edit.component';
import { FaqHomeComponent } from './components/faq-home/faq-home.component';
import { FaqTambahComponent } from './components/faq-tambah/faq-tambah.component';
import { GantiPasswordComponent } from './components/ganti-password/ganti-password.component';
import { LoginComponent } from './components/login/login.component';
import { LotLelangDetailComponent } from './components/lot-lelang-detail/lot-lelang-detail.component';
import { LotLelangEditComponent } from './components/lot-lelang-edit/lot-lelang-edit.component';
import { LotLelangHomeComponent } from './components/lot-lelang-home/lot-lelang-home.component';
import { LotLelangTambahComponent } from './components/lot-lelang-tambah/lot-lelang-tambah.component';
import { OperatorEditComponent } from './components/operator-edit/operator-edit.component';
import { OperatorHomeComponent } from './components/operator-home/operator-home.component';
import { OperatorTambahComponent } from './components/operator-tambah/operator-tambah.component';
import { PenjualEditComponent } from './components/penjual-edit/penjual-edit.component';
import { PenjualHomeComponent } from './components/penjual-home/penjual-home.component';
import { PenjualTambahComponent } from './components/penjual-tambah/penjual-tambah.component';
import { PenyelenggaraEditComponent } from './components/penyelenggara-edit/penyelenggara-edit.component';
import { PenyelenggaraHomeComponent } from './components/penyelenggara-home/penyelenggara-home.component';
import { PenyelenggaraTambahComponent } from './components/penyelenggara-tambah/penyelenggara-tambah.component';
import { ValidasiBerkasCekComponent } from './components/validasi-berkas-cek/validasi-berkas-cek.component';
import { ValidasiBerkasHomeComponent } from './components/validasi-berkas-home/validasi-berkas-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
    data : {
      title : 'Login - audiBCA'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data : {
      title : 'Login - audiBCA'
    }
  },
  {
    path: 'lot-lelang',
    component: LotLelangHomeComponent,
    data : {
      title : 'Lot Lelang - audiBCA'
    }
  },
  {
    path: 'lot-lelang/detail/:id',
    component: LotLelangDetailComponent,
    data : {
      title : 'Lot Lelang Detail - audiBCA'
    }
  },
  {
    path: 'lot-lelang/edit/:id',
    component: LotLelangEditComponent,
    data : {
      title : 'Lot Lelang Edit - audiBCA'
    }
  },
  {
    path: 'lot-lelang/tambah',
    component: LotLelangTambahComponent,
    data : {
      title : 'Lot Lelang Tambah - audiBCA'
    }
  },
  {
    path: 'faq',
    component: FaqHomeComponent,
    data : {
      title : 'FAQ - audiBCA'
    }
  },
  {
    path: 'faq/tambah',
    component: FaqTambahComponent,
    data : {
      title : 'FAQ Tambah - audiBCA'
    }
  },
  {
    path: 'faq/edit/:id',
    component: FaqEditComponent,
    data : {
      title : 'FAQ Edit - audiBCA'
    }
  },
  {
    path: 'akun-operator',
    component: OperatorHomeComponent,
    data : {
      title : 'Akun Operator - audiBCA'
    }
  },
  {
    path: 'akun-operator/tambah',
    component: OperatorTambahComponent,
    data : {
      title : 'Akun Operator Tambah - audiBCA'
    }
  },
  {
    path: 'akun-operator/edit/:id',
    component: OperatorEditComponent,
    data : {
      title : 'Akun Operator Edit - audiBCA'
    }
  },
  {
    path: 'validasi-berkas',
    component: ValidasiBerkasHomeComponent,
    data : {
      title : 'Validasi Berkas - audiBCA'
    }
  },
  {
    path: 'validasi-berkas/cek/:id',
    component: ValidasiBerkasCekComponent,
    data : {
      title : 'Validasi Berkas Cek - audiBCA'
    }
  },
  {
    path: 'penjual',
    component: PenjualHomeComponent,
    data : {
      title : 'Penjual - audiBCA'
    }
  },
  {
    path: 'penjual/tambah',
    component: PenjualTambahComponent,
    data : {
      title : 'Penjual Tambah - audiBCA'
    }
  },
  {
    path: 'penjual/edit/:id',
    component: PenjualEditComponent,
    data : {
      title : 'Penjual Edit - audiBCA'
    }
  },
  {
    path: 'cabang-penjual',
    component: CabangPenjualHomeComponent,
    data : {
      title : 'Cabang Penjual - audiBCA'
    }
  },
  {
    path: 'cabang-penjual/tambah',
    component: CabangPenjualTambahComponent,
    data : {
      title : 'Cabang Penjual Tambah - audiBCA'
    }
  },
  {
    path: 'cabang-penjual/edit/:id',
    component: CabangPenjualEditComponent,
    data : {
      title : 'Cabang Penjual Edit - audiBCA'
    }
  },
  {
    path: 'penyelenggara',
    component: PenyelenggaraHomeComponent,
    data : {
      title : 'Penyelenggara - audiBCA'
    }
  },
  {
    path: 'penyelenggara/tambah',
    component: PenyelenggaraTambahComponent,
    data : {
      title : 'Penyelenggara Tambah - audiBCA'
    }
  },
  {
    path: 'penyelenggara/edit/:id',
    component: PenyelenggaraEditComponent,
    data : {
      title : 'Penyelenggara Edit - audiBCA'
    }
  },
  {
    path: 'ganti-password',
    component: GantiPasswordComponent,
    data : {
      title : 'Ganti Password - audiBCA'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
