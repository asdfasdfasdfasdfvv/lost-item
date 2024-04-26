'use client'
import { useQuery } from '@tanstack/react-query'
import { modalContentState } from 'atom/modalAtom'
import Button from 'components/common/Button'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'

import LoadingComponent from '../common/Loading'

interface DetailProps {
  label: string
  value?: string
  children?: React.ReactNode
}

const Detail: React.FC<DetailProps> = ({ label, value, children }) => (
  <dl className="flex items-center justify-start">
    <dt className="mr-5pxr font-bold">{label}:</dt> <dd>{children || value}</dd>
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

  const { data, isLoading, isRefetching } = useQuery<LostItemDetails>({
    queryKey: ['lostItemDetail'],
    queryFn: async () => {
      const res = await fetch(`/v1/founds/${lostItemId}`, {
        method: 'GET'
      })
      const { data } = await res.json()
      return { ...data } as LostItemDetails
    }
  })

  if (isLoading || isRefetching) {
    return <LoadingComponent />
  }
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="box-border rounded-lg bg-white p-10pxr">
        <h1 className="font-black">아직 상세 정보가 등록되지 않았습니다.</h1>

        <Button
          title="확인"
          style={{ wrapper: 'w-full mt-4' }}
          onClick={() => {
            setModal(null)
          }}
        />
      </div>
    )
  }
  console.log(data)
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
    <div className="box-border rounded-lg bg-white p-10pxr">
      <div className="grid w-full gap-1">
        <Detail label="습득물명" value={productName} />
        <Detail label="관리번호" value={articleId} />
        <Detail label="습득일" value={foundDate} />
        <Detail label="습득장소" value={foundPlace} />
        <Detail label="물품분류" value={productClassification} />
        <Detail label="보관장소" value={organizationName} />
        <Detail label="유실물상태" value={custodyStatusName} />
        <Detail label="보관장소연락처">
          <a href={`tel:${telephone}`}>{telephone}</a>
        </Detail>
        <span>(운영시간: 평일 9시 ~ 18시, 점심시간: 12시 ~ 13시)</span>

        <Image
          src={
            filePathImage ||
            'https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif'
          }
          priority
          alt="goalImage"
          width="0"
          height="0"
          sizes="(max-width: 400x) 100vw, 33vw"
          className="h-auto w-full"
        />
      </div>
      <Button
        title="확인"
        style={{ wrapper: 'w-full mt-4' }}
        onClick={() => {
          setModal(null)
        }}
      />
    </div>
  )
}
export default LostItemDetail
