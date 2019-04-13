// Joi는 값 검증을 해주는 모듈
const Joi = require('joi');

// 바디에 있는 값을 검증하는 단계
module.exports = {
    validateBody = (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            
            //에러가 있다면 400에러 응답
            if(result.error){
                return res.status(400).json(result.error);
            }
            
            if(!req.value){
                req.value = {};
            }

            req.value['body'] = result.value;
            next();
        }
    },

    // 스키마 세팅
    schemas: {
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
}