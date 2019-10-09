import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FriendsComponent } from '../friends/friends.component';
import { GroupsComponent } from '../groups/groups.component';
import { ExpensesComponent } from '../expenses/expenses.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', redirectTo: 'friends' },
      { path: 'friends', component: FriendsComponent, data: { label: 'Friends' } },
      { path: 'groups', component: GroupsComponent, data: { label: 'Groups' } },
      { path: 'expenses', component: ExpensesComponent, data: { label: 'Expenses' } }
    ]
  }
]
@NgModule({
  imports: [CommonModule, MatTabsModule, RouterModule.forChild(routes)],
  declarations: [FriendsComponent, HomeComponent, GroupsComponent, ExpensesComponent]
})
export class HomeModule { }

