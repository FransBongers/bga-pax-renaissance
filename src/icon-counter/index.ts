class IconCounter {
  private iconCounterId: string;
  private containerId: string;
  private counter: Counter;

  constructor(config: IconCounterConfig) {
    const { iconCounterId, containerId } = config;
    this.iconCounterId = iconCounterId;
    this.containerId = containerId;

    this.setup(config);
    
  }

  setup({icon, initialValue, extraIconClasses}: IconCounterConfig) {
    const container = document.getElementById(this.containerId);
    if (!container) {
      return;
    }
    container.insertAdjacentHTML(
      "beforeend",
      tplIconCounter({ extraIconClasses, icon, iconCounterId: this.iconCounterId, value: initialValue })
    );

    this.counter = new ebg.counter();
    this.counter.create(`${this.iconCounterId}_counter`);
    this.counter.setValue(initialValue);
  }

  public setValue(value: number) {
    this.counter.setValue(value);
    const node = document.getElementById(this.iconCounterId);
    if (!node) {
      return;
    }
    this.checkNone({node, value});
    
  }

  public incValue(value: number) {
    this.counter.incValue(value);
    const node = document.getElementById(this.iconCounterId);
    if (!node) {
      return;
    }
    this.checkNone({node, value: this.counter.getValue()});
  }

  public getValue() {
    return this.counter.getValue();
  }

  private checkNone({node, value}: {node: HTMLElement; value: number;}) {
    if (value === 0) {
      node.classList.add(PR_NONE)
    } else {
      node.classList.remove(PR_NONE)
    }
  }
}
