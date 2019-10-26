import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FriendsService } from '../services';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('FriendsService', () => {

  let service: FriendsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FriendsService]
    });
    service = TestBed.get(FriendsService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of friends', fakeAsync(() => {
    const response = [
      {
          id: 8,
          name: 'sample',
          email: 'sample@gmail.com',
          imageUrl: null,
          emailVerified: false,
          provider: 'local'
      },
      {
          id: 9,
          name: 'sireesha',
          email: 'sireesha@gmail.com',
          imageUrl: null,
          emailVerified: false,
          provider: 'local'
      }
    ];
    service.getUserFriends().subscribe((result: any) => {
      expect(result.length).toBe(2);
      expect(result[0].name).toBe('sample');
      expect(result[1].name).toBe('sireesha');
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/friends');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();
  }));

  it('should remove a friend', fakeAsync(() => {
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    const user = {
      id: 10101,
      name: 'Fake Friend',
      email: 'friend@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage'
    };
    service.removeUserFriend(user).subscribe((result: any) => {
      expect(result).toBe(response);
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/removefriend');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('POST');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();
  }));

  it('should add a friend', fakeAsync(() => {
    const response = {
      id: 10101,
      name: 'Fake User',
      email: 'fake@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage',
      emailVerified: true,
      provider: 'local'
    };
    const user = {
      id: 10101,
      name: 'Fake Friend',
      email: 'friend@splitspends.com',
      imageUrl: 'https://some-randon-url-toimage'
    };
    service.addUserFriend(user).subscribe((result: any) => {
      expect(result).toBe(response);
    });
    // Expect a call to this URL
    const req = httpTestingController.expectOne(environment.apiUrl + '/addfriend');
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('POST');
    // Respond with this data when called
    req.flush(response);
    // Call tick whic actually processes te response
    tick();
  }));
});
