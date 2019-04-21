import { Component, OnInit } from '@angular/core';
import { JokeService } from '../joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

joke = String;
  constructor(private jokeService: JokeService) { }

  ngOnInit() {
  	this.getJoke();
  }

  getJoke() {
  	this.jokeService.getJoke()
  		.subscribe((data: string) => this.joke = data['joke']);
  }
}
