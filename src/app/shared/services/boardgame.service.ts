import { Injectable } from '@angular/core';
import {BoardGame} from '../interfaces/boardgame.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardgameService {

  public boardgames: BoardGame[] = [
    {
      id: 27,
      Name: "Terraforming Mars",
      Designer: "Jacob Fryxelius",
      Players: "1-5",
      Playing_time: "120 min",
      Category: ['Economic', ' Territory Building'],
      Complexity: 3.3,
      Age: "12+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/terraforming-mars.jpg?raw=true",
      Description: "Compete with rival CEOs to make Mars habitable and build your corporate empire.",
      Booked: false,
    },
    {
      id: 20,
      Name: "Wingspan",
      Designer: "Elizabeth Hargrave",
      Players: "1-5",
      Playing_time: "40-70 min",
      Category: ['Educational', ' Card Drafting'],
      Complexity: 2.5,
      Age: "10+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/wingspan.jpg?raw=true",
      Description: "Attract a beautiful and diverse collection of birds to your wildlife preserve.",
      Booked: false,
    },
    {
      id: 26,
      Name: "Gloomhaven",
      Designer: "Isaac Childres",
      Players: "1-4",
      Playing_time: "60-120 min",
      Category: ['Miniatures', ' Campaign'],
      Complexity: 3.9,
      Age: "14+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/gloomhaven.jpg?raw=true",
      Description: "Vanquish monsters with strategic cardplay. Fulfill your quest to leave your legacy!",
      Booked: false,
    },
    {
      id: 5,
      Name: "Carcassonne",
      Designer: "Klaus-Jürgen Wrede",
      Players: "2-5",
      Playing_time: "30-45 min",
      Category: ['Territory Building', ' Tile Placement'],
      Complexity: 1.9,
      Age: "7+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/carcassonne.jpg?raw=true",
      Description: "Shape the medieval landscape of France, claiming cities, monasteries and farms.",
      Booked: false,
    },
    {
      id: 6,
      Name: "Catan (The Settlers of Catan)",
      Designer: "Klaus Teuber",
      Players: "2-4",
      Playing_time: "60-120 min",
      Category: ['Economic', ' Negotiation'],
      Complexity: 2.3,
      Age: "10+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/catan.jpg?raw=true",
      Description: "Collect and trade resources to build up the island of Catan in this modern classic.",
      Booked: false,
    },
    {
      id: 1,
      Name: "7 wonders",
      Designer: "Antoine Bauza",
      Players: "3-7",
      Playing_time: "30 min",
      Category: ['Eurogame', ' Card Drafting'],
      Complexity: 2.3,
      Age: "10+",
      Cover: "https://github.com/Soratadev/RedDragonClub/blob/main/src/assets/img/7wonders.jpg?raw=true",
      Description: "Draft cards to develop your ancient civilization and build its Wonder of the World.",
      Booked: false,
    },
  ];

  readonly default_bg: BoardGame = {
    id: Math.floor(Math.random() * 100) + 25,
    Name: "",
    Designer: "",
    Players: "",
    Playing_time: "",
    Category: [],
    Complexity: 5,
    Age: "",
    Cover: "",
    Description: "",
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
  findAll(): BoardGame[] {
    return this.boardgames;
  }
  findById(id: number): BoardGame {
    return this.boardgames.find(bg => bg.id === id)!;
  }
  isDefaultBg(bg: BoardGame): boolean {
    return bg.id === this.default_bg.id;
  }
}
