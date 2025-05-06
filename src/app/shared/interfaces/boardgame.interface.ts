export interface BoardGame {
  id: number;
  name: string;
  designer: string;
  players: string;
  playingTime: string;
  categories: Category[];
  complexity: number;
  age: string;
  cover: string;
  description: string;
  Booked: boolean;
}

export interface Category {
  id: number;
  name: string;
}
