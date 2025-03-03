import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers';

let inMemoryAnswersRepository: InMemoryAnswersRepository;

let sut: ListQuestionAnswersUseCase;

describe('list Question Answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();

		sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it('should be able to list question answers', async () => {
		await inMemoryAnswersRepository.create(
			makeAnswer({questionId: new UniqueEntityID('question-1'),}),
		);

		await inMemoryAnswersRepository.create(
			makeAnswer({questionId: new UniqueEntityID('question-1'),}),
		);

		await inMemoryAnswersRepository.create(
			makeAnswer({questionId: new UniqueEntityID('question-1'),}),
		);

		const result = await sut.execute({
			questionId: 'question-1',
			page: 1,
		});

		expect(result.value?.answers)
			.toHaveLength(3);
	});

	it('should be able to list paginated question answers', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryAnswersRepository.create(
				makeAnswer({questionId: new UniqueEntityID('question-1'),}),
			);
		}

		const result = await sut.execute({
			questionId: 'question-1',
			page: 2,
		});

		expect(result.value?.answers)
			.toHaveLength(2);
	});
});