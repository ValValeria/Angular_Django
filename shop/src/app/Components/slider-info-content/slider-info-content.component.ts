import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {IAllCarouselResponse} from '../../interfaces/interfaces';
import { AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { image } from '../../Pages/slider-info-page/slider-info-page.component';
import { from } from 'rxjs';
import { auditTime, map, mergeMap } from 'rxjs/operators';
import _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider-info-content',
  templateUrl: './slider-info-content.component.html',
  styleUrls: ['./slider-info-content.component.scss']
})
export class SliderInfoContentComponent implements OnInit, AfterViewInit{
  @Input() type = '';
  @ViewChild('file', {read: ElementRef}) fileElement: ElementRef<HTMLInputElement>;
  @Output() uploadFileEvent = new EventEmitter<void>();
  private urlPattern = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  public form: FormGroup;
  public photosFile: image<File>[] = [];
  public photos: image<string>[] = [];
  public sub: Subscription[] = [];

  constructor(private snackBar: MatSnackBar,
    private httpService: HttpService,
    private bd: FormBuilder
  ) {
    this.form = this.bd.group({
      urls: this.bd.array([])
    });
  }

  ngOnInit(): void {
    this.httpService.get<IAllCarouselResponse>(`/api/carousel/${this.type}`)
      .subscribe(async(v) => {
        const data = v.data.images;
        const validators = [Validators.required, Validators.min(10), Validators.max(40), Validators.pattern(this.urlPattern)];

        this.photos.push(...v.data.images);

        for (let i = 0; i < data.length; i++) {
          const image = data[i];
          const fileName = _.last(image.file.split('/')) ?? 'image.png';
          const response = await fetch(image.file);
          const blob = await response.blob();
          const file = new File([blob], fileName, { type: blob.type, lastModified: Date.now() });

          this.photosFile.push({ file, postUrl: image.postUrl });
          this.photos.push(image);

          const formControl = new FormControl(image.postUrl, validators);
          this.formArray.push(formControl);
          this.watchForUrlChanges(formControl, i)
        }
      });
  }

  ngAfterViewInit(): void {
    this.fileElement.nativeElement.onchange = this.loadImage.bind(this);
  }

  handleUpload(): void{
    this.fileElement.nativeElement.click();
  }

  watchForUrlChanges(formControl: FormControl, index: number): void {
     const sub: Subscription = formControl.valueChanges.pipe(auditTime(200))
      .subscribe(v => {
        const item1 = this.photosFile[index];
        const item2 = this.photos[index];

        item1.postUrl = item2.postUrl = v;
      });

     this.sub.push(sub);
  }

  loadImage(): void{
    const files = this.fileElement.nativeElement.files;
    const file: File = files[files.length - 1];
    const url = URL.createObjectURL(file);

    if (file != null) {
      this.photos.push({ file: url, postUrl: '' });
      this.photosFile.push({ file, postUrl: '' });
    } else {
      this.snackBar.open('Please, choose the file', 'Close');
    }
  }

  async handleSubmit(): Promise<void>{
    if (this.form.valid) {
      const url = `/api/sliders/download/${this.type}`;
      const formData = new FormData();
      const urls = this.photos.map(v => v.postUrl);
      const blob = new Blob([JSON.stringify(urls)], {type: 'application/json'});

      this.photosFile.forEach(v => {
        formData.append(this.type, v.file, v.file.name);
      });

      formData.append('urls_list', blob, 'urls_list.json');

      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.snackBar.open('Files is saved', 'Close');
      }
    } else {
      this.snackBar.open('Invalid url', 'Close');
    }
  }

  handleImageLoading(img: HTMLImageElement, src: string): void {
    img.src = src;
    img.onload = () => img.hidden = false;
  }

  preventEvent($event: Event) {
    $event.preventDefault();
  }

  get formArray(): FormArray {
    return this.form.get('urls') as FormArray;
  }
}
