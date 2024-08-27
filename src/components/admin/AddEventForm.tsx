"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { addEventSchema, EventMode } from '@/lib/schema/add-event-schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import AddCoordinatorForm from './AddCoordinatorForm';
import { CoordinatorList } from './CoordinatorList';
import { addEvent } from '../../../actions/admin/add-event';
import { ICoordinator } from '@/lib/types/coordinator';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), {
    ssr: false,
});

type Props = {}

const AddEventForm = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [coordinator, setCoordinator] = useState<ICoordinator[]>([]);

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
        },
    });
    const {
        handleSubmit,
        reset,
        formState,
        setValue,
        getValues
    } = form;

    const handleAddEvent = async (values: z.infer<typeof addEventSchema>) => {
        if (coordinator.length === 0) {
            form.setError('coordinator', {
                type: 'manual',
                message: 'At least one coordinator is required',
            });
            return;
        }
        const roles = coordinator;
        console.log('Add event:', roles);
        const res: any = await addEvent(values, roles);
        reset();
    }

    return (
        <Form
            {...form}
        >
            <form
                onSubmit={handleSubmit(handleAddEvent)}
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
                                    <FormControl>
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

                        {/* Event Type */}
                        <FormField
                            control={form.control}
                            name="event_type"
                            render={({ field }) => (
                                <FormItem>
                                    <Select
                                        disabled={field.disabled}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="bg-zinc-300/50 border-0 text-black focus:ring-0 ring-offset-0 capitalize outline-none focus:ring-offset-0">
                                            <SelectValue placeholder="Select a event type" />
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
                            coorinatorValue={coordinator}
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

export default AddEventForm