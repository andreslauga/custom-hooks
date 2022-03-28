import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    
    useEffect(() => {
        setState({data: null, loading:true, error: null})
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setTimeout(() => {
                    if ( isMounted.current ) {
                        setState({
                            loading: false,
                            error: null,
                            data: data
                        });
                    } else {
                        console.log("setState no se llamó porque se desmontó el componente");
                    }
                }, 4000);
            }).catch( () => {
                setState({
                    loading: false,
                    error: 'No se pudo cargar la info.',
                    data: null
                });
            });
        
    }, [url]);

    return state;
}

/**
 * APUNTES:
 * 
 * useRef mantiene una referencia del nodo del DOM donde está montado un componente. En este caso modificamos el valor current del nodo en base a si el componente
 * está o no montado, usando true por defecto (cuando se renderiza el componente), y seteándolo en false con el useEffect cuando lo desmontamos.
 * Usando este valor como condicional es que cambiamos el estado de nuestro componente o no. En este caso en particular, esto nos permite evitar que se modifique
 * el estado de nuestro componente cuando el mismo está desmontado. Previniendo así errores de fuga de memoria y crashes en nuestra app.
 * Por ejemplo cuando el usuario estaba esperando la respuesta de algún servicio que tardó demasiado, se arrepintió y cerró la app o cambió de pantalla inesperadamente.
 * 
 */
