const tplIcon = ({
  id,
  children,
  classes,
  extra = "",
  icon,
  style
}: {
  id?: string;
  children?: string;
  classes?: string;
  extra?: string;
  icon: string;
  style?: string;
}): string =>
  `<div ${id ? `id="${id}"` : ''} class="pr_icon${classes ? ` ${classes}`: ''}" data-icon="${icon}" ${extra} ${style ? `style="${style}"` : ''}>
    ${children || ''}
  </div>`;

  // const tplIcon = ({id}: {id: string;}) => `<div id="${id}" class="pr_icon" data-icon="florin" data-region="west" style="width: 25px; height: 25px; position: absolute;"></div>`

  // const tplIcon = ({
  //   icon,
  //   id,
  //   extra = "",
  //   style
  // }: {
  //   id: string;
  //   extra?: string;
  //   icon: string;
  //   style?: string;
  // }) =>
  //   `<div id="${id}" class="pr_icon" data-icon="${icon}" ${extra} style="width: 25px; height: 25px; position: absolute;"></div>`;
  
  const tplOneShot = ({id, oneShot}: {oneShot: string; id?: string;}) => `
  <div ${id ? `id="${id}"` : ''} class="pr_one_shot" data-one-shot-id="${oneShot}"></div>`

  const tplTableauOp = ({id, tableauOpId}: {tableauOpId: string; id?: string;}) => `
  <div ${id ? `id="${id}"` : ''} class="pr_tableau_op" data-tableau-op-id="${tableauOpId}"></div>`