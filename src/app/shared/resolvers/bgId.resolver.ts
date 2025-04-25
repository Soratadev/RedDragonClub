import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {BoardGame} from '../interfaces/boardgame.interface';
import {inject} from '@angular/core';
import {BoardgameService} from '../services/boardgame.service';

export const bgIdResolver: ResolveFn<BoardGame> = (route: ActivatedRouteSnapshot) =>
  inject(BoardgameService).findById(parseInt(route.paramMap.get('id')!, 10));
  /* Estas tres líneas son equivalentes:
  const bgService = inject(BoardgameService);
  bgService.findById(parseInt(route.paramMap.get('id')!, 10));
  return bgService;
   */

