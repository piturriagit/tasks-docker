import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-icon',
  imports: [],
  templateUrl: './image-icon.html',
  styleUrl: './image-icon.css'
})
export class ImageIcon {
  imageSrc = input('');
  imageAlt = input('');
  clickFunction = input('console.error("You made a mistake");');
}
