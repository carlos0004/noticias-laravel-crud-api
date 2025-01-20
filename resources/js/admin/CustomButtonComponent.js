import { GridManager } from "./GridManager";
export class CustomButtonComponent {
    eGui;
    eButton;
    eventListener;

    init(param) {
        this.eGui = document.createElement('div');
        const eButton = document.createElement('button');
        eButton.className = 'btn btn-danger';
        eButton.textContent = 'Eliminar';
        this.eventListener = () => {
            GridManager.gridApi.applyTransaction({ remove: [{ id: param.data.id }] });
            let result = GridManager.delete(`${GridManager.url}/${param.data.id}`);
            console.log(result);


        }
        eButton.addEventListener('click', this.eventListener);
        this.eGui.appendChild(eButton);
        console.log("hola");

    }

    getGui() {
        return this.eGui;
    }

    refresh() {
        return true;
    }

    destroy() {
        if (this.eButton) {
            this.eButton.removeEventListener('click', this.eventListener);
        }
    }
}