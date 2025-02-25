import { randomUUID } from "node:crypto"

class Instructor {
  constructor(public name:string, public id?:string){
    this.name = name
    this.id = id ?? randomUUID()
  }
}