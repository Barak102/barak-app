import { IMenuItem } from './../barak-shared/types/IMenuItem.d';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-side-bar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss']
})
export class SideBarContentComponent implements OnInit, AfterViewInit {

@ViewChild('menuContainer', { static: true }) menuContainer: ElementRef;

  @Input() menuItems: IMenuItem[];

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  onScroll($event: any): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    const newMargin: number = 60 - bodyTop;
    this.menuContainer.nativeElement.style.marginTop = newMargin + 'px';
  }

}
