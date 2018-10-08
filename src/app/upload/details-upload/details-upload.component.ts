import { Component, OnInit, Input } from '@angular/core';
import { FileUpload } from '../../fileupload';
import { UploadFileService } from '../upload-file.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  fileUploads: any[];
  @Input() fileUpload: FileUpload;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit() {}

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}