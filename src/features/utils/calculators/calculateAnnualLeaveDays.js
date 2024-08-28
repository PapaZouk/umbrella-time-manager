export function calculateAnnualLeaveDays(times) {
    const annualLeaves = times.filter((time) => time.isHoliday);
    return annualLeaves.length;
}