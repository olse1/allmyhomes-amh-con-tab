import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-amh-con-tab-group',
  templateUrl: './amh-con-tab-group.component.html',
  styleUrls: ['./amh-con-tab-group.component.css'],
})
export class AmhConTabGroupComponent implements OnInit {
  @ViewChild('tabContent', { static: true }) tabContent: ElementRef;

  labels: string[] = [];
  nodes: HTMLElement[] = [];
  selectIndex = 0;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initTabs();
    console.log('labels', this.labels);
  }

  private initTabs() {
    this.elementRef.nativeElement.childNodes;

    Array.from(this.elementRef.nativeElement.childNodes).forEach(
      (node: HTMLElement) => {
        if (
          node.tagName == null ||
          node.tagName.toLowerCase() !== 'app-amh-con-tab'
        ) {
          return;
        }

        const label = node.getAttribute('label');

        if (label == null || label.length === 0) {
          node.remove();
          console.error('Please add a label attribute to amh-con-tab', node);
          return;
        }

        this.addTab(label, node);
      }
    );

    this.activateTab(0);
  }

  private addTab(label: string, node: HTMLElement) {
    this.labels.push(label);
    this.nodes.push(node);
    node.remove();
  }

  public activateTab(index: number) {
    this.tabContent.nativeElement.appendChild(this.nodes[index]);
  }
}
