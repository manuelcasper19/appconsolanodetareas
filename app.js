require('colors');
const { guardarDB, leerArchivo } = require('./helpers/guardarDB');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');




console.clear();

const main = async () => {
    
    let op = '';
    const tareas = new Tareas();

    const leerTareas = leerArchivo();

    

    if( leerTareas ){
         tareas.cargarTareas( leerTareas );

    }
    do {
        
        op = await inquirerMenu();
              
        switch (op) {
            case '1':
                const desc = await leerInput('descrip: ');
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.ListadoTareas();
            break;
            case '3':
                tareas.ListadoTareasCompletadas();
            break;
            case '4':
                tareas.listadoTareasPendientes();
            break;
            case '5':
                const ids = await mostrarListadoCheckList( tareas.ListadoArray );
                            tareas.toggleCompletas( ids );
                
            break;            

            case '6':
                const id = await listadoTareasBorrar( tareas.ListadoArray );

                if( id !== '0' ){
                    const ok = await confirmar('Estás seguro que deseas borar la tarea');
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente'.blue);
                    }
                }

            break;
        
        }
      
    guardarDB( tareas.ListadoArray );    
    await pausa();
 

    }while( op !== '7')

}

main();