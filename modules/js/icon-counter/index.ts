class IconCounter {
  private iconCounterId: string;
  private containerId: string;
  private counter: Counter;
  private initialValue: number;

  constructor({ iconCounterId, containerId, initialValue }: IconCounterConfig) {
    this.iconCounterId = iconCounterId;
    this.containerId = containerId;
    this.initialValue = initialValue;

    this.setup();
    
  }

  setup() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      return;
    }
    container.insertAdjacentHTML(
      "beforeend",
      tplIconCounter({ iconCounterId: this.iconCounterId, value: this.initialValue })
    );

    this.counter = new ebg.counter();
    this.counter.create(`${this.iconCounterId}_counter`);
    this.counter.setValue(this.initialValue);
  }

  public setValue(value: number) {
    this.counter.setValue(value);
    const node = document.getElementById(this.iconCounterId);
    if (!node) {
      return;
    }
    
    node.setAttribute("data-value", `${value}`);
  }

  public incValue(value: number) {
    this.counter.incValue(value);
    const node = document.getElementById(this.iconCounterId);
    if (!node) {
      return;
    }
    
    node.setAttribute("data-value", `${this.counter.getValue()}`);
  }

  public getValue() {
    return this.counter.getValue();
  }
}
