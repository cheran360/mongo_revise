const mongoose = require("mongoose");
const { getMaxListeners } = require("./User");
const User = require("./User");

mongoose.connect("mongodb://localhost/testdb");

run();

async function run() {
  try {
    // ways to create User
    // const user = new User({ name: "John", age: 26 });
    // await user.save();
    // (or)

    // dont do findOneandUpdate or findByIdAndUpdate cause it
    // will skip all our validations
    // const user = await User.create({
    //   name: "John",
    //   age: 26,
    //   email: "sample@gmail.com",
    //   hobbies: ["Coding, playing outdoor"],
    //   address: { street: "los siao St" },
    // });
    // to update userdata
    // user.name = "sally"
    // user.save();

    const user = await User.findById("626cc9e103d7518acddd21d8");
    // for foreign key assigning purpose
    // user.bestFriend = "626cc9421600b06f9ae6c5e9";
    // await user.save();
    console.log(user);
    await user.save();
    console.log(user.namedEmail);
  } catch (err) {
    console.log(err);
  }
}

// mongoose queries
// find({}) findOne({}) findById({}) exists({}) deleteOne({})
// deleteMany({})

// User.where("name").equals("Kyle")
// User.where("age").gt("12")
// User.where("age").gt("12").where("name").equals("Jhon")

//.select() => only get selected fields
// User.where("name").equals("Jhon").limit(2).select("age")
// User.findById(Id).populate(bestFriend) gives
// all the data of details of bestFriend reference

// querying through method(line 44 in User.js)
// const user = await User.find().byName("Jhon")
