# useForm hook

Usage example:
```
    const initialFormExample = {
        name: '',
        age: 0,
        email: ''
    };
    const [ values, handleInputChange, reset ] = useForm(initialFormExample);
```