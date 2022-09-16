import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AmhConTabComponent } from '../amh-con-tab/amh-con-tab.component';
import { AmhConTabGroupComponent } from '../amh-con-tab-group/amh-con-tab-group.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, AmhConTabComponent, AmhConTabGroupComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
