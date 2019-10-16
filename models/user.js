const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => !v.match(/[^a-zA-Zа-яА-Я\s-]/),
      message: (props) => `${props.value} is not a valid Name for User!`,
    },
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    validate: {
      validator: (v) => !v.match(/[^a-zA-Zа-яА-Я\s-.?,!_]/),
      message: (props) => `${props.value} is not a valid About field for User!`,
    },
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => v.match(/^https?:\/\/(www\.)?[\w./-]{1,}/),
      message: (props) => `${props.value} is not a valid URL!`,
    },
    required: true,
  },
})

module.exports = mongoose.model('user', userSchema)
