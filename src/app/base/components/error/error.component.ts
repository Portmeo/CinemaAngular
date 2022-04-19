import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericError } from '@state/models/main-state.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { errors: GenericError }
  ) { }

  ngOnInit(): void { }

}
