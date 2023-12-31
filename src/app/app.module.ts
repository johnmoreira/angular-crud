import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HeaderComponent } from './components/template/header/header.component';
import { ProductCrudComponent } from './view/product-crud/product-crud.component';
import { ProductReadComponent } from './components/products/product-read/product-read.component';
import { ProductDeleteComponent } from './components/products/product-delete/product-delete.component';
import { CurrencyPipe } from '@angular/common';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainer } from "./shared/components/toasts/toasts-container/toasts-container.component";

registerLocaleData(localePt)

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        NavComponent,
        HeaderComponent,
        ProductCrudComponent,
        ProductReadComponent,
        ProductDeleteComponent,
        ProductFormComponent,
    ],
    providers: [{
            provide: LOCALE_ID,
            useValue: 'pt-BR'
        },
        CurrencyPipe,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule,
        ToastsContainer
    ]
})
export class AppModule { }