const express = require('express');

const router = express.Router();

const mySQLConnection = require('../dataBase');

router.get('/', (req,res)=>{
    mySQLConnection.query('select * from employees', (err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }
        else{
            console.error(err);
        }
    });
});

router.get('/:id',(req, res)=>{
    const {id} = req.params;
    console.log(id)
    mySQLConnection.query('select * from employees where id= ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }
        else{
            console.error(err);
        }
    });    
});

router.post('/',(req,res)=>{
    const {id,name, salary} =req.body;    
    const query =`
        
        call employeeAddOrEdit(?,?,?);
    `;
    mySQLConnection.query(query,[id, name, salary], (err,rows, fields)=>{
        if (!err){
            res.json({status:"Employee saved"});
        }
        else{
            console.error(err);
        }
    });
});

router.put('/:id',(req,res)=>{

    const {id} = req.params;
    console.log(id);
    const {name, salary} =req.body;
    const query =`
        
    call employeeAddOrEdit(?,?,?);
    `;

    mySQLConnection.query(query,[id, name, salary],(err,rows,fields)=>{
        if(!err){
            res.json({status:"Employee updated"});    
        }else{
            console.error(err);
        }
    });
    
});

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);

    const query =`
        
    call deleteEmployee(?);
    `;

    mySQLConnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json({status:"Employee deleted"});    
        }else{
            console.error(err);
        }
    });
});
module.exports = router;