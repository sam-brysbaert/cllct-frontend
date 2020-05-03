import { Pipe, PipeTransform } from '@angular/core';
import { Link } from './link';

@Pipe({ name: 'linkFilter' })
export class LinkFilterPipe implements PipeTransform {
  transform(links: Link[], term: string = ''): Link[] {
    if (!term || term.length === 0) return links;
    return links.filter((link) =>
      link.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
