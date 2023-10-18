import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

interface Character {
  name: string;
  image: string;
  id: string;
  species: string;
}

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  personajes: Character[] = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get<any>('https://rickandmortyapi.com/api/character/')
    .subscribe((res: any) => {
      console.log(res);
      this.personajes = res.results as Character[]; // Usar la interfaz Character
    });
  }

}
