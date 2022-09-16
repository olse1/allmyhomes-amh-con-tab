import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-amh-con-tab-group',
  templateUrl: './amh-con-tab-group.component.html',
  styleUrls: ['./amh-con-tab-group.component.css'],
})
export class AmhConTabGroupComponent implements AfterViewInit {
  @ViewChild('tabContent', { static: true }) tabContent: ElementRef;

  labels: string[] = [];
  nodes: HTMLElement[] = [];
  activeIndex = 0;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.initTabs();
    this.activateTab(0);
  }

  onContentChange(changes: MutationRecord[]) {
    console.log('onContentChange');
    //console.log(changes);
    // logs everything that changed
    changes.forEach((change) => console.log('added', change.addedNodes));
    changes.forEach((change) => console.log('removed', change.removedNodes));
    // this.initTabs();
  }

  private initTabs() {
    console.log(
      'querySelector',
      this.elementRef.nativeElement.querySelectorAll('app-amh-con-tab')
    );

    const tabs =
      this.elementRef.nativeElement.querySelectorAll('app-amh-con-tab');

    Array.from(tabs).forEach((node: HTMLElement, index: number) => {
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
    });
  }

  private addTab(label: string, node: HTMLElement) {
    this.labels.push(label);
    this.nodes.push(node);
    node.remove();
  }

  public activateTab(index: number) {
    this.activeIndex = index;

    this.tabContent.nativeElement.innerHTML = '';
    this.tabContent.nativeElement.appendChild(this.nodes[index]);
  }
}
