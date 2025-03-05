import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CreateQuestionUseCase } from './create-question';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: CreateQuestionUseCase;

describe('Create Question', ()=>{
  
	beforeEach(()=>{

		inMemoryQuestionAttachmentsRepository =
				new InMemoryQuestionAttachmentsRepository();
		
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
		
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('should be able to create an answer', async ()=>{
  
		const result = await sut.execute({
			authorId: '1',
			content: 'Nova pergunta',
			title: 'Conteúdo',
			attachmentsIds: [
				'1','2'
			]
		});
  
		expect(result.isRight())
			.toBe(true);

		expect(inMemoryQuestionsRepository.items[0])
			.toEqual(result.value?.question);

		expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
			.toHaveLength(2);

		expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
			.toEqual([
				expect.objectContaining({attachmentsId: new UniqueEntityID('1')}),
				expect.objectContaining({attachmentsId: new UniqueEntityID('2')})
			]);
	});

});
