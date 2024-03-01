export default class BudgetTracker {
    constructor(querySelectorString) {
        this.root = document.querySelector(querySelectorString);
        this.root.innerHTML = BudgetTracker.html();

        this.root.querySelector(".add-entry").addEventListener("click", () => {
            this.onNewEntryBtnClick();
        });

        this.load();
    }

    static html() {
        return `
            <table class="finance-tracker">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="entry-row"></tbody>
                <tbody>
                    <tr>
                        <td colspan="5" class="action-controls">
                            <button type="button" class="add-entry">New Entry</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" class="total-summary">
                            <strong>Total:</strong>
                            <span class="total-amount">€0.00</span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }

    static entryHtml() {
        return `
            <tr>
                <td>
                    <input class="field field-date" type="date">
                </td>
                <td>
                    <input class="field field-description" type="text" placeholder="Add a Description">
                </td>
                <td>
                    <select class="field field-category">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </td>
                <td>
                    <input type="number" class="field field-value">
                </td>
                <td>
                    <button type="button" class="remove-entry">&#10005;</button>
                </td>
            </tr>
        `;
    }

    load() {
        const entries = JSON.parse(localStorage.getItem("budget-tracker-entries-dev") || "[]");

        for (const entry of entries) {
            this.addEntry(entry);
        }

        this.updateSummary();
    }

    updateSummary() {
        const total = this.getEntryRows().reduce((total, row) => {
            const amount = row.querySelector(".field-value").value;
            const isExpense = row.querySelector(".field-category").value === "expense";
            const modifier = isExpense ? -1 : 1;

            return total + (amount * modifier);
        }, 0);

        const totalFormatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EUR"
        }).format(total);

        this.root.querySelector(".total-amount").textContent = totalFormatted;
    }

    save() {
        const data = this.getEntryRows().map(row => {
            return {
                date: row.querySelector(".field-date").value,
                description: row.querySelector(".field-description").value,
                type: row.querySelector(".field-category").value,
                amount: parseFloat(row.querySelector(".field-value").value),
            };
        });

        localStorage.setItem("budget-tracker-entries-dev", JSON.stringify(data));
        this.updateSummary();
    }

    addEntry(entry = {}) {
        this.root.querySelector(".entry-row").insertAdjacentHTML("beforeend", BudgetTracker.entryHtml());

        const row = this.root.querySelector(".entry-row tr:last-of-type");

        row.querySelector(".field-date").value = entry.date || new Date().toISOString().replace(/T.*/, "");
        row.querySelector(".field-description").value = entry.description || "";
        row.querySelector(".field-category").value = entry.type || "income";
        row.querySelector(".field-value").value = entry.amount || 0;
        row.querySelector(".remove-entry").addEventListener("click", e => {
            this.onDeleteEntryBtnClick(e);
        });

        row.querySelectorAll(".field").forEach(input => {
            input.addEventListener("change", () => this.save());
        });
    }

    getEntryRows() {
        return Array.from(this.root.querySelectorAll(".entry-row tr"));
    }

    onNewEntryBtnClick() {
        this.addEntry();
    }

    onDeleteEntryBtnClick(e) {
        e.target.closest("tr").remove();
        this.save();
    }
}