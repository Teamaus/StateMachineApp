import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtlasReduxModule } from 'atlas-redux';
import { EmptyComponent } from './empty/empty.component';
let path1 = ()=>'http://localhost:3000/remoteEntry.js'
let path2 = ()=>'http://localhost:3001/remoteEntry.js'
const routes: Routes = [
  {path:'EMPTY',component:EmptyComponent,outlet:"profile"},
  {path:'650',loadChildren:()=>import('../app/op650/op650.module').then(m=>m.Op650Module),outlet:"profile"},
  {path:'550',loadChildren:()=>import('../app/op550/op550.module').then(m=>m.Op550Module),outlet:"profile"},
  
  {
    path: 'remote',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: path1(),
        remoteName: 'mfe1',
        exposedModule: './Module',
      }).then((m) => {
        return m.MicrofrontendModule;
      }),
  },
  {
    path: 'remote1',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:7000/remoteEntry.js',
        remoteName: 'mfe2',
        exposedModule: './Module1',
      }).then((m) => {
        return m.Microfrontend1Module;
      }),
      
  },
  {
    path: '450',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: path2(),
        remoteName: 'mapApp',
        exposedModule: './MapModule',
      }).then((m) => {
        return m.MapModule;
      }),
      outlet:"profile"
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
  onSameUrlNavigation:'reload'
  }),AtlasReduxModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
