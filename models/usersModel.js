const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Create a schema
const userSchema = new Schema({
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // }

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true,
            required: true
        }, password: {
            type: String,
            required: true
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});

userSchema.pre('save', async function(next) {
    try{
        console.log('entered');

        // 소셜 로그인은 비번을 암호화 할 필요없어서 패스
        if(this.method !== 'local'){
            next();
        }

        // 아래는 비번을 암호화 하는 과정 (소셜로그인은 안함)

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        
        // Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        console.log('exited');
        next();

    }catch(error){
        next(error);
    }
})

// 패스워드 검증 함수 (회원가입 할 때??)
userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.local.password);
    }catch(error){
        throw new Error(error);
    }
}

const User = mongoose.model('user', userSchema);
module.exports = User;