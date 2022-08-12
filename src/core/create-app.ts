import Mirai, { toMessageChain } from "mirai-ts";
import * as Commands from "../commands";
import { CommandCenter } from "./command-center";
import { useCommand } from "./use-command";

type CreateAppOptions = {
  qq: number;
  settings: any;
  handler?: (msg: any) => void;
};

export async function createApp(options: CreateAppOptions) {
  const mirai = new Mirai(options.settings);
  await mirai.link(options.qq);

  useCommand(Object.values(Commands));

  mirai.on("message", async (message) => {
    console.log(message);

    if (message.plain.slice(0, 1) === "/") {
      const [name, optionKey, ...args] = message.plain.split(" ");
      const hasOptionKey = optionKey && optionKey !== "undefined" && /^[0-9a-zA-Z]*$/g.test(optionKey);

      const handlerKey = hasOptionKey ? `${name.slice(1)}_${optionKey}` : name.slice(1);

      if (handlerKey === "help") {
        message.reply(CommandCenter.getInstance<CommandCenter>().help.join("\n"));
        return;
      }

      const handler = CommandCenter.getInstance().handlers.get(handlerKey);

      try {
        const result = await CommandCenter.getInstance<CommandCenter>().exec(handler!.name, hasOptionKey ? optionKey : name.slice(1), {
          msgOptions: hasOptionKey ? args : [optionKey, ...args],
          type: message.type,
          sender: message.sender,
        });
        message.reply(result);
      } catch (error) {
        message.reply(toMessageChain("坏掉了喵QAQ"));
      }
    }
  });
  mirai.listen();
}
