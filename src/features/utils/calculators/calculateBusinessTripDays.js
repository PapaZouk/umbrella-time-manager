export function calculateBusinessTripDays(times) {
    const businessTripDays = times.filter((time) => time.isBusinessTrip);
    return businessTripDays.length;
}
