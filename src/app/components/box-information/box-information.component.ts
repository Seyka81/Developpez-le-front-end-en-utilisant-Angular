import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-box-information',
  standalone: true,
  imports: [],
  templateUrl: './box-information.component.html',
  styleUrl: './box-information.component.scss',
})
export class BoxInformationComponent {
  @Input() title: string = '';
  @Input() nbr: number = 0;
}
