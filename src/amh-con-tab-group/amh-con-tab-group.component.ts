import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { AmhConTabComponent } from '../amh-con-tab/amh-con-tab.component';

@Component({
  selector: 'app-amh-con-tab-group',

  templateUrl: './amh-con-tab-group.component.html',
  styleUrls: ['./amh-con-tab-group.component.css'],
})
export class AmhConTabGroupComponent implements AfterContentInit {
  @ContentChildren(AmhConTabComponent)
  tabs: QueryList<AmhConTabComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: AmhConTabComponent) {
    this.tabs.toArray().forEach((tab) => (tab.active = false));
    tab.active = true;
  }
}
