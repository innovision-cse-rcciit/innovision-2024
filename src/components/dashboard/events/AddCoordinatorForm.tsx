"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger

} from '../../ui/dialog'
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
    Role

} from '@/lib/schema/add-coordinator-volunteer-schema';
import { Button } from '../../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue

} from '../../ui/select';
import { ICoordinator } from '@/lib/types/coordinator';

type Props = {
    children: React.ReactNode;
    event_name: string;
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    defaultCoordinator?: ICoordinator;
    coorinatorValue: ICoordinator[];
    setCoordinatorValue: (coordinator: ICoordinator[]) => void;
}

const AddCoordinatorForm = ({ children, event_name, isOpen, onClose, coorinatorValue, setCoordinatorValue, defaultCoordinator }: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>(defaultCoordinator?.name ?? "");
    const [email, setEmail] = useState<string>(defaultCoordinator?.email ?? "");
    const [coRole, setCoRole] = useState<Role>(defaultCoordinator?.role ?? Role.COORDINATOR);

    const addCoordinator = (e: any) => {
        setLoading(true);
        const newCoordinator = { name, email, role: coRole };
        if (defaultCoordinator) {
            // Editing existing coordinator
            const updatedCoordinators = coorinatorValue.map(coordinator =>
                coordinator.email === defaultCoordinator.email ? newCoordinator : coordinator
            );
            setCoordinatorValue(updatedCoordinators);
        } else {
            // Adding new coordinator
            setCoordinatorValue(prevCoordinators => [...prevCoordinators, newCoordinator]);
        }
        setLoading(false);
        setName("");
        setEmail("");
        onClose(!isOpen);
    }

    const role = coRole[0] + coRole.toLowerCase().substring(1);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add {role}</DialogTitle>
                    <DialogDescription>Select {role} for {event_name === "" ? 'event' : event_name}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-4">
                    <Label>{role} Name</Label>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={`${role} name`}
                        disabled={loading}
                    />

                    <Label>{role} Email</Label>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={`${role} email`}
                        disabled={loading}
                    />

                    <Label>Role</Label>
                    <Select
                        disabled={loading}
                        onValueChange={(value: Role) => setCoRole(value)}
                        defaultValue={coRole}
                    >
                        <SelectTrigger className="bg-zinc-300/50 border-0 text-black focus:ring-0 ring-offset-0 capitalize outline-none focus:ring-offset-0">
                            <SelectValue placeholder="Select a role type" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Object.values(Role).map((channel) => (
                                    <SelectItem
                                        key={channel}
                                        value={channel}
                                        className="capitalize"
                                    >
                                        {channel.toLowerCase()}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="button"
                    onClick={addCoordinator}
                >
                    Add {role}
                </Button>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default AddCoordinatorForm