const db = require('../config/connection');
const { User, Group, Topic } = require('../models');
const userSeeds = require('./userSeeds.json');
const groupSeeds = require('./groupSeeds.json');
const topicSeeds = require('./topicSeeds.json')
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');

    await cleanDB('Topic', 'topics');

    await cleanDB('Group', 'groups');

    await User.create(userSeeds);

    await Topic.create(topicSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }

    for (let i=0; i < groupSeeds.length; i++) {
      const randomUser = Math.floor(Math.random() * userSeeds.length);
      const randomTopic = Math.floor(Math.random() * topicSeeds.length);
      const user = await User.findOne({user_name: userSeeds[randomUser].user_name});
      const topic = await Topic.findOne({topic_name: topicSeeds[randomTopic].topic_name});

      const group = await Group.create({ group_name: groupSeeds[i].group_name, group_description: groupSeeds[i].group_description, topic_id: topic._id, skill_level: groupSeeds[i].skill_level, zoom_link: groupSeeds[i].zoom_link, meet_time: groupSeeds[i].meet_time, created_by: user._id });
      await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { groups: group._id } }
      );

    }
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
