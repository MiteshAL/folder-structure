import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Folder, FolderService, FolderType } from 'src/app/service/folder.service';
import {cloneDeep} from 'lodash'
@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  foldersJson: Folder[] = [];
  rootOpen: boolean = true;
  constructor(
    public folderService: FolderService
  ) { }

  ngOnInit(): void {
    this.getFolders();
  }
  // get all folder list from db
  getFolders() {
    this.folderService.getFolders().subscribe(
      {
        next: (res: Folder[]) => {
          this.folderService.folders = res;
          this.foldersJson = cloneDeep(res);
        },
        error: (err: HttpErrorResponse) => console.error(err),
      }
    )
  }
  // add Folder to Root
  addFolderToRoot() {
    const newFolder: Folder = {
      id: null,
      name: 'New Folder',
      type: FolderType.Folder,
      rootFolderId:0,
      children: null,
      isOpen: false,
      isNew:true,
      formControl:new FormControl('New Folder')
    }
    this.folderService.folders.push(newFolder);
  }
}

