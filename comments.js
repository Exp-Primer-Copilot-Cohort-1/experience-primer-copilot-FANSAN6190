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

```

## 3.2.2. Create a new comment
    
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"text":"My comment"}' http://localhost:3000/api/comments
    ```
        
        ```json
        {"message":"Comment Added"}
        ```
        
        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{"text":"My comment"}' http://localhost:3000/api/comments
        ```
        
        ```json
        {"message":"Comment Added"}
        ```
        
        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{"text":"My comment"}' http://localhost:3000/api/comments
        ```
        
        ```json
        {"message":"Comment Added"}
        ```
        
        ```bash

## 3.2.3. Get all comments
        
        ```bash
        curl -X GET http://localhost:3000/api/comments
        ```
            
            ```json
            [{"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1e","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1f","text":"My comment","__v":0}]
            ```
            
            ```bash
            curl -X GET http://localhost:3000/api/comments
            ```
            
            ```json
            [{"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1e","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1f","text":"My comment","__v":0}]
            ```
            
            ```bash
            curl -X GET http://localhost:3000/api/comments
            ```
            
            ```json
            [{"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1e","text":"My comment","__v":0},{"_id":"58a6c5f1f36d282c7c7f8d1f","text":"My comment","__v":0}]
            ```
            
            ```bash

## 3.2.4. Get a comment by id
            
            ```bash
            curl -X GET http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
            ```
                
                ```json
                {"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0}
                ```
                
                ```bash
                curl -X GET http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
                ```
                
                ```json
                {"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0}
                ```
                
                ```bash
                curl -X GET http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
                ```
                
                ```json
                {"_id":"58a6c5f1f36d282c7c7f8d1d","text":"My comment","__v":0}
                ```
                
                ```bash

## 3.2.5. Update a comment

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"text":"My updated comment"}' http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment updated"}
```

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"text":"My updated comment"}' http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment updated"}
```

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"text":"My updated comment"}' http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment updated"}
```

```bash

## 3.2.6. Delete a comment

```bash
curl -X DELETE http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment deleted"}
```

```bash
curl -X DELETE http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment deleted"}
```

```bash
curl -X DELETE http://localhost:3000/api/comments/58a6c5f1f36d282c7c7f8d1d
```

```json
{"message":"Comment deleted"}
```

```bash

## 3.2.7. Create a new post

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"My post"}' http://localhost:3000/api/posts
```

```json
{"message":"Post Added"}
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"My post"}' http://localhost:3000/api/posts
```

```json
{"message":"Post Added"}
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{"text":"My post"}' http://localhost:3000/api/posts
```

```json
{"message":"Post Added"}
```

```bash

## 3.2.8. Get all posts

```bash

## 3.2.9. Get a post by id

```bash

## 3.2.10. Update a post

```bash

## 3.2.11. Delete a post

```bash

## 3.3. Test the API with Postman

## 3.3.1. Create a new comment

## 3.3.2. Get all comments

## 3.3.3. Get a comment by id

## 3.3.4. Update a comment

## 3.3.5. Delete a comment

## 3.3.6. Create a new post

## 3.3.7. Get all posts

## 3.3.8. Get a post by id

