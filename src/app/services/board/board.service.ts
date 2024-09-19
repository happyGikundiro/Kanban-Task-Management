import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  apiUrl = '/assets/data/data.json';
  all!:Observable<Board[]> 
  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]>{
    this.all = this.http.get<Board[]>(this.apiUrl)
    console.log('mmm',this.all)
    return this.http.get<Board[]>(this.apiUrl)
  }
}
