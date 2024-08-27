import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export function dateFormatter(dateString) {
    const [year, month] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    return format(date, 'LLLL yyyy', { locale: pl });
}