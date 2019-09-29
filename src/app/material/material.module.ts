import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";

  const MaterialComponents = [
      MatButtonModule,
      MatMenuModule,
      MatIconModule,
      MatCardModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatTableModule,
      MatSnackBarModule
  ]

  @NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
