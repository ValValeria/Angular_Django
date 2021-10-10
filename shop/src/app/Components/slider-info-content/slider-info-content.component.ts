import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  ViewChildren,
  QueryList, OnChanges
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpService} from '../../Services/Http.service';
import {IAllCarouselResponse} from '../../interfaces/interfaces';
import { AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { image } from '../../Pages/slider-info-page/slider-info-page.component';
import { auditTime, map, mergeMap } from 'rxjs/operators';
import _ from 'lodash';
import { Subscription } from 'rxjs';
import { urlValidator } from '../../validators/url.validator';


@Component({
  selector: 'app-slider-info-content',
  templateUrl: './slider-info-content.component.html',
  styleUrls: ['./slider-info-content.component.scss']
})
export class SliderInfoContentComponent implements OnInit, AfterViewInit{
  @Input() type = '';
  @ViewChild('file', {read: ElementRef}) fileElement: ElementRef<HTMLInputElement>;
  @ViewChildren('img', {read: ElementRef}) imgList: QueryList<ElementRef<HTMLImageElement>>;
  @Output() uploadFileEvent = new EventEmitter<void>();
  public form: FormGroup;
  public photosFile: image<File>[] = [];
  public photos: image<string>[] = [];
  public sub: Subscription[] = [];
  private validators = [Validators.required, Validators.min(6), Validators.max(40)];

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
      .subscribe(async (v) => {
        const data = v.data.images;

        this.photos.push(...v.data.images);

        for (const photo of data){
          const fileName = _.last(photo.file.split('/')) ?? 'image.png';
          const response = await fetch(photo.file);
          const blob = await response.blob();
          const file = new File([blob], fileName, { type: blob.type, lastModified: Date.now() });

          const obj2 = { file, postUrl: photo.postUrl };
          this.addNewImage(photo, obj2);
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
      const postUrl = '';
      const obj = { file: url, postUrl};
      const obj2 = { file, postUrl };

      this.addNewImage(obj, obj2);
    } else {
      this.snackBar.open('Please, choose the file', 'Close');
    }
  }

  public addNewImage(obj: image<string>, obj2: image<File>): void{
    const item = this.photos.find(v => v.id === obj.id);

    if (item) { return; }

    this.photos.push(obj);
    this.photosFile.push(obj2);

    const index = this.photos.length - 1;
    const formControl = new FormControl(obj.postUrl, this.validators);

    this.formArray.insert(index, formControl);
    this.watchForUrlChanges(formControl, index);

    setTimeout(() => {
      const img = this.imgList.last;
      img.nativeElement.src = obj.file;
      img.nativeElement.hidden = false;
    }, 300);
  }

  async handleSubmit(): Promise<void>{
    if (this.form.valid) {
      const url = `/api/carousel/download/${this.type}`;
      const formData = new FormData();
      const urls = this.photos.map(v => v.postUrl);
      const blob = new Blob([JSON.stringify(urls)], {type: 'application/json'});

      this.photosFile.forEach(v => {
        formData.append(this.type, v.file, v.file.name);
      });

      formData.append('urls_list', blob, 'urls_list.json');

      this.httpService.post(url, formData)
        .subscribe(v => {
          this.snackBar.open('Files is saved', 'Close');
        });
    } else {
      this.snackBar.open('Invalid url', 'Close');
    }
  }

  preventEvent($event: Event): void{
    $event.preventDefault();
  }

  get formArray(): FormArray {
    return this.form.get('urls') as FormArray;
  }

  async selectRadio(index: number, $event: Event): Promise<void> {
    $event.preventDefault();

    const photo = this.photos[index];

    if (photo) {
      this.sub[index]?.unsubscribe();
      this.photos.splice(index, 1);
      this.photosFile.splice(index, 1);
      this.formArray.removeAt(index);

      const ref = this.snackBar.open('The photo is deleted', 'Close');

      if (Number.isInteger(photo.id) && photo.id > 0) {
        this.httpService.get(`/api/delete-carousel/${photo.id}`)
          .subscribe(async (v) => {
            this.sub[index]?.unsubscribe();
            this.photos.splice(index, 1);
            this.photosFile.splice(index, 1);

            ref.dismiss();
            this.snackBar.open('The photo is deleted from the server', 'Close');
          });
      }
    }
  }
}
