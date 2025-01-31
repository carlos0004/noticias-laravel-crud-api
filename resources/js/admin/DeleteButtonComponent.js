import { GridManager } from "./GridManager";
import Swal from "sweetalert2";
export class DeleteButtonComponent {
    eGui;
    eButton;
    eventListener;

    init(param) {
        this.eGui = document.createElement('div');
        this.eGui.className = 'center';
        const eButton = document.createElement('div');
        eButton.className = 'delete-btn';
        eButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
        this.eventListener = () => {
            Swal.fire({
                title: "Estás seguro?",
                text: "No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let result = await GridManager.delete(`${GridManager.url}/${param.data.id}`);
                    console.log(result);

                    if (result.status === 200) {
                        GridManager.gridApi.applyTransaction({ remove: [{ id: param.data.id }] });
                        Swal.fire({
                            title: "Eliminado!",
                            text: result.message,
                            icon: "success"
                        });
                    }
                }
            });
        }
        eButton.addEventListener('click', this.eventListener);
        this.eGui.appendChild(eButton);

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