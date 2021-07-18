import {Component, OnInit, Input, Self, ViewChild, ElementRef} from '@angular/core';
import {UserService} from '../../Services/User.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAd} from '../../Interfaces/Interfaces';
import {AdService} from '../../Services/ad.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private bd: FormBuilder,
              @Self() private ad: AdService,
              private matSnack: MatSnackBar
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
      ]),
      characterictics: bd.control(this.product.characterictics, [
        Validators.required
      ])
    });
  }

  async submit(): Promise<void>{
    if (this.formGroup.valid){
      const form = this.form.nativeElement as HTMLFormElement;
      const formData = new FormData(form);

      const response = await fetch('/api/create-post', {
         method: 'POST',
         body: formData
      });

      if (response.ok){
        this.matSnack.open('The product has been added successfully.', 'Close');
      }
    }
  }
}