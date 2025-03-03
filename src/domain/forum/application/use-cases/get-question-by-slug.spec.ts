import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionBySlug } from './get-question-by-slug';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let sut: GetQuestionBySlug;

describe('Create Question', ()=>{
  
	beforeEach(()=>{
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();

		sut = new GetQuestionBySlug(inMemoryQuestionsRepository);
	});

	it('should be able to get a question by slug', async ()=>{
		const newQuestion = makeQuestion({slug: Slug.create('example-question')});
    
		inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({slug: 'example-question'});

		expect(result.value)
			.toMatchObject({question: expect.objectContaining({title: newQuestion.title,}),});

	
	});

});
