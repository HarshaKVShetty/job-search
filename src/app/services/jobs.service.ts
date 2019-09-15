import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job } from '../models/job';

const baseUrl = 'http://localhost:3200/';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
    private _http: HttpClient
  ) { }

  getJobsList(): Observable<Job[]> {
    return this._http.get(baseUrl + 'data/').pipe(
      map(data => {
        return data as Job[];
      })
    );
  }
}
