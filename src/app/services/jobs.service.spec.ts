import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JobsService } from './jobs.service';
import { Job } from '../models/job';

describe('JobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: JobsService = TestBed.get(JobsService);
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    const service: JobsService = TestBed.get(JobsService);
    service.getJobsList().subscribe((data: Job[]) => {
      expect(data).toBeDefined();
      expect(data[0].title).toBeTruthy();
    })
  })
});
