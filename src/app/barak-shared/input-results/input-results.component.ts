import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FilterPipe } from '../pipes/filter.pipe';

@Component({
  selector: 'app-input-results',
  templateUrl: './input-results.component.html',
  styleUrls: ['./input-results.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputResultsComponent implements OnInit {

  @Input() public itemCollection: any;
  @Input() public textFilter: string;
  @Input() public displayLoading: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
