import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GraphItemData } from '../models/graph-item-data/graph-item-data';
import { ifError } from 'assert';
import * as moment from 'moment';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @Input() width: number;
  @Input() height: number;
  @Input() dividedYDetails: number = 10;
  @Input() data: GraphItemData[] = [{ amount: 90, date: moment('2020-05-19') },
  { amount: 0, date: moment('2020-05-20') },
  { amount: 19, date: moment('2020-05-21') },
  { amount: 32, date: moment('2020-05-22') },
  { amount: 50, date: moment('2020-05-23') },
  { amount: 2, date: moment('2020-05-24') },
  { amount: 121, date: moment('2020-05-25') },
  { amount: 24, date: moment('2020-05-26') },
  { amount: 34, date: moment('2020-05-27') },
  { amount: 32, date: moment('2020-05-28') },
  { amount: 200, date: moment('2020-05-29') },
  { amount: 233, date: moment('2020-05-30') },
  { amount: 100, date: moment('2020-05-31') },
  { amount: 21, date: moment('2020-06-01') },
  { amount: 43, date: moment('2020-06-02') },
  { amount: 98, date: moment('2020-06-03') },
  { amount: 550, date: moment('2020-06-04') },
  { amount: 1200, date: moment('2020-06-05') },
  { amount: 1100, date: moment('2020-06-06') },
  { amount: 930, date: moment('2020-06-07') },
  { amount: 1000, date: moment('2020-06-08') },
  ];


  selectedData: GraphItemData = null;
  graphWidthGap: number = 50;
  graphHeightGap: number = 50;
  circleRadius = 10;


  @ViewChild('canvasElement', null) canvasElement: ElementRef;
  @ViewChild('square', null) square: ElementRef;
  @ViewChild('canvasLines', null) canvasLines: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  buildGraph(): void {
    const canvas = this.canvasElement.nativeElement.getContext('2d');
    const dataSum = this.data.reduce((accumulate, currentValue) => accumulate + (currentValue['amount'] || 0), 0);
    const avg = dataSum / this.data.length;
    console.log('SUM: ', dataSum);
    console.log('AVG: ', avg);
    this.buildYText(canvas);
    this.drawLines(canvas, dataSum);
    canvas.fillStyle = 'black';
  }

  buildYText(canvas: any): void {
    canvas.font = '16px Arial';
    const maxAmount = Math.max(...this.data.map(d => d.amount));
    const splittedAmount = Math.ceil(((maxAmount / this.dividedYDetails)) / 5) * 5;
    for (let i = 0; i < this.dividedYDetails; i++) {
      canvas.fillText(`${splittedAmount * i}`, 0, this.resolveYPositionByAmount(splittedAmount * i));
    }
  }

  drawLines(canvas: any, dataSum: number): void {
    canvas.beginPath();
    const yAvgPosition = ((this.height - (this.graphHeightGap)) / 2);
    canvas.moveTo(0 + this.graphWidthGap, yAvgPosition);
    const segmentXWidth = (this.width - this.graphWidthGap) / this.data.length;
    let nextXPosition = this.graphWidthGap;
    for (const data of this.data) {
      data.segmentStart = nextXPosition;
      data.segmentEnd = nextXPosition + segmentXWidth;
      nextXPosition += segmentXWidth;
      canvas.lineTo(nextXPosition, Math.floor(this.resolveYPositionByAmount(data.amount)));
      canvas.moveTo(nextXPosition, Math.floor(this.resolveYPositionByAmount(data.amount)));
    }
    console.log(this.data);
    canvas.stroke();
    canvas.closePath();
  }

  ngAfterViewInit(): void {
    this.buildGraph();
    this.square.nativeElement.style.visibility = 'hidden';
  }

  checkCordinates($event: any): void {
    let yPosition: number = this.height;
    const canvas = this.canvasElement.nativeElement.getContext('2d');
    let canvasHasPosition = canvas.isPointInStroke($event.layerX, yPosition);
    while (!canvasHasPosition && yPosition >= 0) {
      yPosition--;
      canvasHasPosition = canvas.isPointInStroke($event.layerX, yPosition);
      if (canvasHasPosition) {
        this.selectedData = this.data.find(d => d.segmentStart <= $event.layerX && d.segmentEnd >= $event.layerX);
        this.square.nativeElement.style.visibility = 'visible';
        this.square.nativeElement.style.left = `${$event.layerX}px`;
        this.square.nativeElement.style.top = `${yPosition}px`;
        // this.square.nativeElement.style.left = `${$event.layerX - (this.square.nativeElement.getClientRects()[0].width / 2)}px`;
        // this.square.nativeElement.style.top = `${yPosition + ((this.square.nativeElement.getClientRects()[0].height / 2))}px`;
        break;
      }
    }
  }

  resolveYPositionByAmount(amount: number): number {
    // step 1: percentage of the max amount (4 / 230) * 100 = 1.73
    // step 2: percentage of the canvas height (1.73 * 600 / 100)
    // step 3: reduce from the amount of height the reuslt
    const percentageOfMaxResult = (((amount / Math.max(...this.data.map(d => d.amount))) * 100));
    const percentageOfCanvasHeight = ((percentageOfMaxResult * this.height) / 100) + this.graphHeightGap;
    return this.height - percentageOfCanvasHeight + this.graphHeightGap;
  }

  mouseLeaveHandler(): void {
    //this.square.nativeElement.style.visibility = 'hidden';
  }
}
