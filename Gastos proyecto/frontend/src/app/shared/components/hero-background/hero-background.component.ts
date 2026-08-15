import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full relative h-screen {{ className }}">
      <div class="absolute inset-0">
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-radial-gradient"></div>
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .w-full { width: 100%; }
    .relative { position: relative; }
    .h-screen { height: 100vh; }
    .absolute { position: absolute; }
    .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
    .-z-10 { z-index: -10; }
    .h-full { height: 100%; }
    .w-full { width: 100%; }
    .items-center { align-items: center; }
    .px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
    .py-24 { padding-top: 6rem; padding-bottom: 6rem; }
    .bg-radial-gradient {
      background: radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%);
    }
  `]
})
export class HeroBackgroundComponent {
  @Input() className = '';
}
