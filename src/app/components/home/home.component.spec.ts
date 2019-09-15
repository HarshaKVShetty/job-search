import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { JobCardComponent } from '../job-card/job-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        JobCardComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NgxLoadingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return array of objects', () => {
    let object = [
      { id: '1', name: 'experience' },
      { id: '2', name: 'location' },
      { id: '3', name: 'skills' },
      { id: '4', name: 'title' }
    ]
    expect(component.getCategories()).toEqual(object)
  });

  it('should clear all search values', () => {
    component.clear();
    expect(
      component.location.value === '' &&
      component.skill.value === '' &&
      component.experience.value === '' &&
      component.isSearched === false).toBeTruthy();
  });

  it('should load data', () => {
    component.loadData();
    expect(component.jobsList$).toBeDefined();
  });

  it('should load filteredJobs', () => {
    component.search();
    expect(component.filteredJobs$).toBeDefined();
  })
});
