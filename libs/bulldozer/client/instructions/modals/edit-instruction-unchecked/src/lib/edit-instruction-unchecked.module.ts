import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ObscureAddressModule } from '@bulldozer-client/obscure-address';
import { LetDirective, PushPipe } from '@ngrx/component';
import { EditInstructionUncheckedComponent } from './edit-instruction-unchecked.component';
import { EditInstructionUncheckedDirective } from './edit-instruction-unchecked.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DragDropModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    LetDirective, PushPipe,
    ObscureAddressModule,
  ],
  declarations: [
    EditInstructionUncheckedComponent,
    EditInstructionUncheckedDirective,
  ],
  exports: [EditInstructionUncheckedDirective],
})
export class EditInstructionUncheckedModule { }
