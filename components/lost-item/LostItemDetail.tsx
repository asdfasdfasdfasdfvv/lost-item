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

export interface LostItemDetails {
  id: string
  articleId: string
  custodyStatusName: string
  depositPlace: string
  filePathImage: string
  foundHour: string // HH:mm:ss 형식
  foundPlace: string
  productName: string
  serialNumber: string
  foundDate: string // yyyy-MM-dd 형식
  foundKeepOrganizationSectionName: string | null // 'null'이 가능한 필드
  organizationId: string
  organizationName: string
  productClassification: string
  telephone: string
  unique: string
}

interface LostItemPageProps {
  lostItemId: string
}

const LostItemDetail: React.FC<LostItemPageProps> = ({
  lostItemId
}: LostItemPageProps) => {
  const setModal = useSetRecoilState(modalContentState)
  const { data, isLoading } = useQuery<LostItemDetails>({
    queryKey: ['lostItemDetail'],
    queryFn: async () => {
      const res = await fetch(`/v1/founds/${lostItemId}`, {
        method: 'GET'
      })
      const { data } = await res.json()
      return { ...data } as LostItemDetails
    }
  })
  if (isLoading) {
    return <div>Is Loading...</div>
  }
  if (!data) {
    return <div>No Result</div>
  }
  const {
    productName,
    filePathImage,
    articleId,
    foundDate,
    foundPlace,
    productClassification,
    organizationName,
    custodyStatusName,
    telephone
  } = data

  return (
    <div className="box-border w-375pxr bg-white p-5pxr">
      <h1 className="font-black">분실물 상세 정보</h1>
      <div className="w-full">
        <Detail label="습득물명" value={productName} />
        <Detail label="관리번호" value={articleId} />
        <Detail label="습득일" value={foundDate} />
        <Detail label="습득장소" value={foundPlace} />
        <Detail label="물품분류" value={productClassification} />
        <Detail label="보관장소" value={organizationName} />
        <Detail label="유실물상태" value={custodyStatusName} />
        <Detail label="보관장소연락처" value={telephone} />
        <span>(운영시간: 평일 9시 ~ 18시, 점심시간: 12시 ~ 13시)</span>

        <div
          style={{
            width: '100%',
            height: '200px',
            position: 'relative'
          }}>
          <Image
            src={filePathImage}
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
        onClick={() => {
          setModal(null)
        }}
      />
    </div>
  )
}
export default LostItemDetail
