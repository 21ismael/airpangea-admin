export default function formattedDate(date) {
    // Crear un objeto Date a partir de la cadena de fecha
    var fechaObj = new Date(date);
    
    // Obtener las partes de la fecha y hora
    var dia = fechaObj.getDate();
    var mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el mes correcto
    var año = fechaObj.getFullYear();
    var horas = fechaObj.getHours();
    var minutos = fechaObj.getMinutes();

    // Agregar ceros iniciales si es necesario
    mes = mes < 10 ? '0' + mes : mes;
    dia = dia < 10 ? '0' + dia : dia;
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;

    // Construir la cadena de fecha y hora formateada
    var fechaFormateada = dia + '-' + mes + '-' + año + ' ' + horas + ':' + minutos;

    return fechaFormateada;
}
