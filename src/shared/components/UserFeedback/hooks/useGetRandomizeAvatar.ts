import Avocado from '#/assets/images/avocado.png';
import Beer from '#/assets/images/beer.png';
import Bread from '#/assets/images/bread.png';
import Carrot from '#/assets/images/carrot.png';
import Chicken from '#/assets/images/chicken.png';
import Earth from '#/assets/images/earth.png';
import Milktea from '#/assets/images/milktea.png';
import Pumpkin from '#/assets/images/pumpkin.png';

export const avatars = [
  Avocado,
  Beer,
  Bread,
  Carrot,
  Chicken,
  Earth,
  Milktea,
  Pumpkin,
];

export const useGetRandomizeAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  const randomizeAvatar = avatars[randomIndex];

  return { randomizeAvatar };
};
