import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FolderRoutingModule } from './folder-routing.module';
import { FolderComponent } from './folder/folder.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { TreeComponent } from './tree/tree.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FolderComponent,
    TreeComponent
  ],
  imports: [
    CommonModule,
    FolderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ]
})
export class FolderModule { }
