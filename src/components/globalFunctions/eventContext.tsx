import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";
const EventConfig = createContext<any | undefined>(undefined);
const GetEventConfig = createContext<any | undefined>(undefined);
const EventDetailsConfig = createContext<any | undefined>(undefined);
const GetEventDetailsConfig = createContext<any | undefined>(undefined);
export function EventDetails() {
    return useContext(EventConfig);
}
export function EventDetailsGet() {
    return useContext(EventDetailsConfig);
}
export function GetEvents() {
    return useContext(GetEventConfig);
}
export function EventProviderData() {
    return useContext(GetEventDetailsConfig);
}
export function useGetDetails(id: any) {
    return useQuery({
         queryKey:["events",id],
         queryFn:async () => ( await axios.post("/getActDetail.do", {
             actId: id
         }, {
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
             }
         })).data,
         staleTime: 1000 * 60 * 60 * 24,
       })
 }

export function EventProvider({ children }: any) {
    const [events, setEvents] = useState<any>([]);
    const [eventDetails, setEventDetails] = useState<any>([]);
    async function getEventInfo() {
        try {
            const response = await axios.get("/getActivityCenterList.do?load=true", {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            if (response.data.success == false) {

            }
            else {
                setEvents(response.data);
            }
        }
        catch (e) {
            console.log(e)
        }

    }

    async function getEventDetails(id: any) {
        try {
            const response = await axios.post("/getActDetail.do", {
                actId: id
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
            setEventDetails(response.data)
        } catch (e) {

        }

    }
    useEffect(() => {
        getEventInfo()
    }, [])
    return (
        <EventConfig.Provider value={events}>
            <GetEventConfig.Provider value={getEventInfo}>
                <EventDetailsConfig.Provider value={getEventDetails}>
                    <GetEventDetailsConfig.Provider value={eventDetails}>
                        {children}
                    </GetEventDetailsConfig.Provider>
                </EventDetailsConfig.Provider>
            </GetEventConfig.Provider>
        </EventConfig.Provider>
    )
}