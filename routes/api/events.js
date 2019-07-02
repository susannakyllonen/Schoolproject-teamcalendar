const express = require('express')
const config = require('config')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Event = require('../../models/Events.js')

// POST api/posts

router.post(
  '/', 
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('location', 'Location is required')
      .not()
      .isEmpty(),
    check('from', 'Date is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
      })

      const event = await newEvent.save()
      console.log('event saved!')
      res.json(event)

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
)

module.exports = router