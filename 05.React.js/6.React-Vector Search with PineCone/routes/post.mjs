import express from "express";
import { customAlphabet } from "nanoid";
import { client } from "../mongodb.mjs";
import { ObjectId } from "mongodb";
import pineconeClient, { openAi } from "../pinecone.mjs";

const nanoid = customAlphabet("1234567890abcdef", 10);
const pcIndex = pineconeClient.Index(process.env.PINECONE_INDEX_NAME);
const db = client.db("Cruddb");
const col = db.collection("Manager");
const router = express.Router();

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
    // let posts = {
    //   title: req.body.title,
    //   text: req.body.text,
    // };

    // const p = await col.insertOne(posts);
    // console.log(req.body);
    // console.log(posts._id);
    // res.send("Post Created");

    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${req.body.title} ${req.body.text}`,
    });

    const vector = embedding?.data[0]?.embedding;

    await pcIndex.upsert([
      {
        id: nanoid(),
        values: vector,
        metadata: {
          title: req.body.title,
          text: req.body.text,
          // created_at: new Date().toISOString(),
        },
      },
    ]);

    res.send("you'r data has been successfully submitted");
    // console.log(vector);
  } catch (e) {
    console.log("error inserting Pinecone: ", e);
    res.status(500).send("server error, please try later");
  }
});

router.get("/post", async (req, res, next) => {
  // let cursor = col.find({}).sort({ _id: -1 }).limit(100);

  try {
    // let result = await cursor.toArray();
    // res.send(result);
    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: "",
    });

    const vector = embedding?.data[0]?.embedding;

    const pcQuery = await pcIndex.query({
      vector: vector,
      topK: 10000,
      includeMetadata: true,
    });

    // console.log(`${pcQuery.matches.length} records found `);

    // console.log(pcQuery);
    const formattedOutput = pcQuery.matches.map((eachMatch) => ({
      text: eachMatch?.metadata?.text,
      title: eachMatch?.metadata?.title,
      id: eachMatch?.id,
    }));

    res.send(formattedOutput);
  } catch (e) {
    console.log("error getting data Pinecone: ", e);
    res.status(500).send("server error, please try later");
  }
});

router.get(`/post/search`, async (req, res, next) => {
  // if (!ObjectId.isValid(req.params.postId)) {
  //   res.status(403).send(`Invalid post id`);
  //   return;
  // }
  console.log(req.query.q);
  if (!req.query.q) {
    res.status(403).send(`post id must be a valid id`);
    return;
  }

  // let cursor = col.find({price: {$lte: 77}});
  // let cursor = col.find({
  //     $or: [
  //         { _id: req.params.postId },
  //         { title: "dfsdfsdfsdf" }
  //     ]
  // });

  //   try {
  //     let cursor = await col.findOne({ _id: new ObjectId(req.params.postId) });
  //     res.send(cursor);
  //   } catch (error) {
  //     res.status(500).send("server error, please try later");
  //   }

  try {
    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: req.query.q,
    });

    const vector = embedding?.data[0]?.embedding;

    const pcQuery = await pcIndex.query({
      vector: vector,
      topK: 10000,
      includeMetadata: true,
    });

    const formattedOutput = pcQuery.matches.map((eachMatch) => ({
      text: eachMatch?.metadata?.text,
      title: eachMatch?.metadata?.title,
      id: eachMatch?.id,
    }));

    res.send(formattedOutput);
  } catch (error) {
    res.status(500).send("server error, please try later");
  }
});

router.delete("/post/:postId", async (req, res, next) => {
  if (!req.params.postId) {
    res.status(403).send(`post id must be a valid id`);
    return;
  }

  // let myId = req.params.postId;
  // let objectId = new ObjectId(myId);

  try {
    // let deletePost = await col.findOneAndDelete({
    //   _id: new ObjectId(req.params.postId),
    // });
    // if (deletePost.value) {
    //   console.log("deleteResponse: ", deletePost);
    //   res.send("your data has been successfully deleted");
    // } else {
    //   res.send("post not found with id " + req.params.postId);
    // }

    // console.log(pcDelete.deletedCount);
    // if (pcDelete.deletedCount === 0) {
    //   res.send("post not found with id " + req.params.postId);
    // }

    await pcIndex.deleteOne(req.params.postId);
    const status = await pcIndex.describeIndexStats();
    console.log(status.totalRecordCount);
    res.send("you'r data has been successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(500).send("an error occurred while deleting post");
  }
});

router.put("/post/:postId", async (req, res, next) => {
  // if (!ObjectId.isValid(req.params.postId)) {
  //   res.status(403).send("your id is not valid");
  //   return;
  // }

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
    // let update = await col.updateOne(
    //   { _id: new ObjectId(req.params.postId) },
    //   {
    //     $set: {
    //       title: req.body.title,
    //       text: req.body.text,
    //     },
    //   }
    // );
    // if (!update.upsertedId) {
    //   res.send("your Data has been successfully Update");
    // } else {
    //   res.send("Your id is not correct");
    // }

    const embedding = await openAi.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${req.body.title} ${req.body.text}`,
    });

    const vector = embedding?.data[0]?.embedding;

    const pcUpdate = await pcIndex.upsert([
      {
        id: req?.params?.postId,
        values: vector,
        metadata: {
          title: req.body.title,
          text: req.body.text,
        },
      },
    ]);

    res.send("you'r data has been successfully updated");
  } catch (error) {
    console.log(error);
    res.status(500).send("an error occurred while updating post");
  }
});

export default router;
