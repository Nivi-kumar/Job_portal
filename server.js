const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const db = "mongodb://localhost:27017/job"
const PORT =5000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection setup
mongoose
  .connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error");
  });

const Schema = mongoose.Schema
const recruiter = new Schema({
  name : String,
  email: String,
  password: String,
})

let registerrecruiter = mongoose.model("recruiter", recruiter);


app.post('/register-recruiter',(req,res) =>{
  let userData = req.body
  let user = new registerrecruiter(userData);
  console.log('1');
  user.save()
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  })
})

const seeker = new Schema({
  name : String,
  email: String,
  password: String,
  skills: String
})


let registerseeker = mongoose.model("seeker", seeker);


app.post('/register-seeker',(req,res) =>{
  let userData = req.body
  let user = new registerseeker(userData);
  console.log('1');
  user.save()
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  })
})


const job = new Schema({
  title : String,
  description: String,
  company: String,
  skills: String
})


let postjob = mongoose.model("job",job );


app.post('/postjob',(req,res) =>{
  let userData = req.body
  let user = new postjob(userData);
  console.log('1');
  user.save()
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  })
})

const ajob = new Schema({
  title : String,
  name: String,
  company: String,
  skills: String
})


let applyjob = mongoose.model("ajob",ajob );


app.post('/apply-job',(req,res) =>{
  let userData = req.body
  let user = new applyjob(userData);
  console.log('1');
  user.save()
  .then(result => {
      console.log(result);
  })
  .catch(error => {
      console.log(error);
  })
})


app.post('/seeker-login', (req, res) => {
  let userData = req.body;
  console.log('seeker login - 1')
  registerseeker.findOne({ email: userData.email }).exec()
    .then(user => {
      if (!user || user.length === 0) {
        res.status(401).send('Invalid username');
        return;
      }

      if (user.password !== userData.password) {
        res.status(401).send('Invalid password');
        return;
      }
      console.log('seeker login - success')
      res.status(200).send(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/recruiter-login', (req, res) => {
  let userData = req.body;
  console.log('recruiter login - 1')
  registerrecruiter.findOne({ email: userData.email }).exec()
    .then(user => {
      if (!user || user.length === 0) {
        res.status(401).send('Invalid username');
        return;
      }

      if (user.password !== userData.password) {
        res.status(401).send('Invalid password');
        return;
      }
      console.log('recruiter login - success')
      res.status(200).send(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/delete', (req, res) => {
  let email = req.body.email;
  registerseeker.deleteOne({ email: email })
    .then(result => {
      if (result.deletedCount === 0) {
        console.log('User not found');
        return res.status(404).send({message:'User not found'});
      }
      console.log('User deleted successfully');
      res.status(200).send({message:'User deleted successfully'});
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      res.status(500).send({message:'Internal Server Error'});
    });
});



app.post('/update', (req, res) => {
  let { email, oldpass, newpass } = req.body;

  // Check if the user exists and the old password matches
  registerseeker.findOne({ email: email, password: oldpass })
    .then(user => {
      if (!user) {
        console.log('User not found or incorrect old password');
        return res.status(404).send('User not found or incorrect old password');
      }
      // Update the password to newpass
      user.password = newpass;
      return user.save();
    })
    .then(() => {
      console.log('Password updated successfully');
      res.status(200).send('Password updated successfully');
    })
    .catch(error => {
      console.error('Error updating password:', error);
      res.status(500).send('Internal Server Error');
    });
});




app.post('/post-job', async (req, res) => {
  try {
    // Extract job details from request body
    const { title, description, company, skills } = req.body;

    // Access the job collection in the database
    const db = client.db('jobapp');
    const collection = db.collection('jobs');

    // Create a document to insert into the collection
    const job = {
      title: title,
      description: description,
      company: company,
      skills: skills
    };

    // Insert the job document into the collection
    const result = await collection.insertOne(job);

    // Send response indicating success
    if (result.insertedCount === 1) {
      res.status(200).json({ status: true, message: 'Job posted successfully' });
    } else {
      res.status(500).json({ status: false, message: 'Failed to post job' });
    }
  } catch (error) {
    // Handle errors
    console.error('Error posting job:', error);
    res.status(500).json({ status: false, message: 'Failed to post job' });
  }
});

app.post('/show', (req, res) => {
  console.log('1');
  applyjob.find({ skills: req.body.skills }).exec()
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/show1', (req, res) => {
  console.log('1');
  postjob.find({ skills: req.body.skills }).exec()
    .then(data => {
      res.json(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});



