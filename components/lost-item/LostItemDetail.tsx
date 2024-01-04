'use client'
import { useQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import Button from 'components/common/Button'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'

interface DetailProps {
  label: string
  value: string
}

const Detail: React.FC<DetailProps> = ({ label, value }) => (
  <dl className="flex items-center justify-start">
    <dt className="mr-5pxr font-bold">{label}:</dt> <dd>{value}</dd>
  </dl>
)

interface LostItemDetails {
  lostProductName: string
  articleId: string
  lostDate: string
  lostHour: string
  lostPlace: string
  productClassificationName: string
  lostStateName: string
  unique: string
  lostLocationName: string
  lostSubject: string
  organizationId: string
  organizationName: string
  telephoneNumber: string
  lostPlaceSectionName: string
  lostFilePathImage: string
}

interface LostItemPageProps {
  lostItemId: Pick<LostItemDetails, 'articleId'>
}

const LostItemDetail: React.FC<LostItemPageProps> = ({
  lostItemId
}: LostItemPageProps) => {
  const setModal = useSetRecoilState(modalContentState)
  const { data, isLoading } = useQuery<LostItemDetails>({
    queryKey: ['lostItemDetial'],
    queryFn: async () => {
      console.log(lostItemId)
      const res = await fetch(`/v1/lost/items/${lostItemId}`, { method: 'GET' })
      const { body } = await res.json()

      return { ...body } as LostItemDetails
    }
  })
  if (isLoading) {
    return <div>Is Loading...</div>
  }
  if (!data) {
    return <div>No Result</div>
  }
  const {
    lostProductName,
    lostFilePathImage,
    articleId,
    lostDate,
    lostPlace,
    lostPlaceSectionName,
    organizationName,
    lostStateName,
    telephoneNumber
  } = data

  return (
    <div className="box-border w-375pxr bg-white p-5pxr">
      <h1 className="font-black">분실물 상세 정보</h1>
      <div className="w-full">
        <Detail label="습득물명" value={lostProductName} />
        <Detail label="관리번호" value={articleId} />
        <Detail label="습득일" value={lostDate} />
        <Detail label="습득장소" value={lostPlace} />
        <Detail label="물품분류" value={lostPlaceSectionName} />
        <Detail label="보관장소" value={organizationName} />
        <Detail label="유실물상태" value={lostStateName} />
        <Detail label="보관장소연락처" value={telephoneNumber} />
        <span>(운영시간: 평일 9시 ~ 18시, 점심시간: 12시 ~ 13시)</span>

        <div
          style={{
            width: '100%',
            height: '200px',
            position: 'relative'
          }}>
          <Image
            src={lostFilePathImage}
            alt="lost-item_detail"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
        </div>
      </div>
      <Button
        title="확인"
        handler={() => {
          setModal(null)
        }}
      />
    </div>
  )
}
export default LostItemDetail
