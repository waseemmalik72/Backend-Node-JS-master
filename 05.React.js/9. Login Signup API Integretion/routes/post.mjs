import express from "express";
// import { nanoid } from "nanoid";
import { client, openAi } from "../mongodb.mjs";
import { ObjectId } from "mongodb";
const router = express.Router();

const db = client.db("Cruddb");
const col = db.collection("VectorPost");
const col2 = db.collection("user");

const getProfileMiddleware = async (req, res, next) => {
  const userId = req.params.userId || req.body.decoded._id;
  // console.log(userId);
  if (!ObjectId.isValid(userId)) {
    res.status(403).send(`userId id must be a valid id`);
    return;
  }

  try {
    const result = await col2.findOne({ _id: new ObjectId(userId) });
    console.log("hello world");
    res.send({
      message: "Ok",
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

router.get("/profile", getProfileMiddleware);
router.get("/profile/:userId", getProfileMiddleware);

router.post("/post", async (req, res, next) => {
  if (!req.body.title || !req.body.text) {
    res.status(403);
    res.send(`Sorry Required Parameter is Missing Type something like this {
            title: "type title",
            text: "type text",
        }`);
    return;
  }

  try {
    let posts = {
      title: req.body.title,
      text: req.body.text,
      authorEmail: req.body.decoded.email,
      authorId: new ObjectId(req.body.decoded._id),
      createdOn: new Date(),
    };

    const p = await col.insertOne(posts);
    console.log(req.body);
    console.log(posts._id);
    res.send("Post Created");
  } catch (e) {
    console.log("error inserting mongodb: ", e);
    res.status(500).send("server error, please try later");
  }
});

router.get("/post", async (req, res, next) => {
  let userId = req.query.userId || req.body.decoded._id;

  if (!ObjectId.isValid(userId)) {
    res.status(403).send(`userId id must be a valid id`);
    return;
  }
  let cursor = col
    .find({ authorId: new ObjectId(userId) })
    .sort({ _id: -1 })
    .limit(100);
  try {
    let result = await cursor.toArray();
    res.send(result);
  } catch (e) {
    console.log("error getting data mongodb: ", e);
    res.status(500).send("server error, please try later");
  }
});

router.get(`/post/search`, async (req, res, next) => {
  if (!req.query.q) {
    res.status(403).send(`post id must be a valid id`);
    return;
  }
  try {
    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: req.query.q,
    });

    const vector = embedding?.data[0]?.embedding;

    const result = await col
      .aggregate([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: vector,
            numCandidates: 100,
            limit: 10,
          },
        },
        {
          $project: {
            embedding: 0,
            scoreDetails: { $meta: "searchScore" },
            score: { $meta: "vectorSearchScore" },
          },
        },
      ])
      .toArray();

    // result.map((doc) => console.log(JSON.stringify(doc)));

    // console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error, please try later");
  }
});

router.delete("/post/:postId", async (req, res, next) => {
  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send(`post id must be a valid id`);
    return;
  }

  // let myId = req.params.postId;
  // let objectId = new ObjectId(myId);

  try {
    let deletePost = await col.deleteOne({
      _id: new ObjectId(req.params.postId),
    });
    console.log(deletePost);
    if (deletePost.acknowledged) {
      console.log("deleteResponse: ", deletePost);
      res.send("your data has been successfully deleted");
    } else {
      res.send("post not found with id " + req.params.postId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("an error occurred while deleting post");
  }
});

router.put("/post/:postId", async (req, res, next) => {
  if (!ObjectId.isValid(req.params.postId)) {
    res.status(403).send("your id is not valid");
    return;
  }

  if (!req.body.text && !req.body.title) {
    res.status(403)
      .send(`required parameter missing, atleast one key is required.
        example put body: 
        PUT     /api/v1/post/:postId
        {
            title: "updated title",
            text: "updated text"
        }
        `);
    return;
  }

  try {
    let update = await col.updateOne(
      { _id: new ObjectId(req.params.postId) },
      {
        $set: {
          title: req.body.title,
          text: req.body.text,
        },
      }
    );
    if (!update.upsertedId) {
      res.send("your Data has been successfully Update");
    } else {
      res.send("Your id is not correct");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("an error occurred while updating post");
  }
});

export default router;
