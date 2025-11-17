import React from 'react'
import FindGrantsDetailsContainer from './_components/find-grants-details-container'

const FindGrantsDetailsPage = ({params}:{params:{id:string}}) => {
  return (
    <div>
      <FindGrantsDetailsContainer id={params?.id} />
    </div>
  )
}

export default FindGrantsDetailsPage
