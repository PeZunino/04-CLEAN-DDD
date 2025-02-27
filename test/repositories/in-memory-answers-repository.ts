import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
	public items: Answer[] = [];

	async findById(id: string) {
		const answer = this.items.find((item) => item.id.toString() === id);

		return answer ?? null;
	}

	async delete(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items.splice(itemIndex, 1);
	}
	
	async save(answer: Answer) {
		const itemIndex = this.items.findIndex((item) => item.id === answer.id);

		this.items[itemIndex] = answer;
	}
	
	async create(answer: Answer) {
		this.items.push(answer);
	}
}