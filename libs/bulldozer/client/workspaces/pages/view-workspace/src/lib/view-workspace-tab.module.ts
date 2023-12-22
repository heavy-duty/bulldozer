import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ItemUpdatingModule } from '@bulldozer-client/item-updating';
import { ProgressSpinnerModule } from '@heavy-duty/ui/progress-spinner';
import { LetDirective, PushPipe } from '@ngrx/component';
import { ViewWorkspaceTabComponent } from './view-workspace-tab.component';
@NgModule({
  declarations: [ViewWorkspaceTabComponent],
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
  exports: [ViewWorkspaceTabComponent],
})
export class ViewWorkspaceTabModule { }
