export class Fact {
  constructor(text, imgUrl, arabicText) {
    this.text = text;
    this.imgUrl = imgUrl;
    this.arabicText = arabicText;
  }

  static fromJSON(data) {
    return new Fact(data["englishFact"], data["imageId"], data["arabicFact"]);
  }
}
