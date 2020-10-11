import {Bot, Ready} from './mod.ts'

const bot = new Bot()

bot.onReady((ready: Ready) => {
    console.log(ready.guilds[0].id)
})

await bot.login(TOKEN)