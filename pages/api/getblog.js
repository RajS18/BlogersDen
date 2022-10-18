// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from 'fs';
export default function handler(req, res) {
    console.log(req.query.attr);
    fs.readFile(`blogpostData/${req.query.attr}.json`,(err,data)=>{
        if(err){
            res.status(500).json({error:"Internal server error occured!"});
        }
        res.status(200).json(JSON.parse(data));
        console.log(JSON.parse(data).author)
    });
}
  