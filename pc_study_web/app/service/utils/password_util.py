from werkzeug.security import generate_password_hash,check_password_hash

def password_encryption(str):
    temp = generate_password_hash(str, method="pbkdf2:sha1:2000", salt_length=8)
    return temp

def password_check(hashstr, newstr):
    res = check_password_hash(hashstr, newstr)
    return res

if __name__ == '__main__':
    s1 = '123qwe'
    st = password_encryption(s1)
    print(st)
    s2 = '123qwe'
    res = password_check(st, s2)
    print(res)