import { Component, DoCheck, Input } from '@angular/core';

@Component({
  selector: 'app-amh-con-tab',
  templateUrl: './amh-con-tab.component.html',
  styleUrls: ['./amh-con-tab.component.css'],
})
export class AmhConTabComponent {
  @Input() label: string;
  @Input() active: boolean;


}
