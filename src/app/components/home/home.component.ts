import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { Job } from 'src/app/models/job';
import { Observable, interval } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, } from '@angular/forms';
import { timer, combineLatest } from 'rxjs';
import { map, tap, shareReplay, startWith, debounce, distinctUntilChanged } from 'rxjs/operators';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes.doubleBounce;
  public isExperienceSorted: boolean = false;
  public isLocationSorted: boolean = false;
  public jobsList$: Observable<Job[]>;
  public location = new FormControl('');
  public skill = new FormControl('');
  public experience = new FormControl('');
  public isSearched: boolean = false;
  public loading: boolean = false;
  primaryColour = "#dd0031";
  secondaryColour = "#006ddd";
  public filter = new FormControl('');


  public filteredJobs$: Observable<any>;

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit() {
    this.loadData()
  }

  public loadData() {
    this.jobsList$ = this.jobService.getJobsList();
  }

  filterByCompanyName() {
    this.loading = true;
    this.filteredJobs$ = this.filteredJobs$.pipe(
      map(jobs => {
        return jobs.filter(j => {
          let companyname = j['companyname'].toString().toLowerCase().includes(this.filter.value.toString().toLowerCase())
          this.loading = false;
          return companyname;

        })
      })
    )
  }

  search() {
    this.loading = true;
    this.isSearched = true;
    this.filteredJobs$ = this.jobsList$.pipe(
      map(jobs => {
        return jobs.filter(j => {
          let experience = j['experience']
            .match(/^\d+|\d+\b|\d+/g);
          let isExperience = j['location'].toString().toLowerCase().includes(this.location.value.toString().toLowerCase())
          let isSkill = j['skills'].toString().toLowerCase().includes(this.skill.value.toString().toLowerCase())
          let isLocation = true;
          if ((this.experience.value.toString() != '') && experience) {
            isLocation = parseInt(experience[0]) <= parseInt(this.experience.value.toString()) && parseInt(experience[1]) >= parseInt(this.experience.value.toString())
          }
          this.loading = false;
          return isExperience && isSkill && isLocation;

        })
      })
    )
  }

  sortLocation() {
    if (!this.isLocationSorted) {
      this.loading = true;
      this.sortJobsByLocation();
    }
  }

  sortJobsByLocation() {
    this.filteredJobs$ = this.filteredJobs$.pipe(
      map(data => {
        this.loading = false;
        return data.sort((a, b) => {
          if (a.location === '')
            return 1;
          else if (b.location === '')
            return -1;
          return a.location.toLowerCase().localeCompare(b.location.toLowerCase());
        })
      }));
    this.isLocationSorted = true;
    this.isExperienceSorted = false;
  }

  sortExperience() {
    if (!this.isExperienceSorted) {
      this.loading = true;
      this.sortJobsByExperience();
    }
  }

  sortJobsByExperience() {
    this.filteredJobs$ = this.filteredJobs$.pipe(
      map(data => {
        this.loading = false;

        return data.sort((a, b) => {
          let exA = a['experience']
            .match(/^\d+|\d+\b|\d+/g);
          let exB = b['experience']
            .match(/^\d+|\d+\b|\d+/g);
          if (!exA)
            return 1;
          else if (!exB)
            return -1;
          else
            return exA[0] - exB[0];
        })
      }));
    this.isExperienceSorted = true;
    this.isLocationSorted = false;

  }

  clear() {
    this.location.setValue('');
    this.skill.setValue('');
    this.experience.setValue('');
    this.isSearched = false;
    this.filteredJobs$ = this.jobsList$
  }

  getCategories() {
    return [
      { id: '1', name: 'experience' },
      { id: '2', name: 'location' },
      { id: '3', name: 'skills' },
      { id: '4', name: 'title' }
    ];
  }

}
