const User = require("./User");
const Blog = require("./Blog");

// one to many association; handled by foreign keys
User.hasMany(Blog);
Blog.belongsTo(User)


module.exports = {
    // short hand for User: User, Blog: Blog
    User,
    Blog
}