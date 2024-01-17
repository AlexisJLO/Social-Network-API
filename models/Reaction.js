const { Schema, model, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: [true, "Please add a reaction"],
    minlength: [1, "Your reaction must be at least 1 character long"],
    maxlength: [250, "Your reaction must be less than 250 characters"],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;
