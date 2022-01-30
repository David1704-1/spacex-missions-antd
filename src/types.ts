export interface MissionType{    
    mission_name: string
    launch_date_local: string
    launch_site: {
      site_name_long: string
    }
    links: {
      flickr_images: string[]
    }
    rocket:{
      rocket:{
        id:string
      }
    }
}
export interface DataType{
    launchesPast: MissionType[]
}
export interface RocketType{
  name: string,
  type: string,
  description: string,
  mass: {
    kg: number
  }
}
export interface RocketResponseType{
  rocket: RocketType
}