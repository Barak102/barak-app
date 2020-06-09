import { ImageItem } from './../models/image-item/image-item';
import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.scss']
})
export class GalleryCarouselComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  imageCollection: ImageItem[] = [];

  @Input()
  imageIndex: number = 0;

  @Input()
  width: number = 1024;

  @Input()
  height: number = 768;

  @Input()
  slideIntervalInSeconds = 0;

  @Input()
  transitionTimeInSeconds: number = 2;

  @Input()
  allowKeyboardSwitch: boolean = false;

  @ViewChild('imageItems', null) imageItems: ElementRef;

  @ViewChild('arrowLeft', null) arrowLeft: ElementRef;
  @ViewChild('arrowRight', null) arrowRight: ElementRef;

  interval: any;

  title: string;


  translateXPercentage: number = 0;
  currentTranslateXPercentage: number = 0;
  imageHolded: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.resolveArrowsPositions();
    this.initializeCarousel();
    this.continueSlide();

    fromEvent(document.getElementsByClassName('selected-image')[0], 'mousedown').pipe(tap(() => this.imageHolded = true),
      switchMap(() => fromEvent(document, 'mouseup'))).subscribe(() => {
        this.imageHolded = false;
      });

    fromEvent(document, 'mousemove').subscribe((x: any) => {
      if (this.imageHolded) {
        const imageItemsWidth = this.imageItems.nativeElement.getClientRects()[0].width;
        const transformAmount: number = 100 / (imageItemsWidth / this.width) * this.imageIndex;
        this.imageItems.nativeElement.style.transform = `translateX(${(this.translateXPercentage - transformAmount)}%)`;
      }
    }
    );
    fromEvent(document, 'keyup').subscribe((k: any) => {
      if (this.allowKeyboardSwitch) {
        switch (k.code) {
          case 'ArrowLeft':
            this.previousImage();
            break;
          case 'ArrowRight':
            this.nextImage();
            break;
        }
      }
    });
  }
  resolveArrowsPositions(): void {
    this.arrowLeft.nativeElement.style.marginLeft=`${(-(this.width) / 2) - 25}px`;
    this.arrowRight.nativeElement.style.marginLeft=`${(this.width / 2) + 25}px`;
  }


  initializeCarousel(): void {
    if (this.imageIndex > this.imageCollection.length - 1) {
      this.imageIndex = 0;
    }
    const imageItemsWidth = this.imageItems.nativeElement.getClientRects()[0].width;
    this.translateXPercentage = ((this.width / 2 * (this.imageCollection.length - 1)) / imageItemsWidth) * 100;
    this.currentTranslateXPercentage = this.translateXPercentage;
    this.imageItems.nativeElement.style.transform = `translateX(${this.translateXPercentage}%)`;
    this.setImageIndex(this.imageIndex);
    setTimeout(() => this.imageItems.nativeElement.style.transition = `all ${this.transitionTimeInSeconds}s`, 200);
  }


  displayTitle(): void {

  }

  moveImage(): void {
    const imageItemsWidth = this.imageItems.nativeElement.getClientRects()[0].width;
    const transformAmount: number = 100 / (imageItemsWidth / this.width) * this.imageIndex;
    this.imageItems.nativeElement.style.transform = `translateX(${this.translateXPercentage - transformAmount}%)`;
    setTimeout(() => {
      this.title = this.imageCollection[this.imageIndex].title;
    });
  }

  nextImage(): void {
    if (this.imageIndex + 1 < this.imageCollection.length) {
      this.imageIndex++;
    } else {
      this.imageIndex = 0;
    }
    this.moveImage();
  }
  previousImage(): void {
    if (this.imageIndex - 1 >= 0) {
      this.imageIndex--;
    } else {
      this.imageIndex = this.imageCollection.length - 1;
    }
    this.moveImage();
  }

  setImageIndex(index: number): void {
    this.imageIndex = index;
    this.moveImage();
  }

  stopSlide(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  continueSlide(): void {
    if (!this.interval && this.slideIntervalInSeconds > 0) {
      this.interval = setInterval(() => this.nextImage(), this.slideIntervalInSeconds * 1000);
    }
  }
  ngOnDestroy(): void {
    this.stopSlide();
  }

}
