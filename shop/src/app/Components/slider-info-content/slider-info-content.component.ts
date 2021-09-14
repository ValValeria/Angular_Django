import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-slider-info-content',
  templateUrl: './slider-info-content.component.html',
  styleUrls: ['./slider-info-content.component.scss']
})
export class SliderInfoContentComponent{
  @Input() photos: string[] = [];
  @ViewChild('file', {read: ElementRef}) fileElement: ElementRef<HTMLInputElement>;
  @Output() uploadFile = new EventEmitter<File>();

  constructor(private snackBar: MatSnackBar) {}

  handleUpload(): void{
    this.fileElement.nativeElement.click();

    this.fileElement.nativeElement.onchange = this.loadImage.bind(this);
  }

  loadImage(): void{
    const file = this.fileElement.nativeElement.files[0];

    if (file != null){
      this.uploadFile.emit(file);
    } else {
      this.snackBar.open('Please, choose the file', 'Close');
    }
  }
}
