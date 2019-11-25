import {Component, OnInit, PipeTransform} from '@angular/core';
import {Router} from '@angular/router';
import { FilterPipe } from '../barak-shared/pipes/filter.pipe';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public termFilter: string;
  public isCaseSensitive = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeTo(routePath: string): void {
    this.router.navigate(['main', routePath]);
  }
}
