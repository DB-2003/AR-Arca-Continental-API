function validateMexicoPhoneNumber(phoneNumber) {
    const regex = /^(\+52|52)?(1|2|33|44|55|56|81|82|83|84|87|89)?\d{8}$/;
    if (!phoneNumber) {
      throw new Error('Phone number is required');
    }
    if (typeof phoneNumber !== 'string') {
      throw new Error('Phone number must be a string');
    }
    if (!regex.test(phoneNumber)) {
      throw new Error('Invalid Mexico phone number');
    }
    return true;
}

module.exports = {
    validateMexicoPhoneNumber
  };