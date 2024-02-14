const tplInformationButton =
  () => `<button id="pr_information_button" type="button" class="pr_button">
<div class="pr_icon"></div>
</button>`;

const tplInfoModalTab = ({ id, text }: { id: string; text: string }) => `
  <div id="pr_information_modal_tab_${id}" class="pr_information_modal_tab">
    <span>${_(text)}</span>
  </div>`;

const tplOperationsInfoRow = ({
  row,
  last,
  lightBackground,
  type = "operation",
}: {
  row: OperationsOneShotsInfoRow;
  last: boolean;
  lightBackground: boolean;
  type?: "operation" | "oneShot";
}) => {
  const { icons, target, requirement, effect } = row;
  return `
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
    ${icons
      .map((icon) =>
        type === "operation"
          ? `<div class="pr_tableau_op" data-tableau-op-id="${icon}"></div>`
          : `<div class="pr_one_shot" data-one-shot-id="${icon}"></div>`
      )
      .join("")}
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
      <span style="font-weight: bold;">${_(target)}</span>
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
    <span>${_(requirement || "")}</span>
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
    <span>${_(effect)}</span>
  </div>
`;
};

const tplBattleTableRow = ({
  row,
  lightBackground,
  last,
}: {
  row: BattleTableRow;
  lightBackground: boolean;
  last: boolean;
}) => {
  const { type, attacker, defender, victorPlacement, nonStrawman, strawman } =
    row;
  return `
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }" style="justify-content: space-between;">
  <span style="font-weight: bold;">${_(type.text)}</span>
    ${type.icons
      .map((icon) =>
        type.iconType === "operation"
          ? `<div class="pr_tableau_op" data-tableau-op-id="${icon}"></div>`
          : `<div class="pr_one_shot" data-one-shot-id="${icon}"></div>`
      )
      .join("")}
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
      ${attacker.map((text) => `<span>${_(text)}</span>`).join("")}
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
  ${defender.map((text) => `<span>${_(text)}</span>`).join("")}
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
  ${victorPlacement.map((text) => `<span>${_(text)}</span>`).join("")}
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
    <span>${_(nonStrawman)}</span>
  </div>
  <div class="pr_cell${last ? " pr_last" : ""}${
    lightBackground ? " pr_light_background" : ""
  }">
    <span>${_(strawman)}</span>
  </div>
`;
};

const tplInformationModalContent = ({
  tabs,
}: {
  tabs: Record<string, { text: string }>;
}) => {
  const OPERATIONS_INFO_CONFIG = getOperationsConfig();
  const ONE_SHOTS_INFO_CONFIG = getOneShotsConfig();
  const BATTLE_TABLE_CONFIG = getBattleTableConfig();

  return `<div id="pr_information_modal_content">
    <div class="pr_information_modal_tabs">
      ${Object.entries(tabs)
        .map(([id, info]) => tplInfoModalTab({ id, text: info.text }))
        .join("")}
    </div>
      <div id="pr_operations" style="display: none;">
        ${OPERATIONS_INFO_CONFIG.headers
          .map(
            (headerText) =>
              `<div class="pr_header"><span>${_(headerText)}</span></div>`
          )
          .join("")}
        ${OPERATIONS_INFO_CONFIG.rows
          .map((row, index) =>
            tplOperationsInfoRow({
              row,
              last: index === OPERATIONS_INFO_CONFIG.rows.length - 1,
              lightBackground: index % 2 === 1,
            })
          )
          .join("")}
      </div>
      <div id="pr_oneShots" style="display: none;">
      ${ONE_SHOTS_INFO_CONFIG.headers
        .map(
          (headerText) =>
            `<div class="pr_header"><span>${_(headerText)}</span></div>`
        )
        .join("")}
      ${ONE_SHOTS_INFO_CONFIG.rows
        .map((row, index) =>
          tplOperationsInfoRow({
            row,
            last: index === ONE_SHOTS_INFO_CONFIG.rows.length - 1,
            type: "oneShot",
            lightBackground: index % 2 === 1,
          })
        )
        .join("")}
    </div>
    <div id="pr_battleTable" style="display: none;">
    ${BATTLE_TABLE_CONFIG.headers
      .map(
        (headerText) =>
          `<div class="pr_header"><span>${_(headerText)}</span></div>`
      )
      .join("")}
      ${BATTLE_TABLE_CONFIG.rows
        .map((row, index) =>
          tplBattleTableRow({
            row,
            last: index === BATTLE_TABLE_CONFIG.rows.length - 1,
            lightBackground: index % 2 === 1,
          })
        )
        .join("")}
    </div>
  </div>`;
};
