const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStorage = require('passport-local').Strategy;
const { JWT_SECRET }  = require('./config');
const User = require('./models/usersModel');

// JSON WEB TOKENS STRATEGY ( 토큰 검증, 유효성 검사 )
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    
    try {
        // 토큰 찾기
        const user = await User.findById(payload.sub); // 토큰.sub는 user의 id값이였음.

        // 존재하지 않는 user라면
        if(!user){
            return done(null, false); // 사용자값을 null로 return
        }

        // 존재한다면 user를 return (return은 생략가능)
        done(null, user);
    }catch{
        done(error.false);
    }

}));

// LOCAL STRATEGY
passport.use(new LocalStorage({
    usernameFiled: 'email'
}, async (email, password, done) => {
    
    // Find the user given the email
    const user = await User.findOne({email});

    if(!user){
        return done(null, false);
    }

    // Check if the password is correct

    // If not, handle it

    // Otherwise, return the user

}));