import { ApplicationCommandOptionType, ApplicationCommandPartial, ApplicationCommandType, Embed, SlashCommandInteraction } from "../deps.ts"
import { getRandom } from '../utils.ts'

export const Typedef: ApplicationCommandPartial = {
  name: "dice",
  description: "Losowanko czas!",
  type: ApplicationCommandType.CHAT_INPUT,
  options: [
    {
      name: "min",
      description: "Minimum",
      type: ApplicationCommandOptionType.NUMBER,
      required: true,
    },
    {
      name: "max",
      description: "Maksimum",
      type: ApplicationCommandOptionType.NUMBER,
      required: true,
    },
  ]
}

export const Execute = async (cmd: SlashCommandInteraction) => {
  const min = Math.abs(cmd.option<number>('min'))
  const max = Math.abs(cmd.option<number>('max'))

  const dice = getRandom(min, max)

  const embed = new Embed().setColor(0x00ff00).setTitle("Let's go!")

  embed.addField("Wylosowałam!", "**__`" + dice + "`__**")

  await cmd.respond({ embeds: [embed] })

}