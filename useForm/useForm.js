import { useState } from 'react';

export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState( initialState );

    const reset = () => {
        setValues( initialState );
    };

    const handleInputChange = ({ target }) => { // extraigo el elemento target del evento
        setValues({
            ...values,
            [target.name]: target.value
        });
    };
    return [ values, handleInputChange, reset ];
}
