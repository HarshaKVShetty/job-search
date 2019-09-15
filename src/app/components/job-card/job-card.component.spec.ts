import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCardComponent } from './job-card.component';

const job = {
  _id: "5b2bd7f99d73a1001456c2f7",
  title: "Sales Executive",
  applylink: "https://www.freshersworld.com/jobs/sales-executive-jobs-in-ahmedabad-reelo-technologies-413002",
  jd: "Create the worldâ€™s most addictive small and medium business loyalty experienceTaking ownership of the team. Supervise your teamâ€™s ...",
  companyname: "Reelo Technologies",
  location: "Ahmedabad",
  experience: "",
  salary: "",
  type: "",
  skills: "M Phil / Ph.D, B.Com, M.Com, MA, BBA/BBM, BCA, BEd, BSc...",
  startdate: "",
  enddate: "23 Jun 18",
  created: "1 months ago",
  source: "freshersworld",
  timestamp: "1529599992.017869",
  __v: "0"
}

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    component.job = job;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
