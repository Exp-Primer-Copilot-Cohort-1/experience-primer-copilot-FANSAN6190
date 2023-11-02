//Create Web server
const Comment = mongoose.model("Comment", commentSchema);

//Create a new comment
const newComment = new Comment({
    content: "I love this post!",
    date: new Date()
});

//Save the comment
newComment.save(function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Query the comments
Comment.find(function (err, comments) {
    if (err) return console.error(err);
    console.log(comments);
});

//Query one comment
Comment.findOne({ content: "I love this post!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Update a comment
Comment.findOneAndUpdate({ content: "I love this post!" }, { content: "I love this post so much!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Delete a comment
Comment.findOneAndDelete({ content: "I love this post so much!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Create a new comment
const newComment2 = new Comment({
    content: "I love this post!",
    date: new Date()
});

//Save the comment
newComment2.save(function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Query the comments
Comment.find(function (err, comments) {
    if (err) return console.error(err);
    console.log(comments);
});

//Query one comment
Comment.findOne({ content: "I love this post!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Update a comment
Comment.findOneAndUpdate({ content: "I love this post!" }, { content: "I love this post so much!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Delete a comment
Comment.findOneAndDelete({ content: "I love this post so much!" }, function (err, comment) {
    if (err) return console.error(err);
    console.log(comment);
});

//Create a new comment
const newComment3 = new Comment({
    content: "I love this post!",
    date: new Date()
});