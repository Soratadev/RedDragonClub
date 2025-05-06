import { Component, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import { BoardGame } from '../../../shared/interfaces/boardgame.interface';
import {BgItemComponent} from '../../../components/bg-item/bg-item.component';

@Component({
  selector: 'app-login',
  imports: [BgItemComponent],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{

  message: BoardGame[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.callApiService();
  }

  private callApiService() {
    this.apiService.getMessage().subscribe((data) => {
      this.message = data;
    });
  }

  onBookedChange(event: { boardgame: BoardGame, Booked: boolean }) {
    const index = this.message.findIndex(bg => bg.id === event.boardgame.id);
    if (index !== -1) {
      this.message[index].Booked = event.Booked;
    }
  }





}
