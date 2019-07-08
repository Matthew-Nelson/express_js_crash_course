const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// gets all of our members
router.get('/', (req, res) => {
    res.json(members);
});

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }

});

// Create Member
router.post('/', (req, res) => {

    // at this point, this is why the data that is returned to us is just spit back out at us. We are not handling it in any specific way yet.
    // res.send(req.body);
        
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    };

    if(!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: `Please include the following fields: ${!newMember.name ? 'name<br>' : ''} ${!newMember.email ? 'email<br>' : ''}` })
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');

});

// Update member
    // put requests will edit existing data
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;

        console.log(updMember);

            // this way (my way) is much shittier because it is looking to replace the whole object in the array instead of just going in and editing the existin object
        // const memberIndex = members.indexOf(members.find(updMember => updMember.id === parseInt(req.params.id)));
        // members[memberIndex] = updMember;

        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({
                    msg: "Member Updated",
                    member 
                });
            }
        });

    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

// delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found) {
        res.json({ msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }

});


module.exports = router;