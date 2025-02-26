import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer:Answer) {
    return 
  },
}

test("create an answer", async ()=>{
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestionUseCase.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1'
  })

  expect(answer.content).toEqual('Nova resposta')
})