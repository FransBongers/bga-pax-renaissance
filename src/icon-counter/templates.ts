// const tplIconCounter = ({iconCounterId, value}: {iconCounterId: string; value: number}) => `
//   <div id="${iconCounterId}" class="pr_icon_counter_container" data-value="${value}">
//     <div class="pr_icon" data-icon="florin"></div>
//     <div class="pr_icon_counter">
//     <span id="${iconCounterId}_counter"></span>
//   </div>
//   </div>`

  const tplIconCounter = ({icon, iconCounterId, value, extraIconClasses}: {icon: string; iconCounterId: string; value: number; extraIconClasses?: string;}) => `
  <div id="${iconCounterId}" class="pr_icon_counter_container${value === 0 ? ' pr_none' : ''}">
    <span id="${iconCounterId}_counter" class="pr_counter"></span>
    <div id="${iconCounterId}_icon" class="pr_icon${extraIconClasses ? ` ${extraIconClasses}` : ''}" data-icon="${icon}"></div>
  </div>`

