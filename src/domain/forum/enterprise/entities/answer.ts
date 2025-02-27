import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AnswerProps{
	content:string
	authorId: UniqueEntityID
	questionId: UniqueEntityID
	createdAt: Date
	updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
	get content(){
		return this.props.content;
	}
  
	get authorId(){
		return this.props.authorId;
	}
  
	get questionId(){
		return this.props.questionId;
	}
  
	get createdAt(){
		return this.props.createdAt;
	}
  
	get updatedAt(){
		return this.props.updatedAt;
	}

	get excerpt(){
		return this.content.substring(0,120)
			.trimEnd()
			.concat('...');
	}

	private touch(){
		this.props.updatedAt = new Date();
	}

	set content(content:string){
		this.props.content = content;

		this.touch();
	}

	static create(props:Optional<AnswerProps, 'createdAt'>, id?:UniqueEntityID){
		const question = new Answer({
			...props,
			createdAt: props.createdAt ?? new Date(), 
		}, id);
 
		return question;
	}
}