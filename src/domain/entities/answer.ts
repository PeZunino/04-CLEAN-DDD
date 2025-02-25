import { randomUUID } from "node:crypto"

interface AnswerProps{
  content:string,
  authorId:string, 
  questionId:string, 
}

export class Answer {
  public content:string
  public authorId:string 
  public questionId:string 

  constructor(
    public props:AnswerProps,
    public id?:string
  ){
    this.content = props.content
    this.questionId= props.questionId
    this.id = id ?? randomUUID()
  }
}