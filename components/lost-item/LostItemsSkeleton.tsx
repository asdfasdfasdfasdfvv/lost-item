import CircleSkeleton from 'components/common/skeleton/CircleSkeleton'
import LineSkeleton from 'components/common/skeleton/LineSkeleton'

interface Props {
  size?: number
}

const LostItemSkeleton = () => {
  return (
    <div className="mb-5 flex h-28 w-full items-center bg-gray-100 px-5">
      <CircleSkeleton className="mr-5pxr h-25pxr w-25pxr" />
      <div className="h-14 w-full">
        <LineSkeleton className="h-4 w-full" />
        <LineSkeleton className="h-4 w-1/2" />
        <LineSkeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default function LostItemsSkeleton({ size = 10 }: Props) {
  return (
    <div className="w-full max-w-80">
      {Array.from({ length: size }, (_, key) => (
        <LostItemSkeleton key={key} />
      ))}
    </div>
  )
}
