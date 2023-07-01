export const getRandom = (min = 0, max: number) => {
  const slots = new Uint32Array(1)
  crypto.getRandomValues(slots)
  const rand = slots[0] / Math.pow(2, 32)
  return Math.floor((rand * (max - min + 1)) + min)
}

// deno-lint-ignore no-explicit-any
export async function runParts(code: string): Promise<Record<string, any>> {
  // deno-lint-ignore no-deprecated-deno-api
  const p = Deno.run({
    cmd: ["java", "-jar", ".\\bin\\parts-1.0-SNAPSHOT.jar", "--embed", code],
    stdout: "piped",
    stderr: "piped",
  })

  const { code: status } = await p.status()

  if (status === 0) {
    const rawOutput = await p.output()

    const output = new TextDecoder().decode(rawOutput)

    return new Promise((resolve) => {
      resolve(JSON.parse(output))
    })

  } else {
    const rawError = await p.stderrOutput()
    const errorString = new TextDecoder().decode(rawError)

    return new Promise((_, reject) => {
      reject(errorString)
    })
  }
} 