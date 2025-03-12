import Leave from "../models/leave.js";

export function requestLeave(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Please log in and try again" });
    }
    const data = req.body;
    data.email = req.user.email;
    data.name = req.user.firstName + " " + req.user.lastName;
    
    const newLeave = new Leave(data);
    newLeave.save()
        .then(() => res.json({ message: "Leave request submitted successfully" }))
        .catch(() => res.status(500).json({ message: "Failed to submit leave request" }));
}

export function getLeaveRequests(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Please log in and try again" });
    }
    if (req.user.role === "admin") {
        Leave.find()
            .then((requests) => res.json(requests))
            .catch(() => res.status(500).json({ message: "Failed to retrieve leave requests" }));
    } else {
        Leave.find({ email: req.user.email })
            .then((requests) => res.json(requests))
            .catch(() => res.status(500).json({ message: "Failed to retrieve your leave requests" }));
    }
}

export function deleteLeaveRequest(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Please log in and try again" });
    }
    const leaveId = req.params.id;
    Leave.findOneAndDelete({ _id: leaveId, email: req.user.email })
        .then((result) => {
            if (result) res.json({ message: "Leave request deleted successfully" });
            else res.status(403).json({ message: "Not authorized to delete this leave request" });
        })
        .catch(() => res.status(500).json({ message: "Failed to delete leave request" }));
}

export function updateLeaveRequest(req, res) {
    if (!req.user) {
        return res.status(401).json({ message: "Please log in and try again" });
    }
    const leaveId = req.params.id;
    Leave.findOneAndUpdate({ _id: leaveId, email: req.user.email }, req.body, { new: true })
        .then((updatedLeave) => {
            if (updatedLeave) res.json({ message: "Leave request updated successfully", updatedLeave });
            else res.status(403).json({ message: "Not authorized to update this leave request" });
        })
        .catch(() => res.status(500).json({ message: "Failed to update leave request" }));
}

export function approveLeaveRequest(req, res) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to approve leave requests" });
    }
    const leaveId = req.params.id;
    Leave.findByIdAndUpdate(leaveId, { status: "Approved" }, { new: true })
        .then(() => res.json({ message: "Leave request approved successfully" }))
        .catch(() => res.status(500).json({ message: "Failed to approve leave request" }));
}

export function rejectLeaveRequest(req, res) {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "You are not authorized to reject leave requests" });
    }
    const leaveId = req.params.id;
    Leave.findByIdAndUpdate(leaveId, { status: "Rejected" }, { new: true })
        .then(() => res.json({ message: "Leave request rejected successfully" }))
        .catch(() => res.status(500).json({ message: "Failed to reject leave request" }));
}