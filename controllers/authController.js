import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { users, getNextUserId } from '../data/mockUsers.js';

const JWT_SECRET = process.env.JWT_SECRET;


export const signup = async (req, res) => {
  const { username, password } = req.body;  

  if (!username || !password) {             
    return res.status(400).json({ error: 'username and password required' });
  }

  const existing = users.find(u => u.username === username); 
  if (existing)
    return res.status(409).json({ error: 'username already taken' });

  const passwordHash = await bcrypt.hash(password, 10);      

  const newUser = {                                          
    id: getNextUserId(),
    username,
    passwordHash
  };

  users.push(newUser);         
  
  console.log('Users now:', users);

  res.status(201).json({ id: newUser.id, username: newUser.username }); 
};

export const login = async (req, res) => {
    const {username, password} = req.body;

    const user = users.find(u => u.username === username);

    if(!user){
        return res.status(401).json({error: "No user with that username. Please sign-up"})
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);

    if(!passwordOk){
        return res.status(401).json({error: "Username and password do not match"});
    }

    const payload = {id: user.id, username: user.username};
    
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1h"});

    console.log('Bearer token created: ');

    res.json({token});
}