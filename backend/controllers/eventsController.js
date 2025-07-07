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

exports.updateEvent = async (req, res) => {
    try {
        const allowedFields = [
            'name', 'summary', 'mode', 'eventDate', 'venue', 'eligibility', 'teamSize',
            'entryFee', 'registrationDeadline', 'fullEventDescription', 'prizes',
            'tags', 'contactNumber', 'contactName', 'contactEmail', 'posterUrl', 'rules',
            'maxParticipants'
        ];

        const updates = {};
        for (let key of allowedFileds) {
            if (req.body[key] != undefined) updates[key] = req.body[key];
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, {
            new: true
        });

        if (!updatedEvent) return res.status(404).json({ message: 'Event not found to update' });

        res.json({ message: 'Event updated successfully', event: updatedEvent });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.archiveEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { isArchived: true, status: 'archived'},
            { new: true }
        );
        
        if (!event) return res.status(404).json({ message: 'Event not found to archive' });

        res.json({ message: 'Event archived successfully', event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found to delete' });

        res.json({ message: 'Event deleted successfuly' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.publishEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            { status: 'published', isArchived: false },
            { new: true }
        );

        if (!event) return res.status(404).json({ message: 'Event not found to Publish' });

        res.json({ message: 'Event published successfully', event });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to publish event' });
    }
}