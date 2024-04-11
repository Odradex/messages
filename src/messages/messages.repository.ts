import { Injectable } from "@nestjs/common"
import { readFile, writeFile } from "fs/promises"

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const messages = await this.readMessagesFromFile()

    return messages[id]
  }

  async findAll() {
    return await this.readMessagesFromFile()
  }

  async create(content: string) {
    const messages = await this.readMessagesFromFile()
    const id = Math.floor(Math.random() * 999)

    messages[id] = { id, content }

    await writeFile('messages.json', JSON.stringify(messages))
  }
  
  private async readMessagesFromFile() {
    const contents = await readFile('messages.json', 'utf-8')
    return JSON.parse(contents)
  }
}