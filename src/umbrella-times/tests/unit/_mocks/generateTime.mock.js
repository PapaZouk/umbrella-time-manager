import {faker} from "@faker-js/faker";

export const generateTimeMock = () => {
    const hours = String(faker.number.int({ min: 0, max: 23})).padStart(2, '0');
    const minutes = String(faker.number.int({ min: 0, max: 59 })).padStart(2, '0');
    return `${hours}:${minutes}`;
}
