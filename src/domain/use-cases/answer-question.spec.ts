import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  async create(answer) {
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