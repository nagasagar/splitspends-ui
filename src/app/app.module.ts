import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { OAuth2RedirectHandlerComponent } from './oauth2-redirect-handler/oauth2-redirect-handler.component';
import { SocialComponent } from './social/social.component';
import { httpInterceptorProviders } from './interceptors/auth-interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddGroupModalComponent } from './add-group-modal/add-group-modal.component';
import { AddFriendModalComponent } from './add-friend-modal/add-friend-modal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMembersComponent } from './group-members/group-members.component';
import { GroupExpensesComponent } from './group-expenses/group-expenses.component';
import { ExpenseRecordPipe } from './pipes/expense-record.pipe';
import { AddExpenseModalComponent } from './add-expense-modal/add-expense-modal.component';
import { ViewExpenseModalComponent } from './view-expense-modal/view-expense-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    OAuth2RedirectHandlerComponent,
    SocialComponent,
    FriendsComponent,
    GroupsComponent,
    ExpensesComponent,
    AddGroupModalComponent,
    AddFriendModalComponent,
    GroupDetailComponent,
    GroupMembersComponent,
    GroupExpensesComponent,
    ExpenseRecordPipe,
    AddExpenseModalComponent,
    ViewExpenseModalComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ScrollingModule
  ],
  providers: [httpInterceptorProviders],
  entryComponents: [
    AddFriendModalComponent,
    AddGroupModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
