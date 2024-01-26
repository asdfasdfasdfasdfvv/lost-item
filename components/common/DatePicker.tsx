import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { FormKeys, InputData } from 'types/form'
import type { DateInputStyle } from 'types/style/common'
import { formatDate } from 'utils/date'
import tw from 'utils/twMergeObjects'

import { RadixButton } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface Props {
  title: string
  style?: DateInputStyle
  name: string
  onSelect: ({ inputData }: { inputData: InputData<FormKeys> }) => void
}
const twStyles = {
  wrapper: 'w-full'
}

const DatePicker = React.forwardRef<HTMLDivElement, Props>(
  ({ title, style, onSelect, name }, ref) => {
    const st = tw<DateInputStyle>(twStyles, style)

    const [date, setDate] = React.useState<Date>()
    const [popoverOpen, setPopoverOpen] = React.useState(false)

    const handleUpdateDate = (selectedDay: Date | undefined) => {
      if (selectedDay) {
        const formatedDay = formatDate(selectedDay)
        setDate(selectedDay)
        onSelect({ inputData: { name, value: formatedDay } })
        setPopoverOpen(false)
      }
    }
    return (
      <div className={st.wrapper}>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <RadixButton
              onClick={() => setPopoverOpen(true)}
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'yyyy-MM-dd', { locale: ko })
              ) : (
                <span>{title}</span>
              )}
            </RadixButton>
          </PopoverTrigger>
          <PopoverContent ref={ref} className="w-auto p-0">
            <Calendar
              locale={ko}
              mode="single"
              selected={date}
              onSelect={handleUpdateDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
