import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./components/signin/signin.component";
import { SearchComponent } from "./components/search/search.component";
import { InfoComponent } from "./components/info/info.component";
import { SignOffComponent } from "./components/signoff/signoff.component";

const APP_ROUTES:Routes = [
    {path:"", redirectTo:"/signin", pathMatch:'full'},
    {path:"signin", component:SigninComponent},
    {path:"signoff", component:SignOffComponent},
    {path:"search", component:SearchComponent},
    {path:"info", component:InfoComponent}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
