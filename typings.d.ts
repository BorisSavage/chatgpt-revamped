interface Message {
    text: string;
    createdAt: admin.fitestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    };
}
