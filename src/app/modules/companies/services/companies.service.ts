import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Company } from '../store/models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(environment.urlApi + 'companies');
  }
}
