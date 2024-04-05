import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("smartqasa-light-tile-editor")
export class LightTileEditor extends LitElement {
  @state() _config: any;

  setConfig(config: any) {
    this._config = config;
  }

  static styles = css`
    .table {
      display: table;
    }
    .row {
      display: table-row;
    }
    .cell {
      display: table-cell;
      padding: 0.5em;
    }
  `;

  render() {
    return html`
      <form class="table">
        <div class="row">
          <label class="label cell" for="entity">Entity:</label>
          <input
              @change="${this.handleChangedEvent}"
              class="value cell" id="entity" value="${this._config.entity}"></input>
        </div>
        <div class="row">
          <label class="label cell" for="name">Name</label>
          <input
              @change="${this.handleChangedEvent}"
              class="value cell" id="name" value="${this._config.name}"></input>
        </div>
      </form>
        `;
  }

  handleChangedEvent(changedEvent: Event) {
    const target = changedEvent.target as HTMLInputElement;
    // this._config is readonly, copy needed
    const newConfig = Object.assign({}, this._config);
    switch (target.id) {
      case "entity":
        newConfig.entity = target.value;
        break;
      case "name":
        newConfig.name = target.value;
        break;
    }
      const messageEvent = new CustomEvent("config-changed", {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
        });
        this.dispatchEvent(messageEvent);
    }
  }
