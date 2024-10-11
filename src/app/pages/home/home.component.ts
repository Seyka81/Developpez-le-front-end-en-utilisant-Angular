import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService) {}

  boxList = [
    {
      title: 'Number of JOs',
      number: 0,
    },
    {
      title: 'Number of countries',
      number: 0,
    },
  ];

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympicService.getOlympics());
    this.olympics$.subscribe((olympics) => {
      this.boxList[1].number = olympics.length;
    });
  }
}
