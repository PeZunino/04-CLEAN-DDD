import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {

	public items: Question[] = [];

	async save(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items[itemIndex] = question;
	}
	
	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		const question = this.items.find(item=>item.slug.value == slug);
		
		return question ?? null;
	}

	async findById(id: string) {
		const question = this.items.find((item) => item.id.toString() === id);

		return question ?? null;
	}

	async delete(question: Question) {
		const itemIndex = this.items.findIndex((item) => item.id === question.id);

		this.items.splice(itemIndex, 1);
	}
}