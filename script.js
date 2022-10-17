

const cotizaciones = [] 


class Cotizacion{
    constructor(item, valorContado, cuotas, valorCuota, precioFinal){
    this.item = item
    this.valorContado = valorContado
    this.cuotas = cuotas
    this.valorCuota = valorCuota
    this.precioFinal = precioFinal
}
}

function calcular(){
    let confirmar
    do{
        let item = prompt("Ingrese que es lo que desea comprar")

        let valorContado = parseFloat(prompt("ingresa el valor en 1 pago de su producto."))
        if (isNaN(valorContado)){
            alert("Debe asignar un valor numerico")
        }
        else{
        let cuotas = parseFloat(prompt("Ingresa la cantidad de cuotas de 1 a 6 pagos."))
        if ((cuotas > 6)||(isNaN(cuotas))){
            alert("Debe elegir una cantidad de cuotas entre 1 y 6")
        }
        else{
        precioFinal = parseInt(calculoFinal(valorContado, cuotas))
        valorCuota = parseInt(calculoCuotas(valorContado,cuotas))
        console.log("Debera abonar", cuotas,"cuotas de", "$", Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))))
        alert("Debera abonar\n" + cuotas +" cuotas de" + " $" + Math.trunc(parseFloat(calculoCuotas(valorContado, cuotas))))
        }
        cotizaciones.push(new Cotizacion(item, valorContado, cuotas, valorCuota, Math.trunc(precioFinal)))
        }
        confirmar = confirm("¿Desea realizar otra operacion?")
        }  
        
        while (confirmar);
    
}

function calculoFinal(num1,cuotas){
    switch(cuotas){
        case 1:
            return num1
        case 2:
            return (num1 * 1.12)
        case 3:
            return (num1 * 1.18)
        case 4:
            return (num1 * 1.24)
        case 5:
            return (num1 * 1.31)
        case 6:
            return (num1 * 1.39)
        default:
            return "elegir entre 1 y 6 pagos"
    }
}

function calculoCuotas(num1,cuotas){
    switch(cuotas){
        case 1:
            return num1
        case 2:
            return (num1 * 1.12)/2
        case 3:
            return (num1 * 1.18)/3
        case 4:
            return (num1 * 1.24)/4
        case 5:
            return (num1 * 1.31)/5
        case 6:
            return (num1 * 1.39)/6
        default:
            return "elegir entre 1 y 6 pagos"
    }
}

function consultarCotizaciones(){
    console.table(cotizaciones)
}

function borrarUltimo(){
    alert("se eliminó: " + cotizaciones[cotizaciones.length - 1].item);
    console.log("se eliminó:" , cotizaciones[cotizaciones.length - 1]);
    cotizaciones.pop()
    
}


function sumarPreciosFinales(){
let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.precioFinal , 0)
    console.log ("Total a pagar: $", total)
}

function sumarValoresCuotas(){
        let total = cotizaciones.reduce((acumulador, cotizacion) => acumulador + cotizacion.valorCuota , 0)
            console.log ("Monto a pagar mensualmente: $", total)
}


