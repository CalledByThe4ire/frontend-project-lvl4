import gon from 'gon';
import i18next from 'i18next';
import init from './init';
import { en } from './locales';
import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

(async () => {
  await i18next.init({
    lng: 'en',
    debug: true,
    resources: {
      en,
    },
  });
})();

init(gon);
