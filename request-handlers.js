import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginModel from "./login.model.js";
import moviesModel from "./movies.model.js";

const {sign}=jwt;


export async function register(req,res){
    try{
        let{username,email,password}=req.body;
        // console.log(username);
        if(!username || !email || !password){
            return res.status(400).json({
                msg:"username,email,password cannot be empty!"
            })
        }
        let userExist = await loginModel.findOne({username});
        if(userExist){
           return res.status(400).json({
                msg:"user already exist"
            })
        }
        let hashedpass = await bcrypt.hash(password,10)
        await loginModel.create({
            username,
            email,
            password:hashedpass,
            // profile
           });
           return res.status(201).json({
            msg:"registration successful"
           });        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg:"error occured"
        })
    }
}
export async function login(req,res){
    try{
        let {username,password}=req.body;
        
        let user = await loginModel.findOne({username});
        
        if(!user){
            return res.status(400).json({
                msg:"invalid username or password!"
            })
        }
        
        let Valid= await bcrypt.compare(password,user.password);
        if(Valid){
            let token = await sign({
                username:user.username,
                userId:user._id
            
            },process.env.SECRET_KEY,{
                expiresIn:"24h"
            } );
            return res.status(200).json({
                msg:"login successful",
                token
            })
        }
        return res.status(400).json({
            msg:"invalid username or password"
        })
    }catch
        (error){
            console.log(error);
            return res.status(500).json({
                msg:"error occured"
            });
        }
    }

    // export async function movies(req,res){
    //     try {
    //         let {userId}=req.user;
    //         let user = await loginModel.findOne({_id:userId},{password:0},{image});
    
          
    //         console.log(user);
    //         return res.status(200).json({
    //             msg:"Authorised",
    //             user,
                
    //         })
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             msg:"error occured"
    //         });
            
    //     }
    // }
    // export async function index(req,res){


        
    // }

    export async function movies(req, res) {
        try {
          let { userId } = req.user;
          let { profile, title, description } = req.body;
          let user = await moviesModel.create({ profile, title, description });
          console.log(user);
          return res.status(201).json({
            msg: "data uploaded",
            user,
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            msg: "error occured",
          });
        }
      }

    //   export async function add(req, res) {
    //     try {
    //       const { discription } = req.body;
    //       const images = req.files.map((file) => file.originalname);
      
    //       // Assuming you have a "movies" model
    //       const movie = Movie.create({
    //         discription,
    //         images,
    //       });
      
    //       return res.status(200).json({
    //         msg: "Movie added successfully",
    //         movie,
    //       });
    //     } catch (error) {
    //       console.error(error);
    //       return res.status(500).json({
    //         msg: "Error occurred",
    //       });
    //     }
    //   }

    

    export async function index(req, res) {
      try {
        

        const movies = await moviesModel.find();
        console.log(movies);
        return res.status(200).json({
          msg: "Movies retrieved successfully",
         movies
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          msg: "Error occurred while retrieving movies",
        });
      }
    };
    

    