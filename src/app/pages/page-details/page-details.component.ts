import { Component } from '@angular/core';

import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

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
  data = [
    {
      name: '',
      series: [
        {
          name: '',
          value: 0,
        },
      ],
    },
  ];
  constructor(protected olympicService: OlympicService) {}

  ngOnInit(): void {
    this.boxList[0].number =
      this.olympicService.selectedOlympic.getValue()?.participations.length ??
      0;
    this.boxList[1].number =
      this.olympicService.selectedOlympic
        .getValue()
        ?.participations.reduce(
          (sum: number, participation: Participation) =>
            sum + participation.medalsCount,
          0
        ) ?? 0;
    this.boxList[2].number =
      this.olympicService.selectedOlympic
        .getValue()
        ?.participations.reduce((sum: number, participation: Participation) => {
          return sum + participation.athleteCount;
        }, 0) ?? 0;
    this.data = [
      {
        name: this.olympicService.selectedOlympic.getValue()?.country ?? '',
        series:
          this.olympicService.selectedOlympic
            .getValue()
            ?.participations?.map((participation: Participation) => ({
              name: participation.year.toString(),
              value: participation.medalsCount,
            })) ?? [],
      },
    ];
  }
}
