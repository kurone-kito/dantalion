import getResources from './resources';

getResources().then((t) => {
  console.log(t('hello'));
});
