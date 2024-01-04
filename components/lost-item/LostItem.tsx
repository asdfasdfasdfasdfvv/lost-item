import DynamicIcon from 'components/common/DynamicIcon'
import COLORS from 'constants/colors'

interface LostItemProps {
  title: string
  lostDate: string
  lostPlace: string
  subject: string
  hanldeClickLostItem: (e: any) => void
}
export default function LostItem({
  title,
  lostDate,
  lostPlace,
  subject,
  hanldeClickLostItem,
}: LostItemProps) {
  return (
    <li
      onClick={hanldeClickLostItem}
      className="mb-box flex h-28 w-full max-w-80 shrink-0 rounded-lg-plus bg-white px-2 pt-3 shadow-box"
    >
      <div className="flex flex-[7] flex-col ">
        <span className="mb-item line-clamp-1 text-base text-title">
          {title}
        </span>
        <div>
          <span className="line-clamp-2 text-sm text-subtitle ">{subject}</span>
        </div>
      </div>
      <div className="flex-[3] shrink-0 flex-col text-xs text-gray-500">
        <div className="mb-5pxr flex">
          <DynamicIcon
            size={0.8}
            iconName={'FaRegCalendarAlt'}
            color={COLORS.gray}
            luminance={40}
          />
          <span className="ml-4pxr line-clamp-1">{lostDate}</span>
        </div>
        <div className="flex">
          <DynamicIcon
            size={0.8}
            iconName={'FaMapMarker'}
            color={COLORS.gray}
            luminance={40}
          />
          <span className="ml-4pxr line-clamp-4">{lostPlace}</span>
        </div>
      </div>
    </li>
  )
}
