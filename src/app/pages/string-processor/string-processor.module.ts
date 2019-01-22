import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StringProccessorLayoutComponent } from './layout/layout.component';
import { StringProcessorComponent } from './components/default/string-processor.component';
import { HtmlMissingTagComponent } from './components/html-missing-tag/html-missing-tag.component';

const routes: Routes = [
  {
    path: '',
    component: StringProccessorLayoutComponent,
    children: [
      { path: '', component: StringProcessorComponent },
      { path: 'html-missing-tag', component: HtmlMissingTagComponent },
    ]
  }
];

@NgModule({
  declarations: [
    StringProccessorLayoutComponent,
    StringProcessorComponent,
    HtmlMissingTagComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    StringProccessorLayoutComponent
  ]
})
export class StringProcessorModule { }
