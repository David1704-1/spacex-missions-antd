import React from "react";
import { MissionType } from "../types";
import { Card } from "antd";

interface Props {
  mission: MissionType;
}
const Mission: React.FC<Props> = ({ mission }) => (
  <>
    <Card
      size="small"
      title={mission.mission_name}
      extra={<a href={`/${mission.rocket.rocket.id}`}>Rocket info</a>}
      style={{ width: 300 }}
      cover={
        mission.links.flickr_images.length > 0 && (
          <img alt="" src={mission.links.flickr_images[0]} height={"300px"} />
        )
      }
    >
      <p>Site name: {mission.launch_site.site_name_long}</p>
      <p>Date: {mission.launch_date_local}</p>
    </Card>
  </>
);

export default Mission;

