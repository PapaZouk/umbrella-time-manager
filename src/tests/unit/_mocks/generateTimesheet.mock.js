import {faker} from "@faker-js/faker";
import {generateTimeMock} from "./generateTime.mock";

export const generateTimesheetMock = (override = {}) => ({
    day: override.day || faker.number.int({ min: 1, max: 31 }),
    month: override.month || `${faker.date.past().getFullYear()}-${faker.number.int({ min: 1, max: 12 })}`,
    checkIn: override.checkIn || generateTimeMock(),
    checkOut: override.checkOut || generateTimeMock(),
    balance: override.balance || faker.number.int({ min: 0, max: 999 }),
    isHoliday: override.isHoliday || false,
});
