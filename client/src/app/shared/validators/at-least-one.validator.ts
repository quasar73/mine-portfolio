import {
    ValidatorFn,
    FormGroup,
    ValidationErrors,
    AbstractControl,
} from '@angular/forms';

export function AtLeastOneValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const controls = (group as FormGroup).controls;

        if (controls) {
            const theOne = Object.keys(controls).findIndex(
                (key) => controls[key].value !== '',
            );

            if (theOne === -1) {
                return {
                    atLeastOneRequired: {
                        text: 'At least one should be not empty',
                    },
                };
            }
        }
        return null;
    };
}
