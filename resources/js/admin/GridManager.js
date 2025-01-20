// Importa los estilos de ag-grid
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { createGrid } from 'ag-grid-community';

export class GridManager {
    constructor(baseUrl, gridElementSelector, columns) {
        this.baseUrl = baseUrl;
        this.gridElementSelector = gridElementSelector;
        this.columns = columns;
        this.rowImmutableStore = [];
        this.gridApi = null;
    }

    async init() {
        try {
            await this.loadRecords();
        } catch (error) {
            console.error("Error initializing grid:", error);
        }
    }

    async request(url, options) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error in request:", error);
            throw error;
        }
    }

    async loadRecords() {
        const options = { method: "GET" };
        const data = await this.request(this.baseUrl, options);
        this.rowImmutableStore = data.result;

        const gridOptions = {
            rowData: this.rowImmutableStore,
            columnDefs: this.columns,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                editable: true,
            },
            readOnlyEdit: true,
            onCellEditRequest: (event) => this.onCellEditRequest(event),
        };

        const myGridElement = document.querySelector(this.gridElementSelector);
        this.gridApi = createGrid(myGridElement, gridOptions);
    }

    async onCellEditRequest(event) {
        const data = event.data;
        const field = event.colDef.field;
        const newValue = event.newValue;

        const oldItem = this.rowImmutableStore.find((row) => row.id === data.id);
        if (!oldItem || !field) {
            return;
        }

        const newItem = { ...oldItem };
        newItem[field] = newValue;

        this.rowImmutableStore = this.rowImmutableStore.map((oldItem) =>
            oldItem.id === newItem.id ? newItem : oldItem
        );
        this.gridApi.setGridOption("rowData", this.rowImmutableStore);

        const url = `${this.baseUrl}/${data.id}`;
        const dataToUpdate = { [field]: newValue };
        await this.updateCell(url, dataToUpdate);
    }

    async updateCell(url, dataToUpdate) {
        const options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToUpdate),
        };
        return this.request(url, options);
    }
}
