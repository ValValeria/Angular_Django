import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-section-layout',
  templateUrl: './section-layout.component.html',
  styleUrls: ['./section-layout.component.scss']
})
export class SectionLayoutComponent {
  @Input() title: string;
  @Input() cssClass: string;
  @Input() hasTitle = true;
  @Input() hasBreadCrumbs = false;

  getCssClass(block: string, ...classes: string[]): string[] {
    const cssClasses = [`section__${block}`, ...classes.filter(v => v)];

    if (this.cssClass) {
      cssClasses.push(`${this.cssClass}__${block}`);
    }

    return cssClasses;
  }
}
