const tareaForm = document.querySelector('form');
const tareaInput = document.getElementById('tareasInput');
const tareaListaUL = document.getElementById('tareasLista');

let tareas = obtenerTareas();
actulizarListaTareas();

tareaForm.addEventListener('submit', function(e){
    e.preventDefault();
    agregaTarea();
});
function agregaTarea(){
    const tareaTexto = tareaInput.value.trim();
    if(tareaTexto.length > 0){
        const objetoTarea = {
            Text: tareaTexto,
            completado: false
        }
        tareas.push(objetoTarea);
        actulizarListaTareas();
        guardarTarea();
        tareaInput.value = "";
    }
}
function actulizarListaTareas(){
    tareaListaUL.innerHTML = "";
    tareas.forEach((tarea, tareaIndex)=>{
        tareaItem = crearElementoTarea(tarea, tareaIndex);
        tareaListaUL.append(tareaItem)
    })
}
function crearElementoTarea(tarea, tareaIndex){
    const tareaId = "tarea-"+tareaIndex;
    const tareaLI = document.createElement('li');
    const tareaTexto = tarea.Text;
    tareaLI.className = "tarea";
    tareaLI.innerHTML = `
        <input type="checkbox" id="${tareaId}">
        <label class="checkboxPersonalizado" for="${tareaId}"></label>
        <label class="tareaTexto" for="${tareaId}">
                ${tareaTexto}
        </label>
        <button class="tareaBorrar">
            <svg fill="var(--secundary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `
    const botonBorrar = tareaLI.querySelector(".tareaBorrar");
    botonBorrar.addEventListener("click", ()=>{
        borrarItemTarea(tareaIndex);
    })
    const checkbox = tareaLI.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        tareas[tareaIndex].completado = checkbox.checked;
        guardarTarea();
    })
    checkbox.checked = tarea.completado;
    return tareaLI;
}
function borrarItemTarea(tareaIndex){
    tareas = tareas.filter((_, i)=> i !== tareaIndex);
    guardarTarea();
    actulizarListaTareas();
}
function guardarTarea(){
    const tareaJson = JSON.stringify(tareas)
    localStorage.setItem("Tareas", tareaJson);
}
function obtenerTareas(){
    const tareas = localStorage.getItem("Tareas") || "[]";
    return JSON.parse(tareas);
}