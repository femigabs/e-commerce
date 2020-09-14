const templates = {
    sendVerificationTemplate: (email, verification_code, id, first_name, last_name) => {
        const name = first_name + " " + last_name;
        return `<html lang="en">
    ​
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
    ​
        <title></title>
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,600,700,800&display=swap" rel="stylesheet">
    ​
        <style type="text/css">
            body {
                font-family: 'Poppins', sans-serif;
                ;
            }
        </style>
    </head>
    ​
    <body style="margin:0; padding:0; background-color:#F1FFFB;">
        <center>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F1FFFB">
                <tr>
                    <td align="center" valign="top">
                        <h1 style="color: #455065; font-weight: 300; font-size: 22px; margin: 0">Hi <span
                                style="font-weight: 600;">${name}</span></h1>
                        <p style="color: #455065; font-weight: 300; font-size: 22px; margin-bottom: 50px;">Thank you for
                            signing up.</p>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table width="680" cellpadding="0" cellspacing="0" style="padding: 50px 0 100px 0" border="0"
                            class="wrapper" bgcolor="#FFFFFF">
                            <tr>
                                <td align="center" valign="top">
                                    <div style="width: 212px; height: 200px;">
                                        <img style="margin-bottom: 20px; width: 100%; height: 100%"
                                        src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/Group_6_2x_ahadzv.png"
                                        alt="success">
                                    </div>
                                    <p style="color: #455065; font-weight: 300; font-size: 17px; margin-bottom: 20px;">Use
                                        this code to verify your account on the dashboard.</p>
                                    <h2 style="color: #047558; font-weight: 600; font-size: 17px;"> ${verification_code}</h2>
                                    <div style="width: 200px; height: 1px; background-color: #E4E4E4; margin-bottom: 25px;">
                                    </div>
                                    <h3 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px; margin-bottom: 20px;">Follow
                                        this link to <a href="http://localhost:3000/account/verification?id=${id}"
                                            style="color: #047558; text-decoration:underline;">Verify Email</a>
                                    </h3>
                                    <h4 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px;">Please note that this code expires in 10 minutes</h4>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" valign="top">
                        <table width="680" cellpadding="0" cellspacing="0" border="0" class="wrapper">
                            <tr>
                                <td height="10" style="font-size:10px; line-height:10px; padding: 20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td align="center" valign="top">
                                    <div align="center" valign="top" style="padding: 10px; display: inline-flex;">
                                        <a href="" style="margin-right: 20px;">
                                            <div style="width: 18px; height: 18px;">
                                                <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/instagram-logo_2x_ckmbjm.png" alt="instagram">
                                            </div></a>
                                        <a href="" style="margin-right: 20px;">
                                            <div style="width: 15px; height: 18px;">
                                                <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/youtube-logo_2x_iiiajh.png" alt="youtube">
                                            </div>
                                        </a>
                                        <a href="" style="margin-right: 20px;">
                                            <div style="width: 18px; height: 18px;">
                                                <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/facebook-logo_2x_h8nwp2.png" alt="facebook">
                                            </div>
                                        </a>
                                        <a href="" style="margin-right: 20px;">
                                            <div  style="width: 22px; height: 18px;">
                                                <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/twitter-logo_2x_fwjzbk.png" alt="twitter">
                                            </div>
                                        </a>
                                    </div>
                                    <div align="center" valign="top" style="padding: 10px; color: #047558; font-size: 16px;">
                                        <p>Copyright © 2020 FEMI.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td height="10" style="font-size:10px; line-height:100px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </center>
    </body>
    ​
    </html>
    `
    },
    verificationSuccessfulTemplate: (email, first_name, last_name) => {
        const name = first_name + " " + last_name;
        return `<html lang="en">
        ​
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        ​
            <title></title>
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,600,700,800&display=swap" rel="stylesheet">
        ​
            <style type="text/css">
                body {
                    font-family: 'Poppins', sans-serif;
                    ;
                }
            </style>
        </head>
        ​
        <body style="margin:0; padding:0; background-color:#F1FFFB;">
            <center>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F1FFFB">
                    <tr>
                        <td align="center" valign="top">
                            <h1 style="color: #455065; font-weight: 300; font-size: 22px; margin: 0">Hi <span
                                    style="font-weight: 600;">${name}</span></h1>
                            <p style="color: #455065; font-weight: 300; font-size: 22px; margin-bottom: 50px;">Thank you for verifying your mail</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" style="padding: 50px 0 100px 0" border="0"
                                class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                    <td align="center" valign="top">
                                        <div style="width: 212px; height: 200px;">
                                            <img style="margin-bottom: 20px; width: 100%; height: 100%"
                                            src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/Group_6_2x_ahadzv.png"
                                            alt="success">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" border="0" class="wrapper">
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:10px; padding: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <div align="center" valign="top" style="padding: 10px; display: inline-flex;">
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/instagram-logo_2x_ckmbjm.png" alt="nibss/instagram">
                                                </div></a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 15px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/youtube-logo_2x_iiiajh.png" alt="nibss/youtube">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/facebook-logo_2x_h8nwp2.png" alt="nibsss/facebook">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div  style="width: 22px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/twitter-logo_2x_fwjzbk.png" alt="nibss/twitter">
                                                </div>
                                            </a>
                                        </div>
                                        <div align="center" valign="top" style="padding: 10px; color: #047558; font-size: 16px;">
                                            <p>Copyright © 2020 FEMI.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:100px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        ​
        </html>`
    },
    resendVerificationTemplate: (email, verification_code, id, first_name, last_name) => {
        const name = first_name + " " + last_name;
        return `<html lang="en">
    ​
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        ​
            <title></title>
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,600,700,800&display=swap" rel="stylesheet">
        ​
            <style type="text/css">
                body {
                    font-family: 'Poppins', sans-serif;
                    ;
                }
            </style>
        </head>
        ​
        <body style="margin:0; padding:0; background-color:#F1FFFB;">
            <center>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F1FFFB">
                    <tr>
                        <td align="center" valign="top">
                            <h1 style="color: #455065; font-weight: 300; font-size: 22px; margin: 0">Hi <span
                                    style="font-weight: 600;">${name}</span></h1>
                            <p style="color: #455065; font-weight: 300; font-size: 22px; margin-bottom: 50px;">You requested for a verification code.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" style="padding: 50px 0 100px 0" border="0"
                                class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                    <td align="center" valign="top">
                                        <div style="width: 212px; height: 200px;">
                                            <img style="margin-bottom: 20px; width: 100%; height: 100%"
                                            src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/Group_6_2x_ahadzv.png"
                                            alt="success">
                                        </div>
                                        <p style="color: #455065; font-weight: 300; font-size: 17px; margin-bottom: 20px;">Use
                                            this code to verify your account on the dashboard.</p>
                                        <h2 style="color: #047558; font-weight: 600; font-size: 17px;"> ${verification_code}</h2>
                                        <div style="width: 200px; height: 1px; background-color: #E4E4E4; margin-bottom: 25px;">
                                        </div>
                                        <h3 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px; margin-bottom: 20px;">Follow
                                            this link to <a href="http://localhost:3002/api/v1/auth/confirmation?id=${id}"
                                                style="color: #047558; text-decoration:underline;">Verify Email</a>
                                        </h3>
                                        <h4 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px;">Please note that this code expires in 10 minutes</h4>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" border="0" class="wrapper">
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:10px; padding: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <div align="center" valign="top" style="padding: 10px; display: inline-flex;">
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/instagram-logo_2x_ckmbjm.png" alt="nibss/instagram">
                                                </div></a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 15px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/youtube-logo_2x_iiiajh.png" alt="nibss/youtube">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/facebook-logo_2x_h8nwp2.png" alt="nibsss/facebook">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div  style="width: 22px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/twitter-logo_2x_fwjzbk.png" alt="nibss/twitter">
                                                </div>
                                            </a>
                                        </div>
                                        <div align="center" valign="top" style="padding: 10px; color: #047558; font-size: 16px;">
                                            <p>Copyright © 2020 FEMI.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:100px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        ​
        </html>`
    },
    resetPasswordTemplate: (email, verification_code, id) => {
        return `<html lang="en">
​
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
​
    <title></title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,600,700,800&display=swap" rel="stylesheet">
​
    <style type="text/css">
        body {
            font-family: 'Poppins', sans-serif;
            ;
        }
    </style>
</head>
​
<body style="margin:0; padding:0; background-color:#F1FFFB;">
    <center>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F1FFFB">
            <tr>
                <td align="center" valign="top">
                    <img style="padding: 40px 0px; width: 119px; height: 36px;"
                        src="https://res.cloudinary.com/nibss/image/upload/v1589150542/Email%20Template%20Icons/Nibss-Logo_tiruhc.png"
                        alt="nibss-logo">
                    <p style="color: #455065; font-weight: 300; font-size: 22px; margin-bottom: 50px;">You just requested for a change of password on your account.</p>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <table width="680" cellpadding="0" cellspacing="0" style="padding: 50px 0 100px 0" border="0"
                        class="wrapper" bgcolor="#FFFFFF">
                        <tr>
                            <td align="center" valign="top">
                                <div style="width: 212px; height: 200px;">
                                    <img style="margin-bottom: 20px; width: 100%; height: 100%"
                                    src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/Group_6_2x_ahadzv.png"
                                    alt="success">
                                </div>
                                <p style="color: #455065; font-weight: 300; font-size: 17px; margin-bottom: 20px;">Use
                                    this code to reset your password.</p>
                                <h2 style="color: #047558; font-weight: 600; font-size: 17px;"> ${verification_code}</h2>
                                <div style="width: 200px; height: 1px; background-color: #E4E4E4; margin-bottom: 25px;">
                                </div>
                                <h3 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px; margin-bottom: 20px;">Follow
                                    this link to <a href="http://localhost:3002/api/v1/auth/reset-password?id=${id}"
                                        style="color: #047558; text-decoration:underline;">Reset Password</a>
                                </h3>
                                <h4 style="color: #455065; font-weight: 300; font-size: 17px; line-height: 23px;">Please note that this code expires in 10 minutes</h4>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td align="center" valign="top">
                    <table width="680" cellpadding="0" cellspacing="0" border="0" class="wrapper">
                        <tr>
                            <td height="10" style="font-size:10px; line-height:10px; padding: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                                <div align="center" valign="top" style="padding: 10px; display: inline-flex;">
                                    <a href="" style="margin-right: 20px;">
                                        <div style="width: 18px; height: 18px;">
                                            <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/instagram-logo_2x_ckmbjm.png" alt="nibss/instagram">
                                        </div></a>
                                    <a href="" style="margin-right: 20px;">
                                        <div style="width: 15px; height: 18px;">
                                            <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/youtube-logo_2x_iiiajh.png" alt="nibss/youtube">
                                        </div>
                                    </a>
                                    <a href="" style="margin-right: 20px;">
                                        <div style="width: 18px; height: 18px;">
                                            <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/facebook-logo_2x_h8nwp2.png" alt="nibsss/facebook">
                                        </div>
                                    </a>
                                    <a href="" style="margin-right: 20px;">
                                        <div  style="width: 22px; height: 18px;">
                                            <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/twitter-logo_2x_fwjzbk.png" alt="nibss/twitter">
                                        </div>
                                    </a>
                                </div>
                                <div align="center" valign="top" style="padding: 10px; color: #047558; font-size: 16px;">
                                    <p>Copyright © 2020 FEMI.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td height="10" style="font-size:10px; line-height:100px;">&nbsp;</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
​
</html>`
    },
    resetSuccessfulTemplate: (email, first_name, last_name) => {
        const name = first_name + " " + last_name;
        return `<html lang="en">
        ​
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
        ​
            <title></title>
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,400i,600,700,800&display=swap" rel="stylesheet">
        ​
            <style type="text/css">
                body {
                    font-family: 'Poppins', sans-serif;
                    ;
                }
            </style>
        </head>
        ​
        <body style="margin:0; padding:0; background-color:#F1FFFB;">
            <center>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#F1FFFB">
                    <tr>
                        <td align="center" valign="top">
                            <h1 style="color: #455065; font-weight: 300; font-size: 22px; margin: 0">Hi <span
                                    style="font-weight: 600;">${name}</span></h1>
                            <p style="color: #455065; font-weight: 300; font-size: 22px; margin-bottom: 50px;">Your password reset was successful</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" style="padding: 50px 0 100px 0" border="0"
                                class="wrapper" bgcolor="#FFFFFF">
                                <tr>
                                    <td align="center" valign="top">
                                        <div style="width: 212px; height: 200px;">
                                            <img style="margin-bottom: 20px; width: 100%; height: 100%"
                                            src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/Group_6_2x_ahadzv.png"
                                            alt="success">
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top">
                            <table width="680" cellpadding="0" cellspacing="0" border="0" class="wrapper">
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:10px; padding: 20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <div align="center" valign="top" style="padding: 10px; display: inline-flex;">
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/instagram-logo_2x_ckmbjm.png" alt="nibss/instagram">
                                                </div></a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 15px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/youtube-logo_2x_iiiajh.png" alt="nibss/youtube">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div style="width: 18px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/facebook-logo_2x_h8nwp2.png" alt="nibsss/facebook">
                                                </div>
                                            </a>
                                            <a href="" style="margin-right: 20px;">
                                                <div  style="width: 22px; height: 18px;">
                                                    <img style="width: 100%; height: 100%;" src="https://res.cloudinary.com/nibss/image/upload/v1589148394/Email%20Template%20Icons/twitter-logo_2x_fwjzbk.png" alt="nibss/twitter">
                                                </div>
                                            </a>
                                        </div>
                                        <div align="center" valign="top" style="padding: 10px; color: #047558; font-size: 16px;">
                                            <p>Copyright © 2020 FEMI.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10" style="font-size:10px; line-height:100px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </center>
        </body>
        ​
        </html>`
    },
}

export default templates