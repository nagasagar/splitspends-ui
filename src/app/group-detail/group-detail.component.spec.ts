import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GroupDetailComponent } from './group-detail.component';
import { RouterModule, convertToParamMap, ActivatedRoute } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { GroupsService } from '../services';
import { of } from 'rxjs';

const grp = {
  id: 12,
  name: 'sample',
  members: []
};
const groupServiceMock = {
  getGroupByID: jasmine.createSpy('getGroupByID').and.returnValue(of(grp))
};

describe('GroupDetailComponent', () => {
  let component: GroupDetailComponent;
  let fixture: ComponentFixture<GroupDetailComponent>;
  let groupService: GroupsService;
  let route: ActivatedRoute;
  const queryParamMap = convertToParamMap({ id: '12' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([])],
      declarations: [ GroupDetailComponent ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(queryParamMap),
        },
      },
       {provide: GroupsService, useValue: groupServiceMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailComponent);
    component = fixture.componentInstance;
    groupService = TestBed.get(GroupsService);
    route = TestBed.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(groupService.getGroupByID).toHaveBeenCalledWith(12);
  });

});
