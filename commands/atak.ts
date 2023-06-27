import { ApplicationCommandOptionType, ApplicationCommandPartial, ApplicationCommandType, Embed, SlashCommandInteraction } from "../deps.ts"
import { getRandom } from '../utils.ts'

export const Typedef: ApplicationCommandPartial = {
  name: "atak",
  description: "Zaatakuj a ja zajmę się resztą!",
  type: ApplicationCommandType.CHAT_INPUT,
  options: [
    {
      name: "lvl",
      description: "Poziom postaci",
      type: ApplicationCommandOptionType.NUMBER,
      required: true,
    },
    {
      name: "calc",
      description: "Coś doliczyć?",
      type: ApplicationCommandOptionType.STRING,
      required: false,
    },
  ]
}

export const Execute = async (cmd: SlashCommandInteraction) => {
  let lvl = Math.abs(cmd.option<number>('lvl'))
  lvl = lvl == 0 ? 0 : lvl - 1

  const dice = getRandom(1, 100)
  let dmg = Math.round(getRandom(1, 40 + lvl * 10))
  if (dice >= 99) dmg *= 1.5

  const embed = new Embed().setColor(dice >= 50 ? 0x00ff00 : 0xff0000).setTitle("Let's go!")

  if (dice == 99 || dice == 100) {

    embed.addField("Krytyk!", `[\`${dice}\`] Trafiłeś krytycznie i zadałeś ${dmg} obrażeń!`)

    await cmd.respond({ embeds: [embed] })
  } else {
    if (dice >= 50) {
      embed.addField("Trafiłeś!", `[\`${dice}\`] Trafiłeś i zadałeś ${dmg} obrażeń!`)
      await cmd.respond({ embeds: [embed] })
    } else {
      embed.addField("Nie trafiłeś!", `[\`${dice}\`] Better luck next time!`)
      await cmd.respond({ embeds: [embed] })
    }
  }
}