/**
 * A basic stock for a list of cards, based on flex.
 */
class LineStockWithSort<T> extends LineStock<T> {
  /**
   * @param manager the card manager
   * @param element the stock element (should be an empty HTML Element)
   * @param settings a `LineStockSettings` object
   */
  constructor(
    protected manager: CardManager<T>,
    protected element: HTMLElement,
    settings?: LineStockSettings
  ) {
    super(manager, element, settings);
  }

  public sortStock() {
    if (this.sort && this.cards.length) {
      this.cards.sort(this.sort);

      let previouslyMovedCardDiv = this.getCardElement(
        this.cards[this.cards.length - 1]
      );
      this.element.appendChild(previouslyMovedCardDiv);
      for (let i = this.cards.length - 2; i >= 0; i--) {
        const movedCardDiv = this.getCardElement(this.cards[i]);
        this.element.insertBefore(movedCardDiv, previouslyMovedCardDiv);
        previouslyMovedCardDiv = movedCardDiv;
      }
    }
  }
}
