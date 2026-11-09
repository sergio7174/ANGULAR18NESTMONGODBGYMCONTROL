import { Component, OnInit, inject } from '@angular/core'
import { IntroComponent } from '../intro/intro.component';
import { LatestnewsComponent } from '../latestnews/latestnews.component';
import { AboutusComponent } from '../aboutus/aboutus.component'; 
import { FooterComponent } from '../../layout/footer/footer/footer.component';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
              IntroComponent, 
              AboutusComponent, 
              LatestnewsComponent, 
              FooterComponent],
              
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

ngOnInit() {
    this.seo.generateTags({
      title: 'Sergio Fitness Gym | Home & Membership Plans',
      description: 'Join Sergio Fitness Gym for world-class workout equipment, personal training, and dynamic fitness control programs.',
      keywords: 'gym, fitness, workout, sergio fitness, bodybuilding, personal trainer',
      image: 'https://yourdomain.com/assets/images/gym-banner.jpg',
      url: 'https://yourdomain.com/'
    });
  }
}

  
}
