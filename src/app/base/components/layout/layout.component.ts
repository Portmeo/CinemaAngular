import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpinnerService } from '@shared/services/spinner.service';
import { getTitleLayout } from '../../store/selectors/layout.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public title = this.store.select(getTitleLayout);

  constructor(
    readonly spinnerService: SpinnerService,
    private store: Store,
  ) { }

  ngOnInit(): void { }

}
