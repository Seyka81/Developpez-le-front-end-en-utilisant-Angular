import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[]>;
  private olympicsSubscription!: Subscription;
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
  dataPie: { name: string; value: number }[] = [];
  olympicsData: Olympic[] = [];

  constructor(private olympicService: OlympicService, private router: Router) {
    this.olympics$ = this.olympicService.getOlympics();
  }

  ngOnInit(): void {
    this.olympicsSubscription = this.olympics$.subscribe(
      (olympics: Olympic[]) => {
        if (olympics) {
          this.olympicsData = olympics;
          this.boxList[1].number = olympics.length;
          this.dataPie = olympics.map((olympic: Olympic) => {
            const totalMedals = olympic.participations.reduce(
              (sum, participation: Participation) =>
                sum + participation.medalsCount,
              0
            );
            return {
              name: olympic.country,
              value: totalMedals,
            };
          });

          this.boxList[0].number = new Set(
            olympics.flatMap((olympic: Olympic) =>
              olympic.participations.map(
                (participation: Participation) =>
                  `${participation.year}-${participation.city}`
              )
            )
          ).size;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.olympicsSubscription) {
      this.olympicsSubscription.unsubscribe();
    }
  }

  onSelect(event: { name: string; value: number; label: string }): void {
    const selectedOlympic = this.olympicsData.find(
      (olympic: Olympic) => olympic.country === event.name
    );

    this.olympicService.selectedOlympic.next(selectedOlympic || null);
    this.router.navigate(['/details']);
  }
}
