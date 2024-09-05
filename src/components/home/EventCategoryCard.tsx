import Image from "next/image"
import Link from "next/link"

const EventCategoryCard = ({event}:{
    event:any
}) => {
  
  return (
    <Link href={`/events/${event.title}`} className="card">
  <div className="card-info">
    <Image src={event.image} className="object-cover w-full h-full" alt={event.title} width={300} height={300} />
  </div>
</Link>
  )
}

export default EventCategoryCard
