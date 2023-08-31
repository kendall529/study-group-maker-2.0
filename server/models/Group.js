const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
	{
		group_name: {
			type: String,
			required: true,
		},
		group_description: {
			type: String,
			required: true,
		},
		topic_id: {
			type: Schema.Types.ObjectId,
			ref: 'Topic',
		},
		skill_level: {
			type: String,
			required: true,
		},
		zoom_link: {
            type: String,
            required: true,
        },
        meet_time: {
            type: String,
			required: true,
        },
		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		}
	}
);

const Group = model('Group', groupSchema);

module.exports = Group;
