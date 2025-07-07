const Events = require('../models/Events');
const getPagination = require('../utils/pagination');

exports.getEventsPaginated = async (req, res) => {
    const { page, limit, skip } = getPagination(req);
    const status = req.query.status || 'published';

    try {
        const events = await Event.find({ status })
            .select('name summary organization mode eventDate venue tags posterUrl')
            .populate('organization', 'name')
            .skip(skip)
            .limit(limit)
            .sort({ eventDate: 1 });
        
        const total = await Event.countDocuments({ status });

        res.json({ total, page, limit, data: events });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getEventById = async (req, res) => {
    try {
        const event = await Events.findById(req.params.id).populate('organization', 'name');
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json(event);
    } catch(err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}