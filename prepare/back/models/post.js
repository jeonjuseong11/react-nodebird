module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      // id: {}, mysql에서 자동으로 올라감
      content: {
        type: DataTypes.TEXT, //글자를 무제한으로
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //이모티콘 저장
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //user에 속해있음
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};
