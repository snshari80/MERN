import bcrypt from "bcrypt";
const saltRounds = process.env.SALTROUNDS;

export const encryptPassword = async (data)=>{
const hashedPassword = await new Promise((resole,reject)=>{
            bcrypt.genSalt(saltRounds, async function(err, salt) {
                bcrypt.hash(data, salt, async function(err, hash) {
                   resole(hash)
                });
                })
        });
        return hashedPassword;
}
export const decryptPassword = async (data, storedHash)=> {
        const resolvePass = new Promise((resolve,reject)=>{
                bcrypt.compare(data, storedHash, function(err, res) {
                        if(err) throw err
                         resolve(res)
                                });
        })
return resolvePass;
}
