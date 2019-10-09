import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { Group } from '../models/group';
import { GroupsService } from '../services';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit, AfterViewInit {

  group: Group;
  isViewInitialized = false;
  navLinks = [];

  constructor(
    private groupService: GroupsService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private location: Location) { }


  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap)  => {
      this.groupService.getGroupByID(+params.get('id')).subscribe(
        (group: Group) => this.group = group
      );
    });
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
      this.buildNavItems(this.route.routeConfig.children) :
      []
    );
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.isViewInitialized = true;
  }

  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => route.data)
      .map(({ path = '', data }) => ({
        path,
        label: data.label,
        icon: data.icon
      }));
  }

  goBack(): void {
    this.location.back();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
