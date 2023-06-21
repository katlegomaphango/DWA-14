//@ts-check

import { LitElement, html } from "../libs/lit-fw.js";

class TallyApp extends LitElement {

    static properties = {
        value: { type: String },
        open: {type: Boolean }
    }

    constructor() {
        super()
        this.value = 0
        this.open = false
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
                            <button class="btn btn-minus" @click=${this.addHandler}>+</button>
                        </div>
                        <button class="btn btn-reset" @click=${this.resetHandler}>Reset</button>
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