type TabId = 'battleTable' | 'operations' | 'OneShots' | 'gameTerms' | 'mapCards';

interface OperationsOneShotsInfoRow {
  icons: string[];
  target: string;
  requirement?: string;
  effect: string;
}

interface BattleTableRow {
  type: {
    iconType: 'operation' | 'oneShot';
    text: string;
    icons: string[];
  },
  attacker: string[];
  defender: string[];
  victorPlacement: string[];
  nonStrawman: string;
  strawman: string;
}