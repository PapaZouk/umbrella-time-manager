export function calculateTotalSickLeaveDays(times) {
    const sickLeaveDays = times.filter((time) => time.isSickLeave);
    return sickLeaveDays.length;
}
