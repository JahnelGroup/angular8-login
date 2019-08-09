import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
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

  @ViewChild("image", { static: false })
  public imageElement: ElementRef;
  public visible = false;

  constructor(private ng2ImgMax: Ng2ImgMaxService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  public ngAfterViewChecked(){
    if(this.imageElement && !this.cropper){
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable: false,
        scalable: false,
        aspectRatio: 1
      });
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
    let image = event.target.files[0];

    console.log("Outside");
    console.log(image);

    /*This throws an error for some files because of a line of deprecated code:
       for (n = start; n < start+length; n++) {
            outstr += String.fromCharCode(buffer.getUint8(n));
        }
    */
    this.ng2ImgMax.compressImage(image, 0.075).subscribe( result => {
      console.log("Before");
      let compressedImage = new File([result], result.name);
      let reader = new FileReader();

      console.log("Here");

      reader.readAsDataURL(compressedImage);
      reader.onload = (_event) => {
        this.imgURL = reader.result;

        console.log("Inside");
  
        //Update happens in here because onload is an async function
        if(this.cropper){
          this.cropper.replace(this.imgURL);
          this.cropper.reset();
        }
      }
    });
  }

  cropImage(){
    const canvas = this.cropper.getCroppedCanvas();
    let croppedURL = canvas.toDataURL("image/png");
    this.croppedURLEmitter.emit(croppedURL);
    this.visible = false;
  }
}
