const specModel = mongoose => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      started: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("spec", schema);
};

module.exports = specModel;