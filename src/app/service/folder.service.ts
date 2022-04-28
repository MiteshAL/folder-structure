import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  url = environment.api.url;
  folders: Folder[] = [];
  constructor(private http: HttpClient) { }
  // get all folders
  getFolders() {
    return this.http.get<Folder[]>(`${this.url}`);
  }
  // get specific folder by id
  getFolderById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }
  // add new Root folder
  addNewRootFolder(folder: Folder) {
    return this.http.post<Folder>(`${this.url}`, folder);
  }
  // update a root folder
  updateRootFolder(folder: Folder) {
    return this.http.patch<Folder>(`${this.url}/${folder.id}`, folder);
  }
  // delete root folder
  deleteRootFolder(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
export class Folder {
  id: number;
  name: string;
  type: FolderType;
  children?: Folder[];
  rootFolderId: number;
  isOpen?: boolean = false;
  // for ui customizations
  formControl?: FormControl;
  isNew?: boolean = false;
}

export enum FolderType {
  Unset = 0,
  Folder = 1,
  File = 2
}
