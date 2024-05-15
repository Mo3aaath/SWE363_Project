export class User {
  /**
   *
   * @param {string} name
   * @param {string} email
   * @param {Date} birth
   * @param {string} bio
   * @param {string} imageId
   * @param {string[]} friends
   */
  constructor(_id, name, email, birth, bio, imageId, friends) {
    this.id = _id;
    this.name = name;
    this.email = email;
    this.birth = birth;
    this.bio = bio;
    this.imageId = imageId;
    this.friends = friends;
  }

  /**
   *
   * @param {User | any} user
   */
  update(user) {
    if (!user) return;

    this.id = user._id || this.id;
    this.name = user.name || this.name;
    this.email = user.email || this.email;
    
    this.birth =
      user.birth || user.dateOfBirth
        ? new Date(user.birth || user.dateOfBirth)
        : this.birth;

    this.bio = user.bio || this.bio;
    this.imageId = user.imageId || this.imageId;
    this.friends = user.friends || this.friends;

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        birth: this.birth.toISOString(),
      })
    );
  }
}
