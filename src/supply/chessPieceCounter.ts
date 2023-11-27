class ChessPieceCounter {
  private counter: Counter = new ebg.counter();

  constructor() {

  }

  public setup({religion, type, value}: {religion: string; type: string; value: number;}) {
    const supplyContainer = document.getElementById('pr_supply');
    if (!supplyContainer) {
      return;
    }
    supplyContainer.insertAdjacentHTML('beforeend', tplChessPieceCounter({id: `${type}_${religion}_supply`, type, religion}));
    this.counter.create(`${type}_${religion}_supply_counter`);
    this.counter.setValue(value);
  }
}