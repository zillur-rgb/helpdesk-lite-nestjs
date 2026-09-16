import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';

@Injectable()
export class TicketsService {
    private readonly tickets: Ticket[] = [
        {
            id: 1,
            subject: 'cannot login to account',
            description: 'I am unable to login to my account with the correct credentials.',
            priority: 'high',
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            subject: 'payment failed',
            description: 'My payment was declined even though I have sufficient funds.',
            priority: 'medium',
            status: 'open',
            createdAt: new Date().toISOString(),
        },
        {
            id: 3,
            subject: 'Invoice download not working',
            description: 'I am unable to download my invoice from the account settings page.',
            priority: 'low',
            status: 'closed',
            createdAt: new Date().toISOString(),
        }
    ];

    findAll(){
        return this.tickets;
    }

    findOne(id: number) {
        const ticket = this.tickets.find(ticket => ticket.id === id);

        if(!ticket){
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }
}
