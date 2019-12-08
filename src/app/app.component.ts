import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IMenuItem } from './barak-shared/types/IMenuItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Barak Josef Software Developer';
  scrollNavigatedBottom = false;
  selectedMenuItem: IMenuItem = null;
  menuLinks: IMenuItem[] = [
    { name: 'Home', navigateTo: '', isSelected: true },
    {
      name: 'Portfolio', navigateTo: 'portfolio', isSelected: false, title: 'My portfolio',
      children: [
        {
        name: 'Auto Suggest',
        navigateTo: '',
        isSelected: false,
      },
      {
        name: 'Dropdown',
        navigateTo: '',
        isSelected: false
      },
      {
        name: 'Calendar',
        navigateTo: '',
        isSelected: false
      },
      {
        name: 'Gallery',
        navigateTo: '',
        isSelected: false
      },
    ]
    },
    { name: 'Articles', navigateTo: 'articles', isSelected: false, title: 'Articles' },
    { name: 'Contact', navigateTo: 'contact', isSelected: false, title: 'Contract me' },
  ];

  constructor(public router: Router) {
    this.routeEvent(this.router);
  }

  ngOnInit(): void {
    this.onScroll(null);
    this.selectedMenuItem = this.menuLinks[0];

  }

  routeEvent(router: Router) {
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const menuItemS: any = this.menuLinks.filter(l => {
          return this.router.url.includes(l.navigateTo) && l.navigateTo.length > 0;
        })[0];
        this.selectedMenuItem = menuItemS ? menuItemS : this.menuLinks[0];
      }
    });
  }

  navigateToLink(menuItem: IMenuItem): void {
    this.menuLinks.forEach(i => i.isSelected = false);
    console.log(`Navigating to ${menuItem.navigateTo}`);
    menuItem.isSelected = true;
    this.selectedMenuItem = menuItem;
    this.router.navigate([menuItem.navigateTo]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    this.scrollNavigatedBottom = bodyTop < 30 && bodyTop < 0;
  }


}
