import { Either, right } from '@/core/either';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ListRecentQuestionsUseCaseRequest {
	page: number
}

type ListRecentQuestionsUseCaseResponse = Either<null,{
	questions: Question[]
}>

export class ListRecentQuestionsUseCase {
	constructor(private questionsRepository: QuestionsRepository) {}

	async execute({page,}: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		return right({questions});
	}
}