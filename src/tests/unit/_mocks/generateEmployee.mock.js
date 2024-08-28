import {faker} from "@faker-js/faker";
import {generateTimeMock} from "./generateTime.mock";

export const generateEmployeeMock = (override = {}) => ({
    name: override.name || faker.person.firstName(),
    surname: override.surname || faker.person.lastName(),
    workingHours: override.workingHours || `${generateTimeMock()}-${generateTimeMock()}`,
    annualLeave: override.annualLeave || 21,
});
