import {inject, Injectable } from '@angular/core';
import {BoardGame} from '../interfaces/boardgame.interface';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {
  readonly #http = inject(HttpClient);
  private apiUrl = 'http://localhost/public/index.php/';
  private bgSubject = new BehaviorSubject<BoardGame[]>([]);
  public boardgames$ = this.bgSubject.asObservable();
  public boardgames: BoardGame[] = []

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

  add(bg: BoardGame): Observable<BoardGame> {
    const newBoardGame = {
      name: bg.name,
      designer: bg.designer,
      players: bg.players,
      playingTime: bg.playingTime,
      categories: bg.categories,
      complexity: bg.complexity,
      age: bg.age,
      cover: bg.cover,
      description: bg.description,
      booked: false
    };
    return this.#http.post<BoardGame>(this.apiUrl+'boardgame/create', newBoardGame).pipe(
      tap(() => {
        this.refreshBoardGames().subscribe();
      })
    )
      .pipe(
        tap(createdBg => {
          this.boardgames.push(createdBg);
          console.log('New board game created:', createdBg);
        })
      );
  }
  update(edited_bg: BoardGame): Observable<BoardGame> {
    const updateData = {
      id: edited_bg.id,
      name: edited_bg.name,
      designer: edited_bg.designer,
      players: edited_bg.players,
      playingTime: edited_bg.playingTime,
      categories: edited_bg.categories,
      complexity: edited_bg.complexity,
      age: edited_bg.age,
      cover: edited_bg.cover,
      description: edited_bg.description,
      Booked: edited_bg.Booked,
    };

    return this.#http.put<BoardGame>(this.apiUrl+'boardgame/edit/'+edited_bg.id+'', updateData).pipe(
        tap(() =>{
          this.refreshBoardGames().subscribe();
          /*const index = this.boardgames.findIndex(bg => bg.id === updated_bg.id);
          if (index !== -1) {
            this.boardgames[index] = updated_bg;
          }*/
        })
      )
  }

  refreshBoardGames(): Observable<BoardGame[]> {
    return this.#http.get<BoardGame[]>(this.apiUrl+'boardgame').pipe(
        tap(bg => {
          this.bgSubject.next(bg);
        })
      );
  }

  delete(id: number): Observable<BoardGame>{
    return this.#http.delete<BoardGame>(this.apiUrl+'boardgame/delete/'+id+'').pipe(
      tap(() => {
        this.refreshBoardGames().subscribe();
      })
    )
  }
  getBoardgame(): Observable<BoardGame[]> {
    return this.#http.get<BoardGame[]>(this.apiUrl+'boardgame').pipe(
      tap(bg => {
          this.bgSubject.next(bg);
      })
    );
  }
  getBoardgameById(id: number): Observable<BoardGame> {
    return this.#http.get<any>(this.apiUrl+'boardgame/'+id+'');

    //return this.boardgames.find(bg => bg.id === id)!;
  }
  isDefaultBg(bg: BoardGame): boolean {
    return bg.id === this.default_bg.id;
  }
}
