const dbconnection =require('../config/config');

//view agent
const agent =  (req, res) => {
    dbconnection.query('SELECT * FROM android_users', (error, results, fields) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Database error' });
      } else {
        console.log(results);
        res.status(200).json(results);
      }
    });
  };
  
//add agent
 const add_agent =(req, res) => {
        if (req.method === 'POST') {
      const { mobile_no, bonus, referred_count, treated_count } = req.body;
      
      if (!mobile_no || !bonus || !referred_count || !treated_count) {

        return res.status(404).json({
            message:'Invalid request body'
        });
      }
      const otp = generateOTP(); 

      const data = {
        mobile_no,
        bonus,
        referred_count,
        treated_count,
        otp,
      };
  
      dbconnection.query('INSERT INTO android_users SET ?', data, (error, result) => {
        if (error) {
          console.error('Error inserting agent:', error);
          return res.status(500).json({
            message: 'Internal server error',
          });
        } else {
          console.log('Agent added successfully');
          return res.status(200).json({
            message: 'Agent added successfully',
          });

        }
      });
    }
  };
  
  function generateOTP(){
    const otpLength = 4;
    let otp = '';
    for(let i = 0;i<otpLength;i++){
      otp += Math.floor(Math.random()*10);
    }
    return otp;
  }


//edit agent

const edit_agent = (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const user_id = req.params.user_id; 
    const { mobile_no, bonus, referred_count, treated_count } = req.body;

    if (!mobile_no || !bonus || !referred_count || !treated_count) {
      return res.status(400).json({
        message: 'Invalid request body',
      });
    }

    const data = {
      mobile_no,
      bonus,
      referred_count,
      treated_count,
    };

    dbconnection.query(
      'UPDATE android_users SET ? WHERE user_id = ?',
      [data, user_id],
      (error, result) => {
        if (error) {
          console.error('Error updating agent:', error);
          return res.status(500).json({
            message: 'Internal server error',
          });
         
        } else if (result.affectedRows === 0) {
          return res.status(404).json({
            message: 'Agent not found',
          });
        } else {
          return res.status(200).json({
            message: 'Agent updated successfully',
          });
        }
      }
    );
  } else {
    return res.status(405).json({
      message: 'Method Not Allowed',
    });
  }
};

//delete agent
const delete_agent = (req, res)=> {
  var user_id= req.params.user_id;
    var sql = 'DELETE FROM android_users WHERE user_id = ?';
    dbconnection.query(sql, [user_id], function (err, data) {
    if (err) {;
    console.log(data.affectedRows + " record(s) updated");
    return res.status(500).json({
      message: 'Internal server error',
    });
  }else{
    return res.status(200).json({
      message: 'Agent deleted successfully',
    });
  }
});
  

};


module.exports = {agent,add_agent,edit_agent,delete_agent}