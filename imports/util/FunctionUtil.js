isLoginU = function() {
    console.log(Session.get("isLogin"));
    var user = Session.get("isLogin");
    if (!user) {
      user = JSON.parse(localStorage.getItem("isLogin").toString());
    }
    return user;
}

img = function(user) {
    var img =
    user && user.pic
        ? Meteor.settings.IPFS.file_base_url + this.authorInfo.pic
        : "/static/images/user.png";
    return img;
}