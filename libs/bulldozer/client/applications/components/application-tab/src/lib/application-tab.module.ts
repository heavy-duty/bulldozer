import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ItemUpdatingModule } from '@bulldozer-client/item-updating';
import { ProgressSpinnerModule } from '@heavy-duty/ui/progress-spinner';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ApplicationTabComponent } from './application-tab.component';
@NgModule({
  declarations: [ApplicationTabComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    ProgressSpinnerModule,
    MatTooltipModule,
    LetDirective, PushPipe,
    ItemUpdatingModule,
  ],
  exports: [ApplicationTabComponent],
})
export class ApplicationTabModule { }
