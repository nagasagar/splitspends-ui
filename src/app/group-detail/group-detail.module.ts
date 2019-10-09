import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { GroupDetailComponent } from './group-detail.component';
import { GroupMembersComponent } from '../group-members/group-members.component';
import { GroupExpensesComponent } from '../group-expenses/group-expenses.component';

export const routes: Routes = [
  {
    path: '', component: GroupDetailComponent, children: [
      { path: '', redirectTo: 'members' },
      { path: 'members', component: GroupMembersComponent, data: { label: 'Members' } },
      { path: 'expenses', component: GroupExpensesComponent, data: { label: 'Expenses' } }
    ]
  }
];

@NgModule({
  imports: [CommonModule, MatTabsModule, RouterModule.forChild(routes)],
  declarations: [GroupDetailComponent, GroupMembersComponent, GroupExpensesComponent]
})
export class GroupDetailModule { }
