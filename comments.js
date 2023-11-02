//Create Web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');
var Post = require('./models/post');
var cors = require('cors');
var port = process.env.PORT || 3000;
var router = express.Router();
var db = mongoose.connect('mongodb://localhost:27017/comments');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
//Get all comments
router.route('/comments').get(function(req,res){
    Comment.find(function(err,comments){
        if(err){
            res.send(err);
        }
        res.json(comments);
    });
});
//Get comment by id
router.route('/comments/:id').get(function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(err){
            res.send(err);
        }
        res.json(comment);
    });
});
//Create comment
router.route('/comments').post(function(req,res){
    var comment = new Comment(req.body);
    comment.save(function(err){
        if(err){
            res.send(err);
        }
        res.send({message:'Comment Added'});
    });
});
//Update comment
router.route('/comments/:id').put(function(req,res){
    Comment.findOne({_id:req.params.id},function(err,comment){
        if(err){
            res.send(err);
        }
        for(prop in req.body){
            comment[prop] = req.body[prop];
        }
        comment.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Comment updated'});
        });
    });
});
//Delete comment
router.route('/comments/:id').delete(function(req,res){
    Comment.remove({_id:req.params.id},function(err,comment){
        if(err){
            res.send(err);
        }
        res.json({message:'Comment deleted'});
    });
});
//Get all posts
router.route('/posts').get(function(req,res){
    Post.find(function(err,posts){
        if(err){
            res.send(err);
        }
        res.json(posts);
    });
});
//Get post by id


//Create post
router.route('/posts').post(function(req,res){
    var post = new Post(req.body);
    post.save(function(err){
        if(err){
            res.send(err);
        }
        res.send({message:'Post Added'});
    });
});
//Update post
router.route('/posts/:id').put(function(req,res){
    Post.findOne({_id:req.params.id},function(err,post){
        if(err){
            res.send(err);
        }
        for(prop in req.body){
            post[prop] = req.body[prop];
        }
        post.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message:'Post updated'});
        });
    });
});
//Delete post
router.route('/posts/:id').delete(function(req,res){
    Post.remove({_id:req.params.id},function(err,post){
        if(err){
            res.send(err);
        }
        res.json({message:'Post deleted'});
    });
});
app.use('/api',router);
app.listen(port);
console.log('Server running on port ' + port);


// Path: models/comment.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
    text:String,
    
});
module.exports = mongoose.model('Comment',CommentSchema);


// Path: models/post.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    text:String,
    comments:[{type:Schema.Types.ObjectId,ref:'Comment'}]
});
module.exports = mongoose.model('Post',PostSchema);
