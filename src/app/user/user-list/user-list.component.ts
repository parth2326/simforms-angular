import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  search$ = new Subject<string>();
  status = 'all';
  userList: User[];
  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  search: string;

  constructor(private userService: UserService,
              private drawerService: NzDrawerService,
              private authService: AuthService,
              private messageService: NzMessageService,
              private router: Router) {
  }

  ngAfterViewInit(): void {

    // To debounce the search values
    this.search$.pipe(
      debounceTime(400), // discard emitted values that take less than the specified time between output
      distinctUntilChanged() // only emit when value has changed
    ).subscribe(term => {
      this.search = term;
      this.changeSearch(null);
    });

  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.userList = data.map((item) => User.fromMap(item));
    });
  }

  changeSearch(e): void {
    this.loadDataFromServer(1, 10, 'created_at', 'desc', []);
  }

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>,
  ): void {
    this.loading = true;

    this.userService.searchUsers({ pageIndex, pageSize, sortField, sortOrder,
      filter, search: this.search, status: this.status }).subscribe(data => {
      this.loading = false;
      this.total = data.totalResults; // mock the total data here
      this.userList = data.results.map(item => User.fromMap(item));
    }, (err) => {
      this.loading = false;
      this.messageService.error('Failed to load your data.');
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }


  logout(): void {
    this.authService.logout().subscribe((data) => {
      localStorage.clear();
      this.router.navigate(['/']);
    });
  }

  openEditUserDrawer(user: User): void {

    const drawerRef = this.drawerService.create<EditUserComponent, { user: User }, User>({
      nzTitle: 'Edit User #' + user.id.toString(),
      nzWidth: 600,
      nzContent: EditUserComponent,
      nzContentParams: {
        user
      }
    });

    drawerRef.afterClose.subscribe(data => {
      if (data != null) {
        const userIndex = this.userList.findIndex((item) => item.id === data.id);
        if (userIndex > -1) {
          this.userList[userIndex] = data;
        }
      }
    });

  }

  changeUserStatus(e: any, user: User): void {

    const status = e === true ? 1 : 0;

    this.userService.updateStatus(user.id, { status }).subscribe(data => {
      const userIndex = this.userList.findIndex((item) => item.id === data.id);
      this.userList[userIndex] = User.fromMap(data);
      this.messageService.success('User status updated successfully');

      if (status.toString() !== this.status && this.status !== 'all') {
        setTimeout(() => {
          this.userList.splice(userIndex, 1);
        }, 1000);
      }

    }, (err) => {
      this.messageService.error('Failed to process your request');
    });
  }

}
