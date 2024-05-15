import { Fact } from "./Fact.js";

/**
 *
 * @param {"Dark" | "Fun"} type
 * @param {number} index
 */

export async function getFactFromServer(type, index=0) {
  // fetch from db
  const response = await fetch(`/fact?type=${type}&index=${index}`);
  /**
   * {text, imgUrl, arabicText}
   */
  const json = await response.json();
  return Fact.fromJSON(json.fact);
}
