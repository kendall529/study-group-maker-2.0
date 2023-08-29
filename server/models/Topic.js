const { Schema, model } = require('mongoose');

const topicSchema = new Schema({
  topic_name: {
    type: String,
    required: true,
  },
});

const Topic = model('Topic', topicSchema);

module.exports = Topic;
