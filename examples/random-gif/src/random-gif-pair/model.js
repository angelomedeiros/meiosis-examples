import { randomGif } from "../random-gif";

export const initialModel = () => ({
  randomGifFirst: randomGif.initialModel(),
  randomGifSecond: randomGif.initialModel()
});