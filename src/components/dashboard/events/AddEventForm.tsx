"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { addEventSchema, EventCategory, EventMode } from '@/lib/schema/add-event-schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../../ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../../ui/select';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import AddCoordinatorForm from './AddCoordinatorForm';
import { CoordinatorList } from './CoordinatorList';
import { ICoordinator } from '@/lib/types/coordinator';
import { Switch } from '../../ui/switch';
import { addEvent } from '@/utils/functions/addEvent';
import { addCoordinator } from '@/utils/functions/addCoordinator';
import { useParams, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

type Props = {
    event_name?: string,
    description?: string,
    banner_url?: string,
    max_team_size?: number,
    min_team_size?: number,
    rules?: string,
    schedule?: string,
    coordinatorProps?: [],
    event_type?: EventMode,
    is_open?: boolean,
    event_category?: EventCategory
}

const AddEventForm = ({
    banner_url,
    coordinatorProps,
    description,
    event_category,
    event_name,
    event_type,
    is_open,
    max_team_size,
    min_team_size,
    rules,
    schedule,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coordinator, setCoordinator] = useState<ICoordinator[]>([]);
    const [eventData, setEventData] = useState<any>(null);
    const {eventid} = useParams();

    const form = useForm<z.infer<typeof addEventSchema>>({
        resolver: zodResolver(addEventSchema),
        defaultValues: {
          event_name: "",
          description: "",
          image_path: "",
          max_team_size: 4,
          min_team_size: 1,
          rules: "",
          schedule: '',
          coordinator: [],
          event_type: EventMode.ONLINE,
          isOpen: true,
          event_category: EventCategory.TECHNICAL,
        },
      });
      
      const {
        handleSubmit,
        reset,
        formState,
        setValue,
        getValues,
      } = form;
      
      useEffect(() => {
        if (eventid) {
          const getData = async () => {
            const { data, error } = await supabase?.from('events').select('*,event_categories(title),roles(*,users(*))').eq('id', eventid).single();
            if (data) {
              setEventData(data);
              const rolesData = data.roles.map((role: any) => {
                return {
                    role: role.role,
                    name: role.users.name,
                    email: role.users.email,
                    phone: role.users.phone,
                }
              });
                setCoordinator(rolesData);
            }
          }
          getData();
        }
      }, [eventid]);
      
      // When eventData changes, reset form values with the fetched data
      useEffect(() => {
        if (eventData) {
          reset({
            event_name: eventData?.event_name ?? "",
            description: eventData?.description ?? "",
            image_path: eventData?.banner_url ?? "",
            max_team_size: eventData?.max_team_size ?? 4,
            min_team_size: eventData?.min_team_size ?? 1,
            rules: eventData?.rules ?? "",
            schedule: eventData?.schedule ?? '',
            coordinator: coordinator ?? [],
            event_type: eventData?.event_type ?? EventMode.ONLINE,
            isOpen: eventData?.is_open ?? true,
            event_category: eventData?.event_categories?.title ?? EventCategory.TECHNICAL
          });
        }
      }, [eventData, reset]);

    useEffect(() => {
        if(coordinatorProps)
            setCoordinator(coordinatorProps);
    },[coordinatorProps]);

    const handleAddEvent = async (values: z.infer<typeof addEventSchema>) => {
        if (coordinator.length === 0) {
            form.setError('coordinator', {
                type: 'manual',
                message: 'At least one coordinator is required',
            });
            return;
        }
        const roles = coordinator;

        const eventResponse = await addEvent({ event: values });
        const coordinatorResponse = await addCoordinator({ coordinators: roles, eventId: eventResponse.id });
        reset();
    }

    const handleEditEvent = async (values: z.infer<typeof addEventSchema>) => {
        if (coordinator.length === 0) {
            form.setError('coordinator', {
                type: 'manual',
                message: 'At least one coordinator is required',
            });
            return;
        }
        const roles = coordinator;

        // const eventResponse = await addEvent({ event: values });
        // const coordinatorResponse = await addCoordinator({ coordinators: roles, eventId: eventResponse.id });
        reset();
    }
    const pathname = usePathname();
    return (
        <Form
            {...form}
        >
            <form
                onSubmit={
                    ()=>{
                        pathname.includes('edit') ? handleSubmit(handleEditEvent) : handleSubmit(handleAddEvent)
                    }
                }
                className='flex flex-col gap-y-4'
            >
                <div className="flex gap-x-4 items-center max-md:flex-col">
                    <div className="flex flex-col gap-y-4">
                        {/* Event name */}
                        <FormField
                            control={form.control}
                            name="event_name"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-y-2'>
                                    <FormLabel>
                                        <Label>Event Name</Label>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Event name' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Schedule */}
                        <FormField
                            control={form.control}
                            name="schedule"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Label>Schedule</Label>
                                    </FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            onChange={(schedule) => onChange(schedule)}
                                            value={value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Image URL */}
                        <FormField
                            control={form.control}
                            name="image_path"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Label>Image Url</Label>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder='Image Url' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-x-4">
                            {/* Min Team Size */}
                            <FormField
                                control={form.control}
                                name="min_team_size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Label>Minimum Team Size</Label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Max Team Size */}
                            <FormField
                                control={form.control}
                                name="max_team_size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <Label>Maximum Team Size</Label>
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Label>Description</Label>
                                    </FormLabel>
                                    <FormControl>
                                        <ReactQuill
                                            theme="snow"
                                            onChange={(description) => onChange(description)}
                                            value={value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Rules */}
                        <FormField
                            control={form.control}
                            name="rules"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Label>Rules</Label>
                                    </FormLabel>
                                    <FormControl className='text-black'>
                                        <ReactQuill
                                            theme="snow"
                                            
                                            onChange={(rules) => onChange(rules)}
                                            value={value || ''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-x-4">
                            {/* Event Type */}
                            <FormField
                                control={form.control}
                                name="event_type"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <Label>Event Mode</Label>
                                        <Select
                                            disabled={field.disabled}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="bg-zinc-300/50 border-0 text-black focus:ring-0 ring-offset-0 capitalize outline-none focus:ring-offset-0">
                                                <SelectValue placeholder="Select an event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Object.values(EventMode).map((channel) => (
                                                        <SelectItem
                                                            key={channel}
                                                            value={channel}
                                                            className="capitalize cursor-pointer"
                                                        >
                                                            {channel.toLowerCase()}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            {/* Event Category */}
                            <FormField
                                control={form.control}
                                name="event_category"
                                render={({ field }) => {
                                    return(
                                    <FormItem className='w-full'>
                                        <Label>Event Category</Label>
                                        <Select
                                            disabled={field.disabled}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="bg-zinc-300/50 border-0 text-black focus:ring-0 ring-offset-0 capitalize outline-none focus:ring-offset-0">
                                                <SelectValue placeholder="Select an event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Object.values(EventCategory).map((channel) => (
                                                        <SelectItem
                                                            key={channel}
                                                            value={channel}
                                                            className="capitalize cursor-pointer"
                                                        >
                                                            {channel.toLowerCase()}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}}
                            />
                        </div>

                        {/* Registration */}
                        <FormField
                            control={form.control}
                            name="isOpen"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-x-4 items-center">
                                        <Label>Open Registration</Label>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            aria-readonly
                                        />
                                    </div>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex flex-col gap-y-2">
                        <CoordinatorList
                            data={coordinator}
                            setCoordinator={setCoordinator}
                            event_name={getValues("event_name") ?? ""}
                        />
                        {
                            formState.errors.coordinator && (
                                <FormMessage>
                                    {formState.errors.coordinator.message}
                                </FormMessage>
                            )
                        }
                        <AddCoordinatorForm
                            event_name={getValues("event_name") ?? ""}
                            isOpen={isOpen}
                            onClose={setIsOpen}
                            coordinatorValue={coordinator} // Corrected property name here
                            setCoordinatorValue={setCoordinator}
                        >
                            <Button>
                                Add Coordinator / Volunteer
                            </Button>
                        </AddCoordinatorForm>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={formState.isLoading}
                >
                    Add Event
                </Button>
            </form>
        </Form >
    )
}

export default AddEventForm;
