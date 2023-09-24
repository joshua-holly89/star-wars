import { Component, inject } from '@angular/core';
import { PlatformService } from './services/platform/platform.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public platformService = inject(PlatformService);
}
