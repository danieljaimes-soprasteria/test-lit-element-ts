/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  todoList = ['Todo', 'Todo', 'Todo', 'Todo', 'Todo', 'Todo'];

  static override styles = css`
    :host {
      display: block;
      border: solid 1px black;
      padding: 16px;
      margin: 0 auto;
      width: 900px;
    }
    ul > li {
      padding: 5px;
    }
  `;

  /**
   * The name to say "Hello" to.
   */
  @property({type: String})
  name = 'MUNDO';

  /**
   * The number of times the button has been clicked.
   */
  @property({type: Number})
  count = 0;
  
  override render() {
    return html`
      <h1>TODO LIST</h1>

      <button @click=${this.onClick} part="button">
        Click Count: ${this.count}
      </button>
      <button @click=${this.onClickCreate} part="button">
        CREATE
      </button>
      <slot></slot>
      <ul>
        ${this.todoList.map(
          (value, index) =>
            html`<li>
              ${value}
              
              <button @click=${() => this.onClickDeleted(index)} part="button">
                ELIMINAR
              </button>
            </li>`
        )}
      </ul>

      <slot></slot>
    `;
  }

  onClickCreate(){
    this.dispatchEvent(new CustomEvent('create'))
  }
  addTask(task: string){
    this.todoList.push(task)
    this.requestUpdate();
  }

  onClickDeleted(index: number) {
    this.todoList.splice(index, 1);
    this.requestUpdate();
  }

  private onClick() {
    this.count++;
    this.dispatchEvent(
      new CustomEvent('counter-changed', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          count: this.count,
        },
      })
    );
  }

  /**
   * Formats a greeting
   * @param name The name to say "Hello" to
   */
  sayHello(name: string): string {
    return `Hello, ${name}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
