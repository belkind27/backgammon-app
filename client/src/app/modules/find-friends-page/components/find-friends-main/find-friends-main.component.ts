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
      console.log(res);
      this.innerNames = res.map((user: any) => {
        return { id: user._id, name: user.name };
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
      setTimeout(() => {
        this.getFriendsList();
        this.friendsService.getFriends();
      }, 1000); // wait a second
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
