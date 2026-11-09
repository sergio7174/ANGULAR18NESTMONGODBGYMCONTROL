import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
public class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  generateTags(config: SeoConfig) {
    // 1. Set Page Title
    this.titleService.setTitle(config.title);

    // 2. Set Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // 3. Set Open Graph (OG) Tags for Social Media (Facebook, LinkedIn, WhatsApp)
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url) {
      this.metaService.updateTag({ property: 'og:url', content: config.url });
    }
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // 4. Set Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    if (config.image) {
      this.metaService.updateTag({ name: 'twitter:image', content: config.image });
    }
  }
}
