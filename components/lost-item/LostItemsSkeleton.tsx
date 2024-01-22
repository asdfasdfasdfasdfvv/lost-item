import CircleSkeleton from 'components/common/skeleton/CircleSkeleton'
import LineSkeleton from 'components/common/skeleton/LineSkeleton'

interface Props {
  size?: number
}

const LostItemSkeleton = () => {
  return (
    <div className="mb-box box-border flex h-28 w-full shrink-0 rounded-lg-plus bg-white px-2 pt-3 shadow-box">
      <CircleSkeleton className="mr-5pxr h-25pxr w-25pxr" />
      <div className="h-14 w-full">
        <LineSkeleton className="h-4 w-full" />
        <LineSkeleton className="h-4 w-1/2" />
        <LineSkeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default function LostItemsSkeleton({ size = 20 }: Props) {
  return (
    <div className="relative box-border w-full">
      {Array.from({ length: size }, (_, key) => (
        <LostItemSkeleton key={key} />
      ))}
    </div>
  )
}
