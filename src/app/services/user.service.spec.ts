import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { mockUsers } from '@store/users/user.state';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return mock users', (done: DoneFn) => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      done();
    });
  });
});
