import { useState } from 'react';

const useInput = (validateValue,val) => {
    const [enteredValue, setEnterdValue] = useState(val);
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event) => {
        setEnterdValue(event.target.value); 
    };

    const inputBlurHandler = (event) => {
        setIsTouched(true);
    };

    const reset = () =>{
        setEnterdValue('');
        setIsTouched(false); 
    };

    return {
        value: enteredValue, 
        isValid: valueIsValid,
        hasError, 
        valueChangeHandler, 
        inputBlurHandler,
        reset
    };
};
export default useInput; 