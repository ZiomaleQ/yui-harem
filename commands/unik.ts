import { ApplicationCommandOptionType, ApplicationCommandPartial, ApplicationCommandType, Embed, SlashCommandInteraction } from "../deps.ts"
import { getRandom, runParts } from '../utils.ts'

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

  let dice = getRandom(1, 100)



  const predice = dice

  const expr = cmd.option<string | undefined>('calc')
  if (expr !== undefined) {

    const env = await runParts(`let dice = ${dice};${expr}`)
    dice = env.dice < 0 ? 0 : (env.dice > 100 ? 100 : env.dice)

  }

  const embed = new Embed().setColor(dice >= 60 ? 0x00ff00 : 0xff0000).setTitle("Let's go!")

  if (expr !== undefined) {
    embed
      .addField("Przed obliczeniami:", "rzut: " + predice, true)
      .addField("Po obliczeniach:", "rzut: " + dice, true)
      .addField("Obliczenia", `\`${expr}\``, true)
  }

  if (dice == 99 || dice == 100) {

    embed.addField("Kontra!", `[\`${dice}\`] Uniknąłeś i możesz skontrować!`)

    await cmd.respond({ embeds: [embed] })
  } else {
    if (dice >= 50) {
      embed.addField("Unik!", `[\`${dice}\`] Wrum, ataki nietrafiły po raz kolejny!`)
      await cmd.respond({ embeds: [embed] })
    } else {
      embed.addField("Bonk!", `[\`${dice}\`] Better luck next time!`)
      await cmd.respond({ embeds: [embed] })
    }
  }
}