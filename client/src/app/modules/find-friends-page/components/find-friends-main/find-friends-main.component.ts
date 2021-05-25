import { Component, OnInit } from '@angular/core';
import { FriendsListService } from 'src/app/core/services/friends-list.service';

@Component({
  selector: 'app-find-friends-main',
  templateUrl: './find-friends-main.component.html',
  styleUrls: ['./find-friends-main.component.css'],
})
export class FindFriendsMainComponent implements OnInit {
  constructor(private friendsService: FriendsListService) {}
  private innerNames!: Friend[];
  filteredNames!: Friend[];
  ngOnInit(): void {
    this.getFriendsList();
  }
  getFriendsList(): void {
    this.friendsService.getUsers().subscribe((res) => {
      this.innerNames = res.map((user: any) => {
        return { id: user.id, name: user.name };
      });
    });
  }
  InputChange(val: string): void {
    this.filteredNames = this._filter(val, this.innerNames);
  }
  addFriend(friend: Friend, input: any): void {
    input.value = '';
    this.filteredNames = [];
    alert(`${friend.name} Added To Friends`);
    this.friendsService.addFriends(friend.id).subscribe((_) => {
      this.getFriendsList();
      this.friendsService.getFriends();
    });
  }
  private _filter(value: string, data: Friend[]): Friend[] {
    const filterValue = this._normalizeValue(value);
    return data.filter((val) =>
      this._normalizeValue(val.name).includes(filterValue)
    );
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
interface Friend {
  name: string;
  id: string;
}
