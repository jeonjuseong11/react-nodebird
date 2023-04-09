module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      // id: {}, mysql에서 자동으로 올라감
      src: {
        type: DataTypes.STRING(200), //글자를 무제한으로
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
