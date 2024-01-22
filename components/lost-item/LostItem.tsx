import DynamicIcon from 'components/common/DynamicIcon'
import COLORS from 'constants/colors'

interface LostItemProps {
  title: string
  lostDate: string
  lostPlace: string
  subject: string
  depositPlace: string
  handleClickLostItem: (e: any) => void
}
export default function LostItem({
  title,
  lostDate,
  lostPlace,
  subject,
  depositPlace,
  handleClickLostItem
}: LostItemProps) {
  return (
    <li
      onClick={handleClickLostItem}
      className="mb-box box-border flex h-28 w-full shrink-0 rounded-lg-plus bg-white px-2 pt-3 shadow-box">
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
        <div className="flex">
          <DynamicIcon
            size={0.8}
            iconName={'FaMapMarker'}
            color={COLORS.gray}
            luminance={40}
          />
          <span className="ml-4pxr line-clamp-4">{depositPlace}</span>
        </div>
      </div>
    </li>
  )
}
