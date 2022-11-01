let cotizaciones = []
let recargado = false


function generadorID() {
    return parseInt(Math.random() * 100000)
}

class Cotizacion {
    constructor(item, valorContado, cuotas, valorCuota, precioFinal) {
        this.id = generadorID()
        this.item = document.getElementById("item").value
        this.valorContado = document.getElementById("valorContado").value
        this.cuotas = document.getElementById("cuotas").value
        this.valorCuota = valorCuota
        this.precioFinal = precioFinal
    }
}


function userNuevo() {
    Swal.fire({
        title: '¡Bienvenido!',
        text: 'por favor ingresa tu nombre a continuación',
        input: 'text',
        inputAutoTrim: true,
    }).then((result) => {
        if (result.value) {
            localStorage.setItem('usuario', result.value)
            result.value = usuario
        }
    }).finally((result) => {
        if (!result) {
            localStorage.removeItem("cotizaciones")
            location.reload()
        }
    });
}



const usuario = localStorage.getItem('usuario') || userNuevo()


function miUser() {
    Swal.fire({
        title: 'Hola ' + usuario,
        text: "Bienvenido",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonText: 'cancelar',
        cancelButtonColor: '#d33',
        confirmButtonText: 'No soy ' + usuario,
    }).then((result) => {
        if (result.isConfirmed) {
            userNuevo()
        }
    })

}

const botonUser = document.getElementById("btn-user")
botonUser.addEventListener('click', miUser)

const botonCalcular = document.getElementById("botonCalcular")
botonCalcular.addEventListener("click", calcular)

// const BtonLoadStorage = document.getElementById("botonLoadStorage")
// BtonLoadStorage.addEventListener("click", recuperarCotizaciones)   BOTÓN DE RECARGAR CÁLCULOS ANTERIORES ANULADO


function calcular() {
    let item = document.getElementById("item").value
    let valorContado = document.getElementById("valorContado").value
    if (valorContado == 0) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            text: "Debe ingresar un importe",
        })
    } else {
        let cuotas = document.getElementById("cuotas").value
        precioFinal = parseInt(calculoFinal(valorContado, cuotas))
        valorCuota = parseInt(calculoCuotas(valorContado, cuotas))
        console.log("Deberá abonar", cuotas, "cuotas de", "$", Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))))
        let timerInterval
        Swal.fire({
            timer: 1000,
            didOpen: () => {
                Swal.showLoading()
            },
        }).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: "Deberá abonar\n" + cuotas + " de $" + Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))),
                showConfirmButton: true,
            })
        })

        cotizaciones.push(new Cotizacion(item, valorContado, cuotas, valorCuota, Math.trunc(precioFinal)))
        limpiarlista()
        printCotizaciones()
        mostrarCotizaciones()
    }
}

function calculoFinal(num1, cuotas) {
    switch (cuotas) {
        case "1 cuota":
            return num1
        case "2 cuotas":
            return (num1 * 1.12)
        case "3 cuotas":
            return (num1 * 1.18)
        case "4 cuotas":
            return (num1 * 1.24)
        case "5 cuotas":
            return (num1 * 1.31)
        case "6 cuotas":
            return (num1 * 1.39)
        default:
            return "elegir entre 1 y 6 cuotas"
    }
}

function calculoCuotas(num1, cuotas) {
    switch (cuotas) {
        case "1 cuota":
            return num1
        case "2 cuotas":
            return (num1 * 1.12) / 2
        case "3 cuotas":
            return (num1 * 1.18) / 3
        case "4 cuotas":
            return (num1 * 1.24) / 4
        case "5 cuotas":
            return (num1 * 1.31) / 5
        case "6 cuotas":
            return (num1 * 1.39) / 6
        default:
            return "elegir entre 1 y 6 cuotas"
    }
}


function sumarPreciosFinales() {
    let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.precioFinal, 0)
    console.log("Total a pagar: $", total)
    let printTotal = document.getElementById("totalFinal")
    printTotal.innerHTML = `El total a financiar es $${total}`

}

function sumarValoresCuotas() {
    let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.valorCuota, 0)
    console.log("Monto a pagar mensualmente: $", total)
}


function limpiarlista() {
    let listaLimpia = document.getElementById("cuerpo")
    listaLimpia.innerHTML = ""

}

function printCotizaciones() {
    const cuerpo = document.getElementById("cuerpo")
    cotizaciones.forEach(cotizacion => {
        cuerpo.innerHTML += `<tr>
        <td>•${cotizacion.item}</td>
        <td>${cotizacion.valorContado}</td>
        <td>${cotizacion.cuotas}</td>
        <td>${cotizacion.valorCuota}</td>
        <td>${cotizacion.precioFinal}</td>
        <td><button id="borrar-${cotizacion.id}" class="boton"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>`
    })
    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones))
    sumarPreciosFinales()
    borrarCotizacion()
}

function mostrarCotizaciones() {
    let mostrar = document.getElementById("cotizacionesAnteriores")
    mostrar.className = "container calculador CotizacionesAnterioresShow animate__animated animate__fadeIn animete__delay-3s"
}

function ocultarCotizaciones() {
    let mostrar = document.getElementById("cotizacionesAnteriores")
    mostrar.className = "cotizacionesAnteriores"
}



function recuperarCotizaciones() {
    // if (recargado == false) { BOTÓN DE RECARGAR COMPRAS CÁLCULOS ANTERIORES ANULADO, SE CORRE LA FUNCIÓN AL CARGAR PAGINA
    if (localStorage.cotizaciones) {
        const cotizacionesGuardadas = JSON.parse(localStorage.getItem("cotizaciones"))
        cotizacionesGuardadas.forEach(cotizacion => {
            cotizaciones.push(cotizacion)
        })
        printCotizaciones()
        mostrarCotizaciones()
        recargado = true
    }
    sumarPreciosFinales()
}

// }



function borrarCotizacion() {
    cotizaciones.forEach(cotizacion => {
        document.querySelector(`#borrar-${cotizacion.id}`).addEventListener("click", () => {
            cotizaciones = cotizaciones.filter(
                (cotzFilter) => cotzFilter.id !== cotizacion.id
            );
            limpiarlista()
            printCotizaciones();
        });
    });
}


recuperarCotizaciones()



const btnCheckout =
    document.getElementById("btn-checkout").addEventListener("click", () => {
        Swal.fire({
            timer: 1000,
            didOpen: () => {
                Swal.showLoading()
            },
        }).then(() => {
            Swal.fire({
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
                cancelButtonText: 'cancelar',
                confirmButtonText: 'terminar',
                title: '<img class="logo bg-warning" src="" alt=""> <br>Completa el formulario y nos ponemos en contacto pronto',
                allowOutsideClick: false,
                html: `
                    <div class="container">
                    <div class="row">
                    <div class="col-md-12">
                        <div class="well well-sm">
                        <form class="form-horizontal" action="" method="post">
                        <fieldset>
                            
                            <div class="form-group">
                            <label class="col-md-3 control-label" for="name">Nombre completo</label>
                            <div class="col">
                                <input id="name" name="name" type="text" placeholder="Tu nombre" value ="" class="form-control">
                            </div>
                            </div>
                    
                        
                            <div class="form-group">
                            <label class="col-md-3 control-label" for="email">Tu correo electrónico</label>
                            <div class="col">
                                <input id="email" name="email" type="text" placeholder="Your email" value = "" class="form-control">
                            </div>
                            </div>
                    
                            
                            <div class="form-group">
                            <label class="col-md-3 control-label" for="message">Comentario (opcional)</label>
                            <div class="col ">
                                <textarea class="form-control" id="message" name="message" placeholder="Déjanos tu mensaje" rows="5"></textarea>
                            </div>
                            </div>
                    
                            
                            <div class="form-group">
                            <div class="col-md-12 text-right">
                            </div>
                            </div>
                        </fieldset>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        timer: 1000,
                        didOpen: () => {
                            Swal.showLoading()
                        },
                    }).then(()=>{
                        Swal.fire('Gracias por usar nuestro servicio')
                        ocultarCotizaciones()
                    cotizaciones = []
                    localStorage.setItem("cotizaciones", JSON.stringify(cotizaciones))
                    })
                    
                    
                }
            })
        })



        

    })



