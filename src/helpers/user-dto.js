class UserDto {
  id;
  email;
  firstName;
  lastName;
  address;
  phoneNumber

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.address = model.address;
    this.phoneNumber = model.phoneNumber;
  }
}

module.exports = UserDto;