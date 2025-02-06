import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BgListComponent} from './components/bg-list/bg-list.component';
import {BgFormComponent} from './components/bg-form/bg-form.component';
import {BoardGame} from './shared/interfaces/boardgame.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BgListComponent, BgFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Red Dragon Club';

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
      Cover: "./assets/img/terraforming-mars.jpg",
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
      Cover: "./assets/img/wingspan.jpg",
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
      Cover: "./assets/img/gloomhaven.jpg",
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
      Cover: "./assets/img/carcassonne.jpg",
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
      Cover: "./assets/img/catan.jpg",
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
      Cover: "./assets/img/7wonders.jpg",
      Description: "Draft cards to develop your ancient civilization and build its Wonder of the World.",
      Booked: false,
    },
  ];

  addBG(bg: BoardGame) {
    this.boardgames.push(bg);
  }
}
