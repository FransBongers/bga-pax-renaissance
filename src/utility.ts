const isDebug = window.location.host == 'studio.boardgamearena.com' || window.location.hash.indexOf('debug') > -1;
const debug = isDebug ? console.info.bind(window.console) : () => {};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const pxNumber = (px?: string): number => {
  if ((px || '').endsWith('px')) {
    return Number(px.slice(0, -2));
  } else {
    return 0;
  }
}