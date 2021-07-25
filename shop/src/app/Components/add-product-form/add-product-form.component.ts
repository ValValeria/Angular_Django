import {Component, Input, Self, ViewChild, ElementRef} from '@angular/core';
import {UserService} from '../../Services/User.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAd} from '../../Interfaces/Interfaces';
import {AdService} from '../../Services/ad.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {HttpService} from '../../Services/Http.service';
import {MatChipSelectionChange} from '@angular/material/chips';
import _ from 'lodash';
import {categoryValidator} from "../../validators/category.validator";

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss'],
  providers: [AdService]
})
export class AddProductFormComponent{
  @Input() user: UserService;
  public formGroup: FormGroup;
  @Input() public product: IAd;
  @ViewChild('form', {read: ElementRef}) public form: ElementRef;
  @ViewChild('file', {read: ElementRef}) public file: ElementRef<HTMLInputElement>;
  productIsAdded = false;
  public categories: string[] = [];
  private prevCategoryValue = '';

  constructor(private bd: FormBuilder,
              @Self() private ad: AdService,
              private matSnack: MatSnackBar,
              private router: Router,
              private httpService: HttpService
              ) {
    this.product = ad;

    this.formGroup = bd.group({
       title: bd.control(this.product.title, [
         Validators.maxLength(30),
         Validators.minLength(10),
         Validators.required
       ]),
      price: bd.control(this.product.price, [
        Validators.required
      ]),
      short_description: bd.control(this.product.short_description, [
        Validators.maxLength(200),
        Validators.minLength(10),
        Validators.required
      ]),
      long_description: bd.control(this.product.long_description, [
        Validators.maxLength(600),
        Validators.minLength(10),
        Validators.required
      ]),
      count: bd.control(this.product.count, [
        Validators.required
      ]),
      brand: bd.control(this.product.brand, [
        Validators.maxLength(20),
        Validators.minLength(10),
        Validators.required
      ]),
      image: bd.control(this.product.image, [
        Validators.required
      ]),
      category: bd.control(this.product.category, [
        Validators.required,
        categoryValidator()
      ]),
      characterictics: bd.control(this.product.characterictics, [
        Validators.required
      ]),
      status: bd.control(this.product.status, [
        Validators.required
      ]),
      rating: bd.control(this.product.rating, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ])
    });

    this.addCategory = _.debounce(this.addCategory.bind(this), 150);
  }

  async submit($event): Promise<void>{
    $event.preventDefault();

    if (this.formGroup.valid){
      const form = this.form.nativeElement as HTMLFormElement;
      const formData = new FormData(form);

      Object.entries(this.formGroup.value).forEach(([k, v]) => {
        formData.set(k, v.toString());
      });

      formData.set('image', this.file.nativeElement.files[0]);

      const response = await fetch('/api/product', {
         method: 'POST',
         body: formData
      });

      if (response.ok){
        const json = await response.json();
        const productId = json.data.id;

        const matSnackRef = this.matSnack.open('The product has been added successfully.', 'Close');

        matSnackRef.afterDismissed().subscribe(async (v) => {
          await this.router.navigate(['product', productId]);
        });
      }
    }
  }

  async uploadImage(file: File): Promise<void>{
    const image = document.querySelector('#image');

    if (file && file instanceof File){
       const url = URL.createObjectURL(file);
       image.removeAttribute('hidden' );

       image.querySelector('img').src = url;

       setTimeout(() => {
         URL.revokeObjectURL(url);
       });
    } else {
       image.setAttribute('hidden', 'true');
    }
  }

  async addCategory(txt: string): Promise<void>{
    const response = await this.httpService.get<{data: {categories: string[]}}>(`/api/categories/?search=${encodeURI(txt)}`).toPromise();
    this.categories = response.data?.categories;
  }

  chooseCategory(txt: string): void{
    this.formGroup.get('category').setValue(txt);
  }
}
