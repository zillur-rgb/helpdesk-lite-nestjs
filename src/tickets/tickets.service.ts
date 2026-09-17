import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

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

    private nextTicketId = 4;

    findAll(status?: Ticket['status'], priority?: Ticket['priority']){
        let tickets = this.tickets;

        if(status) {
            tickets = tickets.filter((ticket) => ticket.status === status);
        }

        if(priority) {
            tickets = tickets.filter((ticket) => ticket.priority === priority);
        }

        return tickets;
    }

    findOne(id: number) {
        const ticket = this.tickets.find(ticket => ticket.id === id);

        if(!ticket){
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }

    create(createTicketDto: CreateTicketDto){
        const ticket: Ticket = {
            id: this.nextTicketId++,
            subject: createTicketDto.subject,
            description: createTicketDto.description,
            priority: createTicketDto.priority,
            status: 'open',
            createdAt: new Date().toISOString()
        }

        this.tickets.push(ticket);
        return ticket;
    }

    update(id: number, updateTicketDto: UpdateTicketDto) {
        const ticket = this.findOne(id);

        if(ticket.status === 'closed') {
            throw new BadRequestException('Closed ticket cannot be updated!')
        }

        Object.assign(ticket, updateTicketDto);

        return ticket;
    }

    closeTicket(id: number) {
        const ticket = this.findOne(id);

        if(ticket.status === 'closed') {
            throw new BadRequestException('Ticket is already closed')
        }

        ticket.status = 'closed';

        return ticket;
    }
}
