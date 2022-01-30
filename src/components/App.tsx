import React, { useState } from 'react'
import { gql, useQuery, ApolloClient, InMemoryCache } from '@apollo/client'
import 'antd/dist/antd.css'
import { Row, Col, Divider } from 'antd'
import { MissionType, DataType } from '../types'
import Mission from './Mission'

const GET_MISSIONS = gql`
query Missions{
  launchesPast {
    mission_name
    launch_date_local
    launch_site {
      site_name_long
    }
    links {
      flickr_images
    }
    rocket {
      rocket {
        id
      }
    }
  }
}    
`
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache()
})
const App: React.FC = ()=> {
  const [missions, setMissions] = useState<MissionType[]>()
  
  const {data, loading, error} = useQuery<DataType>(GET_MISSIONS,{
    client: client,
    onCompleted: ()=>{
      setMissions(data?.launchesPast)
    },
    onError: (error) =>{
      console.log(error)
    }
  })
  if(loading) return <>Loading...</>
  if(error) return <>{error.message}</>

  return (
    <>
      <Divider orientation="left">SpaceX Missions:</Divider>
      <Row gutter={[16, 24]}>
        {missions?.map(mission => {
          return (
            <Col>
              <Mission mission={mission}/>
            </Col>
          )
        })}     
      </Row>    
    </>
  );
}

export default App
