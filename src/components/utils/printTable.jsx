export default function printTable() {
    const table = document.getElementById('table-content');

    const printWindow = window.open('', '', 'heigh=600, width=800');

    printWindow?.document.write('<html><head><title>Godziny pracy</title>');
    printWindow?.document.write('<style>table { width: 100%; border-collapse: collapse; } th, td { boarder: 1px solid black; padding: 8px; text-align: center; }</style>')
    printWindow?.document.write('</head><body>');
    printWindow?.document.write(table?.outerHTML);
    printWindow?.document.write('</body></html>');

    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
}