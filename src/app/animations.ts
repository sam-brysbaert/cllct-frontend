import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const Animations = {
  smoothCollapse: trigger('smoothCollapse', [
    state('show', style({ height: '0', overflow: 'hidden' })),
    state('*', style({})),
    transition('* => *', [animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')]),
  ]),
};
