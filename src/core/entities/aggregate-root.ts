import { DomainEvent } from '../events/domain-event';
import { DomainEvents } from '../events/domain-events';
import { Entity } from './entity';

export abstract class AggregateRoot<Props> extends Entity<Props>{
	private _domainEvents: DomainEvent[] = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._domainEvents.push(domainEvent);

		DomainEvents.markAggregateForDispatch(this);
	}//registra q o evento existe (->ready=false -db->ready=true)

	public clearEvents() {
		this._domainEvents = [];
	}
}