import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ProcessComponent } from './process/process.component';


const routes: Routes = [
  { path:"test",component:TestComponent },
  { path:"process/:nameProcess",component:ProcessComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
