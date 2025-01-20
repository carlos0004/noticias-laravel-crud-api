import '../../css/admin/admin.css';


const sidebar = document.getElementById('sidebar');
const openClose = document.getElementById('menu');

openClose.addEventListener("click", () => { sidebar.classList.toggle('show'); });
