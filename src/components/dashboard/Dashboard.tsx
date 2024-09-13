import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { AdminTabs, Coordinator, Event, Participant } from '@/utils/constants/admin-dashboard'
import CoordinatorTable from './tables/CoordinatorTable'
import ParticipationTable from './tables/ParticipationTable'
import EventTable from './tables/EventTable'

type Props = {
    coordinatorList: Coordinator[];
    participantList: Participant[];
    eventList: Event[];
    isAdmin: boolean;
}

const Dashboard = ({ coordinatorList, participantList, eventList, isAdmin }: Props) => {

    return (
        <>
            <Tabs defaultValue={AdminTabs.COORDINATOR} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value={AdminTabs.EVENTS} className=' text-xs md:text-sm'>{AdminTabs.EVENTS}</TabsTrigger>
                    <TabsTrigger value={AdminTabs.COORDINATOR} className=' text-xs md:text-sm'>{AdminTabs.COORDINATOR}</TabsTrigger>
                    <TabsTrigger value={AdminTabs.PARTICIPANTS} className=' text-xs md:text-sm'>{AdminTabs.PARTICIPANTS}</TabsTrigger>
                </TabsList>
                <TabsContent value={AdminTabs.EVENTS}>
                    <EventTable
                        data={eventList}
                    />
                </TabsContent>
                <TabsContent value={AdminTabs.COORDINATOR}>
                    <CoordinatorTable
                        data={coordinatorList}
                    />
                </TabsContent>
                <TabsContent value={AdminTabs.PARTICIPANTS}>
                    <ParticipationTable
                        data={participantList}
                        isAdmin={isAdmin}
                    />
                </TabsContent>
            </Tabs>
        </>
    )
}

export default Dashboard