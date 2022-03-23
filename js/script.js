const form = document.getElementById("form");
const fields = document.querySelectorAll("[required]");


function validateField(field) {

    function verifyErrors() {

        let foundError = false;

        for( const error in field.validity ) {

            if(field.validity[error] && !field.validity.valid) {

                foundError = error;
            }
        }

        return foundError;
    }


    function customMessage(typeError) {

        const messages = {
            text: {
                valueMissing: "Campo Obrigatório"
            },

            email: {
                valueMissing: "Campo Obrigatório",
                typeMismatch: "Insira um e-mail válido"
            },

            password: {
                valueMissing: "Campo Obrigatório"
            }
        }

        return messages[field.type][typeError];
    }

    function setCustomMessage(message) {

        const formControl = field.parentNode;
        const small = field.parentNode.querySelector("small");

        if(message) {
            formControl.classList.remove("success");     
            formControl.classList.add("error");

            small.innerText = message;
        }

        else {
            formControl.classList.remove("error");
            formControl.classList.add("success");

            small.innerText = "";
        }
    }

    return function() {

        const error = verifyErrors();

        if(error) {  
            const message = customMessage(error);
            setCustomMessage(message);
        }
    
        else {
            setCustomMessage();
        }
    }
}


function customValidation(event) {

    const field = event.target;
    const validate = validateField(field);

    validate();
}


for( field of fields ) {
    field.addEventListener("invalid", event => {
        
        // Eliminating bubble
        event.preventDefault();
        customValidation(event);
    });

    field.addEventListener("blur", customValidation);
}


form.addEventListener("submit", event => {});