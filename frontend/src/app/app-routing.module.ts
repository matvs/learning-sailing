import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TackingViewComponent } from './tacking-view/tacking-view.component';

const routes: Routes = [
  { path: '', component: TackingViewComponent },
  { path: 'tacking-view', component: TackingViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
