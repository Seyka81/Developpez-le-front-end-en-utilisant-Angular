import { Component } from '@angular/core';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss'],
})
export class PageDetailsComponent {
  boxList = [
    {
      title: 'Number of entries',
      number: 0,
    },
    {
      title: 'Total number of medals',
      number: 0,
    },
    {
      title: 'Total number of athletes',
      number: 0,
    },
  ];
}
