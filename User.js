const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not even number`,
    },
  },
  email: { type: String, required: true, lowercase: true, minLength: 8 },
  // default: new Date() static kind of way
  // default: () => new Date() dynamic kind of way
  // immutable: true never lets us change the value of createdAt

  createdAt: { type: Date, default: () => new Date(), immutable: true },
  updatedAt: { type: Date, default: () => new Date() },
  bestFriend: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  hobbies: [String], // represents array of strings
  // nested objects
  address: addressSchema,
});

// cannot use an arrow function here
userSchema.methods.sayHi = function () {
  console.log(`hello, the name is ${this.name}`);
};

// not available for instances but for whole model
userSchema.statics.findByName = function (name) {
  // case insensitive regular expression
  return this.find({ name: new RegExp(name, "i") });
};

// can modify methods through queries
userSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

// we created a named email property
// property that exits on an individual user
// this property does'nt get saved in database
// only available on js files
userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

// middlewares in monogoose
// method called before validation is done
// userSchema.pre('validate')

// method called before deletion is done
// serSchema.pre('remove')

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// doc -> userObject the thing that has been saved.
userSchema.post("save", function (doc, next) {
  doc.sayHi();
  next();
});

module.exports = mongoose.model("User", userSchema);
