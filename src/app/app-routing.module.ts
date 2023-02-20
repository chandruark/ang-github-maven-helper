import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependencyGraphComponent } from './graph-dependices /dependency-graph/dependency-graph.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/depedencygraph',
    pathMatch: 'full'
},  
{
    path: 'depedencygraph',
    component: DependencyGraphComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
