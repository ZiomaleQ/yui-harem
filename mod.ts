import { Token } from "./config.ts"
import { CommandClient, ApplicationCommandPartial, ApplicationCommandInteraction, Intents } from "./deps.ts"

const client = new CommandClient({ token: Token, prefix: "keiko!" })

client.on("ready", async () => {
  const commands = await client.interactions.commands.all()

  const localCommands = await Promise.all([...Deno.readDirSync("./commands")]
    .filter(file => file.isFile && file.name.endsWith('.ts') || file.name.endsWith('.js'))
    .map(async (file) => {
      return await import(`./commands/${file.name}`)
    // deno-lint-ignore no-explicit-any
    })) as { Typedef: ApplicationCommandPartial, Execute: (cmd: ApplicationCommandInteraction) => any }[]

  if (commands.size != localCommands.length) {
    console.log("Updated commands")
    client.interactions.commands.bulkEdit(
      localCommands.map((command: { Typedef: ApplicationCommandPartial }) => command.Typedef) as ApplicationCommandPartial[]
    )
  }

  client.setPresence({
    status: "online",
    activity: {
      name: "I'm leveling up!",
      type: "CUSTOM_STATUS",
    },
    since: Date.now(),
  })

  localCommands.forEach((command) => { client.interactions.handle(command.Typedef.name, command.Execute) })


  console.log("Hi, I'm " + client.user?.tag)
})

client.on("error", console.error)
client.interactions.on("interactionError", console.error)

client.connect(undefined, Intents.NonPrivileged)