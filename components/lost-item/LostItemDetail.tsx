import Image from 'next/image'

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
  lostItemDetails?: LostItemDetails
}

const LostItemDetail: React.FC<LostItemPageProps> = async () => {
  const {
    lostProductName,
    lostFilePathImage,
    articleId,
    lostDate,
    lostPlace,
    lostPlaceSectionName,
    organizationName,
    lostStateName,
    telephoneNumber,
  } = await getData()
  console.log(lostFilePathImage)
  return (
    <div>
      <h1 className="font-black">분실물 상세 정보</h1>
      <div>
        <Detail label="습득물명" value={lostProductName} />
        <Detail label="관리번호" value={articleId} />
        <Detail label="습득일" value={lostDate} />
        <Detail label="습득장소" value={lostPlace} />
        <Detail label="물품분류" value={lostPlaceSectionName} />
        <Detail label="보관장소" value={organizationName} />
        <Detail label="유실물상태" value={lostStateName} />
        <Detail label="보관장소연락처" value={telephoneNumber} />
        <span>(운영시간: 평일 9시 ~ 18시, 점심시간: 12시 ~ 13시)</span>
        <Image
          src={lostFilePathImage}
          alt="lost-item_detail"
          width={150}
          height={150}
        />
      </div>
    </div>
  )
}

async function getData() {
  const res = await fetch(
    'https://baftogether.com/lost/items/L2023122900000040',
  )
  const { body } = await res.json()

  return { ...body } as LostItemDetails
}
export default LostItemDetail
