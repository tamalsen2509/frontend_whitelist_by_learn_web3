import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhitelistComponent } from './whitelist/whitelist.component';

const routes: Routes = [
  {
    path: 'whitelist/list',
    component: WhitelistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
