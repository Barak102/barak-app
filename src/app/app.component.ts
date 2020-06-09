import { AfterViewInit, Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IMenuItem, LinkType } from './barak-shared/types/IMenuItem';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('paddingTop', [
      state('void', style({paddingTop: '50px'})),
      transition('void => *', [
        animate(1000)
      ])
    ]),
    trigger('fade', [
      state('void', style({ opacity: '0' })),
      transition('void <=> *', [
        animate(1000)
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Barak Josef Software Developer';
  scrollNavigatedBottom = false;
  selectedMenuItem: IMenuItem = null;
  bannerMargin: boolean = false;
  pageSubTitle: string = '';
  menuLinks: IMenuItem[] = [
    { name: 'Home', navigateTo: '', isSelected: true },
    {
      name: 'Portfolio', navigateTo: 'portfolio', isSelected: false, title: 'My Portfolio',
      children: [
        {
        name: 'Auto Suggest',
        navigateTo: '',
        isSelected: false,
        linkType: LinkType.Jump
      },
      {
        name: 'Slide Gallery',
        navigateTo: '',
        isSelected: false,
        linkType: LinkType.Jump
      },
      {
        name: 'Survey (by Dates + Quantety)',
        navigateTo: '',
        isSelected: false,
        linkType: LinkType.Jump
      },
      {
        name: 'Graph',
        navigateTo: '',
        isSelected: false,
        linkType: LinkType.Jump
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

  @ViewChild('banner', null)
  bannerElement: ElementRef;

  constructor(public router: Router) {
    this.routeEvent(this.router);
  }

  ngOnInit(): void {
    this.onScroll(null);
    this.selectedMenuItem = this.menuLinks[0];

  }

  ngAfterViewInit(): void {
    this.resolveSectionTitlePosition();
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
    this.pageSubTitle = '';
    this.router.navigate([menuItem.navigateTo]);
  }

  resolveSectionTitlePosition(): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    const needToMarginBanner: boolean = bodyTop <= -155 && bodyTop < 0;
    if(needToMarginBanner) { 
      const newMargin: number =  -150 - bodyTop;
      this.bannerElement.nativeElement.style.marginTop = newMargin + 'px';
    } else {
      this.bannerElement.nativeElement.style.marginTop = 0 + 'px';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    const bodyTop: number = document.body.getClientRects()[0].top;
    this.scrollNavigatedBottom = bodyTop < 30 && bodyTop < 0;
    this.resolveSectionTitlePosition();
  }

  setSubTitleHandler($event: any): void {
    this.pageSubTitle = $event;
  }


}
