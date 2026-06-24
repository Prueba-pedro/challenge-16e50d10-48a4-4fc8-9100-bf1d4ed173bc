const EventEmitter = require('events');

class AuditEvent extends EventEmitter {}

const auditEvent = new AuditEvent();

module.exports = auditEvent;