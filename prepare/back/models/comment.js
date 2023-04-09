module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      // id: {}, mysql에서 자동으로 올라감
      content: {
        type: DataTypes.TEXT, //글자를 무제한으로
        allowNull: false,
      },
      //UserId
      //PostId
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //이모티콘 저장
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
