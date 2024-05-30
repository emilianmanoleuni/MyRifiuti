const Group = require('../models/Group')

module.exports = {
  async getGroupMembers(req, res) {
    try {
      const groupId = req.params;
      Group.findById(groupId).exec()
      .then((result) => {
        res.status(200).json(result)
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  async createGroup(req, res) {
    try{
      const { userId, role } = req.body;
      const newgroup = new Group({
        members: [{ userId, role }]
      })
      await newgroup.save();

      res.status(201).json({ message: 'Group created successfully'});

    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  async addMember(req, res) {
    try {
      const { groupId, userId, role } = req.body;
    
      const group = await Group.findById(groupId);
      if (!group) {
           return res.status(404).json({ error: 'Group not found' });
        }
    
      group.members.push({ userId, role });

      await group.save();
    
      res.status(200).json({ message: 'Member added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}