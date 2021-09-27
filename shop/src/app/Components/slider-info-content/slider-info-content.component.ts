import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {IAllCarouselResponse} from '../../interfaces/interfaces';

@Component({
  selector: 'app-slider-info-content',
  templateUrl: './slider-info-content.component.html',
  styleUrls: ['./slider-info-content.component.scss']
})
export class SliderInfoContentComponent implements OnInit{
  @Input() photos: string[] = [];
  @Input() type = '';
  @ViewChild('file', {read: ElementRef}) fileElement: ElementRef<HTMLInputElement>;
  @Output() uploadFile = new EventEmitter<File>();
  @Output() saveFiles = new EventEmitter<void>();
  @Output() loadPrevImages = new EventEmitter<string[]>();

  constructor(private snackBar: MatSnackBar,
              private httpService: HttpService
              ) {}

  ngOnInit(): void {
    this.httpService.get<IAllCarouselResponse>(`/api/carousel/${this.type}`)
      .subscribe(v => {
          this.loadPrevImages.emit(v.data.images);
      });
  }

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

  handleSave(): void{
    this.saveFiles.emit();
  }

  handleImageLoading(img: HTMLImageElement, src: string): void {
    img.src = src;
    img.onload = () => img.hidden = false;
  }
}
