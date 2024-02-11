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

const getUniqueAgents = ({ agents }: { agents: Agent[] }): Agent[] => {
  if (agents.length === 1) {
    return agents;
  }
  const equalSeparator = agents[0].separator === agents[1].separator;
  const equalType = agents[0].type === agents[1].type;
  if (equalSeparator && equalType) {
    return [agents[0]];
  } else {
    return agents;
  }
}