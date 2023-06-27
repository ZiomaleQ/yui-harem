import { ApplicationCommandOptionType, ApplicationCommandPartial, ApplicationCommandType, Embed, SlashCommandInteraction } from "../deps.ts"
import { getRandom } from '../utils.ts'

export const Typedef: ApplicationCommandPartial = {
  name: "unik",
  description: "Unikaj!",
  type: ApplicationCommandType.CHAT_INPUT,
  options: [
    {
      name: "calc",
      description: "Coś doliczyć?",
      type: ApplicationCommandOptionType.STRING,
      required: false,
    },
  ]
}

export const Execute = async (cmd: SlashCommandInteraction) => {

  const dice = getRandom(1, 100)

  const embed = new Embed().setColor(dice >= 60 ? 0x00ff00 : 0xff0000).setTitle("Let's go!")

  if (dice == 99 || dice == 100) {

    embed.addField("Kontra!", "Uniknąłeś i możesz skontrować!")

    await cmd.respond({ embeds: [embed] })
  } else {
    if (dice >= 50) {
      embed.addField("Unik!", "Wrum, ataki nietrafiły po raz kolejny!")
      await cmd.respond({ embeds: [embed] })
    } else {
      embed.addField("Bonk!", "Better luck next time!")
      await cmd.respond({ embeds: [embed] })
    }
  }
}