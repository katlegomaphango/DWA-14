//@ts-check

import { LitElement, html, css } from "../libs/lit-fw.js";

/**
 * @typedef {object} State
 * @prop {boolean} Idle
 * @prop {boolean} Max
 * @prop {boolean} Min
 */

/**
 * @type {State}
 */
// const STATE = {
//     Idle: true,
//     Max: true,
//     Min: true
// }

class TallyApp extends LitElement {

    static properties = {
        value: { type: String },
        open: {type: Boolean },
        state: {type: String},
        min: {type: String},
        max: {type: String},
    }

    constructor() {
        super()
        this.value = 0
        this.open = false
        this.state = 'idle'
    }

    minusHandler() {
        this.value--
    }

    addHandler() {
        this.value++
    }

    resetHandler() {
        this.value = 0
        this.open = !this.open
        setTimeout(() => this.open = !this.open, 3000)
    }

    static styles = css`
        * {
            box-sizing: border-box;
        }

        /* header */
        .header {
            text-align: center;
        }

        .header__title {
            font-size: 3rem;
            font-weight: 900;
            color: var(--color-light-gray);
        }

        /* .counter__value::part(base) */
        .counter-value {
            width: 100%;
            height: 15rem;
            font-size: 10rem;
            font-weight: 900;
            background: none;
            border-width: 0;
            border-bottom: 1px solid var(--color-light-gray);
            color: var(--color-white);
            text-align: center;
            justify-items: center;
        }

        /* counter */
        .counter-main {
            background: var(--color-dark-gray);
            max-width: 50%;
            margin: 0 auto;
        }

        .counter-actions {
            width: 100%;
            display: grid;
            grid-template-rows: 1fr 1fr;
            row-gap: 1rem;
        }

        .counter-actions>div {
            /* background-color: #fff; */
            display: flex;
            width: 100%;
        }

        /* .counter__buttons */
        .btn {
            width: 50%;
            background: none;
            border-width: 0;
            font-size: 3rem;
            border-bottom: 1px solid var(--color-light-gray);
        }

        .btn-minus {
            border-right: 1px solid var(--color-light-gray);
        }

        .counter__buttons::part(label) {
            color: black;
        }

        .btn:active, .btn-reset:active {
            background: var(--color-medium-gray);
            transform: translateY(-2%);
        }
    `

    render() {
        return html`
            <section>
                <header class="header">
                    <h1 class="header-title">Tally Count App</h1>
                </header>

                <main class="counter-main">
                    <dialog .open=${this.open} class="counter-dialog">Counter has been reset to zero</dialog>
                    <input class="counter-value" value="${this.value}" readonly />
                    <div class="counter-actions">
                        <div>
                            <button class="btn btn-minus" @click=${this.minusHandler}>-</button>
                            <button class="btn btn-add" @click=${this.addHandler}>+</button>
                        </div>
                        <button class="btn-reset" @click=${this.resetHandler}>Reset</button>
                    </div>
                </main>
                <footer class="footer">
                    Inspired by
                    <a class="footer-link" href="https://tallycount.app/">Tally Count</a>,
                    Note that this is merely a student practice project for learning
                    JavaScript.
                </footer>
            </section>
        `
    }
}

customElements.define('tally-app', TallyApp)