import '../../css/admin/admin.css';
import Swal from 'sweetalert2';

const sidebar = document.getElementById('sidebar');
const openClose = document.getElementById('menu');

openClose.addEventListener("click", () => {

    sidebar.classList.toggle('show');
});
