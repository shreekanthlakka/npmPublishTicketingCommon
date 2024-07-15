const Subjects = Object.freeze({
    TicketCreated: "ticket:created",
    TicketUpdated: "ticket:updated",
    OrderUpdated: "order:updated",
    OrderCreated: "order:created",
    OrderDeleated: "order:deleated",
    OrderCancelled: "order:cancelled",
    ExpirationComplete: "expiration:complete",
    PaymentCreated: "payment:created",
});

const LeetCodeSubjects = Object.freeze({
    LeetCodeProblemCreated: "leetcode:problem:created",
    LeetCodeProblemSubmitted: "leetcode:problem:submitted",
    UserLoggedIn: "user:loggedin",
    JobCompletedStatus: "job:completed:status",
});

export { Subjects, LeetCodeSubjects };
