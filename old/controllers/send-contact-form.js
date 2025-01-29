"use strict";
const sgMail = require("@sendgrid/mail");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handleSendingContactForm = (req, res) => {
  const { customerName, email, message } = req.body;

  const msg = {
    to: `${email}`,
    from: `${process.env.AUTHOR_EMAIL}`,
    // Subject line
    subject: `Shop Tunnel - An ecommerce Platform`,
    // plain text bodynpm
    // text: 'Hello world?',
    // don't allow sending html below
    html: `
      <table style="overflow-x:auto;width:100%;max-width:600px;border:1px solid black;margin:auto">
        <tr style="height:50px;background:lightgray">
          <th style="border-bottom:1px solid black;">Shop Tunnel - Customer Support Email</th>
        </tr>
        <tr style="overflow-x:auto;width:100%;border:1px solid black;background:#def;">
          <td style="padding:30px;">
            <p>Hello,</p>
            <p>${customerName}</p>
            <p>Thank you for contacting us. We will respond to your message within 2-3 business days.
            <p>
            <table>
              <tr>
                <td style="background-color:lightgray;padding:10px;cursor:pointer;">
                  <h3 style="padding:auto;margin:auto">Your message: ${message}</h3>
                </td>
              </tr>
            </table>
            <p>Thank you!<br/>- The Shop Tunnel team</p>
          </td>
        </tr>
      </table>
  `,
  };
  sgMail
    .send(msg)
    .then((sent) => {
      return res.status(200)
        .json(`Your email was sent successfully. Please check your email and 
              enter the code provided in the email below.`);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400)
        .json(`Something went wrong. Please use the following email
              address to contact us about this issue: ${process.env.AUTHOR_EMAIL}`);
    });
};

module.exports = {
  handleSendingContactForm,
};
