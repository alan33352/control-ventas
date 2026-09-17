/* =========================================
   NOMBRES PREDETERMINADOS
========================================= */

const VENDEDORES_INICIALES = [
    "Lalo",
    "Alan",
    "Gaby",
    "Tati",
    "Benja"
];

const PRODUCTOS_INICIALES = [
    "Tortafrita",
    "Sandwiches de miga",
    "Ensaladas de frutas",
    "Bandejas de alfajor / cubanitos",
    "Bollos",
    "Café",
    "Bon o Bon"
];


/* =========================================
   CLAVE NUEVA
   Esto evita cargar los datos viejos.
========================================= */

const CLAVE_CONFIG =
    "control_ambulantes_nuevo_01";

const CLAVE_DIAS =
    "control_ambulantes_dias_nuevo_01";


/* =========================================
   VARIABLES
========================================= */

let vendedores =
    VENDEDORES_INICIALES.slice();

let productos =
    PRODUCTOS_INICIALES.slice();


/* =========================================
   ELEMENTOS
========================================= */

const fecha =
    document.getElementById("fecha");

const encabezado =
    document.getElementById("encabezado");

const cuerpo =
    document.getElementById("cuerpo");

const guardar =
    document.getElementById("guardar");

const agregarVendedor =
    document.getElementById("agregarVendedor");

const eliminarVendedor =
    document.getElementById("eliminarVendedor");

const agregarProducto =
    document.getElementById("agregarProducto");

const eliminarProducto =
    document.getElementById("eliminarProducto");

const borrarDatos =
    document.getElementById("borrarDatos");


/* =========================================
   FECHA
========================================= */

function obtenerFechaHoy() {

    const hoy =
        new Date();

    const año =
        hoy.getFullYear();

    const mes =
        String(
            hoy.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            hoy.getDate()
        ).padStart(2, "0");

    return (
        año +
        "-" +
        mes +
        "-" +
        dia
    );
}


fecha.value =
    obtenerFechaHoy();


/* =========================================
   CARGAR CONFIGURACIÓN
========================================= */

function cargarConfiguracion() {

    const guardado =
        localStorage.getItem(
            CLAVE_CONFIG
        );

    if (!guardado) {

        vendedores =
            VENDEDORES_INICIALES.slice();

        productos =
            PRODUCTOS_INICIALES.slice();

        guardarConfiguracion();

        return;
    }


    try {

        const datos =
            JSON.parse(
                guardado
            );


        if (
            Array.isArray(datos.vendedores) &&
            datos.vendedores.length > 0
        ) {

            vendedores =
                datos.vendedores.slice();

        }


        if (
            Array.isArray(datos.productos) &&
            datos.productos.length > 0
        ) {

            productos =
                datos.productos.slice();

        }

    } catch (error) {

        vendedores =
            VENDEDORES_INICIALES.slice();

        productos =
            PRODUCTOS_INICIALES.slice();

        guardarConfiguracion();

    }

}


/* =========================================
   GUARDAR CONFIGURACIÓN
========================================= */

function guardarConfiguracion() {

    const datos = {

        vendedores:
            vendedores,

        productos:
            productos

    };


    localStorage.setItem(
        CLAVE_CONFIG,
        JSON.stringify(datos)
    );

}


/* =========================================
   CLAVE DEL DÍA
========================================= */

function obtenerClaveDia() {

    return (
        CLAVE_DIAS +
        "_" +
        fecha.value
    );

}


/* =========================================
   GUARDAR DATOS DEL DÍA
========================================= */

function guardarDatos() {

    /*
        Primero guardamos los nombres
    */

    vendedores = [];


    document
        .querySelectorAll(
            ".nombre-vendedor"
        )
        .forEach(
            function(input) {

                vendedores.push(
                    input.value.trim()
                );

            }
        );


    productos = [];


    document
        .querySelectorAll(
            ".nombre-producto"
        )
        .forEach(
            function(input) {

                productos.push(
                    input.value.trim()
                );

            }
        );


    guardarConfiguracion();


    /*
        Guardamos cantidades
    */

    const cantidades = [];


    document
        .querySelectorAll(
            ".cantidad"
        )
        .forEach(
            function(input) {

                cantidades.push(
                    Number(
                        input.value
                    ) || 0
                );

            }
        );


    const datos = {

        vendedores:
            vendedores,

        productos:
            productos,

        cantidades:
            cantidades

    };


    localStorage.setItem(

        obtenerClaveDia(),

        JSON.stringify(
            datos
        )

    );


    alert(
        "Datos guardados correctamente."
    );

}


/* =========================================
   CARGAR DATOS DEL DÍA
========================================= */

function cargarDatosDia() {

    const guardado =
        localStorage.getItem(
            obtenerClaveDia()
        );


    if (!guardado) {

        crearTabla();

        return;

    }


    try {

        const datos =
            JSON.parse(
                guardado
            );


        /*
            Recuperamos nombres
        */

        if (
            Array.isArray(
                datos.vendedores
            ) &&
            datos.vendedores.length > 0
        ) {

            vendedores =
                datos.vendedores.slice();

        }


        if (
            Array.isArray(
                datos.productos
            ) &&
            datos.productos.length > 0
        ) {

            productos =
                datos.productos.slice();

        }


        guardarConfiguracion();


        crearTabla();


        /*
            Recuperamos cantidades
        */

        if (
            Array.isArray(
                datos.cantidades
            )
        ) {

            const inputs =
                document.querySelectorAll(
                    ".cantidad"
                );


            datos.cantidades.forEach(
                function(
                    valor,
                    indice
                ) {

                    if (
                        inputs[indice]
                    ) {

                        inputs[indice].value =
                            valor;

                    }

                }
            );

        }

    } catch (error) {

        crearTabla();

    }

}


/* =========================================
   CREAR TABLA
========================================= */

function crearTabla() {

    encabezado.innerHTML = "";

    cuerpo.innerHTML = "";


    /*
        Primera columna
    */

    const primeraCabecera =
        document.createElement(
            "th"
        );


    primeraCabecera.textContent =
        "Mercadería";


    encabezado.appendChild(
        primeraCabecera
    );


    /*
        VENDEDORES
    */

    vendedores.forEach(
        function(
            vendedor,
            indice
        ) {

            const th =
                document.createElement(
                    "th"
                );


            const input =
                document.createElement(
                    "input"
                );


            input.type =
                "text";


            input.className =
                "nombre-vendedor";


            input.value =
                vendedor;


            input.dataset.indice =
                indice;


            th.appendChild(
                input
            );


            encabezado.appendChild(
                th
            );

        }
    );


    /*
        PRODUCTOS
    */

    productos.forEach(
        function(
            producto,
            indiceProducto
        ) {

            const tr =
                document.createElement(
                    "tr"
                );


            const tdProducto =
                document.createElement(
                    "td"
                );


            const inputProducto =
                document.createElement(
                    "input"
                );


            inputProducto.type =
                "text";


            inputProducto.className =
                "nombre-producto";


            inputProducto.value =
                producto;


            inputProducto.dataset.indice =
                indiceProducto;


            tdProducto.appendChild(
                inputProducto
            );


            tr.appendChild(
                tdProducto
            );


            vendedores.forEach(
                function() {

                    const td =
                        document.createElement(
                            "td"
                        );


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type =
                        "number";


                    input.min =
                        "0";


                    input.value =
                        "0";


                    input.className =
                        "cantidad";


                    td.appendChild(
                        input
                    );


                    tr.appendChild(
                        td
                    );

                }
            );


            cuerpo.appendChild(
                tr
            );

        }
    );


    activarEdicion();

}


/* =========================================
   EDITAR NOMBRES
========================================= */

function activarEdicion() {

    document
        .querySelectorAll(
            ".nombre-vendedor"
        )
        .forEach(
            function(input) {

                input.addEventListener(
                    "change",
                    function() {

                        const indice =
                            Number(
                                input.dataset.indice
                            );


                        vendedores[
                            indice
                        ] =
                            input.value.trim();


                        if (
                            vendedores[
                                indice
                            ] === ""
                        ) {

                            vendedores[
                                indice
                            ] =
                                VENDEDORES_INICIALES[
                                    indice
                                ] ||
                                "Vendedor";

                            input.value =
                                vendedores[
                                    indice
                                ];

                        }


                        guardarConfiguracion();

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".nombre-producto"
        )
        .forEach(
            function(input) {

                input.addEventListener(
                    "change",
                    function() {

                        const indice =
                            Number(
                                input.dataset.indice
                            );


                        productos[
                            indice
                        ] =
                            input.value.trim();


                        if (
                            productos[
                                indice
                            ] === ""
                        ) {

                            productos[
                                indice
                            ] =
                                PRODUCTOS_INICIALES[
                                    indice
                                ] ||
                                "Producto";

                            input.value =
                                productos[
                                    indice
                                ];

                        }


                        guardarConfiguracion();

                    }
                );

            }
        );

}


/* =========================================
   AGREGAR VENDEDOR
========================================= */

agregarVendedor.addEventListener(
    "click",
    function() {

        const nombre =
            prompt(
                "Nombre del nuevo vendedor:"
            );


        if (
            nombre === null
        ) {

            return;

        }


        if (
            nombre.trim() === ""
        ) {

            alert(
                "Escribí un nombre."
            );

            return;

        }


        guardarDatosSilencioso();


        vendedores.push(
            nombre.trim()
        );


        guardarConfiguracion();


        crearTabla();


        alert(
            "Vendedor agregado."
        );

    }
);


/* =========================================
   ELIMINAR VENDEDOR
========================================= */

eliminarVendedor.addEventListener(
    "click",
    function() {

        if (
            vendedores.length <= 1
        ) {

            alert(
                "Debe quedar al menos un vendedor."
            );

            return;

        }


        let lista =
            "";


        vendedores.forEach(
            function(
                nombre,
                indice
            ) {

                lista +=
                    (
                        indice + 1
                    ) +
                    ". " +
                    nombre +
                    "\n";

            }
        );


        const respuesta =
            prompt(

                "¿Qué vendedor querés eliminar?\n\n" +
                lista +
                "\nEscribí el número."

            );


        if (
            respuesta === null
        ) {

            return;

        }


        const numero =
            Number(
                respuesta
            );


        if (
            !Number.isInteger(
                numero
            ) ||
            numero < 1 ||
            numero > vendedores.length
        ) {

            alert(
                "Número inválido."
            );

            return;

        }


        const indice =
            numero - 1;


        if (
            !confirm(
                "¿Eliminar a " +
                vendedores[indice] +
                "?"
            )
        ) {

            return;

        }


        vendedores.splice(
            indice,
            1
        );


        guardarConfiguracion();


        crearTabla();


        alert(
            "Vendedor eliminado."
        );

    }
);


/* =========================================
   AGREGAR PRODUCTO
========================================= */

agregarProducto.addEventListener(
    "click",
    function() {

        const nombre =
            prompt(
                "Nombre del nuevo producto:"
            );


        if (
            nombre === null
        ) {

            return;

        }


        if (
            nombre.trim() === ""
        ) {

            alert(
                "Escribí un producto."
            );

            return;

        }


        guardarDatosSilencioso();


        productos.push(
            nombre.trim()
        );


        guardarConfiguracion();


        crearTabla();


        alert(
            "Producto agregado."
        );

    }
);


/* =========================================
   ELIMINAR PRODUCTO
========================================= */

eliminarProducto.addEventListener(
    "click",
    function() {

        if (
            productos.length <= 1
        ) {

            alert(
                "Debe quedar al menos un producto."
            );

            return;

        }


        let lista =
            "";


        productos.forEach(
            function(
                nombre,
                indice
            ) {

                lista +=
                    (
                        indice + 1
                    ) +
                    ". " +
                    nombre +
                    "\n";

            }
        );


        const respuesta =
            prompt(

                "¿Qué producto querés eliminar?\n\n" +
                lista +
                "\nEscribí el número."

            );


        if (
            respuesta === null
        ) {

            return;

        }


        const numero =
            Number(
                respuesta
            );


        if (
            !Number.isInteger(
                numero
            ) ||
            numero < 1 ||
            numero > productos.length
        ) {

            alert(
                "Número inválido."
            );

            return;

        }


        const indice =
            numero - 1;


        if (
            !confirm(
                "¿Eliminar " +
                productos[indice] +
                "?"
            )
        ) {

            return;

        }


        productos.splice(
            indice,
            1
        );


        guardarConfiguracion();


        crearTabla();


        alert(
            "Producto eliminado."
        );

    }
);


/* =========================================
   BORRAR DATOS DEL DÍA
========================================= */

borrarDatos.addEventListener(
    "click",
    function() {

        if (
            !confirm(
                "¿Borrar las cantidades de este día?"
            )
        ) {

            return;

        }


        localStorage.removeItem(
            obtenerClaveDia()
        );


        crearTabla();


        alert(
            "Datos del día borrados."
        );

    }
);


/* =========================================
   FUNCIÓN SILENCIOSA
========================================= */

function guardarDatosSilencioso() {

    const inputs =
        document.querySelectorAll(
            ".cantidad"
        );


    const cantidades =
        [];


    inputs.forEach(
        function(input) {

            cantidades.push(
                Number(
                    input.value
                ) || 0
            );

        }
    );


    const datos = {

        vendedores:
            vendedores.slice(),

        productos:
            productos.slice(),

        cantidades:
            cantidades

    };


    localStorage.setItem(

        obtenerClaveDia(),

        JSON.stringify(
            datos
        )

    );

}


/* =========================================
   CAMBIO DE FECHA
========================================= */

fecha.addEventListener(
    "change",
    function() {

        cargarDatosDia();

    }
);


/* =========================================
   INICIO
========================================= */

cargarConfiguracion();

crearTabla();

cargarDatosDia();