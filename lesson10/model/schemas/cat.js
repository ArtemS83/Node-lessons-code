const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => data || [],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        delete ret.fullName
        return ret
      },
    },
  },
)

catSchema.virtual('fullName').get(function () {
  return `This is cat ${this.name} - ${this.age} old`
})

catSchema.path('name').validate((value) => {
  const re = /[A-Z]\w+/
  return re.test(String(value))
})

catSchema.plugin(mongoosePaginate)

const Cat = mongoose.model('cat', catSchema)

module.exports = Cat
