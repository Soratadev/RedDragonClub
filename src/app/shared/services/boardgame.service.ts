import { Injectable } from '@angular/core';
import {BoardGame} from '../interfaces/boardgame.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {
  private apiUrl = 'http://localhost/public/index.php/';
  public boardgames: BoardGame[] = []
  constructor(private http: HttpClient)
  {}


  readonly default_bg: BoardGame = {
    id: Math.floor(Math.random() * 100) + 25,
    name: "",
    designer: "",
    players: "",
    playingTime: "",
    categories: [],
    complexity: 5,
    age: "",
    cover: "",
    description: "",
    Booked: false,
  };


  add(bg: BoardGame) {
    this.boardgames.push(bg);
  }
  update(edited_bg: BoardGame) {
    this.boardgames = this.boardgames.map(bg => bg.id === edited_bg.id ? edited_bg : bg);
  }
  delete(_bg: BoardGame){
    const index = this.boardgames.findIndex((bg) => bg.id === _bg.id);
    if (index !== -1) {
      this.boardgames.splice(index, 1);
    }
  }
  getBoardgame(): Observable<BoardGame[]> {
    return this.http.get<any>(this.apiUrl+'boardgame');
  }
  getBoardgameById(id: number): Observable<BoardGame> {
    return this.http.get<any>(this.apiUrl+'boardgame/'+id+'');

    //return this.boardgames.find(bg => bg.id === id)!;
  }
  isDefaultBg(bg: BoardGame): boolean {
    return bg.id === this.default_bg.id;
  }
}
