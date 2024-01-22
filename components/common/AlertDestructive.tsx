import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import DynamicIcon from './DynamicIcon'

interface Props {
  title?: string
  errorMessage?: string | null
}
export function AlertDestructive({ title = 'Error', errorMessage }: Props) {
  return (
    <Alert variant="destructive" className="max-w-375pxr bg-bgGray">
      <DynamicIcon size={2} color="#bdb7ba" iconName="FaExclamationTriangle" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{errorMessage && errorMessage}</AlertDescription>
    </Alert>
  )
}
