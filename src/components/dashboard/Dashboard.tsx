import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  AdminTabs,
  Coordinator,
  Event,
  Participant,
} from "@/utils/constants/admin-dashboard";
import CoordinatorTable from "./tables/CoordinatorTable";
import ParticipationTable from "./tables/ParticipationTable";
import EventTable from "./tables/EventTable";

type Props = {
  coordinatorList: Coordinator[];
  participantList: Participant[];
  eventList: Event[];
  isAdmin: boolean;
  isCoordinator?: boolean;
};

const Dashboard = ({
  coordinatorList,
  participantList,
  eventList,
  isAdmin,
  isCoordinator = false,
}: Props) => {
  return (
    <>
      <Tabs defaultValue={AdminTabs.COORDINATOR} className="w-full">
        <TabsList
          className={`grid w-full grid-cols-${isAdmin ? "2" : "3"} grid-cols-${
            isCoordinator ? "3" : "2"
          }`}
        >
          <TabsTrigger value={AdminTabs.EVENTS} className=" text-xs md:text-sm">
            {AdminTabs.EVENTS}
          </TabsTrigger>
          <TabsTrigger
            value={AdminTabs.COORDINATOR}
            className=" text-xs md:text-sm"
          >
            {AdminTabs.COORDINATOR}
          </TabsTrigger>
          {(!isAdmin || isCoordinator) && (
            <TabsTrigger
              value={AdminTabs.PARTICIPANTS}
              className=" text-xs md:text-sm"
            >
              {AdminTabs.PARTICIPANTS}
            </TabsTrigger>
          )}
        </TabsList>
        <TabsContent value={AdminTabs.EVENTS}>
          <EventTable data={eventList} />
        </TabsContent>
        <TabsContent value={AdminTabs.COORDINATOR}>
          <CoordinatorTable data={coordinatorList} />
        </TabsContent>
        {(!isAdmin || isCoordinator) && (
          <TabsContent value={AdminTabs.PARTICIPANTS}>
            <ParticipationTable data={participantList}  />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export default Dashboard;
