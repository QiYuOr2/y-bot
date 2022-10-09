import { ICommand } from "../core/use-command";
import { Command, Inject, Options } from "../core/decorators";
import { RollService } from "../services";

@Command("rd", { notUseName: true })
export class RD implements ICommand {
  @Inject() rollService!: RollService;

  @Options("r", "猜猜是干啥的")
  async main(message: { msgOptions: string[]; sender: any; type: string }) {
    let [base, extra] = message.msgOptions;

    let result = [];
    try {
      if (base.includes("rd")) {
        base = base.split(' ')[0]
        const faces = Number(base.split(".rd")?.[1] || 100);
        result = await this.rollService.dice(1, faces);
      } else {
        extra = extra.split(' ')[0]
        const [countStr, facesStr] = extra.toLowerCase().split("d");

        result = await this.rollService.dice(Number(countStr), Number(facesStr));
      }
    } catch (error) {
      result = this.rollService.error();
    }

    return message.type === "FriendMessage" ? result : [...this.rollService.at(message.sender.id), ...result];
  }
}
