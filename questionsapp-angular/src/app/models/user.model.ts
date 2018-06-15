class User {
    _id:string;
    username:string;
    password:string;
    session_id:string;
    logged_in:boolean;

    constructor () {
        this.username = ""
        this.password = ""
        this.session_id = ""
        this.logged_in = false;
    }
}

export default User;