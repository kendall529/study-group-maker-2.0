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
			ref: 'topic',
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
            type: Date,
			default: Date.now,
        },
		created_by: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		}
	},
	{
	toJSON: {
      virtuals: true,
    },
	}
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
