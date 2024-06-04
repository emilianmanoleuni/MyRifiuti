const MailerSend = require('mailersend')

const mailerSend = new MailerSend.MailerSend({
  apiKey: process.env.MAILSENDER_API_KEY
});

module.exports = {
  async sendEmail(req, res) {
    
    try {   
      const {userName, userEmail, subject, text} = req.body
      console.log(process.env.MAILSENDER_API_KEY)

      const recipients = [new MailerSend.Recipient(userEmail, userName)];
      const sender = new MailerSend.Sender("MS_aXfrP7@trial-jy7zpl9x7n0l5vx6.mlsender.net", "MyRifiuti")
      
      const emailParams = new MailerSend.EmailParams()
        .setFrom(sender)
        .setTo(recipients)
        .setSubject(subject)
        .setText(text);
        
      

      await mailerSend.email.send(emailParams);

      res.status(201).json( {message: 'Email sent successfully'} )
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
}




