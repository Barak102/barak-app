import { IMenuItem, LinkType } from './../barak-shared/types/IMenuItem';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { trigger, style, animate, state, transition } from '@angular/animations';

@Component({
  selector: 'app-side-bar-content',
  templateUrl: './side-bar-content.component.html',
  styleUrls: ['./side-bar-content.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0, marginLeft: '-200px' }),
        animate(500, style({ opacity: 1, marginLeft: '0' }))
      ]),
      transition('* => void', [
        style({ opacity: 1, marginLeft: '0px' }),
        animate(500, style({ opacity: 0, marginLeft: '-200px' }))
      ])
    ])]
})
export class SideBarContentComponent implements OnInit, AfterViewInit {

  @ViewChild('menuContainer', { static: true }) menuContainer: ElementRef;

  @Input() menuItems: IMenuItem[];

  @Output()
  subMenuChanged: EventEmitter<string> = new EventEmitter<string>();

  selectedItemIndex: number = -1;

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }


  @HostListener('window:scroll', ['$event'])
  onScroll($event: any): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    const newMargin: number = 60 - bodyTop;
    this.menuContainer.nativeElement.style.paddingTop = newMargin + 'px';
    this.resolveSelectedMenuItem();
  }

  resolveSelectedMenuItem(): void {
    const sections: HTMLCollectionOf<Element> = document.getElementsByClassName('itemSection');
    let selectedMenuItem: number = null;
    console.log(sections[0].getClientRects()[0].top);
    for (let i = 0; i < sections.length; i++) {
      const sectionTop: number = sections[i].getClientRects()[0].top;
      if (sectionTop <= 100) {
        selectedMenuItem = i;
      }
    }
    this.selectedItemIndex = selectedMenuItem;
    setTimeout(() => {
      this.subMenuChanged.emit(this.selectedItemIndex !== null ? this.menuItems[this.selectedItemIndex].name : '');
    });
  }

  menuNavigate(menuIndex: number): void {
    const menuItem = this.menuItems[menuIndex];
    console.log(window.scrollY);
    switch (menuItem.linkType) {
      case 0:
        let scrollTo = 0;
        for (let i = 0; i < menuIndex; i++) {
          scrollTo += document.getElementsByClassName('itemSection')[i].clientHeight;
        }
        window.scrollTo(0, scrollTo + 270);
        break;
    }
  }

}
