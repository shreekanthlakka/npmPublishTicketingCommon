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
    LeetCodeProblemDeleted: "leetcode:problem:deleted",
    LeetCodeProblemUpdated: "leetcode:problem:updated",
    UserLoggedIn: "user:loggedin",
    UserCreated: "user:created",
    JobCompletedStatus: "job:completed:status",
    OrderCreated: "order:created",
    OrderUpdated: "order:updated",
    OrderCancelled: "order:cancelled",
    PaymentStatus: "payment:status",
});

export { Subjects, LeetCodeSubjects };
