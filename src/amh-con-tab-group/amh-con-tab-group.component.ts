import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-amh-con-tab-group',
  templateUrl: './amh-con-tab-group.component.html',
  styleUrls: ['./amh-con-tab-group.component.css'],
})
export class AmhConTabGroupComponent implements OnInit {
  @ViewChild('tabContent', { static: true }) tabContent: ElementRef;

  @Input() set separateFirstTab(separateFirstTab: boolean) {
    this.pSeparateFirstTab = separateFirstTab;

    if (this.pSeparateFirstTab) {
      this.doSeparateFirstTab();
    } else if (this.isSeparated) {
      this.undoSeparateFirstTab();
    }
  }

  labels: string[] = [];
  nodes: HTMLElement[] = [];
  activeIndex = 0;

  separatedTabNode: HTMLElement;
  separatedTabLabel: string;

  private pSeparateFirstTab: boolean;
  private isSeparated = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.initTabs();
    this.activateTab(0);
  }

  private initTabs() {
    Array.from(this.elementRef.nativeElement.childNodes).forEach(
      (node: HTMLElement, index: number) => {
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

        if (index === 1) {
          this.setSeparatedTab(node, label);

          if (this.pSeparateFirstTab) {
            node.remove();
          }
        }

        if (this.pSeparateFirstTab && index === 1) {
        } else {
          this.addTab(label, node);
        }
      }
    );
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

  private doSeparateFirstTab() {
    this.isSeparated = true;

    this.labels.shift();
    this.nodes.shift();

    if (this.activeIndex === 0) {
      if (this.nodes.length > 0) {
        this.activateTab(0);
      }
    } else {
      this.activeIndex--;
    }
  }

  private undoSeparateFirstTab() {
    this.isSeparated = false;

    this.labels = [this.separatedTabLabel, ...this.labels];

    this.nodes = [this.separatedTabNode, ...this.nodes];

    this.activeIndex++;
  }

  private setSeparatedTab(node: HTMLElement, label: string) {
    this.separatedTabNode = node;
    this.separatedTabLabel = label;
  }
}
