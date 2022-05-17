require('colors');


const mostraMenu = () => {
    console.clear();

    return new Promise( resolve => {
        console.log('========================================'.green);
        console.log('Seleccione una opción'.green);
        console.log('========================================\n'.green);
    
        console.log(`${ '1)'.green } Crear tarea`);
        console.log(`${ '2)'.green } Listar tareas`);
        console.log(`${ '3)'.green } Listar tareas Completas`);
        console.log(`${ '4)'.green } Listar tareas Pendientes`);
        console.log(`${ '5)'.green } Completar tarea(s)`);
        console.log(`${ '6)'.green } Borrar tarea`);
        console.log(`${ '0)'.green } Salir\n`);
    
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question('Seleccione una opción\n', (opt) => {
            
            readLine.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise( resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readLine.question(`\nPresione ${ 'Enter'.green } para contnuar\n`, () => {
            
            readLine.close();
            resolve();
        })

    })
   

}



module.exports = {
    mostraMenu,
    pausa
}