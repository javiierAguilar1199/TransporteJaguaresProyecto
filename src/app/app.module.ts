import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// perfect scrollbar
import { NgScrollbarModule } from 'ngx-scrollbar';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { FilterPipe } from './pipe/filter.pipe';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TokenInterceptor } from './pages/apps/interceptors/token.interceptor';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { mailGlobalVariable, mailService } from './pages/apps/email/email.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, BlankComponent, FilterPipe],
  imports: [
    MatNativeDateModule,
MatDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgScrollbarModule,
    FullComponent,
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    mailService,
    mailGlobalVariable,
    DatePipe,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
