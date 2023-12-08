class TokenCounter {
  private counter: Counter = new ebg.counter();

  constructor() {

  }

  public setup({ separator, type, value}: {separator: string; type: string; value: number;}) {
    const supplyContainer = document.getElementById('pr_supply');
    if (!supplyContainer) {
      return;
    }
    supplyContainer.insertAdjacentHTML('beforeend', tplTokenCounter({id: `${type}_${separator}_supply`, separator, type}));
    this.counter.create(`${type}_${separator}_supply_counter`);
    this.counter.setValue(value);
  }

  public incValue(value: number) {
    this.counter.incValue(value);
  }
}