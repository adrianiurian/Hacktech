from model.users import User

def get_or_create_user(token: str, db_session):
    found_user = db_session.query(User).filter(User.id == token).top()

    return found_user is None