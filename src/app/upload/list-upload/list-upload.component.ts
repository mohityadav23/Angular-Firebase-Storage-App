import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from '../upload-file.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit, OnDestroy {

  fileUploads: {name: string}[];
  subscription: Subscription;
  filtered: any[];
  // startAt= new Subject()
  // endAt = new Subject()

  constructor(private uploadService: UploadFileService) {}

  filter(query: string){
    this.filtered = (query)?
      this.fileUploads.filter(p => p.name.toLowerCase().includes(query.toLowerCase())): 
      this.fileUploads;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
    // Use snapshotChanges().pipe(map()) to store the key
    this.subscription = this.uploadService.getFileUploads(20).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => this.filtered = this.fileUploads = fileUploads);

  }

}