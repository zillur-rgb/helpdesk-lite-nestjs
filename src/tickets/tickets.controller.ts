import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import {Ticket} from './ticket.interface.js';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService){}
    
    @Get()
    findAll(@Query('status') status?: Ticket['status'], @Query('priority') priority?: Ticket['priority'] ){
        return this.ticketsService.findAll(status, priority);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number ){
        return this.ticketsService.findOne(id);
    }
}