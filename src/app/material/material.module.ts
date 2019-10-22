import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";

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
      MatSnackBarModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatCheckboxModule,
      MatDialogModule,
      MatTooltipModule,
      MatCardModule,
      MatSelectModule,
      MatExpansionModule
  ]

  @NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
