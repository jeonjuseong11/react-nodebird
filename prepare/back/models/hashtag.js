module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "User",
    {
      // id: {}, mysql에서 자동으로 올라감
      name: {
        type: DataTypes.STRING(20), //글자를 무제한으로
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci", //한글 저장
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
