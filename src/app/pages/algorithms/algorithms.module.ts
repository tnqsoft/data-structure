import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmsComponent } from './components/default/algorithms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlgorithmsLayoutComponent } from './layout/layout.component';
import { AlgorithmPolishNotationComponent } from './components/polish-notation/polish-notation.component';

const routes: Routes = [
  {
    path: '',
    component: AlgorithmsLayoutComponent,
    children: [
      { path: '', component: AlgorithmsComponent },
      { path: 'polish-notation', component: AlgorithmPolishNotationComponent },
    ]
  }
];

@NgModule({
  declarations: [
    AlgorithmsLayoutComponent,
    AlgorithmsComponent,
    AlgorithmPolishNotationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AlgorithmsLayoutComponent
  ]
})
export class AlgorithmsModule { }
