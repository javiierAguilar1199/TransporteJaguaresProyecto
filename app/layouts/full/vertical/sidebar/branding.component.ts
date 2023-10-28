import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [NgIf],
  template: `
   <div class="branding">
    <img
      src="./assets/images/logos/ImagenLogo.jpg"
      class="align-middle m-2"
      alt="logo"
      style="max-width: 200px; max-height: 100px;"
    />


      <a href="/" *ngIf="options.theme === 'dark'">
        <img
          src="./assets/images/logos/light-logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) {}
}
