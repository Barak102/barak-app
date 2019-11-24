import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'barakApp';
  scrollNavigatedBottom = false;
  selectedMenuItem: any = null;
  menuLinks: any[] = [
    {name: 'Home', navigateTo: '', isActive: true},
    {name: 'Portfolio', navigateTo: 'portfolio', isActive: false},
    {name: 'Articles', navigateTo: 'articles', isActive: false},
    {name: 'Contact', navigateTo: 'contact', isActive: false},
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

  navigateToLink(menuItem: any): void {
    this.menuLinks.forEach(i => i.isActive = false);
    console.log(`Navigating to ${menuItem.navigateTo}`);
    menuItem.isActive = true;
    this.selectedMenuItem = menuItem;
    this.router.navigate([menuItem.navigateTo]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    this.scrollNavigatedBottom = bodyTop < 30 && bodyTop < 0;
  }


}
