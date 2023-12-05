class ChessPieceCounter {
  private counter: Counter = new ebg.counter();

  constructor() {

  }

  public setup({bank, religion, type, value}: {bank?: string; religion?: string; type: string; value: number;}) {
    const supplyContainer = document.getElementById('pr_supply');
    if (!supplyContainer) {
      return;
    }
    supplyContainer.insertAdjacentHTML('beforeend', tplChessPieceCounter({id: `${type}_${religion ?? bank}_supply`, bank, type, religion}));
    this.counter.create(`${type}_${religion ?? bank}_supply_counter`);
    this.counter.setValue(value);
  }

  public incValue(value: number) {
    this.counter.incValue(value);
  }
}