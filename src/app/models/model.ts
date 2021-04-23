export class UserModel {
    id = '';
    name = '';
    email = '';
    password = '';
    profilePic = '';
    ghostMode = '';
    status = 0;
}

export class Chat {
    cId = '';
    chatTitle = '';
    between: [];
}

export class Message {
    mId = '';
    cId = '';
    from = '';
    to = '';
    data = '';
    status = 0;
    createdAt: Date;
    updatedAt: Date;
}
