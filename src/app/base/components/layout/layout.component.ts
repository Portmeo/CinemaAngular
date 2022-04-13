import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    readonly spinnerService: SpinnerService
  ) { }

  ngOnInit(): void { }

}
