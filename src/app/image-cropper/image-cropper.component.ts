import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import Cropper from "cropperjs";

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  @Output() croppedURLEmitter: EventEmitter<any> = new EventEmitter();

  imgURL: any;
  private cropper: Cropper;
  cropperUpdateNeeded = false;

  @ViewChild("image", { static: false })
  public imageElement: ElementRef;
  public visible = false;

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewChecked(){
    if(this.imageElement && !this.cropper){
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1
      });
      this.cropperUpdateNeeded = false;
    } else if(this.cropperUpdateNeeded){
      this.cropperUpdateNeeded = false;
    }
  }

  public replace(){ //Manual update for testing
    this.cropper.replace(this.imgURL);
    this.cropper.reset();
  }

  public show(){
    console.log("Showing modal");
    this.visible = true;
  }

  public hide(){
    this.visible = false;
  }

  //const canvas this.cropper.getCroppedCanvas();
  //this.imageDestination = canvas.toDataUrl("image/png");

  onImageChange(event: any){
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

      //Update happens in here because onload is an async function
      if(this.cropper){
        this.cropper.replace(this.imgURL);
        this.cropper.reset();
      }
    }
    this.cropperUpdateNeeded = true;
  }

  cropImage(){
    const canvas = this.cropper.getCroppedCanvas();
    let croppedURL = canvas.toDataURL("image/png");
    this.croppedURLEmitter.emit(croppedURL);
    this.visible = false;
  }
}
