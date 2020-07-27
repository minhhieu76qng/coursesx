/* eslint-disable import/prefer-default-export */
import { isArray } from 'lodash';

const images = [
  'https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png',
  'https://miro.medium.com/max/2560/1*Rc3ff_4T_ZeAPGiU9ai9nw.png',
  'https://miro.medium.com/max/2700/0*Wz93rPzLLTq1VwVW',
  'https://miro.medium.com/max/1200/1*0wCRD_rBsvtksdVc69NZog.png',
  'https://miro.medium.com/max/1024/1*PfumnOVjrV3BFXsEIg2LTg.png',
];

export function transformCategoriesWithImage(categories = []) {
  if (isArray(categories)) {
    return categories.map((cate) => ({
      ...cate,
      image: images[Math.floor(Math.random() * images.length)],
    }));
  }
  return [];
}
