const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookPlusTokenStrategy = require('passport-facebook-token');
const config  = require('./config');
const User = require('./models/usersModel');

// JSON WEB TOKENS STRATEGY ( 토큰 검증, 유효성 검사 )
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_SECRET
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

//LOCAL STRATEGY (로컬로 로그인 할 때 쓰임)
passport.use(new LocalStrategy({
    usernameFiled: 'email'
}, async (email, password, done) => {
    
    try{
        // Find the user given the email
        const user = await User.findOne({email});

        if(!user){
            return done(null, false);
        }
    
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);
    
        // If not, handle it
        if(!isMatch){
            return done(null, false);
        }
    
        // Otherwise, return the user
        done(null, user);

    }catch(error){
        done(error,false);
    }
}));



passport.use('googleToken', new GooglePlusTokenStrategy({
    //clientID: config.oauth.google.clientID,
    //clientSecret: config.oauth.google.clientSecret
    clientID: '480461188243-5g2ot9c2e4r28bat3fbq9r8ad83tr459.apps.googleusercontent.com',
    clientSecret: '3DBxXPR_sfQivZxmVCufRbQQ'
}, async(accessToken, refreshToken, profile, done) => {

    console.log("test");

    // try{
    //     // Should have full user profile over here
    //     console.log('profile', profile);
    //     console.log('accessToken', accessToken);
    //     console.log('refreshToken', refreshToken);
        
    // }catch(error){
    //     done(error, false, error.message);
    // }

}));

passport.use('facebookToken', new FacebookPlusTokenStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret
}, async(accessToken, refreshToken, profile, done) => {

    try{
        // Should have full user profile over here
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const existingUser = await User.findOne({ "facebook.id": profile.id });
        if(existingUser){
            return done(null, existingUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });

        await newUser.save();
        done(null, newUser);
        
    }catch(error){
        done(error, false, error.message);
    }

}));