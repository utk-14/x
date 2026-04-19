const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms))

export const aiApi = {
  async analyzeMistake(expected, actual) {
    await wait()
    const weakLetters = expected
      .split('')
      .filter((char, index) => char.toLowerCase() !== (actual[index] ?? '').toLowerCase())
      .filter((char) => char.trim().length > 0)
    return {
      expected,
      actual,
      weakLetters: Array.from(new Set(weakLetters)),
    }
  },
  async generateRetest(weakPatterns) {
    await wait()
    return weakPatterns.map((pattern) => `${pattern} - say and type this sound`)
  },
}
