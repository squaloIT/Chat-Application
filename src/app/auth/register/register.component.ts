import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { UploadFileService } from 'src/app/upload/upload-file.service';
// import { FileUpload } from 'src/app/upload/fileupload';
import { HttpResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // selectedFiles: FileList;
  // currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  @ViewChild('registerFeedback') registerFeedback: ElementRef;
  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.authService.registerUser(form.value.tbEmail, form.value.tbPsw, form.value.tbUsername).subscribe(
      (response: HttpResponse<Object>) => {
      if (response.status === 400) {
        this.registerFeedback.nativeElement.innerText = 'Cannot create user with specified email and password';
        this.registerFeedback.nativeElement.style.display = 'block';
      }
    }, (err) => {
      console.log(err);
    });
  }
  selectFile(event) {
    // this.selectedFiles = event.target.files;
  }
  upload() {
    // const file = this.selectedFiles.item(0);
    // this.selectedFiles = undefined;
    // this.currentFileUpload = new FileUpload(file);
    // this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }
  onReset(form: NgForm) {
    form.reset();
  }
}
