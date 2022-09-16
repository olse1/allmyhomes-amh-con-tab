import { Component, VERSION } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public separateFirstTab = false;

  ngOnInit() {
    timer(1000).subscribe(() => {
      console.log(
        '------------------------------- switch to separateFirstTab',
        !this.separateFirstTab
      );
      // this.separateFirstTab = !this.separateFirstTab;
    });
  }

  switchView() {
    this.separateFirstTab = !this.separateFirstTab;
  }
}
