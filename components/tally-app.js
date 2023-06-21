//@ts-check

import { LitElement, html, css } from "../libs/lit-fw.js";

/**
 * @typedef {object} State
 * @prop {string} Idle
 * @prop {string} Max
 * @prop {string} Min
 */

/**
 * @type {State}
 */
const STATE = {
    Idle: 'Idle',
    Max: 'MAXIMUM',
    Min: 'MINIMUM'
}

class TallyApp extends LitElement {

    static properties = {
        value: { type: String },
        open: {type: Boolean },
        state: {type: String},
        min: {type: String},
        max: {type: String},
        disabled: {type: Boolean},
        stateMsg: {type: String},
    }

    constructor() {
        super()
        this.value = 0
        this.open = false
        this.state = STATE.Idle
        this.disabled = false
        this.stateMsg = 'Counter has been reset to zero'
    }

    minusHandler() {
        this.value--
        this.handleBoundaries()
    }

    addHandler() {
        this.value++
        this.handleBoundaries()
    }

    resetHandler() {
        if(this.value > -10 && this.value < 10) {
            this.open = !this.open
            this.state = STATE.Idle
            this.stateMsg = 'Counter has been reset to zero'
            setTimeout(() => this.open = !this.open, 3000)
        } else {
            this.open = !this.open
            this.disabled = false
        }
        this.value = 0
    }

    handleBoundaries() {
        if (this.value === 10){
            this.state = STATE.Max
            this.disabled = true
            this.stateMsg = `The ${this.state} has been reached. Please reset...`
            this.open = !this.open
        } 
        if (this.value === -10) {
            this.state = STATE.Min
            this.disabled = true
            this.stateMsg = `The ${this.state} has been reached. Please reset...`
            this.open = !this.open
        }
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

        dialog {
            border-color: var(--color-green);
            background: var(--color-light-gray);
            color: var(--color-white);
            font-weight: bold;
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
            max-width: 65%;
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

        .btn-reset {
            background: var(--color-green);
            border-width: 0;
            color: var(--color-white);
            font-weight: bold;
            font-size: 1.3rem;
        }

        /* footer */
        .footer {
            background: var(--color-dark-gray);
            color: var(--color-light-gray);
            align-self: center;
            padding: 2rem;
            font-size: 0.8rem;
            text-align: center;
            margin-top: 1rem;
            width: 80%;
            margin: 0 auto;
            margin-top: 4rem;
        }

        .footer-link {
            color: var(--color-white);
        }
    `

    render() {
        return html`
            <section>
                <header class="header">
                    <h1 class="header-title">Tally Count App</h1>
                </header>

                <main class="counter-main">
                    <dialog .open=${this.open} class="counter-dialog">${this.stateMsg}</dialog>
                    <input class="counter-value" value="${this.value}" disabled />
                    <div class="counter-actions">
                        <div>
                            <button class="btn btn-minus" @click=${this.minusHandler} .disabled=${this.disabled}>-</button>
                            <button type="button" class="btn btn-add" @click=${this.addHandler} .disabled=${this.disabled}>+</button>
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