import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Actor } from '../store/models/actors.model';

@Injectable()
export class ActorsService {

  constructor(
    private http: HttpClient
  ) { }

  getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(environment.urlApi + 'actors');
  }
}
