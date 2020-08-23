const specModel = mongoose => {
  const Spec = mongoose.model(
    "spec",
    mongoose.Schema(
      {
        title: String,
        description: String,
        started: Boolean
      },
      { timestamps: true }
    )
  );

  return Spec;
};

module.exports = specModel;