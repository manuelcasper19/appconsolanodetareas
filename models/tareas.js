const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {
    _Listado  = {};
    _completadas = [];
    _pendientes = [];
    _todas = [];

    constructor(){
        this._Listado = {};
    }

    get ListadoArray(){
        const listado = [];        
        Object.keys(this._Listado).forEach( key => {
            
            const tarea = this._Listado[key];
            
            listado.push( tarea );
        });


        return listado;
    }

    crearTarea( desc = ''){
        const tarea = new Tarea( desc );
        this._Listado[tarea.id] = tarea;

    }

    cargarTareas( tareas = [] ) {
        
        tareas.forEach( tarea => {
            this._Listado[tarea.id] = tarea;
        })

        
    }

    borrarTarea( id = ''){
        if( this._Listado[id]) {
            delete  this._Listado[id];
        }
    }

    ListadoTareas(){
        this.clasificarTareas();
  
        this._todas.forEach( tarea => {
            console.log(tarea);
        })
               
    }

    clasificarTareas(){
        
        this._completadas = [];
        this._pendientes = [];
        this._todas = [];
        this.ListadoArray.forEach( (tarea, i ) => {
            const idx = `${ i +1 }.`.green;
            const  { desc, completadoEn } = tarea;
            const estado = ( completadoEn )
                            ? ' :: Completada'.green
                            : ' :: Pendiente'.red
            if( completadoEn ){
                this._completadas.push(`${ idx } ${ desc } ${ completadoEn.green }`);
            }else {
                this._pendientes.push(`${ idx } ${ desc } ${ estado }`);
            }   
            this._todas.push( `${ idx } ${ desc } ${ estado }` )                            
            //console.log( `${ idx } ${ desc } ${ estado }`)                            ;
                            
        })
    }
    ListadoTareasCompletadas( completadas = true ){
        this.clasificarTareas();

        this._completadas.forEach( tarea => {
           console.log( tarea );
           

        })

    }

    listadoTareasPendientes( pendientes = true ){
        this.clasificarTareas();

        this._pendientes.forEach( tarea => {
           console.log( tarea );
           

        })
    }

    toggleCompletas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._Listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.ListadoArray.forEach( tarea => {
            if( !ids.includes(tarea.id)){
                this._Listado[tarea.id].completadoEn = null;
            }
        });
    }

}


module.exports = Tareas;