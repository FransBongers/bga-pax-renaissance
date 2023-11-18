// const tplIconCounter = ({iconCounterId, value}: {iconCounterId: string; value: number}) => `
//   <div id="${iconCounterId}" class="pr_icon_counter_container" data-value="${value}">
//     <div class="pr_icon" data-icon="florin"></div>
//     <div class="pr_icon_counter">
//     <span id="${iconCounterId}_counter"></span>
//   </div>
//   </div>`

  const tplIconCounter = ({iconCounterId, value}: {iconCounterId: string; value: number}) => `
  <div id="${iconCounterId}" class="pr_icon_counter_container${value === 0 ? ' pr_none' : ''}">
    <div class="pr_icon" data-icon="florin"></div>
    <div class="pr_icon_counter">
    <span id="${iconCounterId}_counter"></span>
  </div>
  </div>`