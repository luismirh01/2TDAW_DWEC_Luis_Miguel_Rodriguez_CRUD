const tabla_donut= document.querySelector("#libro-list");

// input de botones del nav
const b_añadir=document.querySelector("#B_añadir");
const buscar=document.querySelector("#B_buscar");

//DIV DEL MODAL BOOSTRAP PARA PODER QUITARLO Y PONERLO
const editar_modal = document.querySelector("#editarModal");

//INPUTS DEL FORMULARIO DE EDITAR donut
const editar_imagen = document.querySelector("#editarimagen");
const editar_Nombre = document.querySelector("#editarNombre");
const editar_Descripción = document.querySelector("#editarDescripción");
const editar_Categoria = document.querySelector("#editarCategoria");
const editar_Precio = document.querySelector("#editarPrecio");
const editar_Gluten = document.querySelector("#editarGluten")
const editar_Fecha = document.querySelector("#editarFecha")
const editar_Comprar = document.querySelector("#editarComprar")
const b_editar = document.querySelector("#editar");
const editar_clave_donut = document.querySelector("#clavedonut")

// Añadir donut input
const form_añadir = document.querySelector("#libro-formu");
const b_nuevo = document.querySelector("#nuevo");

const imagen=document.querySelector("#Imagen");
const Nombre=document.querySelector("#Nombre");
const Descripción=document.querySelector("#Descripción");
const Categoria=document.querySelector("#Categoria");
const Precio=document.querySelector("#Precio");
const Gluten=document.querySelector("#Gluten");
const Fecha=document.querySelector("#Fecha");
const Comprar=document.querySelector("#Comprar");

// input de ordenacion 
const ord_asc_fecha = document.querySelector("#ordenar_fecha");
const ord_des_precio = document.querySelector("#ordenar_precio");

// input de busqueda 
const busqueda = document.querySelector("#busqueda");

const nuevoDonut= (json) =>{
    const nueva_fila =document.createElement("tr");
    nueva_fila.id = "ID_" + json["nombre"].toUpperCase().replaceAll(" ", "");
   
    nueva_fila.style.height="200px";
    // Crear imagen
    const imagen = document.createElement("img");
    imagen.src = json["imagen"];
    imagen.style.height="200px";
    const td_imagen = document.createElement("td");
    td_imagen.appendChild(imagen);
    nueva_fila.appendChild(td_imagen);
    
    // crear nombre
    const td_nombre= document.createElement("td");
    td_nombre.innerText=json["nombre"];
    nueva_fila.appendChild(td_nombre);

    // crear descripcion
    const td_descripcion= document.createElement("td");
    td_descripcion.innerText=json["descripcion"];
    nueva_fila.appendChild(td_descripcion);

    // crear categoria
    const td_categoria=document.createElement("td");
    td_categoria.innerText=json["categoria"];
    nueva_fila.appendChild(td_categoria);

    // crear precio 
    const td_precio=document.createElement("td");
    td_precio.innerText=json["precio"] + "€";
    nueva_fila.appendChild(td_precio);

    // crear gluten
    const td_gluten=document.createElement("td");
    td_gluten.innerText=json["gluten"];
    nueva_fila.appendChild(td_gluten);

    // fecha de caducidad
    const td_fecha=document.createElement("td");
    td_fecha.innerText=json["fecha"];
    nueva_fila.appendChild(td_fecha);

    // crear enlace de comprar
    const enlace_comprar=document.createElement("a");
    enlace_comprar.innerText="Comprar";
    enlace_comprar.href=json["enlace"];

    const td_enlace=document.createElement("td");
    td_enlace.appendChild(enlace_comprar);
    nueva_fila.appendChild(td_enlace);

    // boton de editar
    const editar = document.createElement("a");
	editar.innerText = "Editar";
	editar.href = "#";

    // manejo del boton editar 
    console.log(nueva_fila.id);
    editar.addEventListener("click", modalEditarDonut(nueva_fila.id) )
    
    const td_editar=document.createElement("td");
    td_editar.appendChild(editar);
    nueva_fila.appendChild(td_editar);

    // boton de borrado
    const borrar =document.createElement("a");
    borrar.innerText="Eliminar";
    borrar.href="#";
    
    // manejo del boton de borrado
    borrar.addEventListener("click", borrarDonut(nueva_fila.id))
    const td_borrar =document.createElement("td");
    td_borrar.appendChild(borrar);
    nueva_fila.appendChild(td_borrar);

    return nueva_fila;
}

// QUE SALGA EL FORMULARIO DE añadir
b_añadir.addEventListener("click",
    ()=>{
        if(form_añadir.classList.contains("d-none")){
            form_añadir.classList.remove("d-none");
            b_añadir.innerText="quitar formulario";
        }else{
            form_añadir.classList.add("d-none");
            b_añadir.innerText="Añadir donut";
        }
    });


// añadir DONUT 
b_nuevo.addEventListener("click",
    (evento)=>{
        evento.preventDefault();
        if(Imagen.value.trim()=== "" &&
           Nombre.value.trim()==="" &&
            Descripción.value.trim()==="" &&
             Categoria.value.trim()==="" &&
              (precio.value.trim() === "" || isNaN(precio.value.trim()) || parseInt(precio.value.trim()) <= 0) &&
              Gluten.value.trim()===""&&
              Fecha.value.trim()===""&&
              Comprar.value.trim()===""&&
              sessionStorage.getItem("ID_" + Nombre.value.trim().toUpperCase().replaceAll(" ", "")) !== null ){
            mensajeError("DATOS INTRODUCIDOS ERRONEOS");
        }else{
            const datos_donut={
                "Imagen": Imagen.value.trim(),
                "Nombre": Nombre.value.trim(),
                "Descripción": Descripción.value.trim(),
                "Categoria": Categoria.value.trim(),
                "precio": Precio.value.trim(),
                "Gluten": Gluten.value.trim(),
                "Fecha": Fecha.value.trim(),
                "Comprar": Comprar.value.trim()
            };
            const nuevo = nuevoDonut(datos_donut);
            tabla_donut.appendChild(nuevo);
            sessionStorage.setItem("ID_" + Nombre.value.trim().toUpperCase().replaceAll(" ", ""), json.stringify(datos_donut));
            form_añadir.reset();
            mensajeOk("Añadido correctamente");
        }
    });

    // gestion de busqueda 
    buscar.addEventListener("click",
        (evento)=>{
            evento.preventDefault();

            const donuts =Object.values(sessionStorage).map(
                (donut)=>{
                    return JSON.parse(donut);
                }
            );
            const donut_filtrados=donuts.filter(
                (donut)=>{
                    return donut["nombre"].includes(busqueda.value.trim());
                }
            )

            tabla_donut.innerHTML="";

            donut_filtrados.forEach(
                (donut)=>{
                    tabla_donut.appendChild(nuevoDonut(donut));
                }
            )
            // nose como se hace sin el filtro 
        }
    )

    b_editar.addEventListener("click",
        (evento)=>{
            evento.preventDefault();
            const nueva_clave_donut="ID_"+editar_Nombre.value.
                        trim().toUpperCase().replaceAll(" ","");
            if(Imagen.value.trim()=== "" &&
           Nombre.value.trim()==="" &&
            Descripción.value.trim()==="" &&
             Categoria.value.trim()==="" &&
             Precio.value.trim()==="" &&
              Gluten.value.trim()===""&&
              Fecha.value.trim()===""&&
              Comprar.value.trim()===""&&
              sessionStorage.getItem("ID_" + Nombre.value.trim().toUpperCase().replaceAll(" ", "")) !== null ){
            mensajeError("DATOS INTRODUCIDOS ERRONEOS");
        }else{
            const datos_donut={
                "Imagen": Imagen.value.trim(),
                "Nombre": Nombre.value.trim(),
                "Descripción": Descripción.value.trim(),
                "Categoria": Categoria.value.trim(),
                "precio": Precio.value.trim(),
                "Gluten": Gluten.value.trim(),
                "Fecha": Fecha.value.trim(),
                "Comprar": Comprar.value.trim()
            };
            //TR CON LOS NUEVOS DATOS
            const donut_editado=nuevoDonut(datos_donut);
            //TRA ANTERIOR
            const fila_a_editar=document.querySelector("#"+editar_clave_donut.value);
            //COLOCAMOS EN LA POSICION DEL TR ANTERIOR EL NUEVO
            fila_a_editar.replaceWith(donut_editado);
            //ACTUALIZAR EL STORAGE
            sessionStorage.setItem(nueva_clave_donut,
                                    json.stringify(datos_donut));
            if(nueva_clave_donut!==editar_clave_donut.value){
                sessionStorage.removeItem(editar_clave_donut.value);
            }

            form_editar.reset();
            $(editar_modal).modal("toggle");
			mensajeOk("Editado correctamente");
        }
});

    const borrarDonut=(clave_donut)=>{
        return ()=> {
            const fila_a_borrar=document.querySelector("#"+clave_donut)
            fila_a_borrar.remove();
            sessionStorage.removeItem(clave_donut);
        }
    }

    const modalEditarDonut =(clave_donut)=>{
        return()=>{
            const donut =JSON.parse(sessionStorage.getItem(clave_donut));
            editar_imagen.value = donut["imagen"];
            editar_Nombre.value = donut["nombre"];
            editar_Descripción.value = donut["descripcion"];
            editar_Precio.value = donut["precio"];
            editar_Categoria.value = donut["categoria"];

            //jquery
            $(editar_modal).modal("toggle");
        }
    }


ord_asc_fecha.addEventListener("click",
    (evento)=>{
        evento.preventDefault();
        //PASAR EL SESSIONSTORAGE A UN ARRAY DE OBJETOS JSON
        const donuts=Object.values(sessionStorage).map(
            (donut)=>{
                return JSON.parse(donut)
            }
        );
        // filtrar 
        const donut_filtrados=donuts.filter(
            (donut)=>{
                return donut["descripcion"].includes(busqueda.value.trim());
            }
        )
        // ordenacion
        const donut_ordenados=donut_filtrados.sort(
            (a,b)=>{
                return a["fecha"]>b["fecha"];
            }
        )
        // vaciar tabla
            tabla_donut.innerHTML="";
            donut_ordenados.forEach(
                (donut)=>{
                    tabla_donut.appendChild(nuevoDonut(donut));
                }
            )
    });

// me falta el descendente de precio 

ord_des_precio.addEventListener("click",
    (evento)=>{
        evento.preventDefault();

        //PASAR EL SESSIONSTORAGE A UN ARRAY DE OBJETOS JSON
        const donuts=Object.values(sessionStorage).map(
            (donut)=>{
                return JSON.parse(donut)
            }
        )
        // filtrar
        const donut_filtrados=donuts.filter(
            (donut)=>{
                return donut["precio"]
            }
        )
        // ordenacion
        const donut_ordenados=donut_filtrados.sort(
            (a,b)=>{
                return a["precio"]-b["precio"];
            }
        )
        // vaciar tabla
            tabla_donut.innerHTML="";
            donut_ordenados.forEach(
                (donut)=>{
                    tabla_donut.appendChild(nuevoDonut(donut));
                }
            )

    });



//AÑADIR DATOS INICIALES DE LA BASE DE DATOS AL STORAGE (POR AHORA FICHERO JSON)
//LA PRIMERA VEZ QUE SE INICIE INVENTAR CLAVE PARA RECORDAR QUE HEMOS INICIADO SESION
if(sessionStorage.length===0){
    donuts.forEach(
        (donut)=>{
            sessionStorage.setItem("ID_" + donut["nombre"]
            .toUpperCase()
            .replaceAll(" ", "")
            ,JSON.stringify(donut))
        }
    )
}
    

//AÑADIR LOS DATOS DEL STORAGE PARA MANEJAR LA APLICACION A TRAVES DE ELLOS Y NO TENER QUE USAR SIEMPRE LA BASE DE DATOS
Object.values(sessionStorage).forEach(
	(donuts) => {
		tabla_donut.appendChild(nuevoDonut(JSON.parse(donuts)));
	}
)
