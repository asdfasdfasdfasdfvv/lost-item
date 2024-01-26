import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd', { locale: ko })
}
