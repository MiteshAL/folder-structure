import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Folder, FolderService, FolderType } from 'src/app/service/folder.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() folders: Folder[];
  formControl: FormControl = new FormControl();
  constructor(
    public folderService: FolderService
  ) { }

  ngOnInit(): void { }
  // folder Open close Toggle
  folderToggle(folder: Folder): void {
    folder.isOpen = !folder.isOpen;
  }
  //add sub folder
  addSubFolder(folder: Folder) {
    folder.isOpen = true;
    if (!folder.children)
      folder.children = [];
    let rootFolderId = folder.rootFolderId;
    if (folder.rootFolderId === 0)
      rootFolderId = folder.id;
    const newFolder: Folder = {
      id: folder.children.length + 1,
      name: 'New Folder',
      type: FolderType.Unset,
      rootFolderId: rootFolderId,
      children: null,
      isOpen: false,
      isNew: true,
      formControl: new FormControl('New Folder')
    }
    folder.children.push(newFolder);
  }
  //rename folder
  renameFolder(folder: Folder, index: number, folders: Folder[]) {
    const name = folder.formControl?.value?.trim();
    // if folder/file name is not blank
    if (name) {
      folder.name = name;
      if (folder.type === FolderType.Unset)
        return;
      delete folder['formControl']
      delete folder['isNew']
      // if it root Folder
      if (!folder.id && folder.rootFolderId === 0) {
        this.addRootFolder(folder, index, folders);
      }
      else {
        this.updateRootFolder(folder.rootFolderId);
      }
    }
    // else it removes the folder/file
    else {
      folders.splice(index, 1);
    }
  }
  // add root folder
  addRootFolder(folder: Folder, index: number, folders: Folder[]) {
    this.folderService.addNewRootFolder(folder).subscribe(
      {
        next: (res) => {
          folders[index] = res;
        },
        error: (err: HttpErrorResponse) => console.error(err),
      }
    );
    return folder;
  }
  // update Root folder
  updateRootFolder(rootFolderId: number) {
    const rootIndex = this.folderService.folders.findIndex(x => x.id === rootFolderId);
    if (rootIndex >= 0) {
      this.folderService.updateRootFolder(this.folderService.folders[rootIndex]).subscribe(
        {
          next: (res) => {
            this.folderService.folders[rootIndex] = res;
          },
          error: (err: HttpErrorResponse) => console.error(err),
        }
      )
    }
  }
  // folder type change
  folderType(type: FolderType, folder: Folder, index: number, folders: Folder[]) {
    folder.type = type;
    if (type === FolderType.File) {
      folder.formControl = new FormControl('New File');
      folder.name = "New File";
    }
  }
  // delete Folder
  deleteFolder(index: number, folder: Folder, folders: Folder[]) {
    // if root folder id is 0 that means its root folder
    if (folder.rootFolderId === 0) {
      if (!folder.id) {
        folders.splice(index, 1);
        return;
      }
      this.folderService.deleteRootFolder(folder.id).subscribe({
        next: (res) => {
          this.folderService.folders.splice(index, 1);
        },
        error: (err: HttpErrorResponse) => console.error(err),

      });
    }
    else {
      folders.splice(index, 1);
      this.updateRootFolder(folder.rootFolderId);
    }
  }
}
