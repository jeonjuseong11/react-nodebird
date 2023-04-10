module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", //MYSQL에는 users 테이블 생성
    {
      // id: {}, mysql에서 자동으로 올라감
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //이메일 필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //닉네임 필수
      },
      password: {
        type: DataTypes.STRING(100), //암호화로 길이가 늘어날수 있기 때문에
        allowNull: false, //비번 필수
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci", //한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post); //한 유저는 어려개의 게시글을 쓸 수 있음
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //through: 테이블 이름 바꾸기
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId", //foreign
    });
  };
  return User;
};
