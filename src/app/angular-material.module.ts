import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {} from '@angular/material/expansion';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatBadgeModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatTooltipModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatTabsModule,
  MatMenuModule,
  MatSnackBarModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatExpansionModule,
} from '@angular/material';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatChipsModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  providers: [
    MatDatepickerModule
  ]
})

export class AngularMaterialModule { }
